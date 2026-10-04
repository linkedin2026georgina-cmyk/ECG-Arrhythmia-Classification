from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import numpy as np
import tensorflow as tf
from scipy.signal import find_peaks

# -------------------------
# App and CORS settings
# -------------------------
app = FastAPI(title="ECG Fusion Model Backend")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------------
# Load the model
# -------------------------
# Model file path on this machine
MODEL_PATH = r"C:\Users\PC PRO MAX\Desktop\best_cnn_rr_model.h5"

try:
    model = tf.keras.models.load_model(MODEL_PATH)
    print(f"Model loaded successfully from: {MODEL_PATH}")
except Exception as e:
    print(f"Error loading model: {e}")
    model = None

# -------------------------
# Parameters
# -------------------------
TARGET_LEN = 180
class_map = ['F', 'N', 'Q', 'S', 'V']

# -------------------------
# Request schema
# -------------------------
class SignalRequest(BaseModel):
    signal: list[float]
    fs: float = 360

# -------------------------
# Helper: extract beats and RR features
# -------------------------
def extract_beats(signal, fs, target_len=TARGET_LEN):
    signal = np.array(signal, dtype=np.float32)

    # 1) Detect R-peaks
    distance = int(0.2 * fs)
    r_peaks, _ = find_peaks(signal, distance=distance, height=np.mean(signal))

    beats = []
    indices = []
    half_len = target_len // 2

    # 2) Cut a fixed window around each peak
    for r in r_peaks:
        start = r - half_len
        end = r + half_len

        if start < 0 or end > len(signal):
            continue

        beat = signal[start:end]

        if len(beat) != target_len:
            beat = np.pad(beat, (0, target_len - len(beat)))

        # Normalize each beat segment
        beat = (beat - np.mean(beat)) / (np.std(beat) + 1e-8)

        beats.append(beat)
        indices.append(r)

    beats = np.array(beats)
    if len(beats) == 0:
        return np.array([]), np.array([]), []

    # 3) Compute RR intervals (previous and next)
    rr_diff = np.diff(indices) / fs
    avg_rr = np.mean(rr_diff) if len(rr_diff) > 0 else 0.8

    rr_prev = np.concatenate(([avg_rr], rr_diff))
    rr_next = np.concatenate((rr_diff, [avg_rr]))
    rr = np.stack([rr_prev, rr_next], axis=1)

    return beats, rr, indices

# -------------------------
# Analyze endpoint
# -------------------------
@app.post("/analyze")
async def analyze(req: SignalRequest):
    if not model:
        return {"error": "Model not loaded"}

    signal = req.signal
    fs = req.fs

    beats, rr, indices = extract_beats(signal, fs)

    if len(beats) == 0:
        return {"anomalies": []}

    # Model inputs
    beats_input = beats[..., np.newaxis]
    rr_input = rr

    # Run prediction
    preds = model.predict([beats_input, rr_input], batch_size=64, verbose=0)

    anomalies = []
    for i, p in enumerate(preds):
        cls_idx = int(np.argmax(p))
        cls_prob = float(p[cls_idx])
        cls_label = class_map[cls_idx]

        anomalies.append({
            "index": int(indices[i]),
            "reason": f"AI Detected: {cls_label} (Conf: {cls_prob:.0%})",
            "features": {
                "Type": cls_label,
                "RR_Prev": round(float(rr[i][0]), 3),
                "RR_Next": round(float(rr[i][1]), 3),
            }
        })

    return {"anomalies": anomalies}

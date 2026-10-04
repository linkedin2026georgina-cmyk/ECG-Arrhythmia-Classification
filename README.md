<<<<<<< HEAD
# Comparative Analysis of Machine Learning and Deep Learning Approaches for ECG Arrhythmia Classification

**University of the West of England (UWE Bristol)**  
**MSc Data Science**  
**Module:** UFCF9Y-60-M CSCT Masters Project  
**Academic Year:** 2025/2026  

---

## Project Overview

Electrocardiogram (ECG) heartbeat classification is a core task in automated cardiac arrhythmia detection, yet it remains challenging due to signal variability, inter-patient differences, and severe class imbalance.

This project develops an end-to-end ECG analysis pipeline using the **MIT-BIH Arrhythmia Database**, covering signal preprocessing, heartbeat segmentation, feature extraction, and multi-class classification. The study systematically compares classical machine learning models and deep learning architectures under realistic evaluation protocols, including record-wise and patient-wise data splitting.

Rather than focusing on a standalone classifier, the project is implemented as a **reproducible analytical and deployment-oriented pipeline**, integrating data preprocessing, exploratory analysis, model training, evaluation, and real-time inference within a web-based ECG analysis system.

---

## Objectives

- Develop an automated pipeline for ECG heartbeat segmentation and classification  
- Analyse the impact of inter-patient variability using patient-wise evaluation  
- Address severe class imbalance using data-level and model-level strategies  
- Compare classical machine learning models with deep learning architectures  
- Evaluate hybrid architectures combining waveform and temporal (RR-interval) features  
- Select and deploy a robust model suitable for real-time clinical decision support  

---

## Repository Contents

- **25006858.ipynb**  
  Main Jupyter Notebook containing preprocessing, feature extraction, modelling, evaluation, and experimental results.

- **backend/**  
  FastAPI-based backend for ECG preprocessing, heartbeat segmentation, feature extraction, and model inference.

- **frontend/**  
  React + TypeScript web interface for ECG upload, waveform visualisation, and beat-level classification display.

- **README.md**  
  Project documentation (this file).

---

## Data Availability

Due to GitHub file size constraints, raw ECG recordings are not included in this repository.  
The dataset used is publicly available from PhysioNet:

- **MIT-BIH Arrhythmia Database**  
  https://physionet.org/content/mitdb/1.0.0/

The dataset contains annotated ECG recordings sampled at 360 Hz and is widely used as a benchmark for arrhythmia classification research. Only single-lead (MLII) signals are used in this project.

---

## Methodology Summary

### Data Preprocessing

- R-peak detection and beat segmentation  
- Fixed-length heartbeat windows (180 samples)  
- Z-score normalisation  
- Extraction of RR-interval features (previous and next RR)  

### Class Imbalance Handling

- Class weighting during training  
- SMOTE and ADASYN oversampling for classical ML models  
- Feature-level fusion to improve minority class detection  

### Predictive Modelling

**Classical Machine Learning (Baseline):**
- Random Forest  
- XGBoost  

**Deep Learning Models:**
- 1D Convolutional Neural Network (CNN)  
- Hybrid CNN–LSTM with handcrafted features  
- CNN with RR-interval feature fusion  
- 1D Transformer (experimental)  

### Evaluation

Models are assessed using:
- Accuracy  
- Weighted F1-score  
- Macro F1-score  
- Class-wise recall (with emphasis on minority arrhythmias)  
- Confusion matrices  

Patient-wise evaluation is used to reflect realistic clinical generalisation.

---

## Key Results

- The **hybrid CNN–LSTM with handcrafted features** achieved the highest overall performance, reaching **87% accuracy** and a **weighted F1-score of 0.90** under record-wise evaluation.
- For deployment, a **CNN + RR-interval fusion model** was selected, achieving **82% accuracy** and improved recall for supraventricular beats (**44%**) on unseen patient data.
- Although slightly less accurate overall, the deployment model provides improved robustness, lower computational cost, and faster inference, making it suitable for real-time web-based ECG analysis.

---

## How to Run

### Requirements

- Python 3.9+  
- Jupyter Notebook  
- Node.js (for frontend)  

### Install Dependencies

```bash
pip install numpy pandas scikit-learn matplotlib seaborn tensorflow fastapi uvicorn

### Frontend Dependencies

Install frontend dependencies using:

```bash
npm install


=======
# ECG-Arrhythmia-Classification
>>>>>>> 6fccdd4d32eac44ccb6b47f8374bb0f55e295966

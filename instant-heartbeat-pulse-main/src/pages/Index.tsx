import React, { useState, useRef } from "react";
import {
  LineChart,
  Line,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Brush,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Upload,
  AlertTriangle,
  RefreshCw,
  HeartPulse,
  Activity,
  Search,
  CheckCircle2,
  FileBarChart,
  ChevronDown,
} from "lucide-react";

// UI helper card component
const Card = ({ children, className }: any) => (
  <div className={`bg-white rounded-2xl border border-slate-200 shadow-sm ${className}`}>
    {children}
  </div>
);

// Color mapping for heartbeat types
const TYPE_COLORS: any = {
  N: "#22c55e",
  S: "#f97316",
  V: "#ef4444",
  F: "#8b5cf6",
  Q: "#64748b",
};

// Display names for heartbeat types
const TYPE_NAMES: any = {
  N: "Normal",
  S: "Supraventricular",
  V: "Ventricular",
  F: "Fusion",
  Q: "Unknown",
};

// Tooltip content for chart points
const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload || !payload.length) return null;

  const scatterPoint = payload.find((item: any) => item.dataKey !== "val");
  const p = scatterPoint ? scatterPoint.payload : payload[0].payload;
  const hasType = !!p.beatType;

  return (
    <div className="bg-white/95 backdrop-blur-sm p-3 rounded-xl shadow-xl border border-slate-200 text-xs z-50">
      <div
        className={`flex items-center gap-2 mb-1 pb-1 border-b ${
          hasType && p.beatType !== "N" ? "border-red-100" : "border-slate-100"
        }`}
      >
        {hasType ? (
          <div className="flex items-center gap-1.5">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: TYPE_COLORS[p.beatType] }}
            ></span>
            <p className="font-bold text-slate-800">
              {TYPE_NAMES[p.beatType]}
            </p>
          </div>
        ) : (
          <p className="font-bold text-slate-600">Raw Signal</p>
        )}
      </div>

      {hasType && (
        <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[10px] text-slate-500">
          <span>CONF:</span>
          <span className="font-mono text-slate-700 font-bold">
            {p.features?.Confidence || "N/A"}
          </span>
          <span>RR:</span>
          <span className="font-mono text-slate-700">
            {p.features?.RR_Prev}s
          </span>
        </div>
      )}

      {!hasType && <p className="text-slate-500">Val: {p.val}</p>}
    </div>
  );
};

// Main page component
const Index = () => {
  const [displaySignal, setDisplaySignal] = useState<any[]>([]);
  const fullSignalRef = useRef<number[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [pieData, setPieData] = useState<any[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  // Limit displayed points for performance
  const MAX_POINTS_DISPLAY = 3000;

  // Handle CSV file upload and parsing
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setError(null);
      setIsLoading(true);
      setStats(null);
      setPieData([]);

      const text = await file.text();
      const lines = text.split(/\r?\n/).filter(Boolean);
      const header = lines[0].split(",");

      const mliiIdx = header.findIndex((h) =>
        ["MLII", "II", "ECG", "V5"].some((n) =>
          h.toUpperCase().includes(n)
        )
      );
      const timeIdx = header.findIndex((h) =>
        h.toUpperCase().includes("TIME")
      );

      if (mliiIdx === -1) throw new Error("Column MLII/V5 not found");

      const fullData = lines
        .slice(1)
        .map((l) => parseFloat(l.split(",")[mliiIdx]));

      fullSignalRef.current = fullData;

      const step = Math.ceil(fullData.length / MAX_POINTS_DISPLAY);

      const displayData = lines
        .slice(1)
        .filter((_, i) => i % step === 0)
        .map((l, i) => {
          const cols = l.split(",");
          const realIndex = i * step;

          return {
            x: timeIdx !== -1 ? parseFloat(cols[timeIdx]) : realIndex / 360,
            val: parseFloat(cols[mliiIdx]),
            originalIndex: realIndex,
            endIndex: realIndex + step,
            valN: null,
            valS: null,
            valV: null,
            valF: null,
            valQ: null,
          };
        });

      setDisplaySignal(displayData);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Send signal to backend for analysis
  const analyze = async () => {
    try {
      if (fullSignalRef.current.length === 0) return;

      setIsLoading(true);
      setError(null);

      const res = await fetch("http://127.0.0.1:8005/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          signal: fullSignalRef.current,
          fs: 360,
        }),
      });

      if (!res.ok) throw new Error("Server Error");

      const json = await res.json();
      const anomalies = json.anomalies;

      const counts = {
        N: 0,
        V: 0,
        S: 0,
        F: 0,
        Q: 0,
        Total: anomalies.length,
      };

      anomalies.forEach((a: any) => {
        const type = a.features?.Type || "Q";
        if (counts[type as keyof typeof counts] !== undefined) {
          counts[type as keyof typeof counts]++;
        }
      });

      setStats(counts);

      setPieData(
        Object.keys(TYPE_COLORS)
          .map((key) => ({
            name: key,
            value: counts[key as keyof typeof counts],
            color: TYPE_COLORS[key],
          }))
          .filter((d) => d.value > 0)
      );

      const merged = displaySignal.map((p) => {
        const found = anomalies.find(
          (a: any) =>
            a.index >= p.originalIndex && a.index < p.endIndex
        );

        const type = found?.features?.Type;

        return {
          ...p,
          beatType: type,
          features: found?.features,
          valN: type === "N" ? p.val : null,
          valS: type === "S" ? p.val : null,
          valV: type === "V" ? p.val : null,
          valF: type === "F" ? p.val : null,
          valQ: type === "Q" ? p.val : null,
        };
      });

      setDisplaySignal(merged);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-slate-50 font-sans text-slate-900 overflow-hidden">
      <input
        ref={fileRef}
        type="file"
        className="hidden"
        accept=".csv"
        onChange={handleUpload}
      />

      {/* Header */}
      <header className="flex-none px-6 py-3 bg-white border-b border-slate-200 flex items-center justify-between shadow-sm z-10">
        <div className="flex items-center gap-2">
          <div className="bg-indigo-600 p-1.5 rounded-lg text-white">
            <HeartPulse size={18} />
          </div>
          <h1 className="text-lg font-bold text-slate-800">
            ECG Lens Pro
          </h1>
        </div>

        <div className="flex gap-3">
          {displaySignal.length > 0 && (
            <button
              onClick={analyze}
              disabled={isLoading}
              className="px-4 py-1.5 bg-slate-900 text-white text-sm rounded-lg font-bold hover:bg-slate-800 flex items-center gap-2 disabled:opacity-50"
            >
              {isLoading ? (
                <RefreshCw size={14} className="animate-spin" />
              ) : (
                <Activity size={14} />
              )}
              {isLoading ? "Running..." : "Analyze"}
            </button>
          )}

          <button
            onClick={() => {
              setDisplaySignal([]);
              setStats(null);
            }}
            className="p-1.5 text-slate-500 hover:bg-slate-100 rounded-lg"
          >
            <RefreshCw size={18} />
          </button>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
        {error && (
          <div className="bg-red-50 text-red-600 px-4 py-2 rounded-lg text-sm font-medium flex gap-2">
            <AlertTriangle size={16} />
            {error}
          </div>
        )}

        {displaySignal.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center">
            <Card className="p-8 text-center max-w-sm">
              <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Upload size={24} />
              </div>
              <h2 className="text-lg font-bold mb-1">
                Upload ECG Record
              </h2>
              <p className="text-xs text-slate-400 mb-6">
                Supports MIT-BIH CSV Format
              </p>
              <button
                onClick={() => fileRef.current?.click()}
                className="w-full py-2 bg-indigo-600 text-white rounded-lg text-sm font-bold hover:bg-indigo-700"
              >
                Select File
              </button>
            </Card>
          </div>
        ) : (
          <>
            {/* ECG chart */}
            <Card className="flex-none p-4 h-[350px] relative">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={displaySignal}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#f1f5f9"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="x"
                    tick={{ fontSize: 10 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis hide domain={["auto", "auto"]} />
                  <Tooltip content={<CustomTooltip />} />
                  <Line
                    type="monotone"
                    dataKey="val"
                    stroke="#cbd5e1"
                    strokeWidth={1}
                    dot={false}
                    isAnimationActive={false}
                  />
                  <Scatter
                    dataKey="valN"
                    fill={TYPE_COLORS.N}
                    isAnimationActive={false}
                  />
                  <Scatter
                    dataKey="valV"
                    fill={TYPE_COLORS.V}
                    isAnimationActive={false}
                  />
                  <Scatter
                    dataKey="valS"
                    fill={TYPE_COLORS.S}
                    isAnimationActive={false}
                  />
                  <Scatter
                    dataKey="valF"
                    fill={TYPE_COLORS.F}
                    isAnimationActive={false}
                  />
                  <Scatter
                    dataKey="valQ"
                    fill={TYPE_COLORS.Q}
                    isAnimationActive={false}
                  />
                  <Brush
                    dataKey="x"
                    height={20}
                    stroke="#e2e8f0"
                    fill="#f8fafc"
                    tickFormatter={() => ""}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>

            {/* Summary section */}
            {stats && (
              <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4 min-h-0">
                <Card className="p-3 flex flex-col items-center justify-center">
                  <h3 className="text-xs font-bold text-slate-500 uppercase mb-2">
                    Beat Distribution
                  </h3>
                  <div className="w-full h-[140px]">
                    <ResponsiveContainer>
                      <PieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          innerRadius={40}
                          outerRadius={55}
                          dataKey="value"
                        >
                          {pieData.map((e, i) => (
                            <Cell key={i} fill={e.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </Card>

                <Card className="md:col-span-2 overflow-hidden flex flex-col">
                  <div className="px-4 py-2 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
                    <h3 className="text-xs font-bold text-slate-700 uppercase flex items-center gap-2">
                      <FileBarChart size={14} />
                      Diagnostic Report
                    </h3>
                    <span className="text-[10px] bg-slate-200 px-2 py-0.5 rounded-full text-slate-600 font-mono">
                      Total: {stats.Total}
                    </span>
                  </div>

                  <div className="overflow-y-auto flex-1 p-0">
                    <table className="w-full text-xs text-left">
                      <thead className="text-slate-400 font-medium bg-white sticky top-0">
                        <tr>
                          <th className="px-4 py-2">Type</th>
                          <th className="px-4 py-2 text-right">Count</th>
                          <th className="px-4 py-2 text-right">%</th>
                          <th className="px-4 py-2">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                        {Object.keys(TYPE_COLORS).map((type) => {
                          const count = stats[type] || 0;
                          const pct =
                            stats.Total > 0
                              ? ((count / stats.Total) * 100).toFixed(1)
                              : "0.0";

                          return (
                            <tr key={type}>
                              <td className="px-4 py-2 font-bold flex items-center gap-2">
                                <span
                                  className="w-2 h-2 rounded-full"
                                  style={{
                                    backgroundColor: TYPE_COLORS[type],
                                  }}
                                ></span>
                                {type}
                              </td>
                              <td className="px-4 py-2 text-right font-mono">
                                {count}
                              </td>
                              <td className="px-4 py-2 text-right text-slate-500">
                                {pct}%
                              </td>
                              <td className="px-4 py-2 text-slate-500">
                                {TYPE_NAMES[type]}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </Card>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default Index;

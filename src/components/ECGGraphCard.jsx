import { useState, useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceArea,
  ReferenceLine,
} from 'recharts';
import './ECGGraphCard.css';

/* ── Simulated ECG Data Generator ── */
function generateECGData(points = 300) {
  const data = [];
  const anomalyRanges = [
    { start: 85, end: 105 },
    { start: 210, end: 230 },
  ];

  for (let i = 0; i < points; i++) {
    const t = i / points;
    const cycle = (i % 30) / 30;

    let mv;
    // Simulate a simplified ECG waveform (P-QRS-T)
    if (cycle < 0.08) {
      // P wave
      mv = 0.15 * Math.sin(cycle * Math.PI / 0.08);
    } else if (cycle < 0.15) {
      // PR segment
      mv = 0;
    } else if (cycle < 0.18) {
      // Q wave
      mv = -0.1 * Math.sin((cycle - 0.15) * Math.PI / 0.03);
    } else if (cycle < 0.22) {
      // R wave (tall spike)
      mv = 1.2 * Math.sin((cycle - 0.18) * Math.PI / 0.04);
    } else if (cycle < 0.26) {
      // S wave
      mv = -0.25 * Math.sin((cycle - 0.22) * Math.PI / 0.04);
    } else if (cycle < 0.35) {
      // ST segment
      mv = 0;
    } else if (cycle < 0.55) {
      // T wave
      mv = 0.3 * Math.sin((cycle - 0.35) * Math.PI / 0.2);
    } else {
      // Baseline
      mv = 0;
    }

    // Add noise
    mv += (Math.random() - 0.5) * 0.03;

    // Check if point is in anomaly range
    const isAnomaly = anomalyRanges.some(r => i >= r.start && i <= r.end);
    if (isAnomaly) {
      // Introduce anomaly — irregular rhythm / elevated ST
      mv += Math.sin(i * 0.8) * 0.4 + (Math.random() - 0.5) * 0.15;
    }

    const seconds = (i * 0.01).toFixed(2);
    data.push({
      time: `${seconds}s`,
      timeIndex: i,
      mv: parseFloat(mv.toFixed(4)),
      isAnomaly,
    });
  }

  return { data, anomalyRanges };
}

/* ── Custom Tooltip ── */
function ECGTooltip({ active, payload }) {
  if (!active || !payload || !payload.length) return null;
  const point = payload[0].payload;
  return (
    <div className="ecg-tooltip">
      <div className="ecg-tooltip__time">{point.time}</div>
      <div className={`ecg-tooltip__value ${point.isAnomaly ? 'ecg-tooltip__value--anomaly' : ''}`}>
        {point.mv.toFixed(3)} mV
        {point.isAnomaly && ' ⚠'}
      </div>
    </div>
  );
}

/* ── ECG Graph Card Component ── */
export default function ECGGraphCard() {
  const [activeFilter, setActiveFilter] = useState('all');
  const { data, anomalyRanges } = useMemo(() => generateECGData(300), []);

  const filters = [
    { id: 'all', label: 'All Leads' },
    { id: 'lead2', label: 'Lead II' },
    { id: 'lead3', label: 'Lead III' },
    { id: 'avr', label: 'aVR' },
  ];

  // Count anomalies
  const anomalyCount = data.filter(d => d.isAnomaly).length;
  const hasAnomaly = anomalyCount > 0;

  return (
    <div className="ecg-card" id="ecg-graph-card">
      {/* ── Header ── */}
      <div className="ecg-card__header">
        <div className="ecg-card__title-group">
          <h2 className="ecg-card__title">Lead II Continuous Trace</h2>
          <span className="ecg-card__subtitle">Real-time ECG Waveform · 25mm/s · 10mm/mV</span>
        </div>

        <div className="ecg-card__controls">
          <div
            className={`ecg-card__badge ${hasAnomaly ? 'ecg-card__badge--anomaly' : 'ecg-card__badge--stable'}`}
          >
            <span className="ecg-card__badge-dot" />
            {hasAnomaly ? `${anomalyRanges.length} Anomalies Detected` : 'Normal Sinus Rhythm'}
          </div>

          {filters.map(f => (
            <button
              key={f.id}
              id={`ecg-filter-${f.id}`}
              className={`ecg-card__filter-btn ${activeFilter === f.id ? 'ecg-card__filter-btn--active' : ''}`}
              onClick={() => setActiveFilter(f.id)}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Chart ── */}
      <div className="ecg-card__chart-wrapper">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 8, right: 16, left: 8, bottom: 8 }}>
            {/* Subtle grid — NO hard lines, tonal only */}
            <CartesianGrid
              strokeDasharray="3 6"
              stroke="var(--surface-container-high)"
              vertical={false}
            />

            {/* Anomaly highlight zones */}
            {anomalyRanges.map((range, i) => (
              <ReferenceArea
                key={i}
                x1={data[range.start]?.time}
                x2={data[range.end]?.time}
                fill="var(--error)"
                fillOpacity={0.06}
              />
            ))}

            {/* Baseline reference */}
            <ReferenceLine y={0} stroke="var(--outline-variant)" strokeDasharray="4 4" strokeOpacity={0.4} />

            <XAxis
              dataKey="time"
              tick={{ fontSize: 10, fill: 'var(--on-surface-variant)', fontFamily: 'Inter' }}
              axisLine={false}
              tickLine={false}
              interval={29}
            />
            <YAxis
              tick={{ fontSize: 10, fill: 'var(--on-surface-variant)', fontFamily: 'Inter' }}
              axisLine={false}
              tickLine={false}
              domain={[-0.6, 1.6]}
              tickFormatter={v => `${v} mV`}
              width={55}
            />

            <Tooltip content={<ECGTooltip />} />

            {/* Normal ECG line */}
            <Line
              type="monotone"
              dataKey="mv"
              stroke="var(--primary)"
              strokeWidth={1.5}
              dot={false}
              activeDot={{
                r: 4,
                fill: 'var(--primary-container)',
                stroke: 'var(--on-primary)',
                strokeWidth: 2,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* ── Legend ── */}
      <div className="ecg-card__legend">
        <div className="ecg-card__legend-item">
          <span className="ecg-card__legend-dot ecg-card__legend-dot--normal" />
          Normal Signal
        </div>
        <div className="ecg-card__legend-item">
          <span className="ecg-card__legend-dot ecg-card__legend-dot--anomaly" />
          Flagged Anomaly
        </div>
        <div className="ecg-card__legend-item">
          <span className="ecg-card__legend-dot ecg-card__legend-dot--stable" />
          Stable Interval
        </div>
      </div>

      {/* ── Metrics ── */}
      <div className="ecg-card__metrics">
        <div className="ecg-card__metric">
          <span className="ecg-card__metric-value">72</span>
          <span className="ecg-card__metric-label">Heart Rate (BPM)</span>
        </div>
        <div className="ecg-card__metric">
          <span className="ecg-card__metric-value ecg-card__metric-value--healthy">420</span>
          <span className="ecg-card__metric-label">QT Interval (ms)</span>
        </div>
        <div className="ecg-card__metric">
          <span className="ecg-card__metric-value ecg-card__metric-value--healthy">160</span>
          <span className="ecg-card__metric-label">PR Interval (ms)</span>
        </div>
        <div className="ecg-card__metric">
          <span className="ecg-card__metric-value ecg-card__metric-value--alert">2</span>
          <span className="ecg-card__metric-label">Anomalies Found</span>
        </div>
      </div>
    </div>
  );
}

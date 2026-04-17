import './AnomalySummaryPanel.css';

/* ── Sample Data ── */
const KPI_DATA = [
  {
    id: 'total',
    value: 147,
    label: 'Total Events Detected',
    trend: '+12% vs. prior session',
    trendDir: 'up',
    variant: 'total',
  },
  {
    id: 'critical',
    value: 23,
    label: 'Cardiac Anomalies',
    trend: '+3 since last hour',
    trendDir: 'up',
    variant: 'critical',
  },
  {
    id: 'stable',
    value: 124,
    label: 'Stable Intervals',
    trend: '84.4% compliance',
    trendDir: 'down',
    variant: 'stable',
  },
];

const CLASSIFICATION_DATA = [
  {
    name: 'Premature Ventricular Contractions (PVCs)',
    count: 14,
    total: 23,
    color: 'var(--error)',          // Red — cardiac anomaly
  },
  {
    name: 'Premature Atrial Contractions (PACs)',
    count: 6,
    total: 23,
    color: 'var(--primary)',         // Blue — classification
  },
  {
    name: 'ST-Segment Elevation',
    count: 2,
    total: 23,
    color: 'var(--error)',          // Red — cardiac anomaly
  },
  {
    name: 'Motion Artifacts',
    count: 1,
    total: 23,
    color: 'var(--outline)',         // Grey — non-cardiac
  },
];

const EVENT_LOG = [
  {
    id: 1,
    severity: 'critical',
    name: 'Ventricular Tachycardia (3-beat run)',
    detail: 'Lead II · Segment 2.85s – 3.05s',
    timestamp: '14:32:07',
    confidence: 97.2,
    confidenceLevel: 'high',
  },
  {
    id: 2,
    severity: 'critical',
    name: 'ST-Segment Elevation',
    detail: 'Lead II · Segment 0.85s – 1.05s · ΔST: +2.1mm',
    timestamp: '14:31:44',
    confidence: 94.8,
    confidenceLevel: 'high',
  },
  {
    id: 3,
    severity: 'warning',
    name: 'Premature Ventricular Contraction',
    detail: 'Lead II · Isolated PVC · Compensatory pause detected',
    timestamp: '14:30:22',
    confidence: 88.1,
    confidenceLevel: 'medium',
  },
  {
    id: 4,
    severity: 'info',
    name: 'Sinus Bradycardia',
    detail: 'Lead II · HR dropped to 54 BPM for 8s',
    timestamp: '14:28:15',
    confidence: 76.3,
    confidenceLevel: 'medium',
  },
  {
    id: 5,
    severity: 'info',
    name: 'Motion Artifact Detected',
    detail: 'Lead II · Segment 1.45s – 1.52s · Filtered',
    timestamp: '14:25:03',
    confidence: 62.0,
    confidenceLevel: 'low',
  },
];

/* ── Component ── */
export default function AnomalySummaryPanel() {
  return (
    <div className="anomaly-panel" id="anomaly-summary-panel">
      {/* ── KPI Cards ── */}
      <div className="anomaly-panel__kpis">
        {KPI_DATA.map(kpi => (
          <div key={kpi.id} className={`anomaly-kpi anomaly-kpi--${kpi.variant}`} id={`kpi-${kpi.id}`}>
            <span className="anomaly-kpi__value">{kpi.value}</span>
            <span className="anomaly-kpi__label">{kpi.label}</span>
            <span className={`anomaly-kpi__trend anomaly-kpi__trend--${kpi.trendDir}`}>
              {kpi.trendDir === 'up' ? '▲' : '▼'} {kpi.trend}
            </span>
          </div>
        ))}
      </div>

      {/* ── Classification Breakdown ── */}
      <div className="anomaly-panel__classification" id="anomaly-classification">
        <h3 className="anomaly-panel__section-title">Event Classification</h3>
        <div className="classification-bars">
          {CLASSIFICATION_DATA.map((item, i) => (
            <div key={i} className="classification-item">
              <div className="classification-item__header">
                <span className="classification-item__name">
                  <span
                    className="classification-item__dot"
                    style={{ background: item.color }}
                  />
                  {item.name}
                </span>
                <span className="classification-item__count">{item.count}</span>
              </div>
              <div className="classification-item__bar-track">
                <div
                  className="classification-item__bar-fill"
                  style={{
                    width: `${(item.count / item.total) * 100}%`,
                    background: item.color,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Event Log ── */}
      <div className="anomaly-panel__event-log" id="anomaly-event-log">
        <div className="event-log__header">
          <h3 className="anomaly-panel__section-title" style={{ marginBottom: 0 }}>
            Detected Events
          </h3>
          <span className="event-log__count-badge">
            {EVENT_LOG.filter(e => e.severity === 'critical').length} Critical
          </span>
        </div>

        <div className="event-log__list">
          {EVENT_LOG.map(event => (
            <div key={event.id} className="event-log__item" id={`event-${event.id}`}>
              <span className={`event-log__severity event-log__severity--${event.severity}`} />

              <div className="event-log__content">
                <span className="event-log__event-name">{event.name}</span>
                <span className="event-log__event-detail">{event.detail}</span>
              </div>

              <div className="event-log__meta">
                <span className="event-log__timestamp">{event.timestamp}</span>
                <span className={`event-log__confidence event-log__confidence--${event.confidenceLevel}`}>
                  {event.confidence}% conf.
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

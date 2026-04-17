import '../App.css';

export default function AnalysisArchive() {
  return (
    <div className="dashboard">
      <header className="dashboard__header">
        <div className="dashboard__title-group">
          <h1 className="dashboard__title">Analysis Archive</h1>
          <span className="dashboard__subtitle">Historical ECG reports and patient data</span>
        </div>
      </header>

      <div style={{ marginTop: 'var(--sp-8)' }}>
        <p style={{ color: 'var(--on-surface-variant)' }}>
          This page will contain a searchable and filterable list of past ECG analyses.
        </p>
      </div>
    </div>
  );
}

import '../App.css';

export default function OverviewDashboard() {
  return (
    <div className="dashboard">
      <header className="dashboard__header">
        <div className="dashboard__title-group">
          <h1 className="dashboard__title">Overview Dashboard</h1>
          <span className="dashboard__subtitle">High-level view of patient status</span>
        </div>
      </header>

      <div style={{ marginTop: 'var(--sp-8)' }}>
        <p style={{ color: 'var(--on-surface-variant)' }}>
          This page will contain a grid of active patients, their current status, and system KPIs.
        </p>
      </div>
    </div>
  );
}

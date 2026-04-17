import '../App.css';
import ECGGraphCard from '../components/ECGGraphCard';
import AnomalySummaryPanel from '../components/AnomalySummaryPanel';

export default function DetailedAnalysis() {
  return (
    <div className="dashboard">
      <header className="dashboard__header">
        <div className="dashboard__title-group">
          <h1 className="dashboard__title">Detailed Analysis</h1>
          <span className="dashboard__subtitle">Clinical Precision & Tonal Depth View</span>
        </div>
        <div className="dashboard__meta">
          <div className="dashboard__patient">
            <span className="dashboard__patient-name">P-4092 · John Doe</span>
            <span className="dashboard__patient-id">DOB: 11/04/1965 · Male</span>
          </div>
        </div>
      </header>

      <div className="dashboard__grid">
        {/* Left Column: Asymmetrical main area */}
        <section className="dashboard__main-col">
          <ECGGraphCard />
        </section>

        {/* Right Column: Summaries and Logs */}
        <aside className="dashboard__side-col">
          <AnomalySummaryPanel />
        </aside>
      </div>
    </div>
  );
}

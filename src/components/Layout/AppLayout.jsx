import { NavLink, Outlet } from 'react-router-dom';
import './AppLayout.css';

export default function AppLayout() {
  return (
    <div className="app-layout">
      {/* ── Sidebar Navigation ── */}
      <aside className="app-sidebar">
        <div className="app-sidebar__brand">
          ECG Guard
          <span>Analytics Platform</span>
        </div>
        
        <nav className="app-sidebar__nav">
          <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} end>
            Overview Dashboard
          </NavLink>
          <NavLink to="/analysis" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Detailed Analysis
          </NavLink>
          <NavLink to="/archive" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Analysis Archive
          </NavLink>
        </nav>
      </aside>

      {/* ── Main Content Area ── */}
      <main className="app-main">
        {/* Render child routes here */}
        <Outlet />
      </main>
    </div>
  );
}

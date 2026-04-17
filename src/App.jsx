import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppLayout from './components/Layout/AppLayout';
import OverviewDashboard from './pages/OverviewDashboard';
import DetailedAnalysis from './pages/DetailedAnalysis';
import AnalysisArchive from './pages/AnalysisArchive';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<OverviewDashboard />} />
          <Route path="analysis" element={<DetailedAnalysis />} />
          <Route path="archive" element={<AnalysisArchive />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import { Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import PatientInfo from './pages/PatientInfo';
import Dashboard from './pages/Dashboard';
import DigitalTwin from './pages/DigitalTwin';
import LifestyleSimulator from './pages/LifestyleSimulator';
import DiseasePrediction from './pages/DiseasePrediction';
import TreatmentCost from './pages/TreatmentCost';
import HabitBuilder from './pages/HabitBuilder';
import Profile from './pages/Profile';
import DashboardLayout from './components/DashboardLayout';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/patient-info" element={<PatientInfo />} />
      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/digital-twin" element={<DigitalTwin />} />
        <Route path="/lifestyle-simulator" element={<LifestyleSimulator />} />
        <Route path="/disease-prediction" element={<DiseasePrediction />} />
        <Route path="/treatment-cost" element={<TreatmentCost />} />
        <Route path="/habit-builder" element={<HabitBuilder />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
    </Routes>
  );
}

export default App;

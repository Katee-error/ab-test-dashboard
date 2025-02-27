import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Dashboard } from '../pages/dashboard/Dashboard';
import { Results } from '../pages/result/Results';
import { Finalize } from '../pages/finalize/Finalize';

export const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/results/:testId" element={<Results />} />
      <Route path="/finalize/:testId" element={<Finalize />} />
    </Routes>
  </BrowserRouter>
);



import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { Dashboard } from '../pages/dashboard/Dashboard';
import { Results } from '../pages/result/Results';
import { Finalize } from '../pages/finalize/Finalize';
import { useEffect } from 'react';
import { UseGlobalKeyboardNavigation } from '../hooks/useGlobalKeyboardNavigation';

export const AppRoutes = () => (
  <BrowserRouter>
  <UseGlobalKeyboardNavigation /> 
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/results/:testId" element={<Results />} />
      <Route path="/finalize/:testId" element={<Finalize />} />
    </Routes>
  </BrowserRouter>
);



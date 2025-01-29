import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Module1Overview from './Module1Overview';
import DigitalCurrenciesSection from './DigitalCurrenciesSection';
import Module1Quiz from './Module1Quiz';
// Import other section components as they're created

const Module1Routes = () => {
  return (
    <Routes>
      <Route path="" element={<Module1Overview />} />
      <Route path="digital-currencies" element={<DigitalCurrenciesSection />} />
      <Route path="quiz" element={<Module1Quiz />} />
      {/* Add routes for other sections */}
    </Routes>
  );
};

export default Module1Routes;

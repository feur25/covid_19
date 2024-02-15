import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Document from './pages/Document';
import Positif from './pages/Positif';
import Prediction from './pages/Prediction';
import Home from './pages/Home';
import Job from './pages/Job';

function Routing() {
  return (
    <Routes>
      <Route path="/document" element={<Document />} />
      <Route path="/positif" element={<Positif />} />
      <Route path="/prediction" element={<Prediction />} />
      <Route path="/home" element={<Home />} />
      <Route path="/job" element={<Job />} />
      <Route path="/" element={<Navigate to="/home" />} />
    </Routes>
  );
}

export default Routing;

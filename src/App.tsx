import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HistoryData from './components/HistoryData';
import Dashboard from './Pages/Dashboard';
import HistoryPage from './Pages/HistoryPage';
import 'leaflet/dist/leaflet.css';
import MapOverview from './Pages/MapOverview';
import { DataProvider } from './components/DataContext';
// Simulate real-time data updates

function App() {
  return (
    <DataProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/history" element={<HistoryData />} />
          <Route path="/mapoverview" element={<MapOverview />} />
          <Route path="/historypage" element={<HistoryData />} />
        </Routes>
      </Router>
    </DataProvider>
  );
}

export default App;
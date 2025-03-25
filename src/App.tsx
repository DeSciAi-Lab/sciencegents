
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';

// Pages
import Index from './pages/Index';
import Dashboard from './pages/Dashboard';
import Explore from './pages/Explore';
import CreateScienceGent from './pages/CreateScienceGent';
import ScienceGentDetails from './pages/ScienceGentDetails';
import CreateCapability from './pages/CreateCapability';
import ExploreCapabilities from './pages/ExploreCapabilities';
import CapabilityDetails from './pages/CapabilityDetails';
import Admin from './pages/Admin';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/dashboard/:tab" element={<Dashboard />} />
      <Route path="/sciencegents" element={<Explore />} />
      <Route path="/explore" element={<Explore />} />
      <Route path="/sciencegent/:address" element={<ScienceGentDetails />} />
      <Route path="/create-sciencegent" element={<CreateScienceGent />} />
      <Route path="/capabilities" element={<ExploreCapabilities />} />
      <Route path="/capability/:id" element={<CapabilityDetails />} />
      <Route path="/create-capability" element={<CreateCapability />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;

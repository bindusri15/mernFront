import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Owner Pages
import OwnerLogin from './pages/owner/Login';
import OwnerDashboard from './pages/owner/Dashboard';
import PropertyForm from './pages/owner/PropertyForm';

// Tenant Pages
import PropertyList from './pages/tenant/PropertyList';
import PropertyDetail from './pages/tenant/PropertyDetail';
import QRCodePage from './pages/tenant/QRCodePage';  // Import the QRCodePage component

function App() {
  return (
    <Router>
      <Routes>
        {/* Owner Routes */}
        <Route path="/owner/login" element={<OwnerLogin />} />
        <Route path="/owner/dashboard" element={<OwnerDashboard />} />
        <Route path="/owner/property-form" element={<PropertyForm />} />

        {/* Tenant Routes */}
        <Route path="/" element={<PropertyList />} />
        <Route path="/property/:id" element={<PropertyDetail />} />

        {/* QR Code Route */}
        <Route path="/qr" element={<QRCodePage />} /> {/* Add this route */}
      </Routes>
    </Router>
  );
}

export default App;

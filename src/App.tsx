import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard';
import OCManagement from './pages/OCManagement';
import OCDetails from './pages/OCDetails';
import OCEdit from './pages/OCEdit';
import Features from './pages/Features';
import Settings from './pages/Settings';
import Login from './pages/Login';
import './styles/globals.css';
import './styles/components.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="ocs" element={<OCManagement />} />
          <Route path="ocs/:id" element={<OCDetails />} />
          <Route path="ocs/:id/edit" element={<OCEdit />} />
          <Route path="ocs/new" element={<OCEdit />} />
          <Route path="features" element={<Features />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
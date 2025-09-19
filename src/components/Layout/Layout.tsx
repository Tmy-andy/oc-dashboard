import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import { mockUser } from '../../data/mockData';

export const Layout: React.FC = () => {
  const handleLogout = () => {
    // TODO: Implement actual logout logic
    window.location.href = '/login';
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar user={mockUser} onLogout={handleLogout} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
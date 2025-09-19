import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User } from '../../types/user';

interface SidebarProps {
  user: User;
  onLogout: () => void;
}

interface NavItem {
  path: string;
  icon: string;
  label: string;
  badge?: number;
}

const navItems: NavItem[] = [
  { path: '/', icon: '🏠', label: 'Dashboard' },
  { path: '/ocs', icon: '👤', label: 'Nhân vật', badge: 3 },
  { path: '/features', icon: '🧩', label: 'Features' },
  { path: '/settings', icon: '⚙️', label: 'Cài đặt' }
];

export const Sidebar: React.FC<SidebarProps> = ({ user, onLogout }) => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleLogoutClick = () => {
    if (window.confirm('Bạn có chắc chắn muốn đăng xuất?')) {
      onLogout();
    }
  };

  return (
    <div className={`sidebar transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'}`}>
      {/* Header */}
      <div className="p-5 border-b border-gray-700">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
            OC
          </div>
          {!isCollapsed && (
            <div>
              <div className="font-bold text-white">OC Manager</div>
              <div className="text-xs text-gray-300">Character management</div>
            </div>
          )}
        </div>
      </div>

      {/* Current Property */}
      {!isCollapsed && (
        <div className="mx-4 mt-4 p-3 bg-gray-800 rounded-lg">
          <div className="text-xs text-gray-400">Current Property</div>
          <div className="text-sm font-medium text-white">My OC Collection</div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 mt-6">
        <div className="px-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-item mb-1 ${
                  isActive ? 'nav-item-active bg-blue-600' : 'nav-item-inactive hover:bg-gray-700'
                } ${isCollapsed ? 'justify-center px-2' : ''}`}
                title={isCollapsed ? item.label : undefined}
              >
                <span className="text-lg">{item.icon}</span>
                {!isCollapsed && (
                  <>
                    <span className="flex-1">{item.label}</span>
                    {item.badge && (
                      <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full min-w-[20px] text-center">
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Toggle Button */}
      <div className="p-4 border-t border-gray-700">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-full flex items-center justify-center text-gray-400 hover:text-white transition-colors"
        >
          <span className="text-lg">
            {isCollapsed ? '▶' : '◀'}
          </span>
        </button>
      </div>

      {/* User Account */}
      <div className="p-4 border-t border-gray-700">
        <div
          className={`flex items-center gap-3 cursor-pointer hover:bg-gray-700 p-2 rounded-lg transition-colors ${
            isCollapsed ? 'justify-center' : ''
          }`}
          onClick={handleLogoutClick}
        >
          <img
            src={user.avatar_url || 'https://i.pravatar.cc/100'}
            alt={user.name}
            className="w-9 h-9 rounded-full"
          />
          {!isCollapsed && (
            <div className="flex-1">
              <div className="text-sm font-medium text-white">{user.name}</div>
              <div className="text-xs text-red-400 flex items-center gap-1">
                <span>🚪</span>
                <span>Đăng xuất</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
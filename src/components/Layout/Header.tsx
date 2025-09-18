import React, { useState } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
  role: string;
}

interface HeaderProps {
  user: User;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout }) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Implement search functionality
      console.log('Searching for:', searchQuery);
    }
  };

  const handleLogout = () => {
    if (confirm('Bạn có chắc chắn muốn đăng xuất?')) {
      onLogout();
    }
  };

  return (
    <header className="header">
      <div className="header-left">
        <h1 className="page-title">OC Manager</h1>
        <div className="breadcrumb">Home / Dashboard</div>
      </div>
      
      <div className="header-right">
        <div className="search-box">
          <form onSubmit={handleSearch}>
            <i className="fas fa-search"></i>
            <input 
              type="text" 
              placeholder="Tìm kiếm OC..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
        </div>
        
        <button className="notification-btn">
          <i className="fas fa-bell"></i>
          <span className="notification-badge"></span>
        </button>
        
        <div className="user-menu-container" style={{ position: 'relative' }}>
          <div 
            className="user-menu" 
            onClick={() => setShowUserMenu(!showUserMenu)}
          >
            <div className="user-avatar">
              {user.avatar ? (
                <img 
                  src={user.avatar} 
                  alt={user.name}
                  style={{ width: '100%', height: '100%', borderRadius: '50%' }}
                />
              ) : (
                user.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
              )}
            </div>
            <div className="user-info">
              <div className="user-name">{user.name}</div>
              <div className="user-role">{user.role}</div>
            </div>
          </div>

          {showUserMenu && (
            <div className="user-dropdown">
              <div className="user-dropdown-item">
                <i className="fas fa-user"></i>
                <span>Profile</span>
              </div>
              <div className="user-dropdown-item">
                <i className="fas fa-cog"></i>
                <span>Settings</span>
              </div>
              <div className="user-dropdown-divider"></div>
              <div className="user-dropdown-item logout" onClick={handleLogout}>
                <i className="fas fa-sign-out-alt"></i>
                <span>Đăng xuất</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
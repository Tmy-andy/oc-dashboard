import React from 'react';

type Page = 'dashboard' | 'oc-details' | 'profile' | 'settings' | 'login';

interface SidebarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentPage, onNavigate }) => {
  const menuItems = [
    {
      section: 'Main',
      items: [
        {
          key: 'dashboard' as Page,
          icon: '🏠',
          label: 'Dashboard',
          badge: null
        }
      ]
    },
    {
      section: 'Management',
      items: [
        {
          key: 'profile' as Page,
          icon: '👤',
          label: 'Profile',
          badge: null
        },
        {
          key: 'settings' as Page,
          icon: '⚙️',
          label: 'Settings',
          badge: null
        }
      ]
    }
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="logo">
          <div className="logo-icon">
            <i className="fas fa-palette"></i>
          </div>
          <div className="logo-text">OC Manager</div>
        </div>
      </div>

      <nav className="nav-menu">
        {menuItems.map((section) => (
          <div key={section.section} className="nav-section">
            <div className="nav-section-title">{section.section}</div>
            {section.items.map((item) => (
              <div
                key={item.key}
                className={`nav-item ${currentPage === item.key ? 'active' : ''}`}
                onClick={() => onNavigate(item.key)}
              >
                <i>{item.icon}</i>
                <span>{item.label}</span>
                {item.badge && <span className="nav-badge">{item.badge}</span>}
              </div>
            ))}
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
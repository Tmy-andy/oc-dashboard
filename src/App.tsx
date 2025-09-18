import React, { useState, useEffect } from 'react';
import Dashboard from './pages/Dashboard';
import OCDetails from './pages/OCDetails';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Sidebar from './components/Layout/Sidebar';
import Header from './components/Layout/Header';
import './styles/global.css';

// Types
export interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
  role: string;
}

export interface Post {
  id: number;
  locale: string;
  title: string;
  content: string;
  status: 'published' | 'draft';
  updatedAt: string;
}

export interface Feature {
  id: number;
  name: string;
  category: string;
  icon: string;
  color: string;
  status: 'active' | 'inactive';
  posts: Post[];
}

export interface OC {
  id: number;
  name: string;
  image: string;
  category: string;
  status: 'active' | 'draft';
  createdAt: string;
  description: string;
  features: Feature[];
}

// Mock data
const mockUser: User = {
  id: 1,
  name: 'Nguyễn Văn A',
  email: 'nguyenvana@example.com',
  avatar: 'https://i.pravatar.cc/100?u=1',
  role: 'Creator'
};

const mockOCs: OC[] = [
  {
    id: 1,
    name: 'Akira Nakamura',
    image: 'https://picsum.photos/400/500?random=1',
    category: 'Anime Character',
    status: 'active',
    createdAt: '2024-01-15',
    description: 'A mysterious warrior from ancient Japan with extraordinary sword skills.',
    features: [
      {
        id: 1,
        name: 'Background Story',
        category: 'general',
        icon: 'fa-book',
        color: 'linear-gradient(135deg, #667eea, #764ba2)',
        status: 'active',
        posts: [
          {
            id: 1,
            locale: 'vi',
            title: 'Câu chuyện về Akira',
            content: '<p>Akira sinh ra trong một gia đình samurai...</p>',
            status: 'published',
            updatedAt: '2024-12-14'
          }
        ]
      },
      {
        id: 2,
        name: 'Combat Skills',
        category: 'abilities',
        icon: 'fa-sword',
        color: 'linear-gradient(135deg, #ef4444, #dc2626)',
        status: 'active',
        posts: []
      }
    ]
  },
  {
    id: 2,
    name: 'Luna Starweaver',
    image: 'https://picsum.photos/400/500?random=2',
    category: 'Fantasy Character',
    status: 'active',
    createdAt: '2024-02-10',
    description: 'A powerful mage who controls celestial magic and protects the realm.',
    features: [
      {
        id: 3,
        name: 'Magic Abilities',
        category: 'abilities',
        icon: 'fa-magic',
        color: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
        status: 'active',
        posts: []
      }
    ]
  },
  {
    id: 3,
    name: 'Rex Chrome',
    image: 'https://picsum.photos/400/500?random=3',
    category: 'Cyberpunk Character',
    status: 'draft',
    createdAt: '2024-03-01',
    description: 'A cybernetic enhanced detective in Neo Tokyo 2087.',
    features: []
  }
];

type Page = 'dashboard' | 'oc-details' | 'profile' | 'settings' | 'login';

interface AppProps {}

const App: React.FC<AppProps> = () => {
  const [currentPage, setCurrentPage] = useState<Page>('login');
  const [user, setUser] = useState<User | null>(null);
  const [ocs, setOCs] = useState<OC[]>(mockOCs);
  const [selectedOC, setSelectedOC] = useState<OC | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate auth check
    const savedUser = localStorage.getItem('oc_manager_user');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
        setCurrentPage('dashboard');
      } catch (error) {
        localStorage.removeItem('oc_manager_user');
      }
    }
    setIsLoading(false);
  }, []);

  const handleLogin = (userData: User) => {
    setUser(userData);
    localStorage.setItem('oc_manager_user', JSON.stringify(userData));
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('oc_manager_user');
    setCurrentPage('login');
    setSelectedOC(null);
  };

  const navigateTo = (page: Page, ocId?: number) => {
    if (ocId) {
      const oc = ocs.find(oc => oc.id === ocId);
      if (oc) {
        setSelectedOC(oc);
        setCurrentPage('oc-details');
        return;
      }
    }
    setCurrentPage(page);
  };

  const updateOC = (ocId: number, updates: Partial<OC>) => {
    setOCs(prev => prev.map(oc => 
      oc.id === ocId ? { ...oc, ...updates } : oc
    ));
    
    // Update selectedOC if it's the current one
    if (selectedOC && selectedOC.id === ocId) {
      setSelectedOC(prev => prev ? { ...prev, ...updates } : null);
    }
  };

  const deleteOC = (ocId: number) => {
    setOCs(prev => prev.filter(oc => oc.id !== ocId));
    if (selectedOC && selectedOC.id === ocId) {
      setSelectedOC(null);
      setCurrentPage('dashboard');
    }
  };

  const addOC = (newOC: Omit<OC, 'id'>) => {
    const id = Math.max(...ocs.map(oc => oc.id)) + 1;
    const ocWithId = { ...newOC, id };
    setOCs(prev => [...prev, ocWithId]);
  };

  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  if (currentPage === 'login' || !user) {
    return <Login onLogin={handleLogin} />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return (
          <Dashboard 
            user={user} 
            ocs={ocs} 
            onNavigate={navigateTo}
            onUpdateOC={updateOC}
            onDeleteOC={deleteOC}
            onAddOC={addOC}
          />
        );
      case 'oc-details':
        return selectedOC ? (
          <OCDetails 
            oc={selectedOC}
            onUpdateOC={updateOC}
            onBack={() => navigateTo('dashboard')}
          />
        ) : (
          <Dashboard 
            user={user} 
            ocs={ocs} 
            onNavigate={navigateTo}
            onUpdateOC={updateOC}
            onDeleteOC={deleteOC}
            onAddOC={addOC}
          />
        );
      case 'profile':
        return <Profile user={user} onNavigate={navigateTo} />;
      case 'settings':
        return <Settings onNavigate={navigateTo} />;
      default:
        return (
          <Dashboard 
            user={user} 
            ocs={ocs} 
            onNavigate={navigateTo}
            onUpdateOC={updateOC}
            onDeleteOC={deleteOC}
            onAddOC={addOC}
          />
        );
    }
  };

  return (
    <div className="layout">
      <Sidebar currentPage={currentPage} onNavigate={navigateTo} />
      <div className="main">
        <Header user={user} onLogout={handleLogout} />
        <div className="content">
          {renderPage()}
        </div>
      </div>
    </div>
  );
};

export default App;
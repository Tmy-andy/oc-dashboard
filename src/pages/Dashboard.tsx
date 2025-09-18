import React, { useState } from 'react';
import Modal from '../components/Modal';

interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
  role: string;
}

interface OC {
  id: number;
  name: string;
  image: string;
  category: string;
  status: 'active' | 'draft';
  createdAt: string;
  description: string;
  features: any[];
}

interface DashboardProps {
  user: User;
  ocs: OC[];
  onNavigate: (page: string, ocId?: number) => void;
  onUpdateOC: (ocId: number, updates: Partial<OC>) => void;
  onDeleteOC: (ocId: number) => void;
  onAddOC: (newOC: Omit<OC, 'id'>) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ 
  user, 
  ocs, 
  onNavigate, 
  onUpdateOC, 
  onDeleteOC,
  onAddOC 
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedOC, setSelectedOC] = useState<OC | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    image: '',
    status: 'active' as 'active' | 'draft'
  });

  const filteredOCs = ocs.filter(oc => {
    const matchesSearch = oc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         oc.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || oc.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleAddOC = () => {
    if (!formData.name.trim()) return;

    const newOC = {
      name: formData.name,
      category: formData.category || 'General',
      description: formData.description,
      image: formData.image || `https://picsum.photos/400/500?random=${Date.now()}`,
      status: formData.status,
      createdAt: new Date().toISOString().split('T')[0],
      features: []
    };

    onAddOC(newOC);
    setShowAddModal(false);
    resetForm();
  };

  const handleDeleteOC = () => {
    if (selectedOC) {
      onDeleteOC(selectedOC.id);
      setShowDeleteModal(false);
      setSelectedOC(null);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      category: '',
      description: '',
      image: '',
      status: 'active'
    });
  };

  const openDeleteModal = (oc: OC, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedOC(oc);
    setShowDeleteModal(true);
  };

  const getStatusBadgeClass = (status: string) => {
    return status === 'active' ? 'status-active' : 'status-draft';
  };

  return (
    <>
      {/* Welcome Section */}
      <section className="welcome-section">
        <div className="welcome-content">
          <h2 className="welcome-title">Chào mừng trở lại, {user.name}! 👋</h2>
          <p className="welcome-subtitle">Quản lý và phát triển các nhân vật OC của bạn tại đây.</p>
          <div className="quick-actions">
            <button 
              className="btn-primary"
              onClick={() => setShowAddModal(true)}
            >
              <i className="fas fa-plus"></i>
              Thêm OC mới
            </button>
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <div className="search-filter-section">
        <div className="search-bar">
          <input
            type="text"
            className="search-input"
            placeholder="Tìm kiếm OC..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select
            className="filter-select"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="active">Đang hoạt động</option>
            <option value="draft">Nháp</option>
          </select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#3b82f6' }}>
            <i className="fas fa-users"></i>
          </div>
          <div className="stat-content">
            <div className="stat-number">{ocs.length}</div>
            <div className="stat-label">Tổng số OC</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#10b981' }}>
            <i className="fas fa-check-circle"></i>
          </div>
          <div className="stat-content">
            <div className="stat-number">{ocs.filter(oc => oc.status === 'active').length}</div>
            <div className="stat-label">OC hoàn thành</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#f59e0b' }}>
            <i className="fas fa-edit"></i>
          </div>
          <div className="stat-content">
            <div className="stat-number">{ocs.filter(oc => oc.status === 'draft').length}</div>
            <div className="stat-label">OC đang tạo</div>
          </div>
        </div>
      </div>

      {/* OC Grid */}
      <section className="oc-section">
        <h2>Danh sách OC của bạn</h2>
        {filteredOCs.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">
              <i className="fas fa-user-plus"></i>
            </div>
            <h3>Chưa có OC nào</h3>
            <p>Hãy tạo OC đầu tiên của bạn!</p>
            <button 
              className="btn-primary"
              onClick={() => setShowAddModal(true)}
            >
              <i className="fas fa-plus"></i>
              Tạo OC mới
            </button>
          </div>
        ) : (
          <div className="oc-grid">
            {filteredOCs.map((oc) => (
              <div
                key={oc.id}
                className="oc-card"
                onClick={() => onNavigate('oc-details', oc.id)}
              >
                <div className="oc-card-image-container">
                  <img src={oc.image} alt={oc.name} className="oc-card-image" />
                  <div className="oc-card-actions">
                    <button
                      className="action-btn delete-btn"
                      onClick={(e) => openDeleteModal(oc, e)}
                      title="Xóa OC"
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </div>
                <div className="oc-card-content">
                  <div className="oc-card-header">
                    <h3 className="oc-card-name">{oc.name}</h3>
                    <span className={`status-badge ${getStatusBadgeClass(oc.status)}`}>
                      {oc.status === 'active' ? 'Hoàn thành' : 'Nháp'}
                    </span>
                  </div>
                  <div className="oc-card-category">{oc.category}</div>
                  <p className="oc-card-description">{oc.description}</p>
                  <div className="oc-card-meta">
                    <span>Tạo: {new Date(oc.createdAt).toLocaleDateString('vi-VN')}</span>
                    <span>{oc.features.length} tính năng</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Add OC Modal */}
      {showAddModal && (
        <Modal
          title="Thêm OC mới"
          onClose={() => {
            setShowAddModal(false);
            resetForm();
          }}
        >
          <form onSubmit={(e) => { e.preventDefault(); handleAddOC(); }}>
            <div className="form-group">
              <label className="form-label">Tên OC *</label>
              <input
                type="text"
                className="form-input"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="Nhập tên nhân vật"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Danh mục</label>
              <input
                type="text"
                className="form-input"
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                placeholder="VD: Anime Character, Fantasy Character..."
              />
            </div>

            <div className="form-group">
              <label className="form-label">Mô tả</label>
              <textarea
                className="form-textarea"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Mô tả ngắn về nhân vật"
                rows={3}
              />
            </div>

            <div className="form-group">
              <label className="form-label">URL ảnh</label>
              <input
                type="url"
                className="form-input"
                value={formData.image}
                onChange={(e) => setFormData({...formData, image: e.target.value})}
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Trạng thái</label>
              <select
                className="form-select"
                value={formData.status}
                onChange={(e) => setFormData({...formData, status: e.target.value as 'active' | 'draft'})}
              >
                <option value="draft">Nháp</option>
                <option value="active">Hoàn thành</option>
              </select>
            </div>

            <div className="modal-actions">
              <button type="button" className="btn-cancel" onClick={() => setShowAddModal(false)}>
                Hủy
              </button>
              <button type="submit" className="btn-primary">
                <i className="fas fa-plus"></i>
                Tạo OC
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedOC && (
        <Modal
          title="Xác nhận xóa"
          onClose={() => {
            setShowDeleteModal(false);
            setSelectedOC(null);
          }}
        >
          <p>Bạn có chắc chắn muốn xóa OC "{selectedOC.name}" không?</p>
          <p className="warning-text">Hành động này không thể hoàn tác.</p>
          
          <div className="modal-actions">
            <button 
              className="btn-cancel" 
              onClick={() => setShowDeleteModal(false)}
            >
              Hủy
            </button>
            <button 
              className="btn-danger" 
              onClick={handleDeleteOC}
            >
              <i className="fas fa-trash"></i>
              Xóa
            </button>
          </div>
        </Modal>
      )}
    </>
  );
};

export default Dashboard;
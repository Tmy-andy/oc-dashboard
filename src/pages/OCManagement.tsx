import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockOCs, mockUser } from '../data/mockData';
import { OC } from '../types/oc';
import Header from '../components/Layout/Header';
import OCGrid from '../components/OC/OCGrid';
import Button from '../components/UI/Button';
import { Input, Select } from '../components/UI/Input';

export const OCManagement: React.FC = () => {
  const navigate = useNavigate();
  const [ocs, setOcs] = useState<OC[]>(mockOCs);
  const [filteredOcs, setFilteredOcs] = useState<OC[]>(mockOCs);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [genderFilter, setGenderFilter] = useState('');

  // Filter OCs based on search and filters
  React.useEffect(() => {
    let filtered = [...ocs];

    // Search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(oc => 
        oc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        oc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        oc.metadata?.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Status filter
    if (statusFilter) {
      filtered = filtered.filter(oc => oc.status === statusFilter);
    }

    // Gender filter
    if (genderFilter) {
      filtered = filtered.filter(oc => oc.gender === genderFilter);
    }

    setFilteredOcs(filtered);
  }, [ocs, searchQuery, statusFilter, genderFilter]);

  const handleEditOC = (oc: OC) => {
    navigate(`/ocs/${oc.id}/edit`);
  };

  const handleViewOC = (oc: OC) => {
    navigate(`/ocs/${oc.id}`);
  };

  const handleDeleteOC = (oc: OC) => {
    setOcs(prevOcs => prevOcs.filter(o => o.id !== oc.id));
  };

  const handleCreateOC = () => {
    navigate('/ocs/new');
  };

  const statusOptions = [
    { value: '', label: 'Tất cả trạng thái' },
    { value: 'active', label: 'Hoạt động' },
    { value: 'inactive', label: 'Không hoạt động' },
    { value: 'draft', label: 'Bản nháp' }
  ];

  const genderOptions = [
    { value: '', label: 'Tất cả giới tính' },
    { value: 'Male', label: 'Nam' },
    { value: 'Female', label: 'Nữ' },
    { value: 'Other', label: 'Khác' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        title="Quản lý OC"
        subtitle={`${filteredOcs.length} nhân vật được tìm thấy`}
        user={mockUser}
        actions={
          <Button onClick={handleCreateOC}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Tạo OC mới
          </Button>
        }
      />

      <div className="p-6">
        {/* Filters */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Input
              placeholder="Tìm kiếm OC..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              }
            />
            
            <Select
              options={statusOptions}
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            />
            
            <Select
              options={genderOptions}
              value={genderFilter}
              onChange={(e) => setGenderFilter(e.target.value)}
            />

            <Button
              variant="secondary"
              onClick={() => {
                setSearchQuery('');
                setStatusFilter('');
                setGenderFilter('');
              }}
              className="w-full"
            >
              Xóa bộ lọc
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="text-2xl font-bold text-blue-600">{ocs.length}</div>
            <div className="text-sm text-gray-600">Tổng số OC</div>
          </div>
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="text-2xl font-bold text-green-600">
              {ocs.filter(oc => oc.status === 'active').length}
            </div>
            <div className="text-sm text-gray-600">Đang hoạt động</div>
          </div>
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="text-2xl font-bold text-yellow-600">
              {ocs.filter(oc => oc.status === 'draft').length}
            </div>
            <div className="text-sm text-gray-600">Bản nháp</div>
          </div>
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="text-2xl font-bold text-purple-600">
              {ocs.filter(oc => oc.features && oc.features.length > 0).length}
            </div>
            <div className="text-sm text-gray-600">Có Features</div>
          </div>
        </div>

        {/* OC Grid */}
        <OCGrid
          ocs={filteredOcs}
          onEdit={handleEditOC}
          onView={handleViewOC}
          onDelete={handleDeleteOC}
          emptyMessage="Không tìm thấy OC nào phù hợp với bộ lọc"
        />
      </div>
    </div>
  );
};

export default OCManagement;
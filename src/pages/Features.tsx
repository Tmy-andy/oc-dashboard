import React, { useState } from 'react';
import { mockFeatures, mockOCs, mockUser } from '../data/mockData';
import { OCFeature } from '../types/oc';
import Header from '../components/Layout/Header';
import FeatureCard from '../components/OC/FeatureCard';
import Button from '../components/UI/Button';
import { Input, Select } from '../components/UI/Input';

export const Features: React.FC = () => {
  const [features, setFeatures] = useState<OCFeature[]>(mockFeatures);
  const [filteredFeatures, setFilteredFeatures] = useState<OCFeature[]>(mockFeatures);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [ocFilter, setOcFilter] = useState('');
  const [expandedFeatures, setExpandedFeatures] = useState<Set<string>>(new Set());

  React.useEffect(() => {
    let filtered = [...features];

    if (searchQuery.trim()) {
      filtered = filtered.filter(feature => 
        feature.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        feature.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (statusFilter) {
      filtered = filtered.filter(feature => feature.status === statusFilter);
    }

    if (ocFilter) {
      filtered = filtered.filter(feature => feature.oc_id === ocFilter);
    }

    setFilteredFeatures(filtered);
  }, [features, searchQuery, statusFilter, ocFilter]);

  const toggleFeature = (featureId: string) => {
    const newExpanded = new Set(expandedFeatures);
    if (newExpanded.has(featureId)) {
      newExpanded.delete(featureId);
    } else {
      newExpanded.add(featureId);
    }
    setExpandedFeatures(newExpanded);
  };

  const handleAddFeature = () => {
    console.log('Add new feature');
  };

  const statusOptions = [
    { value: '', label: 'Tất cả trạng thái' },
    { value: 'active', label: 'Hoạt động' },
    { value: 'inactive', label: 'Không hoạt động' }
  ];

  const ocOptions = [
    { value: '', label: 'Tất cả OC' },
    ...mockOCs.map(oc => ({ value: oc.id, label: oc.name }))
  ];

  const getOCName = (ocId: string) => {
    return mockOCs.find(oc => oc.id === ocId)?.name || 'Unknown';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        title="Features Management"
        subtitle={`${filteredFeatures.length} features được tìm thấy`}
        user={mockUser}
        actions={
          <Button onClick={handleAddFeature}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Thêm Feature
          </Button>
        }
      />

      <div className="p-6">
        {/* Filters */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Input
              placeholder="Tìm kiếm features..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              }
            />
            
            <Select
              options={ocOptions}
              value={ocFilter}
              onChange={(e) => setOcFilter(e.target.value)}
            />
            
            <Select
              options={statusOptions}
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            />

            <Button
              variant="secondary"
              onClick={() => {
                setSearchQuery('');
                setStatusFilter('');
                setOcFilter('');
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
            <div className="text-2xl font-bold text-purple-600">{features.length}</div>
            <div className="text-sm text-gray-600">Tổng Features</div>
          </div>
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="text-2xl font-bold text-green-600">
              {features.filter(f => f.status === 'active').length}
            </div>
            <div className="text-sm text-gray-600">Đang hoạt động</div>
          </div>
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="text-2xl font-bold text-blue-600">
              {new Set(features.map(f => f.oc_id)).size}
            </div>
            <div className="text-sm text-gray-600">OC có Features</div>
          </div>
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="text-2xl font-bold text-orange-600">
              {Math.round(features.length / mockOCs.length * 10) / 10}
            </div>
            <div className="text-sm text-gray-600">Features/OC trung bình</div>
          </div>
        </div>

        {/* Features List */}
        {filteredFeatures.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Không tìm thấy feature nào</h3>
            <p className="text-gray-500 mb-4">Thử thay đổi bộ lọc hoặc tạo feature mới</p>
            <Button onClick={handleAddFeature}>Tạo feature mới</Button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredFeatures.map((feature) => (
              <div key={feature.id} className="relative">
                {/* OC Label */}
                <div className="mb-2">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    OC: {getOCName(feature.oc_id)}
                  </span>
                </div>
                
                <FeatureCard
                  feature={feature}
                  expanded={expandedFeatures.has(feature.id)}
                  onToggle={() => toggleFeature(feature.id)}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Features;
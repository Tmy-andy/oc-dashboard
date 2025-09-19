import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockOCs, mockFeatures, mockUser } from '../data/mockData';
import { OCFeature } from '../types/oc';
import Header from '../components/Layout/Header';
import Button from '../components/UI/Button';
import Card from '../components/UI/Card';
import FeatureCard from '../components/OC/FeatureCard';

export const OCDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [expandedFeatures, setExpandedFeatures] = useState<Set<string>>(new Set());

  const oc = mockOCs.find(o => o.id === id);
  const features = mockFeatures.filter(f => f.oc_id === id);

  if (!oc) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Không tìm thấy OC</h2>
          <Button onClick={() => navigate('/ocs')}>Quay lại danh sách</Button>
        </div>
      </div>
    );
  }

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
    // TODO: Implement add feature functionality
    console.log('Add feature for OC:', oc.id);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        title={oc.name}
        subtitle={`${oc.age} tuổi • ${oc.gender}`}
        user={mockUser}
        actions={
          <div className="flex gap-2">
            <Button
              variant="secondary"
              onClick={() => navigate(`/ocs/${oc.id}/edit`)}
              icon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              }
            >
              Chỉnh sửa
            </Button>
            <Button onClick={handleAddFeature}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Thêm Feature
            </Button>
          </div>
        }
      />

      <div className="p-6 space-y-6">
        {/* OC Profile */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Avatar & Info */}
          <div className="lg:col-span-1">
            <Card className="text-center">
              <img
                src={oc.avatar_url}
                alt={oc.name}
                className="w-full h-80 object-cover rounded-lg mb-4"
              />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{oc.name}</h2>
              <div className="flex items-center justify-center gap-4 text-gray-600 mb-4">
                <span>{oc.age} tuổi</span>
                <span>•</span>
                <span>{oc.gender}</span>
              </div>
              <div className="flex justify-center mb-4">
                <span className={`badge ${
                  oc.status === 'active' ? 'badge-success' : 
                  oc.status === 'draft' ? 'badge-warning' : 'badge-gray'
                }`}>
                  {oc.status === 'active' ? 'Hoạt động' :
                   oc.status === 'draft' ? 'Bản nháp' : 'Không hoạt động'}
                </span>
              </div>
              
              {/* Tags */}
              {oc.metadata?.tags && (
                <div className="flex flex-wrap gap-2 justify-center">
                  {oc.metadata.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </Card>
          </div>

          {/* Description */}
          <div className="lg:col-span-2">
            <Card>
              <div className="border-b border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-gray-900">Mô tả</h3>
              </div>
              <div className="p-6">
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {oc.description}
                </p>
              </div>
            </Card>
          </div>
        </div>

        {/* Features Section */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Features & Posts</h2>
              <p className="text-gray-600">Quản lý features và chỉnh sửa nội dung trực tiếp</p>
            </div>
          </div>

          {features.length === 0 ? (
            <Card className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Chưa có feature nào</h3>
              <p className="text-gray-500 mb-4">Tạo feature đầu tiên để bắt đầu xây dựng profile cho OC này</p>
              <Button onClick={handleAddFeature}>Tạo feature đầu tiên</Button>
            </Card>
          ) : (
            <div className="space-y-4">
              {features.map((feature) => (
                <FeatureCard
                  key={feature.id}
                  feature={feature}
                  expanded={expandedFeatures.has(feature.id)}
                  onToggle={() => toggleFeature(feature.id)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Meta Information */}
        <Card>
          <div className="border-b border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900">Thông tin</h3>
          </div>
          <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-gray-500">Ngày tạo:</span>
              <div className="font-medium">
                {new Date(oc.created_at).toLocaleDateString('vi-VN')}
              </div>
            </div>
            <div>
              <span className="text-gray-500">Cập nhật:</span>
              <div className="font-medium">
                {new Date(oc.updated_at).toLocaleDateString('vi-VN')}
              </div>
            </div>
            <div>
              <span className="text-gray-500">Số Features:</span>
              <div className="font-medium">{features.length}</div>
            </div>
            <div>
              <span className="text-gray-500">Danh mục:</span>
              <div className="font-medium capitalize">
                {oc.metadata?.category || 'Chưa phân loại'}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default OCDetails;
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockOCs, mockUser } from '../data/mockData';
import { OCFormData } from '../types/oc';
import Header from '../components/Layout/Header';
import Button from '../components/UI/Button';
import { Input, Textarea, Select } from '../components/UI/Input';
import Card from '../components/UI/Card';

export const OCEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  
  const existingOC = isEdit ? mockOCs.find(oc => oc.id === id) : null;
  
  const [formData, setFormData] = useState<OCFormData>({
    name: existingOC?.name || '',
    age: existingOC?.age || '',
    gender: existingOC?.gender || 'Male',
    description: existingOC?.description || '',
    avatar_url: existingOC?.avatar_url || '',
    banner_url: existingOC?.banner_url || '',
    status: existingOC?.status || 'draft',
    metadata: {
      tags: existingOC?.metadata?.tags || [],
      category: existingOC?.metadata?.category || 'main',
      source: existingOC?.metadata?.source || ''
    }
  });

  const [errors, setErrors] = useState<Partial<OCFormData>>({});
  const [loading, setLoading] = useState(false);
  const [tagInput, setTagInput] = useState('');

  const genderOptions = [
    { value: 'Male', label: 'Nam' },
    { value: 'Female', label: 'Nữ' },
    { value: 'Other', label: 'Khác' }
  ];

  const statusOptions = [
    { value: 'active', label: 'Hoạt động' },
    { value: 'inactive', label: 'Không hoạt động' },
    { value: 'draft', label: 'Bản nháp' }
  ];

  const categoryOptions = [
    { value: 'main', label: 'Nhân vật chính' },
    { value: 'supporting', label: 'Nhân vật phụ' },
    { value: 'antagonist', label: 'Phản diện' },
    { value: 'other', label: 'Khác' }
  ];

  const validateForm = (): boolean => {
    const newErrors: Partial<OCFormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Tên không được để trống';
    }

    if (!formData.age.trim()) {
      newErrors.age = 'Tuổi không được để trống';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Mô tả không được để trống';
    }

    if (!formData.avatar_url.trim()) {
      newErrors.avatar_url = 'URL avatar không được để trống';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    
    try {
      // TODO: Implement actual API call
      console.log('Saving OC:', formData);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      navigate(isEdit ? `/ocs/${id}` : '/ocs');
    } catch (error) {
      console.error('Error saving OC:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (isEdit) {
      navigate(`/ocs/${id}`);
    } else {
      navigate('/ocs');
    }
  };

  const handleInputChange = (field: keyof OCFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  const handleMetadataChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      metadata: {
        ...prev.metadata,
        [field]: value
      }
    }));
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.metadata?.tags?.includes(tagInput.trim())) {
      handleMetadataChange('tags', [...(formData.metadata?.tags || []), tagInput.trim()]);
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    handleMetadataChange('tags', formData.metadata?.tags?.filter(tag => tag !== tagToRemove) || []);
  };

  const handleTagKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        title={isEdit ? `Chỉnh sửa ${existingOC?.name}` : 'Tạo OC mới'}
        subtitle={isEdit ? 'Cập nhật thông tin nhân vật' : 'Thêm nhân vật mới vào bộ sưu tập'}
        user={mockUser}
      />

      <div className="p-6">
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-6">
          {/* Basic Information */}
          <Card>
            <div className="border-b border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900">Thông tin cơ bản</h3>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Tên nhân vật *"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  error={errors.name}
                  placeholder="Nhập tên nhân vật"
                />
                <Input
                  label="Tuổi *"
                  value={formData.age}
                  onChange={(e) => handleInputChange('age', e.target.value)}
                  error={errors.age}
                  placeholder="Nhập tuổi"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Select
                  label="Giới tính"
                  options={genderOptions}
                  value={formData.gender}
                  onChange={(e) => handleInputChange('gender', e.target.value)}
                />
                <Select
                  label="Trạng thái"
                  options={statusOptions}
                  value={formData.status}
                  onChange={(e) => handleInputChange('status', e.target.value)}
                />
              </div>

              <Textarea
                label="Mô tả *"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                error={errors.description}
                placeholder="Mô tả về nhân vật này..."
                rows={5}
              />
            </div>
          </Card>

          {/* Media */}
          <Card>
            <div className="border-b border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900">Hình ảnh</h3>
            </div>
            <div className="p-6 space-y-4">
              <Input
                label="URL Avatar *"
                value={formData.avatar_url}
                onChange={(e) => handleInputChange('avatar_url', e.target.value)}
                error={errors.avatar_url}
                placeholder="https://example.com/avatar.jpg"
              />
              <Input
                label="URL Banner (tùy chọn)"
                value={formData.banner_url || ''}
                onChange={(e) => handleInputChange('banner_url', e.target.value)}
                placeholder="https://example.com/banner.jpg"
              />
              
              {/* Preview */}
              {formData.avatar_url && (
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Preview</label>
                  <img
                    src={formData.avatar_url}
                    alt="Avatar preview"
                    className="w-32 h-32 object-cover rounded-lg border border-gray-200"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                </div>
              )}
            </div>
          </Card>

          {/* Metadata */}
          <Card>
            <div className="border-b border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900">Thông tin bổ sung</h3>
            </div>
            <div className="p-6 space-y-4">
              <Select
                label="Danh mục"
                options={categoryOptions}
                value={formData.metadata?.category || 'main'}
                onChange={(e) => handleMetadataChange('category', e.target.value)}
              />

              <Input
                label="Nguồn (tùy chọn)"
                value={formData.metadata?.source || ''}
                onChange={(e) => handleMetadataChange('source', e.target.value)}
                placeholder="Tên file hoặc nguồn gốc"
              />

              {/* Tags */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
                <div className="flex gap-2 mb-2">
                  <Input
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={handleTagKeyPress}
                    placeholder="Nhập tag và nhấn Enter"
                    className="flex-1"
                  />
                  <Button type="button" onClick={addTag} size="sm">
                    Thêm
                  </Button>
                </div>
                
                {formData.metadata?.tags && formData.metadata.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {formData.metadata.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="hover:text-blue-600"
                        >
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </Card>

          {/* Actions */}
          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="secondary"
              onClick={handleCancel}
              disabled={loading}
            >
              Hủy
            </Button>
            <Button
              type="submit"
              loading={loading}
            >
              {isEdit ? 'Cập nhật' : 'Tạo mới'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OCEdit;
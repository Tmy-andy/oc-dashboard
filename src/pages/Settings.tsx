import React, { useState } from 'react';
import { mockUser } from '../data/mockData';
import Header from '../components/Layout/Header';
import Button from '../components/UI/Button';
import { Input, Select, Textarea } from '../components/UI/Input';
import Card from '../components/UI/Card';

export const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [profileData, setProfileData] = useState({
    name: mockUser.name,
    email: mockUser.email,
    avatar_url: mockUser.avatar_url || '',
    bio: 'Tôi là một người yêu thích tạo và phát triển nhân vật OC.'
  });

  const [preferences, setPreferences] = useState({
    theme: 'light',
    language: 'vi',
    notifications: true,
    autoSave: true
  });

  const [loading, setLoading] = useState(false);

  const tabs = [
    { id: 'profile', label: 'Hồ sơ', icon: '👤' },
    { id: 'preferences', label: 'Tùy chọn', icon: '⚙️' },
    { id: 'security', label: 'Bảo mật', icon: '🔒' },
    { id: 'export', label: 'Xuất dữ liệu', icon: '📤' }
  ];

  const themeOptions = [
    { value: 'light', label: 'Sáng' },
    { value: 'dark', label: 'Tối' },
    { value: 'auto', label: 'Tự động' }
  ];

  const languageOptions = [
    { value: 'vi', label: 'Tiếng Việt' },
    { value: 'en', label: 'English' },
    { value: 'ja', label: '日本語' }
  ];

  const handleSaveProfile = async () => {
    setLoading(true);
    try {
      console.log('Saving profile:', profileData);
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('Cập nhật hồ sơ thành công!');
    } catch (error) {
      console.error('Error saving profile:', error);
      alert('Có lỗi xảy ra khi lưu hồ sơ');
    } finally {
      setLoading(false);
    }
  };

  const handleSavePreferences = async () => {
    setLoading(true);
    try {
      console.log('Saving preferences:', preferences);
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('Cập nhật tùy chọn thành công!');
    } catch (error) {
      console.error('Error saving preferences:', error);
      alert('Có lỗi xảy ra khi lưu tùy chọn');
    } finally {
      setLoading(false);
    }
  };

  const handleExportData = () => {
    const dataToExport = {
      profile: profileData,
      preferences,
      exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(dataToExport, null, 2)], { 
      type: 'application/json' 
    });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `oc-manager-data-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <Card>
            <div className="border-b border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900">Thông tin cá nhân</h3>
              <p className="text-gray-600 mt-1">Cập nhật thông tin hồ sơ của bạn</p>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-6 mb-6">
                <img
                  src={profileData.avatar_url || 'https://i.pravatar.cc/100'}
                  alt="Avatar"
                  className="w-20 h-20 rounded-full object-cover border-4 border-gray-200"
                />
                <div>
                  <h4 className="font-medium text-gray-900">Ảnh đại diện</h4>
                  <p className="text-sm text-gray-600 mb-2">JPG, PNG tối đa 2MB</p>
                  <Button size="sm" variant="secondary">Thay đổi ảnh</Button>
                </div>
              </div>

              <Input
                label="Tên hiển thị"
                value={profileData.name}
                onChange={(e) => setProfileData({...profileData, name: e.target.value})}
              />

              <Input
                label="Email"
                type="email"
                value={profileData.email}
                onChange={(e) => setProfileData({...profileData, email: e.target.value})}
              />

              <Input
                label="URL Avatar"
                value={profileData.avatar_url}
                onChange={(e) => setProfileData({...profileData, avatar_url: e.target.value})}
                placeholder="https://example.com/avatar.jpg"
              />

              <Textarea
                label="Giới thiệu bản thân"
                value={profileData.bio}
                onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                rows={3}
                placeholder="Viết vài dòng về bản thân..."
              />

              <div className="pt-4">
                <Button onClick={handleSaveProfile} loading={loading}>
                  Lưu thay đổi
                </Button>
              </div>
            </div>
          </Card>
        );

      case 'preferences':
        return (
          <Card>
            <div className="border-b border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900">Tùy chọn</h3>
              <p className="text-gray-600 mt-1">Tùy chỉnh trải nghiệm sử dụng của bạn</p>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Select
                  label="Giao diện"
                  options={themeOptions}
                  value={preferences.theme}
                  onChange={(e) => setPreferences({...preferences, theme: e.target.value})}
                />
                <Select
                  label="Ngôn ngữ"
                  options={languageOptions}
                  value={preferences.language}
                  onChange={(e) => setPreferences({...preferences, language: e.target.value})}
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">Thông báo</h4>
                    <p className="text-sm text-gray-600">Nhận thông báo về hoạt động và cập nhật</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.notifications}
                      onChange={(e) => setPreferences({...preferences, notifications: e.target.checked})}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">Tự động lưu</h4>
                    <p className="text-sm text-gray-600">Tự động lưu thay đổi khi chỉnh sửa</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.autoSave}
                      onChange={(e) => setPreferences({...preferences, autoSave: e.target.checked})}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>

              <div className="pt-4">
                <Button onClick={handleSavePreferences} loading={loading}>
                  Lưu tùy chọn
                </Button>
              </div>
            </div>
          </Card>
        );

      case 'security':
        return (
          <Card>
            <div className="border-b border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900">Bảo mật</h3>
              <p className="text-gray-600 mt-1">Quản lý mật khẩu và bảo mật tài khoản</p>
            </div>
            <div className="p-6 space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm">
                    🔒
                  </div>
                  <div>
                    <h4 className="font-medium text-blue-900">Tài khoản được bảo mật</h4>
                    <p className="text-sm text-blue-700">Lần đăng nhập cuối: Hôm nay lúc 09:30</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <Input
                  label="Mật khẩu hiện tại"
                  type="password"
                  placeholder="Nhập mật khẩu hiện tại"
                />
                <Input
                  label="Mật khẩu mới"
                  type="password"
                  placeholder="Nhập mật khẩu mới"
                />
                <Input
                  label="Xác nhận mật khẩu mới"
                  type="password"
                  placeholder="Nhập lại mật khẩu mới"
                />
              </div>

              <div className="pt-4">
                <Button>Đổi mật khẩu</Button>
              </div>
            </div>
          </Card>
        );

      case 'export':
        return (
          <Card>
            <div className="border-b border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900">Xuất dữ liệu</h3>
              <p className="text-gray-600 mt-1">Sao lưu và xuất dữ liệu của bạn</p>
            </div>
            <div className="p-6 space-y-6">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white text-sm">
                    ⚠️
                  </div>
                  <div>
                    <h4 className="font-medium text-yellow-900">Lưu ý quan trọng</h4>
                    <p className="text-sm text-yellow-700 mt-1">
                      Dữ liệu xuất sẽ bao gồm tất cả thông tin cá nhân, OC và settings của bạn. 
                      Hãy bảo mật file này cẩn thận.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Xuất toàn bộ dữ liệu</h4>
                  <p className="text-sm text-gray-600 mb-4">
                    Bao gồm tất cả OC, features, posts và cài đặt cá nhân
                  </p>
                  <Button onClick={handleExportData}>
                    📤 Xuất dữ liệu (JSON)
                  </Button>
                </div>

                <div className="p-4 border border-gray-200 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Nhập dữ liệu</h4>
                  <p className="text-sm text-gray-600 mb-4">
                    Khôi phục dữ liệu từ file backup đã xuất trước đó
                  </p>
                  <input
                    type="file"
                    accept=".json"
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                </div>
              </div>
            </div>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        title="Cài đặt"
        subtitle="Quản lý tài khoản và tùy chỉnh trải nghiệm của bạn"
        user={mockUser}
      />

      <div className="p-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card className="p-4">
                <nav className="space-y-2">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                        activeTab === tab.id
                          ? 'bg-blue-100 text-blue-700'
                          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                      }`}
                    >
                      <span className="text-lg">{tab.icon}</span>
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </Card>
            </div>

            {/* Content */}
            <div className="lg:col-span-3">
              {renderTabContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
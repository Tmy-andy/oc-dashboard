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

  const
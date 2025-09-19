import React from 'react';
import { useNavigate } from 'react-router-dom';
import { mockOCs, mockUser } from '../data/mockData';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import Header from '../components/Layout/Header';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  
  const stats = [
    {
      title: 'Tổng số OC',
      value: mockOCs.length,
      icon: '👤',
      color: 'bg-blue-500',
      change: '+2 tháng này'
    },
    {
      title: 'OC hoạt động',
      value: mockOCs.filter(oc => oc.status === 'active').length,
      icon: '✨',
      color: 'bg-green-500',
      change: '100% active'
    },
    {
      title: 'Lượt xem',
      value: '1,234',
      icon: '👁',
      color: 'bg-purple-500',
      change: '+18% so với tháng trước'
    },
    {
      title: 'Features',
      value: '47',
      icon: '🧩',
      color: 'bg-orange-500',
      change: '+5 tuần này'
    }
  ];

  const recentActivity = [
    {
      id: 1,
      type: 'create',
      message: 'Tạo nhân vật mới "Luna"',
      time: '2 giờ trước',
      icon: '➕',
      color: 'text-green-600'
    },
    {
      id: 2,
      type: 'edit',
      message: 'Cập nhật thông tin "Troy"',
      time: '4 giờ trước',
      icon: '✏️',
      color: 'text-blue-600'
    },
    {
      id: 3,
      type: 'feature',
      message: 'Thêm feature mới cho "Yuri"',
      time: '1 ngày trước',
      icon: '🧩',
      color: 'text-purple-600'
    },
    {
      id: 4,
      type: 'view',
      message: 'Profile "Troy" được xem 50 lần',
      time: '2 ngày trước',
      icon: '👁',
      color: 'text-gray-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        title="Dashboard"
        subtitle="Chào mừng trở lại! Đây là tổng quan về OC của bạn."
        user={mockUser}
        actions={
          <Button 
            onClick={() => navigate('/ocs/new')}
            icon={
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            }
          >
            Tạo OC mới
          </Button>
        }
      />

      <div className="p-6 space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold mb-3">Chào mừng trở lại, {mockUser.name}! 👋</h2>
            <p className="text-lg opacity-90 mb-6">
              Hôm nay là ngày tuyệt vời để phát triển thêm các nhân vật của bạn.
            </p>
            <div className="flex gap-3">
              <Button
                variant="secondary"
                onClick={() => navigate('/ocs')}
              >
                Xem tất cả OC
              </Button>
              <Button
                variant="ghost"
                onClick={() => navigate('/features')}
                className="text-white border-white/20 hover:bg-white/10"
              >
                Quản lý Features
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-green-600 mt-2">{stat.change}</p>
                </div>
                <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center text-white text-xl`}>
                  {stat.icon}
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent OCs */}
          <Card>
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">OC gần đây</h3>
                <Button variant="ghost" size="sm" onClick={() => navigate('/ocs')}>
                  Xem tất cả
                </Button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              {mockOCs.slice(0, 3).map((oc) => (
                <div
                  key={oc.id}
                  className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => navigate(`/ocs/${oc.id}`)}
                >
                  <img
                    src={oc.avatar_url}
                    alt={oc.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{oc.name}</h4>
                    <p className="text-sm text-gray-500">{oc.age} tuổi • {oc.gender}</p>
                  </div>
                  <div className="text-right">
                    <span className={`badge ${
                      oc.status === 'active' ? 'badge-success' : 
                      oc.status === 'draft' ? 'badge-warning' : 'badge-gray'
                    }`}>
                      {oc.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Recent Activity */}
          <Card>
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900">Hoạt động gần đây</h3>
            </div>
            <div className="p-6 space-y-4 max-h-80 overflow-y-auto">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start gap-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                    activity.type === 'create' ? 'bg-green-100' :
                    activity.type === 'edit' ? 'bg-blue-100' :
                    activity.type === 'feature' ? 'bg-purple-100' : 'bg-gray-100'
                  }`}>
                    {activity.icon}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">{activity.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
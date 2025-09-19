import React from 'react';
import { OCFeature } from '../../types/oc';
import { mockPosts } from '../../data/mockData';
import Button from '../UI/Button';

interface FeatureCardProps {
  feature: OCFeature;
  expanded: boolean;
  onToggle: () => void;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  feature,
  expanded,
  onToggle
}) => {
  const posts = mockPosts.filter(p => p.feature_id === feature.id);

  const getIconElement = (iconClass: string) => {
    // Map FontAwesome classes to emoji or symbols for simplicity
    const iconMap: { [key: string]: string } = {
      'fa-book': '📖',
      'fa-magic': '✨',
      'fa-heart': '💖',
      'fa-star': '⭐',
      'fa-crown': '👑',
      'fa-sword': '⚔️',
      'fa-shield': '🛡️',
      'fa-fire': '🔥'
    };
    return iconMap[iconClass] || '📝';
  };

  const handleAddPost = () => {
    console.log('Add post for feature:', feature.id);
  };

  const handleEditPost = (postId: string) => {
    console.log('Edit post:', postId);
  };

  const handleDeletePost = (postId: string) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa bài viết này?')) {
      console.log('Delete post:', postId);
    }
  };

  const getLocaleFlag = (locale: string) => {
    const flags: { [key: string]: string } = {
      'vi': '🇻🇳',
      'en': '🇺🇸',
      'ja': '🇯🇵',
      'kr': '🇰🇷',
      'fr': '🇫🇷'
    };
    return flags[locale] || '🌐';
  };

  const getLocaleName = (locale: string) => {
    const names: { [key: string]: string } = {
      'vi': 'Tiếng Việt',
      'en': 'English',
      'ja': '日本語',
      'kr': '한국어',
      'fr': 'Français'
    };
    return names[locale] || locale;
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
      {/* Feature Header */}
      <div 
        className={`p-6 cursor-pointer transition-colors hover:bg-gray-50 ${
          expanded ? 'bg-blue-50 border-b border-blue-200' : ''
        }`}
        onClick={onToggle}
      >
        <div className="flex items-center gap-4">
          <div 
            className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-xl"
            style={{ background: feature.color }}
          >
            {getIconElement(feature.icon)}
          </div>
          
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">{feature.title}</h3>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-500">
                  {posts.length} post{posts.length !== 1 ? 's' : ''}
                </span>
                <span className={`badge ${
                  feature.status === 'active' ? 'badge-success' : 'badge-gray'
                }`}>
                  {feature.status === 'active' ? 'Active' : 'Inactive'}
                </span>
                <svg 
                  className={`w-5 h-5 text-gray-400 transition-transform ${
                    expanded ? 'rotate-180' : ''
                  }`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            <p className="text-gray-600 mt-1">{feature.description}</p>
          </div>
        </div>
      </div>

      {/* Expanded Content */}
      {expanded && (
        <div className="bg-gray-50 border-t border-gray-200">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-base font-semibold text-gray-900">Posts trong Feature này</h4>
              <Button size="sm" onClick={handleAddPost}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Thêm Post
              </Button>
            </div>

            {posts.length === 0 ? (
              <div className="text-center py-8">
                <div className="w-12 h-12 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <p className="text-gray-500 mb-4">Chưa có post nào cho feature này</p>
                <Button size="sm" onClick={handleAddPost}>Tạo post đầu tiên</Button>
              </div>
            ) : (
              <div className="space-y-4">
                {posts.map((post) => (
                  <div key={post.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{getLocaleFlag(post.locale)}</span>
                        <span className="font-medium text-gray-900">{getLocaleName(post.locale)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleEditPost(post.id)}
                          icon={
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          }
                        >
                          Sửa
                        </Button>
                        <Button
                          size="sm"
                          variant="danger"
                          onClick={() => handleDeletePost(post.id)}
                          icon={
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          }
                        >
                          Xóa
                        </Button>
                      </div>
                    </div>
                    
                    <div className="mb-3">
                      <h5 className="font-medium text-gray-900 mb-2">{post.title}</h5>
                      <p className="text-sm text-gray-600 line-clamp-2">{post.excerpt}</p>
                    </div>

                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${
                          post.status === 'published' ? 'bg-green-500' : 'bg-yellow-500'
                        }`}></div>
                        <span className="capitalize">
                          {post.status === 'published' ? 'Đã xuất bản' : 'Bản nháp'}
                        </span>
                      </div>
                      <span>
                        Cập nhật: {new Date(post.updated_at).toLocaleDateString('vi-VN')}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FeatureCard;
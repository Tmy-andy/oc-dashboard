import React from 'react';
import { OC } from '../../types/oc';
import Card from '../UI/Card';
import Button from '../UI/Button';

interface OCCardProps {
  oc: OC;
  onEdit: (oc: OC) => void;
  onView: (oc: OC) => void;
  onDelete: (oc: OC) => void;
}

export const OCCard: React.FC<OCCardProps> = ({
  oc,
  onEdit,
  onView,
  onDelete
}) => {
  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit(oc);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm(`Bạn có chắc chắn muốn xóa ${oc.name}?`)) {
      onDelete(oc);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <span className="badge badge-success">Active</span>;
      case 'inactive':
        return <span className="badge badge-gray">Inactive</span>;
      case 'draft':
        return <span className="badge badge-warning">Draft</span>;
      default:
        return null;
    }
  };

  return (
    <Card hover className="overflow-hidden cursor-pointer" onClick={() => onView(oc)}>
      {/* Avatar */}
      <div className="relative">
        <img
          src={oc.avatar_url}
          alt={oc.name}
          className="w-full h-64 object-cover rounded-t-lg"
        />
        <div className="absolute top-3 right-3">
          {getStatusBadge(oc.status)}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-900">{oc.name}</h3>
          <div className="text-sm text-gray-500">
            {oc.age} tuổi • {oc.gender}
          </div>
        </div>

        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
          {oc.description}
        </p>

        {/* Tags */}
        {oc.metadata?.tags && (
          <div className="flex flex-wrap gap-2 mb-4">
            {oc.metadata.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700"
              >
                {tag}
              </span>
            ))}
            {oc.metadata.tags.length > 3 && (
              <span className="text-xs text-gray-500">
                +{oc.metadata.tags.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="text-xs text-gray-500">
            Cập nhật: {new Date(oc.updated_at).toLocaleDateString('vi-VN')}
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleEdit}
              icon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              }
            >
              Sửa
            </Button>
            
            <Button
              variant="danger"
              size="sm"
              onClick={handleDelete}
              icon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              }
            >
              Xóa
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default OCCard;
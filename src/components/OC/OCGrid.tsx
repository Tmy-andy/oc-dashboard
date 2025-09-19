import React from 'react';
import { OC } from '../../types/oc';
import OCCard from './OCCard';

interface OCGridProps {
  ocs: OC[];
  loading?: boolean;
  onEdit: (oc: OC) => void;
  onView: (oc: OC) => void;
  onDelete: (oc: OC) => void;
  emptyMessage?: string;
}

export const OCGrid: React.FC<OCGridProps> = ({
  ocs,
  loading = false,
  onEdit,
  onView,
  onDelete,
  emptyMessage = 'Chưa có nhân vật nào được tạo'
}) => {
  if (loading) {
    return (
      <div className="grid-responsive">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="card animate-pulse">
            <div className="bg-gray-200 h-64 rounded-lg mb-4"></div>
            <div className="p-6">
              <div className="h-6 bg-gray-200 rounded mb-3"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded mb-4 w-3/4"></div>
              <div className="flex gap-2">
                <div className="h-6 bg-gray-200 rounded w-16"></div>
                <div className="h-6 bg-gray-200 rounded w-20"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (ocs.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
          <svg
            className="w-12 h-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Chưa có nhân vật</h3>
        <p className="text-gray-500 mb-6 max-w-md mx-auto">
          {emptyMessage}
        </p>
      </div>
    );
  }

  return (
    <div className="grid-responsive">
      {ocs.map((oc) => (
        <OCCard
          key={oc.id}
          oc={oc}
          onEdit={onEdit}
          onView={onView}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default OCGrid;
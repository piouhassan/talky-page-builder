
import React from 'react';
import { cn } from '@/lib/utils';

interface ComponentPreviewModalProps {
  isVisible: boolean;
  position: { x: number; y: number };
  componentType: string;
  title: string;
  description: string;
  previewImage: string;
}

const ComponentPreviewModal: React.FC<ComponentPreviewModalProps> = ({
  isVisible,
  position,
  componentType,
  title,
  description,
  previewImage
}) => {
  if (!isVisible) return null;

  return (
    <div 
      className="fixed z-50 bg-white border border-gray-200 rounded-lg shadow-xl overflow-hidden w-80"
      style={{
        left: position.x,
        top: position.y,
        transform: 'translateY(-50%)'
      }}
    >
      {/* Preview Image */}
      <div className="aspect-video bg-gray-50 overflow-hidden">
        <img 
          src={previewImage} 
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Content */}
      <div className="p-4">
        <h4 className="font-semibold text-base text-gray-900 mb-2">{title}</h4>
        <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

export default ComponentPreviewModal;

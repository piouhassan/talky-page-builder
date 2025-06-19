
import React from 'react';
import { cn } from '@/lib/utils';

interface ComponentPreviewCardProps {
  title: string;
  description: string;
  previewImage: string;
  onClick?: () => void;
  onDragStart?: (e: React.DragEvent, type: string) => void;
  componentType: string;
  className?: string;
}

const ComponentPreviewCard: React.FC<ComponentPreviewCardProps> = ({ 
  title, 
  description, 
  previewImage, 
  onClick, 
  onDragStart, 
  componentType,
  className 
}) => {
  return (
    <div 
      className={cn(
        "group cursor-pointer bg-white border border-gray-200 rounded-lg overflow-hidden hover:border-blue-500 hover:shadow-md transition-all duration-200",
        className
      )}
      draggable
      onClick={onClick}
      onDragStart={(e) => onDragStart && onDragStart(e, componentType)}
    >
      {/* Preview Image */}
      <div className="aspect-video bg-gray-50 overflow-hidden">
        <img 
          src={previewImage} 
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
        />
      </div>
      
      {/* Content */}
      <div className="p-3">
        <h4 className="font-medium text-sm text-gray-900 mb-1">{title}</h4>
        <p className="text-xs text-gray-500 line-clamp-2">{description}</p>
      </div>
      
      {/* Drag indicator */}
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="bg-blue-500 text-white rounded px-2 py-1 text-xs font-medium">
          Glisser
        </div>
      </div>
    </div>
  );
};

export default ComponentPreviewCard;


import React from 'react';
import { cn } from '@/lib/utils';

interface SidebarComponentItemProps {
  title: string;
  description: string;
  previewImage: string;
  componentType: string;
  onClick?: () => void;
  onDragStart?: (e: React.DragEvent, type: string) => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  className?: string;
}

const SidebarComponentItem: React.FC<SidebarComponentItemProps> = ({
  title,
  description,
  previewImage,
  componentType,
  onClick,
  onDragStart,
  onMouseEnter,
  onMouseLeave,
  className
}) => {
  return (
    <div 
      className={cn(
        "flex items-center p-3 cursor-pointer hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0",
        className
      )}
      draggable
      onClick={onClick}
      onDragStart={(e) => onDragStart && onDragStart(e, componentType)}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Small preview thumbnail */}
      <div className="w-12 h-8 bg-gray-100 rounded overflow-hidden mr-3 flex-shrink-0">
        <img 
          src={previewImage} 
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Content */}
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-sm text-gray-900 truncate">{title}</h4>
        <p className="text-xs text-gray-500 truncate">{description}</p>
      </div>
    </div>
  );
};

export default SidebarComponentItem;

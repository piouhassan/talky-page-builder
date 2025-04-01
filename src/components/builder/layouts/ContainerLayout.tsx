
import React, { useMemo } from 'react';
import { cn } from "@/lib/utils";
import { ComponentData } from '../BuilderLayout';
import BlockRenderer from '../blocks/BlockRenderer';

interface ContainerLayoutProps {
  content?: {
    title?: string;
    subtitle?: string;
    children?: ComponentData[];
  };
  style?: {
    backgroundColor?: string;
    padding?: string;
    textAlign?: 'left' | 'center' | 'right' | 'justify';
    maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
    rounded?: boolean;
    shadow?: boolean;
  };
  isSelected?: boolean;
  onDrop?: (e: React.DragEvent) => void;
}

const ContainerLayout: React.FC<ContainerLayoutProps> = ({ content, style, isSelected, onDrop }) => {
  // Memoize the container class to prevent recalculations
  const containerClass = useMemo(() => {
    const bgClass = style?.backgroundColor ? `bg-${style.backgroundColor}` : 'bg-white';
    const paddingClass = style?.padding ? `p-${style.padding}` : 'p-6';
    const alignClass = style?.textAlign ? `text-${style.textAlign}` : 'text-left';
    const maxWidthClass = style?.maxWidth ? `max-w-${style.maxWidth}` : 'max-w-full';
    const roundedClass = style?.rounded ? 'rounded-lg' : '';
    const shadowClass = style?.shadow ? 'shadow-md' : '';
    
    return cn(
      bgClass, 
      paddingClass, 
      alignClass, 
      maxWidthClass, 
      roundedClass, 
      shadowClass, 
      'mx-auto'
    );
  }, [
    style?.backgroundColor, 
    style?.padding, 
    style?.textAlign, 
    style?.maxWidth, 
    style?.rounded, 
    style?.shadow
  ]);
  
  // Handle drag over and drop events
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (onDrop) {
      onDrop(e);
    }
  };
  
  return (
    <div className={containerClass}>
      {(content?.title || content?.subtitle) && (
        <div className="mb-4">
          {content?.title && <h2 className="text-xl font-bold mb-2">{content.title}</h2>}
          {content?.subtitle && <p className="text-gray-600">{content.subtitle}</p>}
        </div>
      )}
      <div 
        className={`container-children border ${isSelected ? 'border-builder-blue' : 'border-transparent'}`}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {content?.children && content.children.length > 0 ? (
          content.children.map((child, index) => (
            <div key={child.id || index} className="mb-4">
              <BlockRenderer component={child} isSelected={false} />
            </div>
          ))
        ) : (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center text-gray-400">
            Glissez et déposez des composants ici
          </div>
        )}
      </div>
    </div>
  );
};

export default ContainerLayout;

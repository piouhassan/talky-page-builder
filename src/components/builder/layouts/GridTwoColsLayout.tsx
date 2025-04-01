
import React, { useMemo } from 'react';
import { cn } from "@/lib/utils";
import { ComponentData } from '../BuilderLayout';
import BlockRenderer from '../blocks/BlockRenderer';

interface GridTwoColsLayoutProps {
  content?: {
    title?: string;
    subtitle?: string;
    leftChildren?: ComponentData[];
    rightChildren?: ComponentData[];
    gap?: string;
  };
  style?: {
    backgroundColor?: string;
    padding?: string;
    textAlign?: 'left' | 'center' | 'right' | 'justify';
    rounded?: boolean;
    shadow?: boolean;
  };
  isSelected?: boolean;
  onColumnDrop?: (e: React.DragEvent, columnIndex: number) => void;
}

const GridTwoColsLayout: React.FC<GridTwoColsLayoutProps> = ({ 
  content, 
  style,
  isSelected,
  onColumnDrop
}) => {
  // Memoize container class
  const containerClass = useMemo(() => {
    const bgClass = style?.backgroundColor ? `bg-${style.backgroundColor}` : 'bg-white';
    const paddingClass = style?.padding ? `p-${style.padding}` : 'p-6';
    const alignClass = style?.textAlign ? `text-${style.textAlign}` : 'text-left';
    const roundedClass = style?.rounded ? 'rounded-lg' : '';
    const shadowClass = style?.shadow ? 'shadow-md' : '';
    
    return cn(bgClass, paddingClass, alignClass, roundedClass, shadowClass);
  }, [
    style?.backgroundColor, 
    style?.padding, 
    style?.textAlign, 
    style?.rounded, 
    style?.shadow
  ]);
  
  // Memoize grid gap
  const gridGapClass = useMemo(() => {
    return content?.gap ? `gap-${content.gap}` : 'gap-6';
  }, [content?.gap]);
  
  // Handle drag over event
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };
  
  // Handle drop in left column
  const handleLeftColumnDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (onColumnDrop) {
      onColumnDrop(e, 0);
    }
  };
  
  // Handle drop in right column
  const handleRightColumnDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (onColumnDrop) {
      onColumnDrop(e, 1);
    }
  };
  
  return (
    <div className={containerClass}>
      {(content?.title || content?.subtitle) && (
        <div className="mb-6">
          {content?.title && <h2 className="text-2xl font-bold mb-2">{content.title}</h2>}
          {content?.subtitle && <p className="text-gray-600">{content.subtitle}</p>}
        </div>
      )}
      
      <div 
        className={`grid grid-cols-1 md:grid-cols-2 ${gridGapClass} border ${
          isSelected ? 'border-builder-blue' : 'border-transparent'
        }`}
      >
        {/* Left column */}
        <div 
          className="col-span-1 border border-dashed border-gray-300 rounded min-h-[100px]"
          onDragOver={handleDragOver}
          onDrop={handleLeftColumnDrop}
        >
          {content?.leftChildren && content.leftChildren.length > 0 ? (
            <div className="p-4">
              {content.leftChildren.map((child, index) => (
                <div key={child.id || index} className="mb-4">
                  <BlockRenderer component={child} isSelected={false} />
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-gray-400">
              Glissez et déposez des composants ici
            </div>
          )}
        </div>
        
        {/* Right column */}
        <div 
          className="col-span-1 border border-dashed border-gray-300 rounded min-h-[100px]"
          onDragOver={handleDragOver}
          onDrop={handleRightColumnDrop}
        >
          {content?.rightChildren && content.rightChildren.length > 0 ? (
            <div className="p-4">
              {content.rightChildren.map((child, index) => (
                <div key={child.id || index} className="mb-4">
                  <BlockRenderer component={child} isSelected={false} />
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-gray-400">
              Glissez et déposez des composants ici
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GridTwoColsLayout;

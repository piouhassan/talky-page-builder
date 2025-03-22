
import React, { useMemo } from 'react';
import { cn } from "@/lib/utils";
import { ComponentData } from '../BuilderLayout';
import BlockRenderer from './BlockRenderer';

interface GridThreeColsBlockProps {
  content?: {
    title?: string;
    subtitle?: string;
    columns?: ComponentData[][];
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

const GridThreeColsBlock: React.FC<GridThreeColsBlockProps> = ({ content, style, isSelected, onColumnDrop }) => {
  // Memoize the container class to prevent recalculations
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
  
  // Memoize the grid class
  const gridClass = useMemo(() => {
    const gapClass = content?.gap ? `gap-${content.gap}` : 'gap-6';
    return cn('grid grid-cols-1 md:grid-cols-3', gapClass);
  }, [content?.gap]);
  
  // Handle drag over and drop events for each column
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };
  
  const handleDrop = (e: React.DragEvent, columnIndex: number) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (onColumnDrop) {
      onColumnDrop(e, columnIndex);
    }
  };
  
  return (
    <div className={containerClass}>
      {(content?.title || content?.subtitle) && (
        <div className="mb-6 text-center">
          {content?.title && <h2 className="text-2xl font-bold mb-2">{content.title}</h2>}
          {content?.subtitle && <p className="text-gray-600">{content.subtitle}</p>}
        </div>
      )}
      
      <div className={gridClass}>
        {/* Render three columns */}
        {[0, 1, 2].map((colIndex) => (
          <div 
            key={colIndex} 
            className={`grid-col border ${isSelected ? 'border-builder-blue' : 'border-transparent'}`}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, colIndex)}
          >
            {content?.columns && content.columns[colIndex] && content.columns[colIndex].length > 0 ? (
              content.columns[colIndex].map((child, index) => (
                <div key={child.id || index} className="mb-4">
                  <BlockRenderer component={child} isSelected={false} />
                </div>
              ))
            ) : (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center text-gray-400">
                Colonne {colIndex + 1}: Glissez et déposez des composants ici
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GridThreeColsBlock;

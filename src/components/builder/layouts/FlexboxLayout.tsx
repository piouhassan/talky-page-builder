
import React, { useMemo } from 'react';
import { cn } from "@/lib/utils";
import { ComponentData } from '../BuilderLayout';
import BlockRenderer from '../blocks/BlockRenderer';

interface FlexboxLayoutProps {
  content?: {
    title?: string;
    subtitle?: string;
    children?: ComponentData[];
    direction?: string;
    wrap?: boolean;
    justifyContent?: string;
    alignItems?: string;
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
  onDrop?: (e: React.DragEvent) => void;
}

const FlexboxLayout: React.FC<FlexboxLayoutProps> = ({ content, style, isSelected, onDrop }) => {
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
  
  // Memoize the flex class
  const flexClass = useMemo(() => {
    // Handle direction safely - default to 'flex-row' if not 'column'
    const direction = content?.direction === 'column' ? 'flex-col' : 'flex-row';
    const wrap = content?.wrap ? 'flex-wrap' : 'flex-nowrap';
    
    // Handle justifyContent safely with valid Tailwind values
    let justify = 'justify-start';
    if (content?.justifyContent) {
      if (['start', 'end', 'center', 'between', 'around', 'evenly'].includes(content.justifyContent)) {
        justify = `justify-${content.justifyContent}`;
      }
    }
    
    // Handle alignItems safely with valid Tailwind values
    let align = 'items-start';
    if (content?.alignItems) {
      if (['start', 'end', 'center', 'baseline', 'stretch'].includes(content.alignItems)) {
        align = `items-${content.alignItems}`;
      }
    }
    
    const gap = content?.gap ? `gap-${content.gap}` : 'gap-4';
    
    return cn('flex', direction, wrap, justify, align, gap);
  }, [
    content?.direction,
    content?.wrap,
    content?.justifyContent,
    content?.alignItems,
    content?.gap
  ]);
  
  // Handle drop event for Flexbox to accept children components
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
        <div className="mb-6">
          {content?.title && <h2 className="text-2xl font-bold mb-2">{content.title}</h2>}
          {content?.subtitle && <p className="text-gray-600">{content.subtitle}</p>}
        </div>
      )}
      
      <div 
        className={`${flexClass} border ${isSelected ? 'border-builder-blue' : 'border-transparent'}`}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {content?.children && content.children.length > 0 ? (
          content.children.map((child, index) => (
            <div key={child.id || index} className="flex-child">
              <BlockRenderer component={child} isSelected={false} />
            </div>
          ))
        ) : (
          <div className="w-full border-2 border-dashed border-gray-300 rounded-lg p-8 text-center text-gray-400">
            Glissez et déposez des composants ici
          </div>
        )}
      </div>
    </div>
  );
};

export default FlexboxLayout;

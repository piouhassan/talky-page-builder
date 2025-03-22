
import React, { useMemo } from 'react';
import { cn } from "@/lib/utils";
import { ComponentData } from '../BuilderLayout';
import BlockRenderer from './BlockRenderer';

interface GridTwoColsBlockProps {
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
}

const GridTwoColsBlock: React.FC<GridTwoColsBlockProps> = ({ content, style }) => {
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
    return cn('grid grid-cols-1 md:grid-cols-2', gapClass);
  }, [content?.gap]);
  
  return (
    <div className={containerClass}>
      {(content?.title || content?.subtitle) && (
        <div className="mb-6 text-center">
          {content?.title && <h2 className="text-2xl font-bold mb-2">{content.title}</h2>}
          {content?.subtitle && <p className="text-gray-600">{content.subtitle}</p>}
        </div>
      )}
      
      <div className={gridClass}>
        {/* Left Column */}
        <div className="grid-col">
          {content?.leftChildren && content.leftChildren.length > 0 ? (
            content.leftChildren.map((child, index) => (
              <div key={child.id || index} className="mb-4">
                <BlockRenderer component={child} isSelected={false} />
              </div>
            ))
          ) : (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center text-gray-400">
              Colonne gauche: Glissez et déposez des composants ici
            </div>
          )}
        </div>
        
        {/* Right Column */}
        <div className="grid-col">
          {content?.rightChildren && content.rightChildren.length > 0 ? (
            content.rightChildren.map((child, index) => (
              <div key={child.id || index} className="mb-4">
                <BlockRenderer component={child} isSelected={false} />
              </div>
            ))
          ) : (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center text-gray-400">
              Colonne droite: Glissez et déposez des composants ici
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GridTwoColsBlock;


import React from 'react';

interface ParagraphBlockProps {
  content?: {
    title?: string;
    subtitle?: string;
  };
  style?: {
    backgroundColor?: string;
    padding?: string;
    textAlign?: 'left' | 'center' | 'right' | 'justify';
  };
}

const ParagraphBlock: React.FC<ParagraphBlockProps> = ({ content, style }) => {
  // Apply CSS classes based on style props
  const containerClass = `bg-${style?.backgroundColor || 'white'} p-${style?.padding || '6'} text-${style?.textAlign || 'left'}`;
  
  return (
    <div className={containerClass}>
      {content?.title && (
        <h3 className="text-2xl font-bold mb-4">{content.title}</h3>
      )}
      {content?.subtitle && (
        <p className="text-gray-700">{content.subtitle}</p>
      )}
    </div>
  );
};

export default ParagraphBlock;

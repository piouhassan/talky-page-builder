
import React from 'react';

interface ImageBlockProps {
  content?: {
    imageUrl?: string;
    alt?: string;
    caption?: string;
  };
  style?: {
    backgroundColor?: string;
    padding?: string;
    textAlign?: 'left' | 'center' | 'right' | 'justify';
  };
}

const ImageBlock: React.FC<ImageBlockProps> = ({ content, style }) => {
  // Apply CSS classes based on style props
  const containerClass = `bg-${style?.backgroundColor || 'white'} p-${style?.padding || '6'} text-${style?.textAlign || 'center'}`;
  
  return (
    <div className={containerClass}>
      <div className="max-w-3xl mx-auto">
        {content?.imageUrl && (
          <figure>
            <img 
              src={content.imageUrl} 
              alt={content.alt || "Image"} 
              className="max-w-full h-auto rounded-lg mx-auto shadow-md"
            />
            {content?.caption && (
              <figcaption className="text-sm text-gray-500 mt-2">{content.caption}</figcaption>
            )}
          </figure>
        )}
      </div>
    </div>
  );
};

export default ImageBlock;

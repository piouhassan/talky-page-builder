
import React, { useMemo } from 'react';
import { cn } from "@/lib/utils";

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
  // Utiliser useMemo pour éviter les recalculs inutiles qui causent des clignotements
  const containerClass = useMemo(() => {
    const bgClass = style?.backgroundColor ? `bg-${style.backgroundColor}` : 'bg-white';
    const paddingClass = style?.padding ? `p-${style.padding}` : 'p-6';
    const alignClass = style?.textAlign ? `text-${style.textAlign}` : 'text-center';
    
    return cn(bgClass, paddingClass, alignClass);
  }, [style?.backgroundColor, style?.padding, style?.textAlign]);
  
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

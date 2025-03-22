
import React, { useMemo } from 'react';
import { cn } from "@/lib/utils";

interface CTABlockProps {
  content?: {
    title?: string;
    subtitle?: string;
    buttonText?: string;
    buttonUrl?: string;
    secondaryButtonText?: string;
    secondaryButtonUrl?: string;
    imageUrl?: string;
  };
  style?: {
    backgroundColor?: string;
    padding?: string;
    textAlign?: 'left' | 'center' | 'right' | 'justify';
    layout?: 'center' | 'split' | 'banner';
  };
}

const CTABlock: React.FC<CTABlockProps> = ({ content, style }) => {
  const containerClass = useMemo(() => {
    const bgClass = style?.backgroundColor ? `bg-${style.backgroundColor}` : 'bg-blue-500';
    const paddingClass = style?.padding ? `p-${style.padding}` : 'p-12';
    const alignClass = style?.textAlign ? `text-${style.textAlign}` : 'text-center';
    
    return cn(bgClass, paddingClass, alignClass);
  }, [style?.backgroundColor, style?.padding, style?.textAlign]);
  
  const layout = style?.layout || 'center';

  return (
    <div className={cn(containerClass, "text-white")}>
      <div className={cn("max-w-5xl mx-auto", layout === 'split' ? 'grid md:grid-cols-2 gap-8 items-center' : '')}>
        {layout === 'split' && content?.imageUrl && (
          <div className="flex justify-center">
            <img 
              src={content.imageUrl} 
              alt="CTA" 
              className="max-w-full rounded-lg shadow-lg h-auto"
            />
          </div>
        )}
        
        <div className={layout === 'center' ? 'text-center' : ''}>
          {content?.title && (
            <h2 className="text-3xl font-bold mb-4">{content.title}</h2>
          )}
          
          {content?.subtitle && (
            <p className="text-lg mb-8 opacity-90">{content.subtitle}</p>
          )}
          
          <div className={cn("flex gap-4", layout === 'center' ? 'justify-center' : 'flex-wrap')}>
            {content?.buttonText && (
              <a 
                href={content.buttonUrl || "#"} 
                className="px-6 py-3 bg-white text-blue-600 rounded-md font-semibold hover:bg-gray-100 transition-colors"
              >
                {content.buttonText}
              </a>
            )}
            
            {content?.secondaryButtonText && (
              <a 
                href={content.secondaryButtonUrl || "#"} 
                className="px-6 py-3 border border-white text-white rounded-md font-semibold hover:bg-white/10 transition-colors"
              >
                {content.secondaryButtonText}
              </a>
            )}
          </div>
        </div>
        
        {layout === 'split' && !content?.imageUrl && (
          <div className="bg-white/20 h-64 rounded-lg flex items-center justify-center">
            <p className="text-white/70">Image d'illustration</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CTABlock;

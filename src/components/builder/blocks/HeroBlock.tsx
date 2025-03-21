
import React from 'react';
import { Button } from "@/components/ui/button";

interface HeroBlockProps {
  content?: {
    title?: string;
    subtitle?: string;
    buttonText?: string;
    badge?: string;
    imageUrl?: string;
  };
  style?: {
    backgroundColor?: string;
    padding?: string;
    textAlign?: 'left' | 'center' | 'right' | 'justify';
  };
}

const HeroBlock: React.FC<HeroBlockProps> = ({ content, style }) => {
  // Apply CSS classes based on style props
  const containerClass = `bg-${style?.backgroundColor || 'builder-light-blue'} p-${style?.padding || '12'} text-${style?.textAlign || 'center'}`;
  
  return (
    <div className={containerClass}>
      <div className="max-w-3xl mx-auto">
        {content?.badge && (
          <span className="inline-block py-1 px-3 rounded-full bg-white text-builder-blue text-xs font-medium mb-4">
            {content.badge}
          </span>
        )}
        {content?.title && (
          <h1 className="text-4xl font-bold text-gray-900 mb-6">{content.title}</h1>
        )}
        {content?.subtitle && (
          <p className="text-lg text-gray-600 mb-8">{content.subtitle}</p>
        )}
        {content?.buttonText && (
          <Button className="bg-builder-blue hover:bg-builder-dark-blue text-white px-6 py-2 rounded-md">
            {content.buttonText}
          </Button>
        )}
        {content?.imageUrl && (
          <div className="mt-8">
            <img src={content.imageUrl} alt="Hero" className="max-w-full mx-auto rounded-md" />
          </div>
        )}
      </div>
    </div>
  );
};

export default HeroBlock;

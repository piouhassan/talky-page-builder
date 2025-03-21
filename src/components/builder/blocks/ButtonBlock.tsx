
import React from 'react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ButtonBlockProps {
  content?: {
    buttonText?: string;
    url?: string;
  };
  style?: {
    backgroundColor?: string;
    padding?: string;
    textAlign?: 'left' | 'center' | 'right' | 'justify';
  };
}

const ButtonBlock: React.FC<ButtonBlockProps> = ({ content, style }) => {
  // Prepare container classes with proper tailwind classes
  const getContainerClass = () => {
    const bgClass = style?.backgroundColor ? `bg-${style.backgroundColor}` : 'bg-white';
    const paddingClass = style?.padding ? `p-${style.padding}` : 'p-6';
    const alignClass = style?.textAlign ? `text-${style.textAlign}` : 'text-center';
    
    return cn(bgClass, paddingClass, alignClass);
  };
  
  return (
    <div className={getContainerClass()}>
      <Button 
        className="bg-builder-blue hover:bg-builder-dark-blue text-white px-6 py-2 rounded-md"
        onClick={() => {
          if (content?.url) {
            window.open(content.url, '_blank');
          }
        }}
      >
        {content?.buttonText || "Cliquez ici"}
      </Button>
    </div>
  );
};

export default ButtonBlock;

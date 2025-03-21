
import React from 'react';
import { Button } from "@/components/ui/button";

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
  // Apply CSS classes based on style props
  const containerClass = `bg-${style?.backgroundColor || 'white'} p-${style?.padding || '6'} text-${style?.textAlign || 'center'}`;
  
  return (
    <div className={containerClass}>
      <Button className="bg-builder-blue hover:bg-builder-dark-blue text-white px-6 py-2 rounded-md">
        {content?.buttonText || "Cliquez ici"}
      </Button>
    </div>
  );
};

export default ButtonBlock;

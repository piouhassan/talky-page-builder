
import React, { useMemo } from 'react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ButtonBlockProps {
  content?: {
    buttonText?: string;
    url?: string;
    variant?: 'default' | 'outline' | 'ghost' | 'link' | 'secondary';
    size?: 'default' | 'sm' | 'lg' | 'icon';
  };
  style?: {
    backgroundColor?: string;
    padding?: string;
    textAlign?: 'left' | 'center' | 'right' | 'justify';
    buttonColor?: string;
    rounded?: boolean;
    shadow?: boolean;
  };
}

const ButtonBlock: React.FC<ButtonBlockProps> = ({ content, style }) => {
  // Utiliser useMemo pour éviter les recalculs inutiles qui causent des clignotements
  const containerClass = useMemo(() => {
    const bgClass = style?.backgroundColor ? `bg-${style.backgroundColor}` : 'bg-white';
    const paddingClass = style?.padding ? `p-${style.padding}` : 'p-6';
    const alignClass = style?.textAlign ? `text-${style.textAlign}` : 'text-center';
    
    return cn(bgClass, paddingClass, alignClass);
  }, [style?.backgroundColor, style?.padding, style?.textAlign]);
  
  // Préparer les classes du bouton avec useMemo
  const buttonClass = useMemo(() => {
    const baseClass = 'px-6 py-2';
    const colorClass = style?.buttonColor ? `bg-${style?.buttonColor} hover:bg-${style?.buttonColor}/90` : 'bg-builder-blue hover:bg-builder-dark-blue';
    const textClass = 'text-white';
    const roundedClass = style?.rounded ? 'rounded-full' : 'rounded-md';
    const shadowClass = style?.shadow ? 'shadow-md' : '';
    
    return cn(baseClass, colorClass, textClass, roundedClass, shadowClass);
  }, [style?.buttonColor, style?.rounded, style?.shadow]);
  
  // Mémoriser l'URL pour éviter les recalculs
  const handleClick = useMemo(() => {
    return () => {
      if (content?.url) {
        window.open(content.url, '_blank');
      }
    };
  }, [content?.url]);
  
  return (
    <div className={containerClass}>
      <Button 
        className={buttonClass}
        variant={content?.variant || 'default'}
        size={content?.size || 'default'}
        onClick={handleClick}
      >
        {content?.buttonText || "Cliquez ici"}
      </Button>
    </div>
  );
};

export default ButtonBlock;

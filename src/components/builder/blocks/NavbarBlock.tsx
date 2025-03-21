
import React from 'react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface NavbarBlockProps {
  content?: {
    title?: string;
    subtitle?: string;
    buttonText?: string;
  };
  style?: {
    backgroundColor?: string;
    padding?: string;
    textAlign?: 'left' | 'center' | 'right' | 'justify';
  };
}

const NavbarBlock: React.FC<NavbarBlockProps> = ({ content, style }) => {
  // Prepare container classes with proper tailwind classes
  const getContainerClass = () => {
    const bgClass = style?.backgroundColor ? `bg-${style.backgroundColor}` : 'bg-white';
    const paddingClass = style?.padding ? `p-${style.padding}` : 'p-4';
    
    return cn(bgClass, paddingClass, "flex items-center justify-between");
  };
  
  // Parse menu items from subtitle (comma-separated values)
  const menuItems = content?.subtitle?.split(',') || [];
  
  return (
    <nav className={getContainerClass()}>
      <div className="flex items-center space-x-8">
        <h2 className="font-bold text-xl text-builder-blue">{content?.title || "Ma Marque"}</h2>
        
        <ul className="hidden md:flex space-x-6">
          {menuItems.map((item, index) => (
            <li key={index}>
              <a href="#" className="text-gray-600 hover:text-builder-blue transition-colors">
                {item.trim()}
              </a>
            </li>
          ))}
        </ul>
      </div>
      
      <div>
        <Button className="bg-builder-blue hover:bg-builder-dark-blue text-white">
          {content?.buttonText || "Connexion"}
        </Button>
      </div>
    </nav>
  );
};

export default NavbarBlock;

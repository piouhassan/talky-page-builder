
import React from 'react';
import { cn } from "@/lib/utils";

interface FooterLayoutProps {
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

const FooterLayout: React.FC<FooterLayoutProps> = ({ content, style }) => {
  // Prepare container classes with proper tailwind classes
  const getContainerClass = () => {
    const bgClass = style?.backgroundColor ? `bg-${style.backgroundColor}` : 'bg-gray-100';
    const paddingClass = style?.padding ? `p-${style.padding}` : 'p-8';
    const alignClass = style?.textAlign ? `text-${style.textAlign}` : 'text-center';
    
    return cn(bgClass, paddingClass, alignClass);
  };
  
  // Parse links from buttonText (comma-separated values)
  const footerLinks = content?.buttonText?.split(',') || [];
  
  return (
    <footer className={getContainerClass()}>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div className="mb-4 md:mb-0">
            <h3 className="font-bold text-lg text-builder-blue">{content?.title || "Ma Marque"}</h3>
          </div>
          
          <ul className="flex flex-wrap gap-4 mb-4 md:mb-0">
            {footerLinks.map((link, index) => (
              <li key={index}>
                <a href="#" className="text-sm text-gray-600 hover:text-builder-blue transition-colors">
                  {link.trim()}
                </a>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="mt-8 text-sm text-gray-500">
          {content?.subtitle || "© 2023 Ma Marque. Tous droits réservés."}
        </div>
      </div>
    </footer>
  );
};

export default FooterLayout;

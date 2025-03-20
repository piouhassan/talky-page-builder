
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Undo, Redo, Smartphone, Tablet, Monitor, Save, Share } from "lucide-react";
import { Link } from 'react-router-dom';

interface HeaderProps {
  onViewportChange?: (viewport: 'desktop' | 'tablet' | 'mobile') => void;
  onWidthChange?: (width: string) => void;
  viewportSize?: 'desktop' | 'tablet' | 'mobile';
  selectedWidth?: string;
}

const Header: React.FC<HeaderProps> = ({ 
  onViewportChange, 
  onWidthChange,
  viewportSize = 'desktop',
  selectedWidth = "1440"
}) => {
  return (
    <header className="border-b border-gray-200 bg-white h-16 flex items-center px-4 justify-between sticky top-0 z-50 shadow-sm">
      <div className="flex items-center space-x-4">
        <Link to="/" className="text-gray-600 hover:text-gray-900 transition-colors">
          <ArrowLeft size={20} />
        </Link>
        
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-builder-blue rounded-md flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="3" y="3" width="18" height="18" rx="2" stroke="white" strokeWidth="2"/>
              <line x1="8" y1="9" x2="16" y2="9" stroke="white" strokeWidth="2"/>
              <line x1="8" y1="15" x2="16" y2="15" stroke="white" strokeWidth="2"/>
            </svg>
          </div>
          <div>
            <Input 
              className="font-medium border-none h-7 p-0 focus-visible:ring-0 w-[180px]"
              defaultValue="Page sans titre"  
            />
            <span className="text-xs text-gray-500">https://monsite.com/page</span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <Button variant="outline" size="icon" className="h-9 w-9">
          <Undo size={16} />
        </Button>
        <Button variant="outline" size="icon" className="h-9 w-9">
          <Redo size={16} />
        </Button>
        
        <div className="h-6 w-px bg-gray-200 mx-2"></div>
        
        <div className="flex bg-gray-100 p-1 rounded-md">
          <Button 
            variant="ghost" 
            size="icon" 
            className={`h-8 w-8 rounded-md ${viewportSize === 'mobile' ? 'bg-white shadow-sm' : ''}`}
            onClick={() => onViewportChange && onViewportChange('mobile')}
          >
            <Smartphone size={16} />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className={`h-8 w-8 rounded-md ${viewportSize === 'tablet' ? 'bg-white shadow-sm' : ''}`}
            onClick={() => onViewportChange && onViewportChange('tablet')}
          >
            <Tablet size={16} />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className={`h-8 w-8 rounded-md ${viewportSize === 'desktop' ? 'bg-white shadow-sm' : ''}`}
            onClick={() => onViewportChange && onViewportChange('desktop')}
          >
            <Monitor size={16} />
          </Button>
        </div>
        
        <div className="h-6 w-px bg-gray-200 mx-2"></div>
        
        <Select 
          value={selectedWidth} 
          onValueChange={(value) => onWidthChange && onWidthChange(value)}
        >
          <SelectTrigger className="w-24 h-9">
            <SelectValue placeholder="Largeur" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="360">360 px</SelectItem>
            <SelectItem value="768">768 px</SelectItem>
            <SelectItem value="1024">1024 px</SelectItem>
            <SelectItem value="1440">1440 px</SelectItem>
          </SelectContent>
        </Select>
        
        <div className="h-6 w-px bg-gray-200 mx-2"></div>
        
        <Button variant="outline" size="sm" className="h-9 px-3 flex items-center">
          <Save size={16} className="mr-2" />
          Enregistrer
        </Button>
        
        <Button size="sm" className="h-9 px-4 bg-builder-blue hover:bg-builder-dark-blue transition-colors">
          Publier
        </Button>
      </div>
    </header>
  );
};

export default Header;

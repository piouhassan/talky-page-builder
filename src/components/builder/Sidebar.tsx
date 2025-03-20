
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, ChevronDown } from "lucide-react";
import { cn } from '@/lib/utils';

interface SectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

const SidebarSection: React.FC<SectionProps> = ({ title, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  
  return (
    <div className="border-b border-gray-200 py-2">
      <button 
        className="flex items-center justify-between w-full px-4 py-2 text-sm font-medium text-gray-700"
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
        <ChevronDown 
          size={16} 
          className={cn("transition-transform", isOpen ? "transform rotate-180" : "")}
        />
      </button>
      
      {isOpen && (
        <div className="p-2 animate-slide-in">
          {children}
        </div>
      )}
    </div>
  );
};

interface ComponentPreviewProps {
  title: string;
  icon: React.ReactNode;
}

const ComponentPreview: React.FC<ComponentPreviewProps> = ({ title, icon }) => {
  return (
    <div 
      className="component-preview flex flex-col items-center justify-center p-3 border border-gray-200 rounded-md bg-white cursor-grab"
      draggable
    >
      <div className="mb-2">{icon}</div>
      <span className="text-xs text-gray-600">{title}</span>
    </div>
  );
};

const NavIcon = () => (
  <svg width="40" height="24" viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="1" y="1" width="38" height="22" rx="3" stroke="#4361EE" strokeWidth="1.5"/>
    <line x1="10" y1="12" x2="14" y2="12" stroke="#4361EE" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="18" y1="12" x2="22" y2="12" stroke="#4361EE" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="26" y1="12" x2="30" y2="12" stroke="#4361EE" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const FooterIcon = () => (
  <svg width="40" height="24" viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="1" y="1" width="38" height="22" rx="3" stroke="#4361EE" strokeWidth="1.5"/>
    <line x1="8" y1="8" x2="16" y2="8" stroke="#4361EE" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="8" y1="12" x2="32" y2="12" stroke="#4361EE" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="8" y1="16" x2="24" y2="16" stroke="#4361EE" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const HeroIcon = () => (
  <svg width="40" height="24" viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="1" y="1" width="38" height="22" rx="3" stroke="#4361EE" strokeWidth="1.5"/>
    <rect x="8" y="6" width="8" height="12" rx="1" stroke="#4361EE" strokeWidth="1.5"/>
    <line x1="20" y1="8" x2="32" y2="8" stroke="#4361EE" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="20" y1="12" x2="28" y2="12" stroke="#4361EE" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="20" y1="16" x2="24" y2="16" stroke="#4361EE" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const CardsIcon = () => (
  <svg width="40" height="24" viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="6" y="4" width="8" height="16" rx="1" stroke="#4361EE" strokeWidth="1.5"/>
    <rect x="16" y="4" width="8" height="16" rx="1" stroke="#4361EE" strokeWidth="1.5"/>
    <rect x="26" y="4" width="8" height="16" rx="1" stroke="#4361EE" strokeWidth="1.5"/>
  </svg>
);

const FeaturesIcon = () => (
  <svg width="40" height="24" viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="6" y="4" width="28" height="6" rx="1" stroke="#4361EE" strokeWidth="1.5"/>
    <rect x="6" y="14" width="28" height="6" rx="1" stroke="#4361EE" strokeWidth="1.5"/>
  </svg>
);

const Sidebar = () => {
  return (
    <div className="w-[280px] border-r border-gray-200 bg-white h-full overflow-y-auto">
      <div className="p-3">
        <div className="flex space-x-1 mb-2">
          <Button className="w-1/2 h-9 bg-builder-blue hover:bg-builder-dark-blue transition-colors px-3">
            Layouts
          </Button>
          <Button variant="outline" className="w-1/2 h-9 text-gray-600 px-3">
            Éléments
          </Button>
        </div>
        
        <div className="relative mb-4">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Rechercher..."
            className="pl-9 h-9 bg-gray-50"
          />
        </div>
      </div>
      
      <div className="pb-20">
        <SidebarSection title="Navigation" defaultOpen={true}>
          <div className="grid grid-cols-2 gap-2">
            <ComponentPreview title="Barre de nav" icon={<NavIcon />} />
            <ComponentPreview title="Pied de page" icon={<FooterIcon />} />
          </div>
        </SidebarSection>
        
        <SidebarSection title="Contenu">
          <div className="grid grid-cols-2 gap-2">
            <ComponentPreview title="Hero" icon={<HeroIcon />} />
            <ComponentPreview title="Hero Overlay" icon={<HeroIcon />} />
            <ComponentPreview title="Section Cartes" icon={<CardsIcon />} />
            <ComponentPreview title="Section Fonctionnalités" icon={<FeaturesIcon />} />
            <ComponentPreview title="Galerie" icon={<CardsIcon />} />
            <ComponentPreview title="Formulaire d'inscription" icon={<FeaturesIcon />} />
            <ComponentPreview title="Formulaire de contact" icon={<FeaturesIcon />} />
          </div>
        </SidebarSection>
      </div>
    </div>
  );
};

export default Sidebar;

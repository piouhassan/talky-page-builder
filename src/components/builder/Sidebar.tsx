import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, ChevronDown, Smartphone, Tablet, Monitor } from "lucide-react";
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
  onClick?: () => void;
}

const ComponentPreview: React.FC<ComponentPreviewProps> = ({ title, icon, onClick }) => {
  return (
    <div 
      className="component-preview flex flex-col items-center justify-center p-3 border border-gray-200 rounded-md bg-white cursor-grab hover:border-builder-blue hover:shadow-sm transition-all"
      draggable
      onClick={onClick}
    >
      <div className="mb-2">{icon}</div>
      <span className="text-xs text-gray-600">{title}</span>
    </div>
  );
};

// Icons pour les composants
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

const ContainerIcon = () => (
  <svg width="40" height="24" viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="4" width="32" height="16" rx="2" stroke="#4361EE" strokeWidth="1.5" strokeDasharray="3 3"/>
  </svg>
);

const HeadingIcon = () => (
  <svg width="40" height="24" viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 6V18M16 6V18M8 12H16" stroke="#4361EE" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M20 8H32" stroke="#4361EE" strokeWidth="2" strokeLinecap="round"/>
    <path d="M20 12H28" stroke="#4361EE" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M20 16H24" stroke="#4361EE" strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
);

const ParagraphIcon = () => (
  <svg width="40" height="24" viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <line x1="8" y1="8" x2="32" y2="8" stroke="#4361EE" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="8" y1="12" x2="32" y2="12" stroke="#4361EE" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="8" y1="16" x2="20" y2="16" stroke="#4361EE" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const ButtonIcon = () => (
  <svg width="40" height="24" viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="8" width="24" height="8" rx="2" stroke="#4361EE" strokeWidth="1.5"/>
    <line x1="14" y1="12" x2="26" y2="12" stroke="#4361EE" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const ImageIcon = () => (
  <svg width="40" height="24" viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="6" width="24" height="12" rx="2" stroke="#4361EE" strokeWidth="1.5"/>
    <circle cx="13" cy="10" r="1.5" stroke="#4361EE"/>
    <path d="M12 14L16 11L20 14" stroke="#4361EE" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M19 13L22 11L28 14" stroke="#4361EE" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const Sidebar = () => {
  const [activeTab, setActiveTab] = useState("layouts");
  const [showHeroVariants, setShowHeroVariants] = useState(false);
  const [currentViewport, setCurrentViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  const handleViewportChange = (viewport: 'desktop' | 'tablet' | 'mobile') => {
    setCurrentViewport(viewport);
    // Envoyer un événement au Canvas pour changer la taille d'affichage
    const event = new CustomEvent('viewport-change', { detail: { viewport } });
    window.dispatchEvent(event);
  };

  return (
    <div className="w-[280px] border-r border-gray-200 bg-white h-full overflow-y-auto">
      <div className="p-3">
        <div className="flex space-x-1 mb-2">
          <Button 
            className={cn("w-1/2 h-9 transition-colors px-3", 
              activeTab === "layouts" ? "bg-builder-blue hover:bg-builder-dark-blue" : "bg-transparent text-gray-600 hover:bg-gray-100"
            )}
            onClick={() => setActiveTab("layouts")}
          >
            Layouts
          </Button>
          <Button 
            className={cn("w-1/2 h-9 transition-colors px-3", 
              activeTab === "elements" ? "bg-builder-blue hover:bg-builder-dark-blue" : "bg-transparent text-gray-600 hover:bg-gray-100"
            )}
            onClick={() => setActiveTab("elements")}
          >
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

        <div className="flex items-center justify-center space-x-2 mb-4 border-t border-b border-gray-200 py-2">
          <Button 
            variant="ghost" 
            size="icon" 
            className={cn("h-8 w-8", currentViewport === 'desktop' ? "bg-gray-100" : "")}
            onClick={() => handleViewportChange('desktop')}
          >
            <Monitor size={18} />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className={cn("h-8 w-8", currentViewport === 'tablet' ? "bg-gray-100" : "")}
            onClick={() => handleViewportChange('tablet')}
          >
            <Tablet size={18} />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className={cn("h-8 w-8", currentViewport === 'mobile' ? "bg-gray-100" : "")}
            onClick={() => handleViewportChange('mobile')}
          >
            <Smartphone size={18} />
          </Button>
        </div>
      </div>
      
      <div className="pb-20">
        {showHeroVariants ? (
          <>
            <div className="px-3 mb-3">
              <Button variant="ghost" size="sm" onClick={() => setShowHeroVariants(false)} className="text-xs">
                ← Retour
              </Button>
              <h3 className="font-medium text-sm px-2">Variantes Hero</h3>
            </div>
            <div className="grid grid-cols-1 gap-3 px-3">
              <div className="border border-gray-200 rounded-md overflow-hidden hover:border-builder-blue transition-colors cursor-pointer">
                <div className="bg-builder-light-blue p-3 text-center">
                  <h4 className="text-sm font-bold">Hero Centré</h4>
                  <p className="text-[10px] text-gray-600">Titre + Texte + CTA</p>
                </div>
                <img src="https://placehold.co/300x150/4361EE/FFF" alt="Hero Centré" className="w-full h-auto" />
              </div>
              
              <div className="border border-gray-200 rounded-md overflow-hidden hover:border-builder-blue transition-colors cursor-pointer">
                <div className="bg-builder-light-blue p-3 text-center">
                  <h4 className="text-sm font-bold">Hero Image Droite</h4>
                  <p className="text-[10px] text-gray-600">Titre + Texte + CTA + Image</p>
                </div>
                <img src="https://placehold.co/300x150/4361EE/FFF" alt="Hero Image Droite" className="w-full h-auto" />
              </div>
              
              <div className="border border-gray-200 rounded-md overflow-hidden hover:border-builder-blue transition-colors cursor-pointer">
                <div className="bg-builder-light-blue p-3 text-center">
                  <h4 className="text-sm font-bold">Hero Image Gauche</h4>
                  <p className="text-[10px] text-gray-600">Image + Titre + Texte + CTA</p>
                </div>
                <img src="https://placehold.co/300x150/4361EE/FFF" alt="Hero Image Gauche" className="w-full h-auto" />
              </div>
              
              <div className="border border-gray-200 rounded-md overflow-hidden hover:border-builder-blue transition-colors cursor-pointer">
                <div className="bg-builder-light-blue p-3 text-center">
                  <h4 className="text-sm font-bold">Hero Fond Image</h4>
                  <p className="text-[10px] text-gray-600">Image de fond + Titre + CTA</p>
                </div>
                <img src="https://placehold.co/300x150/4361EE/FFF" alt="Hero Fond Image" className="w-full h-auto" />
              </div>
            </div>
          </>
        ) : (
          <>
            {activeTab === "layouts" ? (
              <>
                <SidebarSection title="Navigation" defaultOpen={true}>
                  <div className="grid grid-cols-2 gap-2">
                    <ComponentPreview title="Barre de nav" icon={<NavIcon />} />
                    <ComponentPreview title="Pied de page" icon={<FooterIcon />} />
                  </div>
                </SidebarSection>
                
                <SidebarSection title="Contenu">
                  <div className="grid grid-cols-2 gap-2">
                    <ComponentPreview 
                      title="Hero" 
                      icon={<HeroIcon />} 
                      onClick={() => setShowHeroVariants(true)} 
                    />
                    <ComponentPreview title="Hero Overlay" icon={<HeroIcon />} />
                    <ComponentPreview title="Section Cartes" icon={<CardsIcon />} />
                    <ComponentPreview title="Section Fonctionnalités" icon={<FeaturesIcon />} />
                    <ComponentPreview title="Galerie" icon={<CardsIcon />} />
                    <ComponentPreview title="Formulaire d'inscription" icon={<FeaturesIcon />} />
                    <ComponentPreview title="Formulaire de contact" icon={<FeaturesIcon />} />
                  </div>
                </SidebarSection>
              </>
            ) : (
              <>
                <SidebarSection title="Conteneurs" defaultOpen={true}>
                  <div className="grid grid-cols-2 gap-2">
                    <ComponentPreview title="Container" icon={<ContainerIcon />} />
                    <ComponentPreview title="Grille 2 cols" icon={<CardsIcon />} />
                    <ComponentPreview title="Grille 3 cols" icon={<CardsIcon />} />
                    <ComponentPreview title="Flexbox" icon={<ContainerIcon />} />
                  </div>
                </SidebarSection>
                
                <SidebarSection title="Basiques" defaultOpen={true}>
                  <div className="grid grid-cols-2 gap-2">
                    <ComponentPreview title="Titre" icon={<HeadingIcon />} />
                    <ComponentPreview title="Paragraphe" icon={<ParagraphIcon />} />
                    <ComponentPreview title="Bouton" icon={<ButtonIcon />} />
                    <ComponentPreview title="Image" icon={<ImageIcon />} />
                    <ComponentPreview title="Liste" icon={<ParagraphIcon />} />
                    <ComponentPreview title="Séparateur" icon={<ButtonIcon />} />
                  </div>
                </SidebarSection>
                
                <SidebarSection title="Formulaires">
                  <div className="grid grid-cols-2 gap-2">
                    <ComponentPreview title="Entrée texte" icon={<ButtonIcon />} />
                    <ComponentPreview title="Case à cocher" icon={<ButtonIcon />} />
                    <ComponentPreview title="Radio" icon={<ButtonIcon />} />
                    <ComponentPreview title="Select" icon={<ButtonIcon />} />
                    <ComponentPreview title="Textarea" icon={<ButtonIcon />} />
                  </div>
                </SidebarSection>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Sidebar;

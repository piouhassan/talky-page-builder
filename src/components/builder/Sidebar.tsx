
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, ChevronDown } from "lucide-react";
import { cn } from '@/lib/utils';
import ComponentPreviewCard from './ComponentPreviewCard';

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
        className="flex items-center justify-between w-full px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
        <ChevronDown 
          size={16} 
          className={cn("transition-transform", isOpen ? "transform rotate-180" : "")}
        />
      </button>
      
      {isOpen && (
        <div className="p-3 animate-in slide-in-from-top-2 duration-200">
          {children}
        </div>
      )}
    </div>
  );
};

interface SidebarProps {
  onComponentSelect?: (componentType: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onComponentSelect }) => {
  const [activeTab, setActiveTab] = useState("layouts");
  const [searchTerm, setSearchTerm] = useState("");

  const handleComponentSelect = (componentType: string) => {
    if (onComponentSelect) {
      onComponentSelect(componentType);
    }
  };

  const handleDragStart = (e: React.DragEvent, componentType: string) => {
    e.dataTransfer.setData('componentType', componentType);
    
    // Add a visual indicator for drag operation
    const ghostImage = document.createElement('div');
    ghostImage.className = 'bg-blue-500 text-white p-3 rounded-lg shadow-lg';
    ghostImage.innerText = componentType;
    ghostImage.style.fontSize = '14px';
    ghostImage.style.fontWeight = '500';
    document.body.appendChild(ghostImage);
    ghostImage.style.position = 'absolute';
    ghostImage.style.top = '-1000px';
    
    e.dataTransfer.setDragImage(ghostImage, 0, 0);
    
    setTimeout(() => {
      document.body.removeChild(ghostImage);
    }, 0);
  };

  // Component data with preview images
  const layoutComponents = [
    {
      type: "Hero",
      title: "Hero Section",
      description: "Section d'accueil avec titre, sous-titre et call-to-action",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=200&fit=crop&auto=format"
    },
    {
      type: "Navbar",
      title: "Barre de Navigation",
      description: "Navigation principale avec logo et menu",
      image: "https://images.unsplash.com/photo-1558655146-364addf25b81?w=400&h=200&fit=crop&auto=format"
    },
    {
      type: "Footer",
      title: "Pied de Page",
      description: "Footer avec liens et informations de contact",
      image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=200&fit=crop&auto=format"
    },
    {
      type: "Features",
      title: "Section Fonctionnalités",
      description: "Grille de fonctionnalités avec icônes et descriptions",
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=200&fit=crop&auto=format"
    },
    {
      type: "Testimonial",
      title: "Témoignage",
      description: "Citation avec photo et informations de l'auteur",
      image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&h=200&fit=crop&auto=format"
    },
    {
      type: "Pricing",
      title: "Tarifs",
      description: "Plans tarifaires en colonnes",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=200&fit=crop&auto=format"
    },
    {
      type: "FAQ",
      title: "Questions Fréquentes",
      description: "Accordéon de questions et réponses",
      image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=400&h=200&fit=crop&auto=format"
    },
    {
      type: "CTA",
      title: "Call to Action",
      description: "Section d'appel à l'action avec boutons",
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=200&fit=crop&auto=format"
    }
  ];

  const containerComponents = [
    {
      type: "Container",
      title: "Conteneur",
      description: "Conteneur simple pour organiser le contenu",
      image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=400&h=200&fit=crop&auto=format"
    },
    {
      type: "GridTwoCols",
      title: "Grille 2 Colonnes",
      description: "Disposition en deux colonnes égales",
      image: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=400&h=200&fit=crop&auto=format"
    },
    {
      type: "GridThreeCols",
      title: "Grille 3 Colonnes",
      description: "Disposition en trois colonnes égales",
      image: "https://images.unsplash.com/photo-1558655146-f09347e92766?w=400&h=200&fit=crop&auto=format"
    },
    {
      type: "Flexbox",
      title: "Flexbox",
      description: "Disposition flexible avec contrôles d'alignement",
      image: "https://images.unsplash.com/photo-1558655146-4d89066bb1d9?w=400&h=200&fit=crop&auto=format"
    }
  ];

  const basicComponents = [
    {
      type: "Paragraphe",
      title: "Paragraphe",
      description: "Bloc de texte formaté",
      image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&h=200&fit=crop&auto=format"
    },
    {
      type: "Bouton",
      title: "Bouton",
      description: "Bouton cliquable avec styles personnalisables",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=200&fit=crop&auto=format"
    },
    {
      type: "Image",
      title: "Image",
      description: "Image avec légende optionnelle",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=200&fit=crop&auto=format"
    }
  ];

  // Filter components based on search term
  const filterComponents = (components: any[]) => {
    if (!searchTerm) return components;
    return components.filter(comp => 
      comp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comp.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  return (
    <div className="w-[320px] border-r border-gray-200 bg-white h-full overflow-y-auto">
      <div className="p-4 border-b border-gray-200">
        <div className="flex space-x-1 mb-4">
          <Button 
            className={cn("flex-1 h-9 transition-colors", 
              activeTab === "layouts" ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            )}
            onClick={() => setActiveTab("layouts")}
          >
            Layouts
          </Button>
          <Button 
            className={cn("flex-1 h-9 transition-colors", 
              activeTab === "elements" ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            )}
            onClick={() => setActiveTab("elements")}
          >
            Éléments
          </Button>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Rechercher des composants..."
            className="pl-9 h-9 bg-gray-50 border-gray-200"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <div className="pb-20">
        {activeTab === "layouts" ? (
          <SidebarSection title="Sections de Contenu" defaultOpen={true}>
            <div className="space-y-3">
              {filterComponents(layoutComponents).map((component) => (
                <ComponentPreviewCard
                  key={component.type}
                  title={component.title}
                  description={component.description}
                  previewImage={component.image}
                  componentType={component.type}
                  onClick={() => handleComponentSelect(component.type)}
                  onDragStart={handleDragStart}
                />
              ))}
            </div>
          </SidebarSection>
        ) : (
          <>
            <SidebarSection title="Conteneurs" defaultOpen={true}>
              <div className="space-y-3">
                {filterComponents(containerComponents).map((component) => (
                  <ComponentPreviewCard
                    key={component.type}
                    title={component.title}
                    description={component.description}
                    previewImage={component.image}
                    componentType={component.type}
                    onClick={() => handleComponentSelect(component.type)}
                    onDragStart={handleDragStart}
                  />
                ))}
              </div>
            </SidebarSection>
            
            <SidebarSection title="Éléments de Base" defaultOpen={true}>
              <div className="space-y-3">
                {filterComponents(basicComponents).map((component) => (
                  <ComponentPreviewCard
                    key={component.type}
                    title={component.title}
                    description={component.description}
                    previewImage={component.image}
                    componentType={component.type}
                    onClick={() => handleComponentSelect(component.type)}
                    onDragStart={handleDragStart}
                  />
                ))}
              </div>
            </SidebarSection>
          </>
        )}
      </div>
    </div>
  );
};

export default Sidebar;

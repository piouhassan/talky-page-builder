
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { cn } from '@/lib/utils';
import SidebarComponentItem from './SidebarComponentItem';
import ComponentPreviewModal from './ComponentPreviewModal';

interface SidebarProps {
  onComponentSelect?: (componentType: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onComponentSelect }) => {
  const [activeTab, setActiveTab] = useState("layouts");
  const [searchTerm, setSearchTerm] = useState("");
  const [previewModal, setPreviewModal] = useState<{
    isVisible: boolean;
    position: { x: number; y: number };
    component: any;
  }>({
    isVisible: false,
    position: { x: 0, y: 0 },
    component: null
  });

  const handleComponentSelect = (componentType: string) => {
    if (onComponentSelect) {
      onComponentSelect(componentType);
    }
  };

  const handleDragStart = (e: React.DragEvent, componentType: string) => {
    e.dataTransfer.setData('componentType', componentType);
    
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

  const handleMouseEnter = (component: any, event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setPreviewModal({
      isVisible: true,
      position: {
        x: rect.right + 10,
        y: rect.top + rect.height / 2
      },
      component
    });
  };

  const handleMouseLeave = () => {
    setPreviewModal(prev => ({ ...prev, isVisible: false }));
  };

  // Component data
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

  const getAllComponents = () => {
    if (activeTab === "layouts") {
      return filterComponents(layoutComponents);
    } else {
      return [...filterComponents(containerComponents), ...filterComponents(basicComponents)];
    }
  };

  return (
    <>
      <div className="w-[280px] border-r border-gray-200 bg-white h-full flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Composants</h2>
          
          {/* Tabs */}
          <div className="flex space-x-1 mb-4">
            <Button 
              className={cn("flex-1 h-8 text-sm", 
                activeTab === "layouts" ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              )}
              onClick={() => setActiveTab("layouts")}
            >
              Layouts
            </Button>
            <Button 
              className={cn("flex-1 h-8 text-sm", 
                activeTab === "elements" ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              )}
              onClick={() => setActiveTab("elements")}
            >
              Éléments
            </Button>
          </div>
          
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Rechercher..."
              className="pl-9 h-9 bg-gray-50 border-gray-200"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        {/* Components list */}
        <div className="flex-1 overflow-y-auto">
          {getAllComponents().map((component) => (
            <SidebarComponentItem
              key={component.type}
              title={component.title}
              description={component.description}
              previewImage={component.image}
              componentType={component.type}
              onClick={() => handleComponentSelect(component.type)}
              onDragStart={handleDragStart}
              onMouseEnter={(e) => handleMouseEnter(component, e)}
              onMouseLeave={handleMouseLeave}
            />
          ))}
        </div>
      </div>

      {/* Preview Modal */}
      <ComponentPreviewModal
        isVisible={previewModal.isVisible}
        position={previewModal.position}
        componentType={previewModal.component?.type || ''}
        title={previewModal.component?.title || ''}
        description={previewModal.component?.description || ''}
        previewImage={previewModal.component?.image || ''}
      />
    </>
  );
};

export default Sidebar;

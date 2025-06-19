
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Plus, Settings, Trash2, Copy, Move } from "lucide-react";
import { cn } from '@/lib/utils';
import BlockRenderer from './blocks/BlockRenderer';

interface CanvasComponent {
  id: string;
  type: string;
  props: any;
}

interface CanvasProps {
  components: CanvasComponent[];
  onComponentsChange: (components: CanvasComponent[]) => void;
  onComponentSelect: (componentId: string | null) => void;
  selectedComponentId: string | null;
}

const Canvas: React.FC<CanvasProps> = ({ 
  components, 
  onComponentsChange, 
  onComponentSelect, 
  selectedComponentId 
}) => {
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const componentType = e.dataTransfer.getData('componentType');
    
    if (componentType) {
      const newComponent: CanvasComponent = {
        id: Date.now().toString(),
        type: componentType,
        props: getDefaultProps(componentType)
      };

      const newComponents = [...components];
      if (dragOverIndex !== null) {
        newComponents.splice(dragOverIndex, 0, newComponent);
      } else {
        newComponents.push(newComponent);
      }
      
      onComponentsChange(newComponents);
      setDragOverIndex(null);
    }
  };

  const handleDragOver = (e: React.DragEvent, index?: number) => {
    e.preventDefault();
    if (index !== undefined) {
      setDragOverIndex(index);
    } else {
      setDragOverIndex(null);
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect && (e.clientX < rect.left || e.clientX > rect.right || 
                 e.clientY < rect.top || e.clientY > rect.bottom)) {
      setDragOverIndex(null);
    }
  };

  const getDefaultProps = (componentType: string) => {
    const defaults: Record<string, any> = {
      Hero: {
        title: "Titre Principal",
        subtitle: "Sous-titre descriptif",
        buttonText: "Commencer",
        buttonLink: "#"
      },
      Navbar: {
        logo: "Logo",
        links: [
          { text: "Accueil", href: "#" },
          { text: "À propos", href: "#" },
          { text: "Services", href: "#" },
          { text: "Contact", href: "#" }
        ]
      },
      Footer: {
        companyName: "Mon Entreprise",
        links: [
          { text: "Politique de confidentialité", href: "#" },
          { text: "Conditions d'utilisation", href: "#" },
          { text: "Contact", href: "#" }
        ]
      },
      Paragraphe: {
        content: "Voici un paragraphe de texte que vous pouvez modifier."
      },
      Bouton: {
        text: "Cliquer ici",
        variant: "primary",
        href: "#"
      },
      Image: {
        src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop&auto=format",
        alt: "Image d'exemple",
        caption: "Légende de l'image"
      }
    };
    
    return defaults[componentType] || {};
  };

  const duplicateComponent = (componentId: string) => {
    const component = components.find(c => c.id === componentId);
    if (component) {
      const newComponent = {
        ...component,
        id: Date.now().toString()
      };
      const index = components.findIndex(c => c.id === componentId);
      const newComponents = [...components];
      newComponents.splice(index + 1, 0, newComponent);
      onComponentsChange(newComponents);
    }
  };

  const deleteComponent = (componentId: string) => {
    const newComponents = components.filter(c => c.id !== componentId);
    onComponentsChange(newComponents);
    if (selectedComponentId === componentId) {
      onComponentSelect(null);
    }
  };

  const moveComponent = (componentId: string, direction: 'up' | 'down') => {
    const index = components.findIndex(c => c.id === componentId);
    if (index === -1) return;
    
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= components.length) return;
    
    const newComponents = [...components];
    [newComponents[index], newComponents[newIndex]] = [newComponents[newIndex], newComponents[index]];
    onComponentsChange(newComponents);
  };

  return (
    <div className="flex-1 bg-gray-50 overflow-hidden">
      <div 
        ref={canvasRef}
        className="h-full overflow-y-auto"
        onDrop={handleDrop}
        onDragOver={(e) => handleDragOver(e)}
        onDragLeave={handleDragLeave}
      >
        {/* Canvas content container - larger and more centered */}
        <div className="min-h-full flex justify-center p-8">
          <div className="w-full max-w-6xl bg-white shadow-sm border border-gray-200 min-h-[800px] relative">
            {components.length === 0 ? (
              // Empty state
              <div 
                className="h-full flex flex-col items-center justify-center text-gray-400 border-2 border-dashed border-gray-300"
                onDragOver={(e) => handleDragOver(e)}
              >
                <div className="text-center p-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Plus size={32} className="text-gray-400" />
                  </div>
                  <h3 className="text-xl font-medium text-gray-600 mb-2">
                    Commencez votre design
                  </h3>
                  <p className="text-gray-500 max-w-md">
                    Glissez et déposez des composants depuis la barre latérale pour commencer à construire votre page.
                  </p>
                </div>
              </div>
            ) : (
              // Components list
              <div className="relative">
                {components.map((component, index) => (
                  <div key={component.id} className="relative group">
                    {/* Drop zone indicator */}
                    {dragOverIndex === index && (
                      <div className="h-2 bg-blue-500 rounded-full mx-4 my-2 opacity-75" />
                    )}
                    
                    {/* Component wrapper */}
                    <div 
                      className={cn(
                        "relative transition-all duration-200",
                        selectedComponentId === component.id 
                          ? "ring-2 ring-blue-500 ring-offset-2" 
                          : "hover:ring-1 hover:ring-gray-300"
                      )}
                      onClick={(e) => {
                        e.stopPropagation();
                        onComponentSelect(component.id);
                      }}
                      onDragOver={(e) => handleDragOver(e, index)}
                    >
                      {/* Component content */}
                      <BlockRenderer 
                        type={component.type} 
                        props={component.props}
                        isSelected={selectedComponentId === component.id}
                      />
                      
                      {/* Component controls - visible on hover or when selected */}
                      <div className={cn(
                        "absolute top-2 right-2 flex space-x-1 opacity-0 transition-opacity",
                        (selectedComponentId === component.id || "group-hover:opacity-100") && "opacity-100"
                      )}>
                        <Button
                          size="sm"
                          variant="secondary"
                          className="h-7 w-7 p-0 bg-white shadow-sm border"
                          onClick={(e) => {
                            e.stopPropagation();
                            moveComponent(component.id, 'up');
                          }}
                          disabled={index === 0}
                        >
                          <Move size={12} />
                        </Button>
                        
                        <Button
                          size="sm"
                          variant="secondary"
                          className="h-7 w-7 p-0 bg-white shadow-sm border"
                          onClick={(e) => {
                            e.stopPropagation();
                            duplicateComponent(component.id);
                          }}
                        >
                          <Copy size={12} />
                        </Button>
                        
                        <Button
                          size="sm"
                          variant="secondary"
                          className="h-7 w-7 p-0 bg-white shadow-sm border"
                          onClick={(e) => {
                            e.stopPropagation();
                            onComponentSelect(component.id);
                          }}
                        >
                          <Settings size={12} />
                        </Button>
                        
                        <Button
                          size="sm"
                          variant="destructive"
                          className="h-7 w-7 p-0 shadow-sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteComponent(component.id);
                          }}
                        >
                          <Trash2 size={12} />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Final drop zone */}
                {dragOverIndex === components.length && (
                  <div className="h-2 bg-blue-500 rounded-full mx-4 my-2 opacity-75" />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Canvas;

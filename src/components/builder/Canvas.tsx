
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Plus, Settings, Trash2, Copy, Move } from "lucide-react";
import { cn } from '@/lib/utils';
import BlockRenderer from './blocks/BlockRenderer';
import { ComponentData } from './BuilderLayout';

interface CanvasProps {
  viewportSize: 'desktop' | 'tablet' | 'mobile';
  selectedWidth: string;
  components: ComponentData[];
  setComponents: React.Dispatch<React.SetStateAction<ComponentData[]>>;
  selectedComponentId: string | null;
  addComponent: (componentData: ComponentData) => void;
  addComponentBetween: (componentData: ComponentData, index: number) => void;
}

const Canvas: React.FC<CanvasProps> = ({ 
  viewportSize,
  selectedWidth,
  components, 
  setComponents, 
  selectedComponentId,
  addComponent,
  addComponentBetween
}) => {
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const componentType = e.dataTransfer.getData('componentType');
    
    if (componentType) {
      const newComponent: ComponentData = {
        id: Date.now().toString(),
        type: componentType,
        content: getDefaultContent(componentType),
        style: getDefaultStyle(componentType)
      };

      if (dragOverIndex !== null) {
        addComponentBetween(newComponent, dragOverIndex);
      } else {
        addComponent(newComponent);
      }
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

  const getDefaultContent = (componentType: string) => {
    const defaults: Record<string, any> = {
      Hero: {
        title: "Titre Principal",
        subtitle: "Sous-titre descriptif",
        buttonText: "Commencer",
        buttonUrl: "#"
      },
      Navbar: {
        title: "Logo"
      },
      Footer: {
        title: "Mon Entreprise"
      },
      Paragraphe: {
        title: "Voici un paragraphe de texte que vous pouvez modifier."
      },
      Bouton: {
        title: "Cliquer ici",
        url: "#"
      },
      Image: {
        imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop&auto=format",
        alt: "Image d'exemple",
        caption: "Légende de l'image"
      }
    };
    
    return defaults[componentType] || {};
  };

  const getDefaultStyle = (componentType: string) => {
    return {
      backgroundColor: 'white',
      padding: '6',
      textAlign: 'left' as const
    };
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
      setComponents(newComponents);
    }
  };

  const deleteComponent = (componentId: string) => {
    const newComponents = components.filter(c => c.id !== componentId);
    setComponents(newComponents);
    
    // Dispatch event to deselect component
    if (selectedComponentId === componentId) {
      const event = new CustomEvent('component-selected', { 
        detail: { id: null, type: null }
      });
      window.dispatchEvent(event);
    }
  };

  const moveComponent = (componentId: string, direction: 'up' | 'down') => {
    const index = components.findIndex(c => c.id === componentId);
    if (index === -1) return;
    
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= components.length) return;
    
    const newComponents = [...components];
    [newComponents[index], newComponents[newIndex]] = [newComponents[newIndex], newComponents[index]];
    setComponents(newComponents);
  };

  const handleComponentClick = (componentId: string, componentType: string) => {
    const event = new CustomEvent('component-selected', { 
      detail: { id: componentId, type: componentType }
    });
    window.dispatchEvent(event);
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
        {/* Canvas content container */}
        <div className="min-h-full flex justify-center p-4">
          <div 
            className="w-full bg-white shadow-sm border border-gray-200 min-h-[800px] relative"
            style={{ 
              maxWidth: viewportSize === 'mobile' ? '375px' : 
                       viewportSize === 'tablet' ? '768px' : 
                       `${selectedWidth}px` 
            }}
          >
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
                        "relative transition-all duration-200 cursor-pointer",
                        selectedComponentId === component.id 
                          ? "ring-2 ring-blue-500 ring-offset-2" 
                          : "hover:ring-1 hover:ring-gray-300"
                      )}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleComponentClick(component.id, component.type);
                      }}
                      onDragOver={(e) => handleDragOver(e, index)}
                    >
                      {/* Component content */}
                      <BlockRenderer 
                        component={component}
                        isSelected={selectedComponentId === component.id}
                      />
                      
                      {/* Component controls */}
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
                            handleComponentClick(component.id, component.type);
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

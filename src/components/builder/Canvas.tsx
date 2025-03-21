
import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { XCircle, Copy, ArrowUp, ArrowDown } from "lucide-react";
import { ComponentData } from './BuilderLayout';
import BlockRenderer from './blocks/BlockRenderer';

interface CanvasProps {
  children?: React.ReactNode;
  viewportSize?: 'desktop' | 'tablet' | 'mobile';
  selectedWidth?: string;
  components: ComponentData[];
  setComponents: React.Dispatch<React.SetStateAction<ComponentData[]>>;
  selectedComponentId: string | null;
  addComponent: (componentData: ComponentData) => void;
}

const Canvas: React.FC<CanvasProps> = ({ 
  children, 
  viewportSize = 'desktop', 
  selectedWidth = "1440",
  components,
  setComponents,
  selectedComponentId,
  addComponent
}) => {
  const [dropzoneActive, setDropzoneActive] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);
  
  // Handle drag over event
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDropzoneActive(true);
  };
  
  const handleDragLeave = () => {
    setDropzoneActive(false);
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDropzoneActive(false);
    
    // Get the component type from dataTransfer
    const componentType = e.dataTransfer.getData('componentType') || "Hero";
    const componentVariant = e.dataTransfer.getData('componentVariant') || "";
    
    // Create a new component with default content based on type
    const newId = `component-${Date.now()}`;
    const newComponent: ComponentData = {
      id: newId,
      type: componentType,
    };
    
    // Add default content based on component type
    if (componentType === "Hero") {
      newComponent.content = {
        title: "Restez connecté avec vos amis et votre famille",
        subtitle: "Restez connecté avec vos proches, où que vous soyez et à tout moment. Créez des groupes, partagez des photos, et gardez le contact facilement.",
        buttonText: "Télécharger l'application",
        badge: "NOUVEAU"
      };
      newComponent.style = {
        backgroundColor: "builder-light-blue",
        padding: "12",
        textAlign: "center"
      };
    } else if (componentType === "Features") {
      newComponent.content = {
        title: "Nos fonctionnalités",
        subtitle: "Découvrez tout ce que notre application peut faire pour vous",
      };
      newComponent.style = {
        backgroundColor: "white",
        padding: "12",
        textAlign: "center"
      };
    } else if (componentType === "Paragraphe") {
      newComponent.content = {
        title: "Titre du paragraphe",
        subtitle: "Voici le contenu du paragraphe. Vous pouvez modifier ce texte dans le panneau des propriétés à droite.",
      };
      newComponent.style = {
        backgroundColor: "white",
        padding: "6",
        textAlign: "left"
      };
    } else if (componentType === "Bouton") {
      newComponent.content = {
        buttonText: "Cliquez ici",
      };
      newComponent.style = {
        backgroundColor: "white",
        padding: "6",
        textAlign: "center"
      };
    }
    
    // Add the new component
    addComponent(newComponent);
    
    // Select the newly added component
    const event = new CustomEvent('component-selected', { 
      detail: { id: newId, type: componentType }
    });
    window.dispatchEvent(event);
  };

  // Determine canvas width based on the selected screen size
  const getCanvasWidthClass = () => {
    switch (viewportSize) {
      case 'mobile':
        return 'max-w-sm'; // 384px (mobile equivalent)
      case 'tablet':
        return 'max-w-2xl'; // 672px (tablet equivalent)
      case 'desktop':
      default:
        return 'max-w-6xl'; // 1152px (desktop equivalent)
    }
  };

  // Select a component on click
  const handleComponentClick = (e: React.MouseEvent, id: string, type: string) => {
    e.stopPropagation();
    
    // Dispatch a custom event to notify the property panel
    const event = new CustomEvent('component-selected', { 
      detail: { id, type }
    });
    window.dispatchEvent(event);
  };

  // Deselect components when clicking on the canvas background
  const handleCanvasClick = (e: React.MouseEvent) => {
    if (e.target === canvasRef.current) {
      // Dispatch a custom event to notify the property panel
      const event = new CustomEvent('component-selected', { 
        detail: { id: null, type: null }
      });
      window.dispatchEvent(event);
    }
  };

  // Duplicate a component
  const handleDuplicate = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const componentToDuplicate = components.find(comp => comp.id === id);
    if (componentToDuplicate) {
      const newId = `component-${Date.now()}`;
      const newComponent = {
        ...JSON.parse(JSON.stringify(componentToDuplicate)),
        id: newId
      };
      
      // Insert after the original component
      const index = components.findIndex(comp => comp.id === id);
      const newComponents = [...components];
      newComponents.splice(index + 1, 0, newComponent);
      setComponents(newComponents);
    }
  };

  // Move component up
  const handleMoveUp = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const index = components.findIndex(comp => comp.id === id);
    if (index > 0) {
      const newComponents = [...components];
      const temp = newComponents[index - 1];
      newComponents[index - 1] = newComponents[index];
      newComponents[index] = temp;
      setComponents(newComponents);
    }
  };

  // Move component down
  const handleMoveDown = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const index = components.findIndex(comp => comp.id === id);
    if (index < components.length - 1) {
      const newComponents = [...components];
      const temp = newComponents[index + 1];
      newComponents[index + 1] = newComponents[index];
      newComponents[index] = temp;
      setComponents(newComponents);
    }
  };
  
  return (
    <div 
      className="flex-1 overflow-auto bg-builder-gray p-8 transition-all"
      onClick={handleCanvasClick}
      ref={canvasRef}
    >
      <div className="flex flex-col items-center w-full">
        <div className="bg-gray-700 text-white text-xs px-4 py-1 rounded-t-md">
          {viewportSize === 'desktop' ? 'Desktop (>1024px)' : 
           viewportSize === 'tablet' ? 'Tablet (768px - 1024px)' : 
           'Mobile (<768px)'} - {selectedWidth}px
        </div>
        <div 
          className={`w-full ${getCanvasWidthClass()} mx-auto bg-white shadow-lg rounded-b-lg min-h-[600px] editable-area transition-all ${
            dropzoneActive ? 'dropzone active border-2 border-dashed border-builder-blue' : 'dropzone'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {components.length === 0 ? (
            <div className="flex items-center justify-center h-full text-gray-400 flex-col">
              <p className="mb-4 text-lg">Glissez et déposez des composants ici</p>
              <p className="text-sm">Ou choisissez un modèle pour commencer</p>
            </div>
          ) : (
            components.map((component) => (
              <div 
                key={component.id} 
                className={`relative border-2 ${selectedComponentId === component.id ? 'border-builder-blue' : 'border-transparent'} hover:border-builder-blue group`}
                onClick={(e) => handleComponentClick(e, component.id, component.type)}
              >
                <BlockRenderer component={component} isSelected={selectedComponentId === component.id} />
                
                {/* Component action buttons */}
                <div className="absolute top-2 right-2 flex space-x-1 bg-white border border-gray-200 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="h-8 w-8"
                    onClick={(e) => handleDuplicate(e, component.id)}
                    title="Dupliquer"
                  >
                    <Copy size={16} className="text-gray-500" />
                  </Button>
                  
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="h-8 w-8"
                    onClick={(e) => handleMoveUp(e, component.id)}
                    disabled={components.indexOf(component) === 0}
                    title="Déplacer vers le haut"
                  >
                    <ArrowUp size={16} className="text-gray-500" />
                  </Button>
                  
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="h-8 w-8"
                    onClick={(e) => handleMoveDown(e, component.id)}
                    disabled={components.indexOf(component) === components.length - 1}
                    title="Déplacer vers le bas"
                  >
                    <ArrowDown size={16} className="text-gray-500" />
                  </Button>
                  
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="h-8 w-8"
                    onClick={(e) => {
                      e.stopPropagation();
                      setComponents(components.filter(comp => comp.id !== component.id));
                      if (selectedComponentId === component.id) {
                        // Notify property panel
                        const event = new CustomEvent('component-selected', { 
                          detail: { id: null, type: null }
                        });
                        window.dispatchEvent(event);
                      }
                    }}
                    title="Supprimer"
                  >
                    <XCircle size={16} className="text-gray-500" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Canvas;

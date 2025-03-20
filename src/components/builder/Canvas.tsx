
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { XCircle, Copy, ArrowUp, ArrowDown } from "lucide-react";
import { ComponentData } from './BuilderLayout';

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
        backgroundColor: "#E9F0FF",
        padding: "12",
        textAlign: "center"
      };
    } else if (componentType === "Features") {
      newComponent.content = {
        title: "Nos fonctionnalités",
        subtitle: "Découvrez tout ce que notre application peut faire pour vous",
      };
      newComponent.style = {
        backgroundColor: "#FFFFFF",
        padding: "12",
        textAlign: "center"
      };
    } else if (componentType === "Paragraphe") {
      newComponent.content = {
        title: "Titre du paragraphe",
        subtitle: "Voici le contenu du paragraphe. Vous pouvez modifier ce texte dans le panneau des propriétés à droite.",
      };
      newComponent.style = {
        backgroundColor: "#FFFFFF",
        padding: "6",
        textAlign: "left"
      };
    } else if (componentType === "Bouton") {
      newComponent.content = {
        buttonText: "Cliquez ici",
      };
      newComponent.style = {
        backgroundColor: "#FFFFFF",
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

  // Render component based on type
  const renderComponent = (component: ComponentData) => {
    const { id, type, content, style } = component;
    
    switch(type) {
      case "Hero":
        return (
          <div 
            className={`bg-${style?.backgroundColor || 'builder-light-blue'} p-${style?.padding || '12'} text-${style?.textAlign || 'center'}`}
          >
            <div className="max-w-3xl mx-auto">
              {content?.badge && (
                <span className="inline-block py-1 px-3 rounded-full bg-white text-builder-blue text-xs font-medium mb-4">
                  {content.badge}
                </span>
              )}
              {content?.title && (
                <h1 className="text-4xl font-bold text-gray-900 mb-6">{content.title}</h1>
              )}
              {content?.subtitle && (
                <p className="text-lg text-gray-600 mb-8">{content.subtitle}</p>
              )}
              {content?.buttonText && (
                <Button className="bg-builder-blue hover:bg-builder-dark-blue text-white px-6 py-2 rounded-md">
                  {content.buttonText}
                </Button>
              )}
            </div>
          </div>
        );
      
      case "Features":
        return (
          <div className={`bg-${style?.backgroundColor || 'white'} p-${style?.padding || '12'} text-${style?.textAlign || 'center'}`}>
            <div className="max-w-5xl mx-auto">
              {content?.title && (
                <h2 className="text-3xl font-bold text-gray-900 mb-4">{content.title}</h2>
              )}
              {content?.subtitle && (
                <p className="text-lg text-gray-600 mb-12 max-w-3xl mx-auto">{content.subtitle}</p>
              )}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="w-12 h-12 bg-builder-light-blue rounded-full flex items-center justify-center mb-4 mx-auto">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 3v4M3 5h4M6 17v4M4 19h4M13 3l4 4M17 5l-4 4M14 17l3 3M17 17l-3 3" stroke="#4361EE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-center">Simple d'utilisation</h3>
                  <p className="text-gray-600 text-center">Notre application est conçue pour être facile à utiliser dès le premier jour.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="w-12 h-12 bg-builder-light-blue rounded-full flex items-center justify-center mb-4 mx-auto">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2v6M12 22v-6M4.93 4.93l4.24 4.24M14.83 14.83l4.24 4.24M2 12h6M22 12h-6M4.93 19.07l4.24-4.24M14.83 9.17l4.24-4.24" stroke="#4361EE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-center">Rapide et fiable</h3>
                  <p className="text-gray-600 text-center">Performance optimisée pour vous offrir la meilleure expérience possible.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="w-12 h-12 bg-builder-light-blue rounded-full flex items-center justify-center mb-4 mx-auto">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" stroke="#4361EE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M9 12l2 2 4-4" stroke="#4361EE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-center">Sécurisé</h3>
                  <p className="text-gray-600 text-center">Vos données sont protégées avec les meilleures pratiques de sécurité.</p>
                </div>
              </div>
            </div>
          </div>
        );
      
      case "Paragraphe":
        return (
          <div className={`bg-${style?.backgroundColor || 'white'} p-${style?.padding || '6'} text-${style?.textAlign || 'left'}`}>
            {content?.title && (
              <h3 className="text-2xl font-bold mb-4">{content.title}</h3>
            )}
            {content?.subtitle && (
              <p className="text-gray-700">{content.subtitle}</p>
            )}
          </div>
        );
      
      case "Bouton":
        return (
          <div className={`bg-${style?.backgroundColor || 'white'} p-${style?.padding || '6'} text-${style?.textAlign || 'center'}`}>
            <Button className="bg-builder-blue hover:bg-builder-dark-blue text-white px-6 py-2 rounded-md">
              {content?.buttonText || "Cliquez ici"}
            </Button>
          </div>
        );
      
      default:
        return (
          <div className="bg-gray-100 p-6 text-center">
            <p className="text-gray-500">Composant non reconnu: {type}</p>
          </div>
        );
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
                {renderComponent(component)}
                
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


import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { XCircle, Copy, ArrowUp, ArrowDown } from "lucide-react";

interface CanvasProps {
  children?: React.ReactNode;
  viewportSize?: 'desktop' | 'tablet' | 'mobile';
  selectedWidth?: string;
}

const Canvas: React.FC<CanvasProps> = ({ children, viewportSize = 'desktop', selectedWidth = "1440" }) => {
  const [dropzoneActive, setDropzoneActive] = useState(false);
  const [placedComponents, setPlacedComponents] = useState<{id: string, type: string}[]>([]);
  const [selectedComponentId, setSelectedComponentId] = useState<string | null>(null);
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
    
    // In a real implementation, we would analyze the transferred data to identify
    // the dropped component. For this example, we're simulating dropping a "Hero" component.
    const newId = `component-${Date.now()}`;
    setPlacedComponents([...placedComponents, { id: newId, type: "Hero" }]);
    
    // Select the newly added component
    setSelectedComponentId(newId);
    
    // Dispatch a custom event to notify the property panel
    const event = new CustomEvent('component-selected', { 
      detail: { id: newId, type: "Hero" }
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
    setSelectedComponentId(id);
    
    // Dispatch a custom event to notify the property panel
    const event = new CustomEvent('component-selected', { 
      detail: { id, type }
    });
    window.dispatchEvent(event);
  };

  // Deselect components when clicking on the canvas background
  const handleCanvasClick = (e: React.MouseEvent) => {
    if (e.target === canvasRef.current) {
      setSelectedComponentId(null);
      
      // Dispatch a custom event to notify the property panel
      const event = new CustomEvent('component-selected', { 
        detail: { id: null, type: null }
      });
      window.dispatchEvent(event);
    }
  };

  // Duplicate a component
  const handleDuplicate = (e: React.MouseEvent, id: string, type: string) => {
    e.stopPropagation();
    const componentToDuplicate = placedComponents.find(comp => comp.id === id);
    if (componentToDuplicate) {
      const newId = `component-${Date.now()}`;
      const index = placedComponents.findIndex(comp => comp.id === id);
      const newComponents = [...placedComponents];
      newComponents.splice(index + 1, 0, { id: newId, type });
      setPlacedComponents(newComponents);
    }
  };

  // Move component up
  const handleMoveUp = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const index = placedComponents.findIndex(comp => comp.id === id);
    if (index > 0) {
      const newComponents = [...placedComponents];
      const temp = newComponents[index - 1];
      newComponents[index - 1] = newComponents[index];
      newComponents[index] = temp;
      setPlacedComponents(newComponents);
    }
  };

  // Move component down
  const handleMoveDown = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const index = placedComponents.findIndex(comp => comp.id === id);
    if (index < placedComponents.length - 1) {
      const newComponents = [...placedComponents];
      const temp = newComponents[index + 1];
      newComponents[index + 1] = newComponents[index];
      newComponents[index] = temp;
      setPlacedComponents(newComponents);
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
          {placedComponents.length === 0 ? (
            <div className="flex items-center justify-center h-full text-gray-400 flex-col">
              <p className="mb-4 text-lg">Glissez et déposez des composants ici</p>
              <p className="text-sm">Ou choisissez un modèle pour commencer</p>
            </div>
          ) : (
            placedComponents.map(({ id, type }) => (
              <div 
                key={id} 
                className={`relative border-2 ${selectedComponentId === id ? 'border-builder-blue' : 'border-transparent'} hover:border-builder-blue group`}
                onClick={(e) => handleComponentClick(e, id, type)}
              >
                {type === "Hero" && (
                  <div className="bg-builder-light-blue p-12 text-center">
                    <div className="max-w-3xl mx-auto">
                      <span className="inline-block py-1 px-3 rounded-full bg-white text-builder-blue text-xs font-medium mb-4">NOUVEAU</span>
                      <h1 className="text-4xl font-bold text-gray-900 mb-6">Restez connecté avec vos amis et votre famille</h1>
                      <p className="text-lg text-gray-600 mb-8">Restez connecté avec vos proches, où que vous soyez et à tout moment. Créez des groupes, partagez des photos, et gardez le contact facilement.</p>
                      <Button className="bg-builder-blue hover:bg-builder-dark-blue text-white px-6 py-2 rounded-md">
                        Télécharger l'application
                      </Button>
                    </div>
                  </div>
                )}
                
                {/* Component action buttons */}
                <div className="absolute top-2 right-2 flex space-x-1 bg-white border border-gray-200 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="h-8 w-8"
                    onClick={(e) => handleDuplicate(e, id, type)}
                    title="Dupliquer"
                  >
                    <Copy size={16} className="text-gray-500" />
                  </Button>
                  
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="h-8 w-8"
                    onClick={(e) => handleMoveUp(e, id)}
                    disabled={placedComponents.indexOf(placedComponents.find(comp => comp.id === id)!) === 0}
                    title="Déplacer vers le haut"
                  >
                    <ArrowUp size={16} className="text-gray-500" />
                  </Button>
                  
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="h-8 w-8"
                    onClick={(e) => handleMoveDown(e, id)}
                    disabled={placedComponents.indexOf(placedComponents.find(comp => comp.id === id)!) === placedComponents.length - 1}
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
                      const updatedComponents = placedComponents.filter(comp => comp.id !== id);
                      setPlacedComponents(updatedComponents);
                      if (selectedComponentId === id) {
                        setSelectedComponentId(null);
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

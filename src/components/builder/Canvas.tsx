
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { XCircle } from "lucide-react";

interface CanvasProps {
  children?: React.ReactNode;
}

const Canvas: React.FC<CanvasProps> = ({ children }) => {
  const [dropzoneActive, setDropzoneActive] = useState(false);
  const [placedComponents, setPlacedComponents] = useState<string[]>([]);
  const [viewportSize, setViewportSize] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  
  useEffect(() => {
    const handleViewportChange = (event: Event) => {
      const customEvent = event as CustomEvent;
      if (customEvent.detail && customEvent.detail.viewport) {
        setViewportSize(customEvent.detail.viewport);
      }
    };
    
    window.addEventListener('viewport-change', handleViewportChange);
    
    return () => {
      window.removeEventListener('viewport-change', handleViewportChange);
    };
  }, []);
  
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
    
    // Dans un cas réel, nous analyserions les données transférées pour identifier
    // le composant déposé. Pour l'exemple, nous ajoutons simplement un composant "Hero".
    setPlacedComponents([...placedComponents, "Hero"]);
  };

  // Détermine la largeur du canvas en fonction de la taille d'écran sélectionnée
  const getCanvasWidthClass = () => {
    switch (viewportSize) {
      case 'mobile':
        return 'max-w-sm'; // 384px (équivalent à un téléphone)
      case 'tablet':
        return 'max-w-2xl'; // 672px (équivalent à une tablette)
      case 'desktop':
      default:
        return 'max-w-6xl'; // 1152px (équivalent à un desktop)
    }
  };
  
  return (
    <div className="flex-1 overflow-auto bg-builder-gray p-8 transition-all">
      <div className="flex flex-col items-center w-full">
        <div className="bg-gray-700 text-white text-xs px-4 py-1 rounded-t-md">
          {viewportSize === 'desktop' ? 'Desktop (>1024px)' : 
           viewportSize === 'tablet' ? 'Tablet (768px - 1024px)' : 
           'Mobile (<768px)'}
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
            placedComponents.map((component, index) => (
              <div key={index} className="relative border-2 border-transparent hover:border-builder-blue group">
                {component === "Hero" && (
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
                
                <Button 
                  variant="outline" 
                  size="icon"
                  className="absolute top-2 right-2 bg-white border-gray-200 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => {
                    const updatedComponents = [...placedComponents];
                    updatedComponents.splice(index, 1);
                    setPlacedComponents(updatedComponents);
                  }}
                >
                  <XCircle size={16} className="text-gray-500" />
                </Button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Canvas;

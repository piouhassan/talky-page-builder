
import React, { useState, useRef, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { XCircle, Copy, ArrowUp, ArrowDown, Plus } from "lucide-react";
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
  addComponentBetween?: (componentData: ComponentData, index: number) => void;
}

const Canvas: React.FC<CanvasProps> = ({ 
  children, 
  viewportSize = 'desktop', 
  selectedWidth = "1440",
  components,
  setComponents,
  selectedComponentId,
  addComponent,
  addComponentBetween
}) => {
  const [dropzoneActive, setDropzoneActive] = useState(false);
  const [betweenDropzoneActive, setbetweenDropzoneActive] = useState<number | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  
  // Create component data based on type - moved this function to the top so it's defined before use
  const createComponentFromType = useCallback((componentType: string, uniqueId: string): ComponentData => {
    const newComponent: ComponentData = {
      id: uniqueId,
      type: componentType,
    };
    
    // Add default content based on component type
    if (componentType === "Hero") {
      newComponent.content = {
        title: "Restez connecté avec vos amis et votre famille",
        subtitle: "Restez connecté avec vos proches, où que vous soyez et à tout moment. Créez des groupes, partagez des photos, et gardez le contact facilement.",
        buttonText: "Télécharger l'application",
        badge: "NOUVEAU",
        imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=400&q=80"
      };
      newComponent.style = {
        backgroundColor: "builder-light-blue",
        padding: "12",
        textAlign: "center"
      };
    } else if (componentType === "Navbar") {
      newComponent.content = {
        title: "Ma Marque",
        subtitle: "Accueil,Fonctionnalités,Tarifs,Contact",
        buttonText: "Connexion"
      };
      newComponent.style = {
        backgroundColor: "white",
        padding: "4",
        textAlign: "center"
      };
    } else if (componentType === "Footer") {
      newComponent.content = {
        title: "Ma Marque",
        subtitle: "© 2023 Ma Marque. Tous droits réservés.",
        buttonText: "Politique de confidentialité,Conditions d'utilisation,Contact"
      };
      newComponent.style = {
        backgroundColor: "gray-100",
        padding: "8",
        textAlign: "center"
      };
    } else if (componentType === "Features") {
      newComponent.content = {
        title: "Nos fonctionnalités",
        subtitle: "Découvrez tout ce que notre application peut faire pour vous",
        features: [
          {
            title: "Simple d'utilisation",
            description: "Notre application est conçue pour être facile à utiliser dès le premier jour."
          },
          {
            title: "Rapide et fiable",
            description: "Performance optimisée pour vous offrir la meilleure expérience possible."
          },
          {
            title: "Sécurisé",
            description: "Vos données sont protégées avec les meilleures pratiques de sécurité."
          }
        ]
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
        url: "https://example.com"
      };
      newComponent.style = {
        backgroundColor: "white",
        padding: "6",
        textAlign: "center"
      };
    } else if (componentType === "Image") {
      newComponent.content = {
        imageUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=400&q=80",
        alt: "Image descriptive",
        caption: "Légende de l'image"
      };
      newComponent.style = {
        backgroundColor: "white",
        padding: "6",
        textAlign: "center"
      };
    } else if (componentType === "Testimonial") {
      newComponent.content = {
        quote: "Ce produit a complètement transformé notre façon de travailler. Je le recommande vivement !",
        author: "Jean Dupont",
        role: "Directeur Marketing",
        avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&h=100&q=80"
      };
      newComponent.style = {
        backgroundColor: "builder-light-blue",
        padding: "8",
        textAlign: "center"
      };
    } else if (componentType === "Container") {
      newComponent.content = {
        title: "Conteneur",
        subtitle: "Utilisez ce conteneur pour organiser vos composants",
        children: []
      };
      newComponent.style = {
        backgroundColor: "white",
        padding: "6",
        textAlign: "left"
      };
    } else if (componentType === "GridTwoCols") {
      newComponent.content = {
        title: "Grille à deux colonnes",
        subtitle: "Organisez votre contenu en deux colonnes",
        leftChildren: [],
        rightChildren: [],
        gap: "6"
      };
      newComponent.style = {
        backgroundColor: "white",
        padding: "6",
        textAlign: "left"
      };
    } else if (componentType === "GridThreeCols") {
      newComponent.content = {
        title: "Grille à trois colonnes",
        subtitle: "Organisez votre contenu en trois colonnes",
        columns: [[], [], []],
        gap: "6"
      };
      newComponent.style = {
        backgroundColor: "white",
        padding: "6",
        textAlign: "left"
      };
    } else if (componentType === "Flexbox") {
      newComponent.content = {
        title: "Disposition Flexbox",
        subtitle: "Organisez votre contenu avec flexbox",
        children: [],
        direction: "row",
        wrap: true,
        justifyContent: "center",
        gap: "4"
      };
      newComponent.style = {
        backgroundColor: "white",
        padding: "6",
        textAlign: "left"
      };
    } else if (componentType === "Pricing") {
      newComponent.style = {
        backgroundColor: "white",
        padding: "12",
        textAlign: "center"
      };
    } else if (componentType === "FAQ") {
      newComponent.style = {
        backgroundColor: "white",
        padding: "12",
        textAlign: "left"
      };
    } else if (componentType === "CTA") {
      newComponent.content = {
        title: "Prêt à commencer ?",
        subtitle: "Rejoignez des milliers d'utilisateurs satisfaits dès aujourd'hui.",
        buttonText: "Commencer gratuitement",
        secondaryButtonText: "En savoir plus"
      };
      newComponent.style = {
        backgroundColor: "blue-500",
        padding: "12",
        textAlign: "center",
        layout: "center"
      };
    }

    return newComponent;
  }, []);
  
  // Handle drag over event
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDropzoneActive(true);
  }, []);
  
  const handleDragLeave = useCallback(() => {
    setDropzoneActive(false);
  }, []);

  // Handle drag over for between components
  const handleBetweenDragOver = useCallback((e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.stopPropagation();
    setbetweenDropzoneActive(index);
  }, []);
  
  const handleBetweenDragLeave = useCallback(() => {
    setbetweenDropzoneActive(null);
  }, []);

  // Handle drop for between components
  const handleBetweenDrop = useCallback((e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.stopPropagation();
    setbetweenDropzoneActive(null);
    
    // Get the component type from dataTransfer
    const componentType = e.dataTransfer.getData('componentType') || "Hero";
    const componentVariant = e.dataTransfer.getData('componentVariant') || "";
    
    // Generate a truly unique ID using timestamp and random string
    const uniqueId = `component-${Date.now()}-${Math.random().toString(36).substring(2, 10)}`;
    
    // Create a new component with default content based on type
    const newComponent = createComponentFromType(componentType, uniqueId);
    
    // Add component at specific index
    if (addComponentBetween) {
      addComponentBetween(newComponent, index);
    }
  }, [addComponentBetween, createComponentFromType]);
  
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDropzoneActive(false);
    
    // Get the component type from dataTransfer
    const componentType = e.dataTransfer.getData('componentType') || "Hero";
    const componentVariant = e.dataTransfer.getData('componentVariant') || "";
    
    // Generate a truly unique ID using timestamp and random string
    const uniqueId = `component-${Date.now()}-${Math.random().toString(36).substring(2, 10)}`;
    
    // Create a new component with default content based on type
    const newComponent = createComponentFromType(componentType, uniqueId);
    
    // Add the new component
    addComponent(newComponent);
    
    // Select the newly added component
    const event = new CustomEvent('component-selected', { 
      detail: { id: uniqueId, type: componentType }
    });
    window.dispatchEvent(event);
  }, [addComponent, createComponentFromType]);

  // Handle dropping components into a container
  const handleContainerDrop = useCallback((e: React.DragEvent, containerId: string) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Get the component type from dataTransfer
    const componentType = e.dataTransfer.getData('componentType') || "Paragraphe";
    const componentVariant = e.dataTransfer.getData('componentVariant') || "";
    
    // Generate a unique ID for the new component
    const uniqueId = `component-${Date.now()}-${Math.random().toString(36).substring(2, 10)}`;
    
    // Create a new component
    const newComponent = createComponentFromType(componentType, uniqueId);
    
    // Find the container component and update its children
    setComponents(prevComponents => {
      return prevComponents.map(component => {
        if (component.id === containerId) {
          // Initialize the children array if it doesn't exist
          if (!component.content) {
            component.content = {};
          }
          if (!component.content.children) {
            component.content.children = [];
          }
          
          // Add the new component to the children array
          return {
            ...component,
            content: {
              ...component.content,
              children: [...component.content.children, newComponent]
            }
          };
        }
        return component;
      }) as ComponentData[];  // Explicitly cast to ensure type compatibility
    });
    
    // Select the newly added component
    const event = new CustomEvent('component-selected', { 
      detail: { id: uniqueId, type: componentType }
    });
    window.dispatchEvent(event);
  }, [setComponents, createComponentFromType]);

  // Handle dropping components into a grid column
  const handleColumnDrop = useCallback((e: React.DragEvent, containerId: string, columnIndex: number) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Get the component type from dataTransfer
    const componentType = e.dataTransfer.getData('componentType') || "Paragraphe";
    const componentVariant = e.dataTransfer.getData('componentVariant') || "";
    
    // Generate a unique ID for the new component
    const uniqueId = `component-${Date.now()}-${Math.random().toString(36).substring(2, 10)}`;
    
    // Create a new component
    const newComponent = createComponentFromType(componentType, uniqueId);
    
    // Find the grid component and update its columns
    setComponents(prevComponents => {
      return prevComponents.map(component => {
        if (component.id === containerId) {
          // For GridTwoCols
          if (component.type === "GridTwoCols") {
            if (!component.content) {
              component.content = {};
            }
            
            if (columnIndex === 0) {
              // Left column
              if (!component.content.leftChildren) {
                component.content.leftChildren = [];
              }
              
              return {
                ...component,
                content: {
                  ...component.content,
                  leftChildren: [...component.content.leftChildren, newComponent]
                }
              };
            } else {
              // Right column
              if (!component.content.rightChildren) {
                component.content.rightChildren = [];
              }
              
              return {
                ...component,
                content: {
                  ...component.content,
                  rightChildren: [...component.content.rightChildren, newComponent]
                }
              };
            }
          } 
          // For GridThreeCols
          else if (component.type === "GridThreeCols") {
            if (!component.content) {
              component.content = {};
            }
            
            if (!component.content.columns) {
              // Initialize as an array with three empty arrays
              component.content.columns = [[], [], []];
            }
            
            // Create a copy of the columns array
            const newColumns = [...component.content.columns];
            
            // Ensure the column at the specified index exists
            if (!newColumns[columnIndex]) {
              newColumns[columnIndex] = [];
            }
            
            // Add the new component to the specified column
            newColumns[columnIndex] = [...newColumns[columnIndex], newComponent];
            
            // Return the updated component
            return {
              ...component,
              content: {
                ...component.content,
                columns: newColumns
              }
            };
          }
        }
        return component;
      }) as ComponentData[];  // Explicitly cast to ensure type compatibility
    });
    
    // Select the newly added component
    const event = new CustomEvent('component-selected', { 
      detail: { id: uniqueId, type: componentType }
    });
    window.dispatchEvent(event);
  }, [setComponents, createComponentFromType]);

  // Determine canvas width based on the selected screen size
  const getCanvasWidthClass = useCallback(() => {
    switch (viewportSize) {
      case 'mobile':
        return 'max-w-sm'; // 384px (mobile equivalent)
      case 'tablet':
        return 'max-w-2xl'; // 672px (tablet equivalent)
      case 'desktop':
      default:
        return 'max-w-6xl'; // 1152px (desktop equivalent)
    }
  }, [viewportSize]);

  // Select a component on click
  const handleComponentClick = useCallback((e: React.MouseEvent, id: string, type: string) => {
    e.stopPropagation();
    
    // Dispatch a custom event to notify the property panel
    const event = new CustomEvent('component-selected', { 
      detail: { id, type }
    });
    window.dispatchEvent(event);
  }, []);

  // Deselect components when clicking on the canvas background
  const handleCanvasClick = useCallback((e: React.MouseEvent) => {
    if (e.target === canvasRef.current) {
      // Dispatch a custom event to notify the property panel
      const event = new CustomEvent('component-selected', { 
        detail: { id: null, type: null }
      });
      window.dispatchEvent(event);
    }
  }, []);

  // Duplicate a component
  const handleDuplicate = useCallback((e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const componentToDuplicate = components.find(comp => comp.id === id);
    if (componentToDuplicate) {
      // Generate a truly unique ID for the duplicate
      const uniqueId = `component-${Date.now()}-${Math.random().toString(36).substring(2, 10)}`;
      const newComponent = {
        ...JSON.parse(JSON.stringify(componentToDuplicate)),
        id: uniqueId
      };
      
      // Insert after the original component
      const index = components.findIndex(comp => comp.id === id);
      const newComponents = [...components];
      newComponents.splice(index + 1, 0, newComponent);
      setComponents(newComponents);
    }
  }, [components, setComponents]);

  // Move component up
  const handleMoveUp = useCallback((e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const index = components.findIndex(comp => comp.id === id);
    if (index > 0) {
      const newComponents = [...components];
      const temp = newComponents[index - 1];
      newComponents[index - 1] = newComponents[index];
      newComponents[index] = temp;
      setComponents(newComponents);
    }
  }, [components, setComponents]);

  // Move component down
  const handleMoveDown = useCallback((e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const index = components.findIndex(comp => comp.id === id);
    if (index < components.length - 1) {
      const newComponents = [...components];
      const temp = newComponents[index + 1];
      newComponents[index + 1] = newComponents[index];
      newComponents[index] = temp;
      setComponents(newComponents);
    }
  }, [components, setComponents]);

  // Add component button between existing components
  const handleAddComponentClick = useCallback((index: number) => {
    // Create a new Paragraph component as a default
    const uniqueId = `component-${Date.now()}-${Math.random().toString(36).substring(2, 10)}`;
    const newComponent = createComponentFromType("Paragraphe", uniqueId);
    
    if (addComponentBetween) {
      addComponentBetween(newComponent, index);
    }
    
    // Select the newly added component
    const event = new CustomEvent('component-selected', { 
      detail: { id: uniqueId, type: "Paragraphe" }
    });
    window.dispatchEvent(event);
  }, [addComponentBetween, createComponentFromType]);
  
  return (
    <div 
      className="flex-1 overflow-auto bg-gradient-to-br from-gray-50 to-gray-100 transition-all"
      onClick={handleCanvasClick}
      ref={canvasRef}
    >
      <div className="flex flex-col items-center w-full min-h-full p-8">
        {/* Viewport indicator */}
        <div className="mb-4 bg-gray-800 text-white text-xs px-4 py-2 rounded-full shadow-lg">
          {viewportSize === 'desktop' ? '🖥️ Desktop' : 
           viewportSize === 'tablet' ? '📱 Tablet' : 
           '📱 Mobile'} - {selectedWidth}px
        </div>

        {/* Main Canvas */}
        <div 
          className={`w-full ${getCanvasWidthClass()} mx-auto bg-white shadow-2xl rounded-lg min-h-[700px] transition-all duration-300 ${
            dropzoneActive ? 'ring-4 ring-blue-300 ring-opacity-50 scale-[1.02]' : 'hover:shadow-3xl'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          style={{
            boxShadow: dropzoneActive 
              ? '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 4px rgba(59, 130, 246, 0.3)' 
              : '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
          }}
        >
          {components.length === 0 ? (
            <div className="flex items-center justify-center h-full min-h-[700px] text-gray-400 flex-col">
              <div className="text-center max-w-md">
                <div className="mb-6">
                  <div className="w-24 h-24 mx-auto bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mb-4">
                    <Plus size={32} className="text-blue-500" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">Commencez à créer</h3>
                <p className="text-gray-500 mb-6">Glissez et déposez des composants depuis la sidebar pour construire votre page</p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <div className="flex items-center text-sm text-gray-400">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                    Glisser-déposer
                  </div>
                  <div className="flex items-center text-sm text-gray-400">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                    Édition en temps réel
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* Add button at the top */}
              <div 
                className="relative w-full py-3 group hover:bg-blue-50 transition-colors cursor-pointer flex justify-center border-b border-gray-100"
                onDragOver={(e) => handleBetweenDragOver(e, 0)}
                onDragLeave={handleBetweenDragLeave}
                onDrop={(e) => handleBetweenDrop(e, 0)}
              >
                <div className={`h-1 w-full ${betweenDropzoneActive === 0 ? 'bg-blue-500' : 'bg-transparent'} transition-colors rounded-full mx-auto`}></div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="absolute opacity-0 group-hover:opacity-100 transition-opacity shadow-lg border-blue-200 hover:border-blue-300"
                  onClick={() => handleAddComponentClick(0)}
                >
                  <Plus size={16} className="mr-1" /> Ajouter un composant
                </Button>
              </div>
              
              {components.map((component, index) => (
                <React.Fragment key={component.id}>
                  <div 
                    className={`relative transition-all duration-200 ${
                      selectedComponentId === component.id 
                        ? 'ring-2 ring-blue-500 ring-opacity-50 bg-blue-50' 
                        : 'hover:ring-2 hover:ring-gray-300 hover:ring-opacity-50 group'
                    }`}
                    onClick={(e) => handleComponentClick(e, component.id, component.type)}
                  >
                    <BlockRenderer 
                      component={component} 
                      isSelected={selectedComponentId === component.id}
                      onContainerDrop={handleContainerDrop}
                      onColumnDrop={handleColumnDrop}
                    />
                    
                    {/* Component action buttons */}
                    <div className="absolute top-3 right-3 flex space-x-1 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-200 transform group-hover:scale-100 scale-95">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className="h-8 w-8 hover:bg-blue-50"
                        onClick={(e) => handleDuplicate(e, component.id)}
                        title="Dupliquer"
                      >
                        <Copy size={14} className="text-gray-600" />
                      </Button>
                      
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className="h-8 w-8 hover:bg-blue-50"
                        onClick={(e) => handleMoveUp(e, component.id)}
                        disabled={components.indexOf(component) === 0}
                        title="Déplacer vers le haut"
                      >
                        <ArrowUp size={14} className="text-gray-600" />
                      </Button>
                      
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className="h-8 w-8 hover:bg-blue-50"
                        onClick={(e) => handleMoveDown(e, component.id)}
                        disabled={components.indexOf(component) === components.length - 1}
                        title="Déplacer vers le bas"
                      >
                        <ArrowDown size={14} className="text-gray-600" />
                      </Button>
                      
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className="h-8 w-8 hover:bg-red-50"
                        onClick={(e) => {
                          e.stopPropagation();
                          setComponents(components.filter(comp => comp.id !== component.id));
                          if (selectedComponentId === component.id) {
                            const event = new CustomEvent('component-selected', { 
                              detail: { id: null, type: null }
                            });
                            window.dispatchEvent(event);
                          }
                        }}
                        title="Supprimer"
                      >
                        <XCircle size={14} className="text-red-500" />
                      </Button>
                    </div>

                    {/* Selection indicator */}
                    {selectedComponentId === component.id && (
                      <div className="absolute top-0 left-0 bg-blue-500 text-white text-xs px-2 py-1 rounded-br-lg font-medium">
                        {component.type}
                      </div>
                    )}
                  </div>
                  
                  {/* Add button between components */}
                  <div 
                    className="relative w-full py-3 group hover:bg-blue-50 transition-colors cursor-pointer flex justify-center border-b border-gray-100"
                    onDragOver={(e) => handleBetweenDragOver(e, index + 1)}
                    onDragLeave={handleBetweenDragLeave}
                    onDrop={(e) => handleBetweenDrop(e, index + 1)}
                  >
                    <div className={`h-1 w-full ${betweenDropzoneActive === index + 1 ? 'bg-blue-500' : 'bg-transparent'} transition-colors rounded-full mx-auto`}></div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="absolute opacity-0 group-hover:opacity-100 transition-opacity shadow-lg border-blue-200 hover:border-blue-300"
                      onClick={() => handleAddComponentClick(index + 1)}
                    >
                      <Plus size={16} className="mr-1" /> Ajouter un composant
                    </Button>
                  </div>
                </React.Fragment>
              ))}
            </>
          )}
        </div>

        {/* Canvas info */}
        <div className="mt-6 text-center text-xs text-gray-500">
          <p>Canvas responsive • Glisser-déposer pour ajouter • Cliquer pour sélectionner</p>
        </div>
      </div>
    </div>
  );
};

export default Canvas;

import React, { useState, useEffect } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Canvas from './Canvas';
import PropertyPanel from './PropertyPanel';
import { toast } from "sonner";

// Define component data structure
export interface ComponentData {
  id: string;
  type: string;
  content?: {
    title?: string;
    subtitle?: string;
    buttonText?: string;
    badge?: string;
    imageUrl?: string;
    alt?: string;
    caption?: string;
    quote?: string;
    author?: string;
    role?: string;
    avatarUrl?: string;
    features?: Array<{
      title: string;
      description: string;
      icon?: string;
    }>;
    url?: string;
    variant?: 'default' | 'outline' | 'ghost' | 'link' | 'secondary';
    size?: 'default' | 'sm' | 'lg' | 'icon';
    children?: ComponentData[];
    leftChildren?: ComponentData[];
    rightChildren?: ComponentData[];
    columns?: ComponentData[][];  // Changed from tuple type to more flexible array of arrays
    direction?: string;
    wrap?: boolean;
    justifyContent?: string;
    alignItems?: string;
    gap?: string;
    secondaryButtonText?: string;
    secondaryButtonUrl?: string;
    buttonUrl?: string;
  };
  style?: {
    backgroundColor?: string;
    padding?: string;
    textAlign?: 'left' | 'center' | 'right' | 'justify';
    buttonColor?: string;
    rounded?: boolean;
    shadow?: boolean;
    maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
    layout?: 'center' | 'split' | 'banner';
  };
}

interface BuilderLayoutProps {
  onSaveConfirm?: (pageData: any) => void;
  onMediaLibraryOpen?: () => void;
  onComponentsUpdate?: (components: ComponentData[]) => void;
  onTemplateModalOpen?: (category: string) => void;
  onFullPagePreview?: () => void;
}

const BuilderLayout: React.FC<BuilderLayoutProps> = ({ 
  onSaveConfirm, 
  onMediaLibraryOpen, 
  onComponentsUpdate, 
  onTemplateModalOpen, 
  onFullPagePreview 
}) => {
  const [selectedComponentId, setSelectedComponentId] = useState<string | null>(null);
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);
  const [viewportSize, setViewportSize] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [selectedWidth, setSelectedWidth] = useState<string>("1440");
  const [showPropertyPanel, setShowPropertyPanel] = useState<boolean>(false);
  const [placedComponents, setPlacedComponents] = useState<ComponentData[]>([]);
  const [history, setHistory] = useState<ComponentData[][]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  
  const handleViewportChange = (size: 'desktop' | 'tablet' | 'mobile') => {
    setViewportSize(size);
  };

  const handleWidthChange = (width: string) => {
    setSelectedWidth(width);
  };

  const handleComponentSelect = (componentType: string) => {
    setSelectedComponent(componentType);
  };

  // Listen for component selection events from the canvas
  useEffect(() => {
    const handleComponentSelected = (event: Event) => {
      const customEvent = event as CustomEvent;
      if (customEvent.detail) {
        setShowPropertyPanel(customEvent.detail.id !== null);
        setSelectedComponentId(customEvent.detail.id);
        if (customEvent.detail.type) {
          setSelectedComponent(customEvent.detail.type);
        } else {
          setSelectedComponent(null);
        }
      }
    };
    
    window.addEventListener('component-selected', handleComponentSelected);
    
    return () => {
      window.removeEventListener('component-selected', handleComponentSelected);
    };
  }, []);

  // Update components for parent component when they change
  useEffect(() => {
    if (onComponentsUpdate) {
      onComponentsUpdate(placedComponents);
    }
  }, [placedComponents, onComponentsUpdate]);

  // Fix the infinite update issue by adding proper dependency checks
  useEffect(() => {
    if (placedComponents.length > 0 && 
        (historyIndex === -1 || 
         JSON.stringify(placedComponents) !== JSON.stringify(history[historyIndex]))) {
      // Only add to history if it's a new state
      if (historyIndex === history.length - 1) {
        setHistory(prev => [...prev, JSON.parse(JSON.stringify(placedComponents))]);
        setHistoryIndex(prev => prev + 1);
      } else {
        // If we're in the middle of the history, truncate and add the new state
        const newHistory = history.slice(0, historyIndex + 1);
        setHistory([...newHistory, JSON.parse(JSON.stringify(placedComponents))]);
        setHistoryIndex(newHistory.length);
      }
    }
  }, [placedComponents, history, historyIndex]);

  // Handle undo
  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(prev => prev - 1);
      setPlacedComponents(JSON.parse(JSON.stringify(history[historyIndex - 1])));
      toast.info("Annulation effectuée");
    } else {
      toast.warning("Aucune action à annuler");
    }
  };

  // Handle redo
  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(prev => prev + 1);
      setPlacedComponents(JSON.parse(JSON.stringify(history[historyIndex + 1])));
      toast.info("Rétablissement effectué");
    } else {
      toast.warning("Aucune action à rétablir");
    }
  };

  // Save page data as JSON
  const savePage = () => {
    const pageData = {
      title: "Page sans titre",
      components: placedComponents,
      settings: {
        viewportSize,
        selectedWidth
      }
    };
    
    if (onSaveConfirm) {
      onSaveConfirm(pageData);
    } else {
      // Fallback to console.log if no save handler provided
      console.log(JSON.stringify(pageData, null, 2));
      toast.success("Page enregistrée avec succès");
    }
  };

  // Update component data with recursive equality check to prevent unnecessary updates
  const updateComponentData = (id: string, newData: Partial<ComponentData>) => {
    setPlacedComponents(prev => {
      const updated = prev.map(comp => {
        if (comp.id === id) {
          // Deep merge to prevent losing properties
          const updatedComp = { 
            ...comp,
            content: {...(comp.content || {}), ...(newData.content || {})},
            style: {...(comp.style || {}), ...(newData.style || {})}
          };
          // If the content or style properties were explicitly provided in newData, use them directly
          if (newData.content) updatedComp.content = {...(comp.content || {}), ...newData.content};
          if (newData.style) updatedComp.style = {...(comp.style || {}), ...newData.style};
          return updatedComp;
        }
        return comp;
      });
      
      // Only update state if there's an actual change
      if (JSON.stringify(updated) !== JSON.stringify(prev)) {
        return updated;
      }
      return prev;
    });
  };

  // Add component to canvas
  const addComponent = (componentData: ComponentData) => {
    setPlacedComponents(prev => [...prev, componentData]);
  };

  // Add component between existing components
  const addComponentBetween = (componentData: ComponentData, index: number) => {
    setPlacedComponents(prev => {
      const newComponents = [...prev];
      newComponents.splice(index, 0, componentData);
      return newComponents;
    });
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      <Header 
        onViewportChange={handleViewportChange}
        onWidthChange={handleWidthChange}
        viewportSize={viewportSize}
        selectedWidth={selectedWidth}
        onUndo={handleUndo}
        onRedo={handleRedo}
        onSave={savePage}
        onMediaLibraryOpen={onMediaLibraryOpen}
        onFullPagePreview={onFullPagePreview}
      />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar 
          onComponentSelect={handleComponentSelect} 
          onTemplateModalOpen={onTemplateModalOpen}
        />
        <Canvas 
          viewportSize={viewportSize} 
          selectedWidth={selectedWidth} 
          components={placedComponents}
          setComponents={setPlacedComponents}
          selectedComponentId={selectedComponentId}
          addComponent={addComponent}
          addComponentBetween={addComponentBetween}
        />
        {showPropertyPanel && (
          <PropertyPanel 
            selectedComponent={selectedComponent}
            selectedComponentId={selectedComponentId} 
            componentData={placedComponents.find(c => c.id === selectedComponentId)}
            updateComponentData={updateComponentData}
            onMediaLibraryOpen={onMediaLibraryOpen}
            allComponents={placedComponents}
          />
        )}
      </div>
    </div>
  );
};

export default BuilderLayout;

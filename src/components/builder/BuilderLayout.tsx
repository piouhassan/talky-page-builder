
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
  };
  style?: {
    backgroundColor?: string;
    padding?: string;
    textAlign?: 'left' | 'center' | 'right' | 'justify';
  };
}

const BuilderLayout = () => {
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

  // Save current state to history when components change
  useEffect(() => {
    if (placedComponents.length > 0) {
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
  }, [placedComponents]);

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

  // Update component data
  const updateComponentData = (id: string, newData: Partial<ComponentData>) => {
    setPlacedComponents(prev => {
      return prev.map(comp => {
        if (comp.id === id) {
          return { ...comp, ...newData };
        }
        return comp;
      });
    });
  };

  // Add component to canvas
  const addComponent = (componentData: ComponentData) => {
    setPlacedComponents(prev => [...prev, componentData]);
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      <Header 
        onViewportChange={handleViewportChange}
        onWidthChange={handleWidthChange}
        viewportSize={viewportSize}
        selectedWidth={selectedWidth}
        onUndo={handleUndo}
      />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar onComponentSelect={handleComponentSelect} />
        <Canvas 
          viewportSize={viewportSize} 
          selectedWidth={selectedWidth} 
          components={placedComponents}
          setComponents={setPlacedComponents}
          selectedComponentId={selectedComponentId}
          addComponent={addComponent}
        />
        {showPropertyPanel && (
          <PropertyPanel 
            selectedComponent={selectedComponent} 
            selectedComponentId={selectedComponentId} 
            componentData={placedComponents.find(c => c.id === selectedComponentId)}
            updateComponentData={updateComponentData}
          />
        )}
      </div>
    </div>
  );
};

export default BuilderLayout;

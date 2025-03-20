
import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Canvas from './Canvas';
import PropertyPanel from './PropertyPanel';

const BuilderLayout = () => {
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);
  const [viewportSize, setViewportSize] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [selectedWidth, setSelectedWidth] = useState<string>("1440");
  const [showPropertyPanel, setShowPropertyPanel] = useState<boolean>(false);

  const handleViewportChange = (size: 'desktop' | 'tablet' | 'mobile') => {
    setViewportSize(size);
  };

  const handleWidthChange = (width: string) => {
    setSelectedWidth(width);
  };

  const handleComponentSelect = (componentType: string) => {
    setSelectedComponent(componentType);
    setShowPropertyPanel(true);
  };

  // Listen for component selection events from the canvas
  React.useEffect(() => {
    const handleComponentSelected = (event: Event) => {
      const customEvent = event as CustomEvent;
      if (customEvent.detail) {
        setShowPropertyPanel(customEvent.detail.id !== null);
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

  return (
    <div className="flex flex-col h-screen bg-white">
      <Header 
        onViewportChange={handleViewportChange}
        onWidthChange={handleWidthChange}
        viewportSize={viewportSize}
        selectedWidth={selectedWidth}
      />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar onComponentSelect={handleComponentSelect} />
        <Canvas viewportSize={viewportSize} selectedWidth={selectedWidth} />
        {showPropertyPanel && <PropertyPanel selectedComponent={selectedComponent} />}
      </div>
    </div>
  );
};

export default BuilderLayout;

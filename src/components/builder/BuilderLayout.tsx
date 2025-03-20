
import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Canvas from './Canvas';
import PropertyPanel from './PropertyPanel';

const BuilderLayout = () => {
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);
  const [viewportSize, setViewportSize] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [selectedWidth, setSelectedWidth] = useState<string>("1440");

  const handleViewportChange = (size: 'desktop' | 'tablet' | 'mobile') => {
    setViewportSize(size);
  };

  const handleWidthChange = (width: string) => {
    setSelectedWidth(width);
  };

  const handleComponentSelect = (componentType: string) => {
    setSelectedComponent(componentType);
  };

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
        <PropertyPanel selectedComponent={selectedComponent} />
      </div>
    </div>
  );
};

export default BuilderLayout;

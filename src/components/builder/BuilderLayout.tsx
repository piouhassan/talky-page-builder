
import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Canvas from './Canvas';
import PropertyPanel from './PropertyPanel';

const BuilderLayout = () => {
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);

  return (
    <div className="flex flex-col h-screen bg-white">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <Canvas />
        <PropertyPanel />
      </div>
    </div>
  );
};

export default BuilderLayout;

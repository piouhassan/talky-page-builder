
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronUp, ChevronDown, AlignLeft, AlignCenter, AlignRight, AlignJustify } from "lucide-react";

interface PropertySectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

const PropertySection: React.FC<PropertySectionProps> = ({ title, children, defaultOpen = true }) => {
  const [isOpen, setIsOpen] = React.useState(defaultOpen);
  
  return (
    <div className="border-t border-gray-200 py-2">
      <div 
        className="flex items-center justify-between cursor-pointer px-4 py-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-sm font-medium text-gray-700">{title}</h3>
        {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </div>
      
      {isOpen && (
        <div className="px-4 py-2 space-y-4 animate-slide-in">
          {children}
        </div>
      )}
    </div>
  );
};

interface PropertyPanelProps {
  selectedComponent?: string | null;
}

const PropertyPanel: React.FC<PropertyPanelProps> = ({ selectedComponent }) => {
  const [componentType, setComponentType] = useState<string | null>(null);
  const [componentId, setComponentId] = useState<string | null>(null);
  
  useEffect(() => {
    const handleComponentSelected = (event: Event) => {
      const customEvent = event as CustomEvent;
      if (customEvent.detail) {
        setComponentId(customEvent.detail.id);
        setComponentType(customEvent.detail.type);
      }
    };
    
    window.addEventListener('component-selected', handleComponentSelected);
    
    return () => {
      window.removeEventListener('component-selected', handleComponentSelected);
    };
  }, []);
  
  // Set the component type from prop if it exists
  useEffect(() => {
    if (selectedComponent) {
      setComponentType(selectedComponent);
    }
  }, [selectedComponent]);
  
  const renderEmptyState = () => (
    <div className="flex items-center justify-center h-64 text-gray-400 flex-col p-4">
      <p className="text-center">Sélectionnez un élément sur le Canvas pour voir ses propriétés</p>
    </div>
  );
  
  return (
    <div className="w-[280px] border-l border-gray-200 bg-white h-full overflow-y-auto">
      <div className="py-3 px-4 border-b border-gray-200">
        <h2 className="text-sm font-medium text-gray-700">
          {componentType ? `Propriétés: ${componentType}` : 'Propriétés'}
        </h2>
      </div>
      
      <div className="pb-20">
        {!componentType && !componentId ? renderEmptyState() : (
          <>
            <PropertySection title="Espacement">
              <div className="space-y-2">
                <div>
                  <Label className="text-xs text-gray-500 mb-1 block">MARGE</Label>
                  <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <div className="relative w-full h-24 flex items-center justify-center">
                      <div className="absolute inset-0 flex flex-col justify-between items-center">
                        <Input value="0" className="w-8 h-6 p-1 text-xs text-center border-gray-200" />
                        <Input value="0" className="w-8 h-6 p-1 text-xs text-center border-gray-200" />
                      </div>
                      
                      <div className="absolute inset-0 flex justify-between items-center">
                        <Input value="0" className="w-8 h-6 p-1 text-xs text-center border-gray-200" />
                        <Input value="0" className="w-8 h-6 p-1 text-xs text-center border-gray-200" />
                      </div>
                      
                      <div className="w-24 h-16 bg-white border border-gray-300 rounded flex items-center justify-center text-xs">
                        Contenu
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <Label className="text-xs text-gray-500 mb-1 block">REMBOURRAGE</Label>
                  <div className="grid grid-cols-4 gap-2">
                    <Input value="0" className="h-8 text-xs text-center border-gray-200" />
                    <Input value="0" className="h-8 text-xs text-center border-gray-200" />
                    <Input value="0" className="h-8 text-xs text-center border-gray-200" />
                    <Input value="0" className="h-8 text-xs text-center border-gray-200" />
                  </div>
                </div>
              </div>
            </PropertySection>
            
            <PropertySection title="Taille">
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <Label className="text-xs text-gray-500">LARGEUR</Label>
                    <div className="flex items-center">
                      <Input value="440" className="h-6 w-12 p-1 text-xs text-center border-gray-200 mr-1" />
                      <span className="text-xs text-gray-500">PX</span>
                    </div>
                  </div>
                  <Slider defaultValue={[50]} className="my-2" />
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <Label className="text-xs text-gray-500">HAUTEUR</Label>
                    <div className="flex items-center">
                      <Input value="Auto" className="h-6 w-12 p-1 text-xs text-center border-gray-200 mr-1" />
                      <span className="text-xs text-gray-500">PX</span>
                    </div>
                  </div>
                  <Slider defaultValue={[50]} className="my-2" />
                </div>
                
                <div>
                  <Label className="text-xs text-gray-500 mb-1 block">OVERFLOW</Label>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" className="h-8 w-8 p-0 border-gray-200">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
                        <path d="M8 12H16" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                    </Button>
                    <Button variant="outline" size="sm" className="h-8 w-8 p-0 border-gray-200 bg-gray-100">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
                        <path d="M12 8V16" stroke="currentColor" strokeWidth="2"/>
                        <path d="M8 12H16" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                    </Button>
                    <Button variant="outline" size="sm" className="h-8 w-8 p-0 border-gray-200">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                    </Button>
                    <Button variant="outline" size="sm" className="h-8 w-8 p-0 ml-auto border-gray-200">
                      Auto
                    </Button>
                  </div>
                </div>
              </div>
            </PropertySection>
            
            <PropertySection title="Position">
              <div className="space-y-2">
                {/* Position controls would go here */}
              </div>
            </PropertySection>
            
            <PropertySection title="Typographie">
              <div className="space-y-4">
                <div>
                  <Label className="text-xs text-gray-500 mb-1 block">POLICE</Label>
                  <Select defaultValue="arial">
                    <SelectTrigger className="h-9 border-gray-200">
                      <SelectValue placeholder="Choisir une police" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="arial">Arial</SelectItem>
                      <SelectItem value="helvetica">Helvetica</SelectItem>
                      <SelectItem value="georgia">Georgia</SelectItem>
                      <SelectItem value="times">Times New Roman</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label className="text-xs text-gray-500 mb-1 block">POIDS</Label>
                    <Select defaultValue="normal">
                      <SelectTrigger className="h-9 border-gray-200">
                        <SelectValue placeholder="Poids" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="normal">Normal</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="bold">Bold</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label className="text-xs text-gray-500 mb-1 block">TAILLE</Label>
                    <Select defaultValue="16">
                      <SelectTrigger className="h-9 border-gray-200">
                        <SelectValue placeholder="Taille" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="12">12 px</SelectItem>
                        <SelectItem value="14">14 px</SelectItem>
                        <SelectItem value="16">16 px</SelectItem>
                        <SelectItem value="18">18 px</SelectItem>
                        <SelectItem value="24">24 px</SelectItem>
                        <SelectItem value="32">32 px</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <Label className="text-xs text-gray-500 mb-1 block">ALIGNEMENT</Label>
                  <div className="flex border border-gray-200 rounded-md p-1 bg-white">
                    <Button variant="ghost" size="sm" className="h-8 flex-1 px-0">
                      <AlignLeft size={16} />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 flex-1 px-0 bg-gray-100">
                      <AlignCenter size={16} />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 flex-1 px-0">
                      <AlignRight size={16} />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 flex-1 px-0">
                      <AlignJustify size={16} />
                    </Button>
                  </div>
                </div>
              </div>
            </PropertySection>
            
            <PropertySection title="Couleurs">
              <div className="space-y-3">
                <div className="grid grid-cols-5 gap-1">
                  <div className="w-full aspect-square bg-black rounded-md cursor-pointer"></div>
                  <div className="w-full aspect-square bg-gray-500 rounded-md cursor-pointer"></div>
                  <div className="w-full aspect-square bg-red-500 rounded-md cursor-pointer"></div>
                  <div className="w-full aspect-square bg-yellow-500 rounded-md cursor-pointer"></div>
                  <div className="w-full aspect-square bg-green-500 rounded-md cursor-pointer"></div>
                  <div className="w-full aspect-square bg-blue-500 rounded-md cursor-pointer"></div>
                  <div className="w-full aspect-square bg-indigo-500 rounded-md cursor-pointer"></div>
                  <div className="w-full aspect-square bg-purple-500 rounded-md cursor-pointer"></div>
                  <div className="w-full aspect-square bg-pink-500 rounded-md cursor-pointer"></div>
                  <div className="w-full aspect-square bg-white border border-gray-200 rounded-md cursor-pointer"></div>
                </div>
                
                <Button variant="outline" size="sm" className="w-full border-gray-200 h-9">
                  Personnaliser
                </Button>
              </div>
            </PropertySection>
          </>
        )}
      </div>
    </div>
  );
};

export default PropertyPanel;

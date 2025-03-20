
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronUp, ChevronDown, AlignLeft, AlignCenter, AlignRight, AlignJustify } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ComponentData } from './BuilderLayout';

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
  selectedComponentId?: string | null;
  componentData?: ComponentData;
  updateComponentData?: (id: string, newData: Partial<ComponentData>) => void;
}

const PropertyPanel: React.FC<PropertyPanelProps> = ({ 
  selectedComponent, 
  selectedComponentId, 
  componentData,
  updateComponentData 
}) => {
  const [localContent, setLocalContent] = useState<any>({});
  const [localStyle, setLocalStyle] = useState<any>({});
  
  // Initialize local state when component data changes
  useEffect(() => {
    if (componentData) {
      setLocalContent(componentData.content || {});
      setLocalStyle(componentData.style || {});
    } else {
      setLocalContent({});
      setLocalStyle({});
    }
  }, [componentData]);
  
  // Update component when local state changes
  useEffect(() => {
    if (selectedComponentId && updateComponentData && Object.keys(localContent).length > 0) {
      updateComponentData(selectedComponentId, {
        content: localContent
      });
    }
  }, [localContent, selectedComponentId, updateComponentData]);
  
  useEffect(() => {
    if (selectedComponentId && updateComponentData && Object.keys(localStyle).length > 0) {
      updateComponentData(selectedComponentId, {
        style: localStyle
      });
    }
  }, [localStyle, selectedComponentId, updateComponentData]);
  
  const handleContentChange = (field: string, value: string) => {
    setLocalContent(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  const handleStyleChange = (field: string, value: any) => {
    setLocalStyle(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  const renderContentTab = () => {
    if (!selectedComponent || !componentData) return null;
    
    switch (selectedComponent) {
      case "Hero":
        return (
          <>
            <PropertySection title="Textes">
              <div className="space-y-3">
                <div>
                  <Label className="text-xs text-gray-500 mb-1 block">BADGE</Label>
                  <Input
                    value={localContent.badge || ""}
                    onChange={(e) => handleContentChange('badge', e.target.value)}
                    className="border-gray-200"
                  />
                </div>
                <div>
                  <Label className="text-xs text-gray-500 mb-1 block">TITRE</Label>
                  <Input
                    value={localContent.title || ""}
                    onChange={(e) => handleContentChange('title', e.target.value)}
                    className="border-gray-200"
                  />
                </div>
                <div>
                  <Label className="text-xs text-gray-500 mb-1 block">SOUS-TITRE</Label>
                  <Textarea
                    value={localContent.subtitle || ""}
                    onChange={(e) => handleContentChange('subtitle', e.target.value)}
                    className="border-gray-200"
                  />
                </div>
                <div>
                  <Label className="text-xs text-gray-500 mb-1 block">BOUTON</Label>
                  <Input
                    value={localContent.buttonText || ""}
                    onChange={(e) => handleContentChange('buttonText', e.target.value)}
                    className="border-gray-200"
                  />
                </div>
              </div>
            </PropertySection>
          </>
        );
      
      case "Features":
        return (
          <>
            <PropertySection title="Textes">
              <div className="space-y-3">
                <div>
                  <Label className="text-xs text-gray-500 mb-1 block">TITRE DE SECTION</Label>
                  <Input
                    value={localContent.title || ""}
                    onChange={(e) => handleContentChange('title', e.target.value)}
                    className="border-gray-200"
                  />
                </div>
                <div>
                  <Label className="text-xs text-gray-500 mb-1 block">DESCRIPTION</Label>
                  <Textarea
                    value={localContent.subtitle || ""}
                    onChange={(e) => handleContentChange('subtitle', e.target.value)}
                    className="border-gray-200"
                  />
                </div>
              </div>
            </PropertySection>
          </>
        );
      
      case "Paragraphe":
        return (
          <>
            <PropertySection title="Textes">
              <div className="space-y-3">
                <div>
                  <Label className="text-xs text-gray-500 mb-1 block">TITRE</Label>
                  <Input
                    value={localContent.title || ""}
                    onChange={(e) => handleContentChange('title', e.target.value)}
                    className="border-gray-200"
                  />
                </div>
                <div>
                  <Label className="text-xs text-gray-500 mb-1 block">CONTENU</Label>
                  <Textarea
                    value={localContent.subtitle || ""}
                    onChange={(e) => handleContentChange('subtitle', e.target.value)}
                    className="border-gray-200 min-h-[100px]"
                  />
                </div>
              </div>
            </PropertySection>
          </>
        );
      
      case "Bouton":
        return (
          <>
            <PropertySection title="Textes">
              <div className="space-y-3">
                <div>
                  <Label className="text-xs text-gray-500 mb-1 block">LABEL DU BOUTON</Label>
                  <Input
                    value={localContent.buttonText || ""}
                    onChange={(e) => handleContentChange('buttonText', e.target.value)}
                    className="border-gray-200"
                  />
                </div>
              </div>
            </PropertySection>
          </>
        );
      
      default:
        return (
          <div className="p-4 text-gray-500">
            Propriétés non disponibles pour ce type de composant.
          </div>
        );
    }
  };
  
  const renderStyleTab = () => {
    return (
      <>
        <PropertySection title="Alignement">
          <div>
            <Label className="text-xs text-gray-500 mb-1 block">ALIGNEMENT DU TEXTE</Label>
            <div className="flex border border-gray-200 rounded-md p-1 bg-white">
              <Button
                variant="ghost"
                size="sm"
                className={`h-8 flex-1 px-0 ${localStyle.textAlign === 'left' ? 'bg-gray-100' : ''}`}
                onClick={() => handleStyleChange('textAlign', 'left')}
              >
                <AlignLeft size={16} />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className={`h-8 flex-1 px-0 ${localStyle.textAlign === 'center' ? 'bg-gray-100' : ''}`}
                onClick={() => handleStyleChange('textAlign', 'center')}
              >
                <AlignCenter size={16} />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className={`h-8 flex-1 px-0 ${localStyle.textAlign === 'right' ? 'bg-gray-100' : ''}`}
                onClick={() => handleStyleChange('textAlign', 'right')}
              >
                <AlignRight size={16} />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className={`h-8 flex-1 px-0 ${localStyle.textAlign === 'justify' ? 'bg-gray-100' : ''}`}
                onClick={() => handleStyleChange('textAlign', 'justify')}
              >
                <AlignJustify size={16} />
              </Button>
            </div>
          </div>
        </PropertySection>
          
        <PropertySection title="Espacement">
          <div>
            <Label className="text-xs text-gray-500 mb-1 block">REMBOURRAGE (PADDING)</Label>
            <Select 
              value={localStyle.padding || "6"} 
              onValueChange={(val) => handleStyleChange('padding', val)}
            >
              <SelectTrigger className="h-9 border-gray-200">
                <SelectValue placeholder="Sélectionner" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">0 - Aucun</SelectItem>
                <SelectItem value="2">2 - Très petit</SelectItem>
                <SelectItem value="4">4 - Petit</SelectItem>
                <SelectItem value="6">6 - Moyen</SelectItem>
                <SelectItem value="8">8 - Grand</SelectItem>
                <SelectItem value="12">12 - Très grand</SelectItem>
                <SelectItem value="16">16 - Extra large</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </PropertySection>
          
        <PropertySection title="Couleurs">
          <div className="space-y-3">
            <div>
              <Label className="text-xs text-gray-500 mb-1 block">COULEUR DE FOND</Label>
              <div className="grid grid-cols-5 gap-1">
                <div
                  className={`w-full aspect-square bg-white border border-gray-200 rounded-md cursor-pointer ${
                    localStyle.backgroundColor === 'white' ? 'ring-2 ring-builder-blue' : ''
                  }`}
                  onClick={() => handleStyleChange('backgroundColor', 'white')}
                ></div>
                <div
                  className={`w-full aspect-square bg-gray-100 rounded-md cursor-pointer ${
                    localStyle.backgroundColor === 'gray-100' ? 'ring-2 ring-builder-blue' : ''
                  }`}
                  onClick={() => handleStyleChange('backgroundColor', 'gray-100')}
                ></div>
                <div
                  className={`w-full aspect-square bg-builder-light-blue rounded-md cursor-pointer ${
                    localStyle.backgroundColor === 'builder-light-blue' ? 'ring-2 ring-builder-blue' : ''
                  }`}
                  onClick={() => handleStyleChange('backgroundColor', 'builder-light-blue')}
                ></div>
                <div
                  className={`w-full aspect-square bg-gray-800 rounded-md cursor-pointer ${
                    localStyle.backgroundColor === 'gray-800' ? 'ring-2 ring-builder-blue' : ''
                  }`}
                  onClick={() => handleStyleChange('backgroundColor', 'gray-800')}
                ></div>
                <div
                  className={`w-full aspect-square bg-blue-900 rounded-md cursor-pointer ${
                    localStyle.backgroundColor === 'blue-900' ? 'ring-2 ring-builder-blue' : ''
                  }`}
                  onClick={() => handleStyleChange('backgroundColor', 'blue-900')}
                ></div>
              </div>
            </div>
          </div>
        </PropertySection>
      </>
    );
  };
  
  return (
    <div className="w-[280px] border-l border-gray-200 bg-white h-full overflow-y-auto">
      <div className="py-3 px-4 border-b border-gray-200">
        <h2 className="text-sm font-medium text-gray-700">
          {selectedComponent ? `Propriétés: ${selectedComponent}` : 'Propriétés'}
        </h2>
      </div>
      
      {!componentData ? (
        <div className="flex items-center justify-center h-64 text-gray-400 flex-col p-4">
          <p className="text-center">Sélectionnez un élément sur le Canvas pour voir ses propriétés</p>
        </div>
      ) : (
        <Tabs defaultValue="content" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-2 rounded-none border-b">
            <TabsTrigger value="content">Contenu</TabsTrigger>
            <TabsTrigger value="style">Style</TabsTrigger>
          </TabsList>
          
          <TabsContent value="content" className="pb-20">
            {renderContentTab()}
          </TabsContent>
          
          <TabsContent value="style" className="pb-20">
            {renderStyleTab()}
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default PropertyPanel;

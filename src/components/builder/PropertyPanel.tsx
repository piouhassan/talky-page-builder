import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronUp, ChevronDown, AlignLeft, AlignCenter, AlignRight, AlignJustify, Upload, ImagePlus } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Skeleton } from "@/components/ui/skeleton";
import { ComponentData } from './BuilderLayout';
import { ScrollArea } from "@/components/ui/scroll-area";

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
  onMediaLibraryOpen?: () => void;
  allComponents?: ComponentData[];
}

// Icon options for selection
const iconOptions = [
  { value: 'home', label: 'Maison' },
  { value: 'settings', label: 'Paramètres' },
  { value: 'user', label: 'Utilisateur' },
  { value: 'mail', label: 'Email' },
  { value: 'bell', label: 'Cloche' },
  { value: 'search', label: 'Recherche' },
  { value: 'heart', label: 'Coeur' },
  { value: 'star', label: 'Étoile' },
  { value: 'check', label: 'Validation' },
  { value: 'x', label: 'Fermer' },
  { value: 'plus', label: 'Plus' },
  { value: 'minus', label: 'Moins' },
  { value: 'image', label: 'Image' },
  { value: 'video', label: 'Vidéo' },
  { value: 'file', label: 'Fichier' },
  { value: 'calendar', label: 'Calendrier' },
  { value: 'clock', label: 'Horloge' }
];

const PropertyPanel: React.FC<PropertyPanelProps> = ({ 
  selectedComponent, 
  selectedComponentId, 
  componentData,
  updateComponentData,
  onMediaLibraryOpen,
  allComponents
}) => {
  const [localContent, setLocalContent] = useState<any>({});
  const [localStyle, setLocalStyle] = useState<any>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedChildId, setSelectedChildId] = useState<string | null>(null);
  
  // Initialize local state only when component ID changes
  useEffect(() => {
    if (componentData && selectedComponentId) {
      // Only show loading when component ID changes
      setIsLoading(true);
      
      // Small delay to prevent UI conflicts when switching components
      const timer = setTimeout(() => {
        setLocalContent(componentData.content || {});
        setLocalStyle(componentData.style || {});
        setIsLoading(false);
        setSelectedChildId(null); // Reset child selection when parent changes
      }, 300);
      
      return () => clearTimeout(timer);
    } else {
      setLocalContent({});
      setLocalStyle({});
      setSelectedChildId(null);
    }
  }, [selectedComponentId]);
  
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
    // Direct update without loading state
    setLocalContent(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  const handleStyleChange = (field: string, value: any) => {
    // Direct update without loading state
    setLocalStyle(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Listen for media selection event
  useEffect(() => {
    const handleMediaSelected = (event: Event) => {
      const customEvent = event as CustomEvent;
      if (customEvent.detail && customEvent.detail.imageUrl) {
        const imageUrl = customEvent.detail.imageUrl;
        
        // Update different fields based on component type
        if (componentData?.type === 'Hero') {
          handleContentChange('imageUrl', imageUrl);
        } else if (componentData?.type === 'Image') {
          handleContentChange('imageUrl', imageUrl);
        } else if (componentData?.type === 'Testimonial') {
          handleContentChange('avatarUrl', imageUrl);
        }
      }
    };
    
    window.addEventListener('media-selected', handleMediaSelected);
    
    return () => {
      window.removeEventListener('media-selected', handleMediaSelected);
    };
  }, [componentData?.type]);

  const handleMediaUpload = () => {
    if (onMediaLibraryOpen) {
      onMediaLibraryOpen();
    }
  };

  // Function to select a child component inside containers
  const handleSelectChild = (childId: string) => {
    setSelectedChildId(childId === selectedChildId ? null : childId);
  };
  
  // Get child component data
  const getChildComponentData = (childId: string) => {
    if (!allComponents) return null;
    return allComponents.find(comp => comp.id === childId);
  };
  
  // Update child component data
  const handleUpdateChildContent = (childId: string, field: string, value: any) => {
    const childComponent = getChildComponentData(childId);
    if (!childComponent || !updateComponentData) return;
    
    const updatedContent = {
      ...childComponent.content,
      [field]: value
    };
    
    updateComponentData(childId, {
      content: updatedContent
    });
  };
  
  // Loading skeletons for the panel
  const renderLoadingSkeletons = () => {
    return (
      <>
        <PropertySection title="Chargement">
          <div className="space-y-3">
            <div>
              <Skeleton className="h-4 w-20 mb-2" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div>
              <Skeleton className="h-4 w-24 mb-2" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div>
              <Skeleton className="h-4 w-28 mb-2" />
              <Skeleton className="h-20 w-full" />
            </div>
          </div>
        </PropertySection>
        <PropertySection title="Propriétés">
          <div className="space-y-3">
            <div>
              <Skeleton className="h-4 w-32 mb-2" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="flex space-x-2">
              <Skeleton className="h-8 w-8" />
              <Skeleton className="h-8 w-8" />
              <Skeleton className="h-8 w-8" />
              <Skeleton className="h-8 w-8" />
            </div>
          </div>
        </PropertySection>
      </>
    );
  };
  
  // Render nested components in containers
  const renderNestedComponents = () => {
    if (!componentData?.content?.children || componentData.content.children.length === 0) {
      return (
        <div className="text-gray-500 text-sm text-center py-2">
          Aucun élément enfant dans ce conteneur
        </div>
      );
    }
    
    return (
      <div className="space-y-2">
        {componentData.content.children.map((child, index) => {
          const isChildSelected = selectedChildId === child.id;
          return (
            <div 
              key={child.id || index} 
              className={`p-2 border rounded-md cursor-pointer ${isChildSelected ? 'border-builder-blue bg-builder-light-blue/10' : 'border-gray-200'}`}
              onClick={() => handleSelectChild(child.id)}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{child.type}</span>
                <ChevronDown size={16} className={`transition-transform ${isChildSelected ? 'rotate-180' : ''}`} />
              </div>
              
              {isChildSelected && (
                <div className="mt-2 pt-2 border-t border-gray-200 space-y-3">
                  {child.type === 'Paragraphe' && (
                    <>
                      <div>
                        <Label className="text-xs text-gray-500 mb-1 block">TITRE</Label>
                        <Input
                          value={child.content?.title || ""}
                          onChange={(e) => handleUpdateChildContent(child.id, 'title', e.target.value)}
                          className="border-gray-200"
                        />
                      </div>
                      <div>
                        <Label className="text-xs text-gray-500 mb-1 block">CONTENU</Label>
                        <Textarea
                          value={child.content?.subtitle || ""}
                          onChange={(e) => handleUpdateChildContent(child.id, 'subtitle', e.target.value)}
                          className="border-gray-200 min-h-[80px]"
                        />
                      </div>
                    </>
                  )}
                  
                  {child.type === 'Bouton' && (
                    <>
                      <div>
                        <Label className="text-xs text-gray-500 mb-1 block">TEXTE</Label>
                        <Input
                          value={child.content?.buttonText || ""}
                          onChange={(e) => handleUpdateChildContent(child.id, 'buttonText', e.target.value)}
                          className="border-gray-200"
                        />
                      </div>
                    </>
                  )}
                  
                  {child.type === 'Image' && (
                    <>
                      <div>
                        <Label className="text-xs text-gray-500 mb-1 block">IMAGE</Label>
                        {child.content?.imageUrl && (
                          <div className="mb-2">
                            <img 
                              src={child.content.imageUrl} 
                              alt="Preview" 
                              className="w-full h-auto rounded-md mb-2"
                            />
                          </div>
                        )}
                        <Button 
                          variant="outline" 
                          className="w-full flex items-center justify-center"
                          onClick={handleMediaUpload}
                        >
                          <Upload size={16} className="mr-2" />
                          Téléverser une image
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };
  
  // Render for columns in grid layouts
  const renderColumnsContent = () => {
    if (!componentData?.content?.columns) return null;
    
    return (
      <div className="space-y-3">
        {componentData.content.columns.map((column, colIndex) => (
          <PropertySection key={colIndex} title={`Colonne ${colIndex + 1}`}>
            <div className="space-y-2">
              {column.map((item, itemIndex) => (
                <div 
                  key={item.id || itemIndex}
                  className="p-2 border rounded-md cursor-pointer hover:bg-gray-50"
                  onClick={() => handleSelectChild(item.id)}
                >
                  <span className="text-sm">{item.type}</span>
                </div>
              ))}
              {column.length === 0 && (
                <div className="text-gray-500 text-sm text-center py-2">
                  Colonne vide
                </div>
              )}
            </div>
          </PropertySection>
        ))}
      </div>
    );
  };
  
  // Special image gallery selector
  const renderMultipleImageSelector = () => {
    return (
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-2">
          {localContent.images && Array.isArray(localContent.images) && localContent.images.map((img: string, index: number) => (
            <div key={index} className="relative group">
              <img 
                src={img} 
                alt={`Gallery ${index}`} 
                className="w-full h-24 object-cover rounded-md"
              />
              <button 
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => {
                  const newImages = [...localContent.images];
                  newImages.splice(index, 1);
                  handleContentChange('images', newImages);
                }}
              >
                <ChevronDown size={14} className="rotate-180" />
              </button>
            </div>
          ))}
          
          <button 
            onClick={handleMediaUpload}
            className="w-full h-24 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center text-gray-400 hover:text-gray-500 hover:border-gray-400 transition-colors"
          >
            <ImagePlus size={24} />
          </button>
        </div>
      </div>
    );
  };
  
  // Icon selector component
  const renderIconSelector = () => {
    return (
      <div>
        <Label className="text-xs text-gray-500 mb-1 block">ICÔNE</Label>
        <Select 
          value={localContent.icon || "home"} 
          onValueChange={(val) => handleContentChange('icon', val)}
        >
          <SelectTrigger className="h-9 border-gray-200">
            <SelectValue placeholder="Sélectionner une icône" />
          </SelectTrigger>
          <SelectContent>
            {iconOptions.map(icon => (
              <SelectItem key={icon.value} value={icon.value}>
                {icon.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    );
  };
  
  const renderContentTab = () => {
    if (!componentData) return null;
    
    // Show loading skeleton only when switching between components
    if (isLoading) {
      return renderLoadingSkeletons();
    }
    
    // If a nested child is selected and we have its data, render that instead
    if (selectedChildId) {
      const childComponent = getChildComponentData(selectedChildId);
      if (childComponent) {
        return (
          <PropertySection title={`${childComponent.type} (enfant)`}>
            {childComponent.type === 'Paragraphe' && (
              <div className="space-y-3">
                <div>
                  <Label className="text-xs text-gray-500 mb-1 block">TITRE</Label>
                  <Input
                    value={childComponent.content?.title || ""}
                    onChange={(e) => handleUpdateChildContent(selectedChildId, 'title', e.target.value)}
                    className="border-gray-200"
                  />
                </div>
                <div>
                  <Label className="text-xs text-gray-500 mb-1 block">CONTENU</Label>
                  <Textarea
                    value={childComponent.content?.subtitle || ""}
                    onChange={(e) => handleUpdateChildContent(selectedChildId, 'subtitle', e.target.value)}
                    className="border-gray-200 min-h-[100px]"
                  />
                </div>
              </div>
            )}
            
            {childComponent.type === 'Bouton' && (
              <div className="space-y-3">
                <div>
                  <Label className="text-xs text-gray-500 mb-1 block">LABEL DU BOUTON</Label>
                  <Input
                    value={childComponent.content?.buttonText || ""}
                    onChange={(e) => handleUpdateChildContent(selectedChildId, 'buttonText', e.target.value)}
                    className="border-gray-200"
                  />
                </div>
                <div>
                  <Label className="text-xs text-gray-500 mb-1 block">URL</Label>
                  <Input
                    value={childComponent.content?.url || ""}
                    onChange={(e) => handleUpdateChildContent(selectedChildId, 'url', e.target.value)}
                    className="border-gray-200"
                  />
                </div>
              </div>
            )}
            
            {childComponent.type === 'Image' && (
              <div className="space-y-3">
                <div>
                  <Label className="text-xs text-gray-500 mb-1 block">IMAGE</Label>
                  {childComponent.content?.imageUrl && (
                    <div className="mb-2">
                      <img 
                        src={childComponent.content.imageUrl} 
                        alt="Preview" 
                        className="w-full h-auto rounded-md mb-2"
                      />
                    </div>
                  )}
                  <Button 
                    variant="outline" 
                    className="w-full flex items-center justify-center"
                    onClick={handleMediaUpload}
                  >
                    <Upload size={16} className="mr-2" />
                    Changer l'image
                  </Button>
                </div>
                <div>
                  <Label className="text-xs text-gray-500 mb-1 block">TEXTE ALTERNATIF</Label>
                  <Input
                    value={childComponent.content?.alt || ""}
                    onChange={(e) => handleUpdateChildContent(selectedChildId, 'alt', e.target.value)}
                    className="border-gray-200"
                  />
                </div>
              </div>
            )}
            
            <div className="mt-3 pt-3 border-t border-gray-200">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setSelectedChildId(null)}
                className="w-full"
              >
                Revenir au parent
              </Button>
            </div>
          </PropertySection>
        );
      }
    }
    
    // For container components, show their children
    if (["Container", "Flexbox"].includes(componentData.type)) {
      return (
        <>
          <PropertySection title="Conteneur">
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
                <Label className="text-xs text-gray-500 mb-1 block">SOUS-TITRE</Label>
                <Textarea
                  value={localContent.subtitle || ""}
                  onChange={(e) => handleContentChange('subtitle', e.target.value)}
                  className="border-gray-200"
                />
              </div>
            </div>
          </PropertySection>
          
          {componentData.type === "Flexbox" && (
            <PropertySection title="Options Flexbox">
              <div className="space-y-3">
                <div>
                  <Label className="text-xs text-gray-500 mb-1 block">DIRECTION</Label>
                  <Select 
                    value={localContent.direction || "row"} 
                    onValueChange={(val) => handleContentChange('direction', val)}
                  >
                    <SelectTrigger className="h-9 border-gray-200">
                      <SelectValue placeholder="Direction" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="row">Horizontale</SelectItem>
                      <SelectItem value="column">Verticale</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-xs text-gray-500 mb-1 block">ALIGNEMENT</Label>
                  <Select 
                    value={localContent.alignItems || "start"} 
                    onValueChange={(val) => handleContentChange('alignItems', val)}
                  >
                    <SelectTrigger className="h-9 border-gray-200">
                      <SelectValue placeholder="Alignement" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="start">Début</SelectItem>
                      <SelectItem value="center">Centre</SelectItem>
                      <SelectItem value="end">Fin</SelectItem>
                      <SelectItem value="stretch">Étendu</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-xs text-gray-500 mb-1 block">ESPACEMENT</Label>
                  <Select 
                    value={localContent.gap || "4"} 
                    onValueChange={(val) => handleContentChange('gap', val)}
                  >
                    <SelectTrigger className="h-9 border-gray-200">
                      <SelectValue placeholder="Espacement" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">Aucun</SelectItem>
                      <SelectItem value="2">Petit</SelectItem>
                      <SelectItem value="4">Moyen</SelectItem>
                      <SelectItem value="6">Grand</SelectItem>
                      <SelectItem value="8">Très grand</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </PropertySection>
          )}
          
          <PropertySection title="Éléments enfants">
            {renderNestedComponents()}
          </PropertySection>
        </>
      );
    }
    
    // For grid layouts
    if (["GridTwoCols", "GridThreeCols"].includes(componentData.type)) {
      return (
        <>
          <PropertySection title="En-tête">
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
                <Label className="text-xs text-gray-500 mb-1 block">DESCRIPTION</Label>
                <Textarea
                  value={localContent.subtitle || ""}
                  onChange={(e) => handleContentChange('subtitle', e.target.value)}
                  className="border-gray-200"
                />
              </div>
            </div>
          </PropertySection>
          
          <PropertySection title="Colonnes">
            {renderColumnsContent()}
          </PropertySection>
        </>
      );
    }
    
    // Regular components
    switch (componentData.type) {
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
                {renderIconSelector()}
              </div>
            </PropertySection>
            <PropertySection title="Média">
              <div className="space-y-3">
                <div>
                  <Label className="text-xs text-gray-500 mb-1 block">IMAGE</Label>
                  {localContent.imageUrl && (
                    <div className="mb-2">
                      <img 
                        src={localContent.imageUrl} 
                        alt="Preview" 
                        className="w-full h-auto rounded-md mb-2"
                      />
                    </div>
                  )}
                  <Button 
                    variant="outline" 
                    className="w-full flex items-center justify-center"
                    onClick={handleMediaUpload}
                  >
                    <Upload size={16} className="mr-2" />
                    Téléverser une image
                  </Button>
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
            <PropertySection title="Fonctionnalités">
              {localContent.features && Array.isArray(localContent.features) && localContent.features.length > 0 ? (
                <div className="space-y-3">
                  {localContent.features.map((feature: any, index: number) => (
                    <div key={index} className="border border-gray-200 rounded-md p-3">
                      <div className="flex items-center justify-between mb-2">
                        <Label className="text-xs font-medium">Fonctionnalité {index + 1}</Label>
                      </div>
                      <div className="space-y-2">
                        <Input
                          value={feature.title || ""}
                          onChange={(e) => {
                            const newFeatures = [...localContent.features];
                            newFeatures[index].title = e.target.value;
                            handleContentChange('features', newFeatures);
                          }}
                          placeholder="Titre"
                          className="text-sm"
                        />
                        <Input
                          value={feature.description || ""}
                          onChange={(e) => {
                            const newFeatures = [...localContent.features];
                            newFeatures[index].description = e.target.value;
                            handleContentChange('features', newFeatures);
                          }}
                          placeholder="Description"
                          className="text-sm"
                        />
                        <Select 
                          value={feature.icon || "home"} 
                          onValueChange={(val) => {
                            const newFeatures = [...localContent.features];
                            newFeatures[index].icon = val;
                            handleContentChange('features', newFeatures);
                          }}
                        >
                          <SelectTrigger className="h-9 border-gray-200">
                            <SelectValue placeholder="Sélectionner une icône" />
                          </SelectTrigger>
                          <SelectContent>
                            {iconOptions.map(icon => (
                              <SelectItem key={icon.value} value={icon.value}>
                                {icon.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-gray-500 text-sm">Aucune fonctionnalité définie</div>
              )}
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
                <div>
                  <Label className="text-xs text-gray-500 mb-1 block">URL</Label>
                  <Input
                    value={localContent.url || ""}
                    onChange={(e) => handleContentChange('url', e.target.value)}
                    className="border-gray-200"
                    placeholder="https://exemple.com"
                  />
                </div>
                <div>
                  <Label className="text-xs text-gray-500 mb-1 block">VARIANTE</Label>
                  <Select 
                    value={localContent.variant || "default"} 
                    onValueChange={(val) => handleContentChange('variant', val)}
                  >
                    <SelectTrigger className="h-9 border-gray-200">
                      <SelectValue placeholder="Sélectionner" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default">Par défaut</SelectItem>
                      <SelectItem value="outline">Contour</SelectItem>
                      <SelectItem value="ghost">Fantôme</SelectItem>
                      <SelectItem value="link">Lien</SelectItem>
                      <SelectItem value="secondary">Secondaire</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-xs text-gray-500 mb-1 block">TAILLE</Label>
                  <Select 
                    value={localContent.size || "default"} 
                    onValueChange={(val) => handleContentChange('size', val)}
                  >
                    <SelectTrigger className="h-9 border-gray-200">
                      <SelectValue placeholder="Sélectionner" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default">Standard</SelectItem>
                      <SelectItem value="sm">Petit</SelectItem>
                      <SelectItem value="lg">Grand</SelectItem>
                      <SelectItem value="icon">Icône</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {renderIconSelector()}
              </div>
            </PropertySection>
          </>
        );
      
      case "Image":
        return (
          <>
            <PropertySection title="Image">
              <div className="space-y-3">
                <div>
                  <Label className="text-xs text-gray-500 mb-1 block">IMAGE</Label>
                  {localContent.imageUrl && (
                    <div className="mb-2">
                      <img 
                        src={localContent.imageUrl} 
                        alt="Preview" 
                        className="w-full h-auto rounded-md mb-2"
                      />
                    </div>
                  )}
                  <Button 
                    variant="outline" 
                    className="w-full flex items-center justify-center"
                    onClick={handleMediaUpload}
                  >
                    <Upload size={16} className="mr-2" />
                    Téléverser une image
                  </Button>
                </div>
                <div>
                  <Label className="text-xs text-gray-500 mb-1 block">TEXTE ALTERNATIF</Label>
                  <Input
                    value={localContent.alt || ""}
                    onChange={(e) => handleContentChange('alt', e.target.value)}
                    className="border-gray-200"
                    placeholder="Description de l'image"
                  />
                </div>
                <div>
                  <Label className="text-xs text-gray-500 mb-1 block">LÉGENDE</Label>
                  <Input
                    value={localContent.caption || ""}
                    onChange={(e) => handleContentChange('caption', e.target.value)}
                    className="border-gray-200"
                    placeholder="Légende sous l'image"
                  />
                </div>
              </div>
            </PropertySection>
          </>
        );
        
      case "Gallery":
        return (
          <>
            <PropertySection title="Galerie">
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
                  <Label className="text-xs text-gray-500 mb-1 block">DESCRIPTION</Label>
                  <Textarea
                    value={localContent.description || ""}
                    onChange={(e) => handleContentChange('description', e.target.value)}
                    className="border-gray-200"
                  />
                </div>
              </div>
            </PropertySection>
            <PropertySection title="Images">
              {renderMultipleImageSelector()}
            </PropertySection>
          </>
        );
        
      case "Testimonial":
        return (
          <>
            <PropertySection title="Contenu">
              <div className="space-y-3">
                <div>
                  <Label className="text-xs text-gray-500 mb-1 block">CITATION</Label>
                  <Textarea
                    value={localContent.quote || ""}
                    onChange={(e) => handleContentChange('quote', e.target.value)}
                    className="border-gray-200"
                  />
                </div>
                <div>
                  <Label className="text-xs text-gray-500 mb-1 block">AUTEUR</Label>
                  <Input
                    value={localContent.author || ""}
                    onChange={(e) => handleContentChange('author', e.target.value)}
                    className="border-gray-200"
                  />
                </div>
                <div>
                  <Label className="text-xs text-gray-500 mb-1 block">RÔLE/FONCTION</Label>
                  <Input
                    value={localContent.role || ""}
                    onChange={(e) => handleContentChange('role', e.target.value)}
                    className="border-gray-200"
                  />
                </div>
              </div>
            </PropertySection>
            <PropertySection title="Image">
              <div className="space-y-3">
                <div>
                  <Label className="text-xs text-gray-500 mb-1 block">AVATAR</Label>
                  {localContent.avatarUrl && (
                    <div className="mb-2 flex justify-center">
                      <img 
                        src={localContent.avatarUrl} 
                        alt="Avatar" 
                        className="w-16 h-16 rounded-full object-cover"
                      />
                    </div>
                  )}
                  <Button 
                    variant="outline" 
                    className="w-full flex items-center justify-center"
                    onClick={handleMediaUpload}
                  >
                    <Upload size={16} className="mr-2" />
                    Téléverser un avatar
                  </Button>
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
            
            {componentData && componentData.type === 'Bouton' && (
              <div>
                <Label className="text-xs text-gray-500 mb-1 block">COULEUR DU BOUTON</Label>
                <div className="grid grid-cols-5 gap-1">
                  <div
                    className={`w-full aspect-square bg-builder-blue rounded-md cursor-pointer ${
                      localStyle.buttonColor === 'builder-blue' ? 'ring-2 ring-builder-blue' : ''
                    }`}
                    onClick={() => handleStyleChange('buttonColor', 'builder-blue')}
                  ></div>
                  <div
                    className={`w-full aspect-square bg-red-500 rounded-md cursor-pointer ${
                      localStyle.buttonColor === 'red-500' ? 'ring-2 ring-builder-blue' : ''
                    }`}
                    onClick={() => handleStyleChange('buttonColor', 'red-500')}
                  ></div>
                  <div
                    className={`w-full aspect-square bg-green-500 rounded-md cursor-pointer ${
                      localStyle.buttonColor === 'green-500' ? 'ring-2 ring-builder-blue' : ''
                    }`}
                    onClick={() => handleStyleChange('buttonColor', 'green-500')}
                  ></div>
                  <div
                    className={`w-full aspect-square bg-yellow-500 rounded-md cursor-pointer ${
                      localStyle.buttonColor === 'yellow-500' ? 'ring-2 ring-builder-blue' : ''
                    }`}
                    onClick={() => handleStyleChange('buttonColor', 'yellow-500')}
                  ></div>
                  <div
                    className={`w-full aspect-square bg-purple-500 rounded-md cursor-pointer ${
                      localStyle.buttonColor === 'purple-500' ? 'ring-2 ring-builder-blue' : ''
                    }`}
                    onClick={() => handleStyleChange('buttonColor', 'purple-500')}
                  ></div>
                </div>
              </div>
            )}
          </div>
        </PropertySection>
        
        {componentData && componentData.type === 'Bouton' && (
          <PropertySection title="Apparence">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-xs text-gray-500">ARRONDI</Label>
                <Switch 
                  checked={!!localStyle.rounded}
                  onCheckedChange={(checked) => handleStyleChange('rounded', checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label className="text-xs text-gray-500">OMBRE</Label>
                <Switch 
                  checked={!!localStyle.shadow}
                  onCheckedChange={(checked) => handleStyleChange('shadow', checked)}
                />
              </div>
            </div>
          </PropertySection>
        )}
      </>
    );
  };
  
  return (
    <div className="w-[280px] border-l border-gray-200 bg-white h-full overflow-hidden flex flex-col">
      <div className="py-3 px-4 border-b border-gray-200">
        <h2 className="text-sm font-medium text-gray-700">
          {componentData ? `Propriétés: ${componentData.type}` : 'Propriétés'}
        </h2>
      </div>
      
      {!componentData ? (
        <div className="flex items-center justify-center h-64 text-gray-400 flex-col p-4">
          <p className="text-center">Sélectionnez un élément sur le Canvas pour voir ses propriétés</p>
        </div>
      ) : (
        <ScrollArea className="flex-1">
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
        </ScrollArea>
      )}
    </div>
  );
};

export default PropertyPanel;

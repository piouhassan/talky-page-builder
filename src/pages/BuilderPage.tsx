
import React, { useState, useCallback } from 'react';
import BuilderLayout from '@/components/builder/BuilderLayout';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import MediaLibraryDialog from '@/components/builder/MediaLibraryDialog';
import TemplateSelectionModal from '@/components/builder/TemplateSelectionModal';
import FullPagePreview from '@/components/builder/FullPagePreview';

const BuilderPage = () => {
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [showMediaLibrary, setShowMediaLibrary] = useState(false);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [showFullPreview, setShowFullPreview] = useState(false);
  const [selectedTemplateCategory, setSelectedTemplateCategory] = useState<string>('');
  const [savedJson, setSavedJson] = useState<string | null>(null);
  const [selectedMedia, setSelectedMedia] = useState<string | null>(null);
  const [allComponents, setAllComponents] = useState<any[]>([]);
  
  // Templates data
  const getTemplatesForCategory = (category: string) => {
    const templates = {
      Hero: [
        {
          id: 'hero-center',
          title: 'Hero Centré',
          description: 'Titre + Sous-titre + CTA centré',
          preview: 'https://placehold.co/400x200/4361EE/FFF?text=Hero+Centré',
          category: 'Hero'
        },
        {
          id: 'hero-image-right',
          title: 'Hero Image Droite',
          description: 'Contenu à gauche, image à droite',
          preview: 'https://placehold.co/400x200/4361EE/FFF?text=Hero+Image+Droite',
          category: 'Hero'
        },
        {
          id: 'hero-background',
          title: 'Hero Arrière-plan',
          description: 'Texte sur image de fond',
          preview: 'https://placehold.co/400x200/4361EE/FFF?text=Hero+Background',
          category: 'Hero'
        }
      ],
      Navbar: [
        {
          id: 'navbar-simple',
          title: 'Navigation Simple',
          description: 'Logo + Menu horizontal',
          preview: 'https://placehold.co/400x100/4361EE/FFF?text=Navbar+Simple',
          category: 'Navbar'
        },
        {
          id: 'navbar-cta',
          title: 'Navigation avec CTA',
          description: 'Logo + Menu + Bouton',
          preview: 'https://placehold.co/400x100/4361EE/FFF?text=Navbar+CTA',
          category: 'Navbar'
        }
      ],
      Footer: [
        {
          id: 'footer-simple',
          title: 'Pied Simple',
          description: 'Logo + Liens + Copyright',
          preview: 'https://placehold.co/400x150/4361EE/FFF?text=Footer+Simple',
          category: 'Footer'
        },
        {
          id: 'footer-multi',
          title: 'Pied Multi-colonnes',
          description: 'Plusieurs sections organisées',
          preview: 'https://placehold.co/400x150/4361EE/FFF?text=Footer+Multi',
          category: 'Footer'
        }
      ],
      Features: [
        {
          id: 'features-grid',
          title: 'Fonctionnalités Grille',
          description: 'Icônes + Textes en grille',
          preview: 'https://placehold.co/400x200/4361EE/FFF?text=Features+Grid',
          category: 'Features'
        },
        {
          id: 'features-list',
          title: 'Fonctionnalités Liste',
          description: 'Liste verticale avec icônes',
          preview: 'https://placehold.co/400x200/4361EE/FFF?text=Features+List',
          category: 'Features'
        }
      ],
      Container: [
        {
          id: 'container-basic',
          title: 'Conteneur Basique',
          description: 'Conteneur simple avec padding',
          preview: 'https://placehold.co/400x200/4361EE/FFF?text=Container+Basic',
          category: 'Container'
        },
        {
          id: 'container-card',
          title: 'Conteneur Carte',
          description: 'Conteneur avec ombre et coins arrondis',
          preview: 'https://placehold.co/400x200/4361EE/FFF?text=Container+Card',
          category: 'Container'
        }
      ],
      GridTwoCols: [
        {
          id: 'grid-two-equal',
          title: 'Grille 50/50',
          description: 'Deux colonnes égales',
          preview: 'https://placehold.co/400x200/4361EE/FFF?text=Grid+50-50',
          category: 'GridTwoCols'
        },
        {
          id: 'grid-two-unequal',
          title: 'Grille 60/40',
          description: 'Colonnes inégales',
          preview: 'https://placehold.co/400x200/4361EE/FFF?text=Grid+60-40',
          category: 'GridTwoCols'
        }
      ],
      GridThreeCols: [
        {
          id: 'grid-three-equal',
          title: 'Grille Égale',
          description: 'Trois colonnes égales',
          preview: 'https://placehold.co/400x200/4361EE/FFF?text=Grid+Equal',
          category: 'GridThreeCols'
        }
      ],
      Flexbox: [
        {
          id: 'flexbox-row',
          title: 'Flexbox Horizontal',
          description: 'Éléments alignés horizontalement',
          preview: 'https://placehold.co/400x200/4361EE/FFF?text=Flex+Row',
          category: 'Flexbox'
        },
        {
          id: 'flexbox-column',
          title: 'Flexbox Vertical',
          description: 'Éléments empilés verticalement',
          preview: 'https://placehold.co/400x200/4361EE/FFF?text=Flex+Column',
          category: 'Flexbox'
        }
      ]
    };
    
    return templates[category as keyof typeof templates] || [];
  };
  
  // Use useCallback to prevent unnecessary re-renders
  const handleSave = useCallback((pageData: any) => {
    setSavedJson(JSON.stringify(pageData, null, 2));
    setShowSaveDialog(true);
  }, []);
  
  // Function to copy code to clipboard with useCallback
  const copyToClipboard = useCallback((text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("JSON copié dans le presse-papier");
  }, []);

  // Gestionnaire pour ouvrir la bibliothèque média with useCallback
  const handleOpenMediaLibrary = useCallback(() => {
    setShowMediaLibrary(true);
  }, []);
  
  // Gestionnaire pour la sélection d'une image with useCallback
  const handleSelectImage = useCallback((imageUrl: string) => {
    setSelectedMedia(imageUrl);
    // Cette information sera utilisée par les composants qui ont besoin de l'image sélectionnée
    const event = new CustomEvent('media-selected', { 
      detail: { imageUrl }
    });
    window.dispatchEvent(event);
  }, []);
  
  // Callback to get all components from BuilderLayout
  const handleComponentsUpdate = useCallback((components: any[]) => {
    setAllComponents(components);
  }, []);

  // Handle template modal opening
  const handleTemplateModalOpen = useCallback((category: string) => {
    setSelectedTemplateCategory(category);
    setShowTemplateModal(true);
  }, []);

  // Handle template selection
  const handleTemplateSelect = useCallback((template: any) => {
    setShowTemplateModal(false);
    // Dispatch event to add the selected template
    const event = new CustomEvent('template-selected', {
      detail: { template }
    });
    window.dispatchEvent(event);
  }, []);

  // Handle full page preview
  const handleFullPagePreview = useCallback(() => {
    setShowFullPreview(true);
  }, []);
  
  return (
    <>
      <BuilderLayout 
        onSaveConfirm={handleSave} 
        onMediaLibraryOpen={handleOpenMediaLibrary}
        onComponentsUpdate={handleComponentsUpdate}
        onTemplateModalOpen={handleTemplateModalOpen}
        onFullPagePreview={handleFullPagePreview}
      />
      
      <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Page enregistrée avec succès</DialogTitle>
            <DialogDescription>
              Votre page a été enregistrée. Voici les données JSON de votre page.
            </DialogDescription>
          </DialogHeader>
          
          {savedJson && (
            <div className="bg-gray-100 p-3 rounded-md overflow-auto max-h-80">
              <pre className="text-xs">{savedJson}</pre>
            </div>
          )}
          
          <DialogFooter className="sm:justify-start">
            <Button 
              type="button" 
              variant="secondary" 
              onClick={() => setShowSaveDialog(false)}
            >
              Fermer
            </Button>
            <Button 
              type="button"
              onClick={() => savedJson && copyToClipboard(savedJson)}
            >
              Copier JSON
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <MediaLibraryDialog 
        open={showMediaLibrary} 
        onOpenChange={setShowMediaLibrary}
        onSelectImage={handleSelectImage}
        allowMultiple={true} 
      />

      <TemplateSelectionModal
        open={showTemplateModal}
        onOpenChange={setShowTemplateModal}
        category={selectedTemplateCategory}
        templates={getTemplatesForCategory(selectedTemplateCategory)}
        onSelectTemplate={handleTemplateSelect}
      />

      <FullPagePreview
        open={showFullPreview}
        onOpenChange={setShowFullPreview}
        components={allComponents}
      />
    </>
  );
};

export default BuilderPage;

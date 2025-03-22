
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

const BuilderPage = () => {
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [showMediaLibrary, setShowMediaLibrary] = useState(false);
  const [savedJson, setSavedJson] = useState<string | null>(null);
  const [selectedMedia, setSelectedMedia] = useState<string | null>(null);
  
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
  
  return (
    <>
      <BuilderLayout 
        onSaveConfirm={handleSave} 
        onMediaLibraryOpen={handleOpenMediaLibrary}
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
      />
    </>
  );
};

export default BuilderPage;

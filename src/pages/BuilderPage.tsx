
import React, { useState } from 'react';
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

const BuilderPage = () => {
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [savedJson, setSavedJson] = useState<string | null>(null);
  
  const handleSave = (pageData: any) => {
    setSavedJson(JSON.stringify(pageData, null, 2));
    setShowSaveDialog(true);
  };
  
  return (
    <>
      <BuilderLayout onSaveConfirm={handleSave} />
      
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
              onClick={() => {
                // Copy to clipboard
                if (savedJson) {
                  navigator.clipboard.writeText(savedJson);
                  toast.success("JSON copié dans le presse-papier");
                }
              }}
            >
              Copier JSON
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BuilderPage;

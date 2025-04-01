
import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { 
  Upload, 
  Image as ImageIcon, 
  CloudUpload, 
  Search,
  Grid2x2,
  List
} from "lucide-react";
import { toast } from "sonner";

interface MediaLibraryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectImage: (imageUrl: string) => void;
  allowMultiple?: boolean;
}

// Images de démonstration
const demoImages = [
  "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=400&q=80",
  "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=400&q=80",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&h=100&q=80",
  "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=400&q=80",
  "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=400&q=80",
  "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=400&q=80",
];

const MediaLibraryDialog: React.FC<MediaLibraryDialogProps> = ({ 
  open, 
  onOpenChange,
  onSelectImage,
  allowMultiple = false
}) => {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState("");
  const [uploadedImages, setUploadedImages] = useState<string[]>(demoImages);
  
  // Filtrer les images en fonction du terme de recherche
  const filteredImages = uploadedImages.filter(image => 
    image.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Gérer le téléchargement d'une image depuis l'ordinateur
  const handleLocalUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      if (target.files && target.files[0]) {
        const file = target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
          const imageUrl = e.target?.result as string;
          setUploadedImages(prev => [imageUrl, ...prev]);
          toast.success("Image téléversée avec succès");
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };
  
  // Simuler le téléchargement depuis Google Drive
  const handleGoogleDriveUpload = () => {
    toast.info("Connexion à Google Drive...");
    // Ici, on simulerait une connexion à l'API Google Drive
    setTimeout(() => {
      toast.success("Image importée depuis Google Drive");
      // Ajouter une image fictive pour la démonstration
      setUploadedImages(prev => [
        "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=400&q=80",
        ...prev
      ]);
    }, 1500);
  };
  
  // Simuler le téléchargement depuis Dropbox
  const handleDropboxUpload = () => {
    toast.info("Connexion à Dropbox...");
    // Ici, on simulerait une connexion à l'API Dropbox
    setTimeout(() => {
      toast.success("Image importée depuis Dropbox");
      // Ajouter une image fictive pour la démonstration
      setUploadedImages(prev => [
        "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=400&q=80",
        ...prev
      ]);
    }, 1500);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Bibliothèque de médias</DialogTitle>
          <DialogDescription>
            Parcourez vos images ou ajoutez-en de nouvelles.
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="library" className="flex-1 overflow-hidden flex flex-col">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="library">Bibliothèque</TabsTrigger>
            <TabsTrigger value="upload">Téléverser</TabsTrigger>
          </TabsList>
          
          <TabsContent value="library" className="flex-1 overflow-hidden flex flex-col">
            <div className="flex items-center space-x-2 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input 
                  placeholder="Rechercher des images..." 
                  className="pl-8" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className={view === 'grid' ? 'bg-gray-100' : ''}
                onClick={() => setView('grid')}
              >
                <Grid2x2 size={16} />
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                className={view === 'list' ? 'bg-gray-100' : ''}
                onClick={() => setView('list')}
              >
                <List size={16} />
              </Button>
            </div>
            
            <div className="overflow-auto flex-1 pr-2">
              {filteredImages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-32 text-gray-400">
                  <ImageIcon size={32} className="mb-2" />
                  <p>Aucune image trouvée</p>
                </div>
              ) : view === 'grid' ? (
                <div className="grid grid-cols-3 gap-4">
                  {filteredImages.map((image, index) => (
                    <div 
                      key={index} 
                      className="aspect-video relative overflow-hidden rounded-md border border-gray-200 cursor-pointer hover:border-blue-500 transition-colors"
                      onClick={() => {
                        onSelectImage(image);
                        if (!allowMultiple) {
                          onOpenChange(false);
                        } else {
                          toast.success('Image sélectionnée');
                        }
                      }}
                    >
                      <img 
                        src={image} 
                        alt={`Media ${index}`} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-2">
                  {filteredImages.map((image, index) => (
                    <div 
                      key={index} 
                      className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        onSelectImage(image);
                        if (!allowMultiple) {
                          onOpenChange(false);
                        } else {
                          toast.success('Image sélectionnée');
                        }
                      }}
                    >
                      <div className="w-12 h-12 relative overflow-hidden rounded-md border border-gray-200">
                        <img 
                          src={image} 
                          alt={`Media ${index}`} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">Image {index + 1}</p>
                        <p className="text-xs text-gray-500 truncate">{new Date().toLocaleDateString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="upload" className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div 
                className="border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 transition-colors"
                onClick={handleLocalUpload}
              >
                <Upload size={24} className="text-gray-400 mb-2" />
                <p className="text-sm font-medium">Téléverser depuis votre ordinateur</p>
                <p className="text-xs text-gray-500 mt-1">Glissez-déposez ou cliquez pour sélectionner</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div 
                  className="border border-gray-300 rounded-md p-4 flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 transition-colors"
                  onClick={handleGoogleDriveUpload}
                >
                  <CloudUpload size={24} className="text-gray-400 mb-2" />
                  <p className="text-sm font-medium text-center">Google Drive</p>
                </div>
                
                <div 
                  className="border border-gray-300 rounded-md p-4 flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 transition-colors"
                  onClick={handleDropboxUpload}
                >
                  <CloudUpload size={24} className="text-gray-400 mb-2" />
                  <p className="text-sm font-medium text-center">Dropbox</p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Fermer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MediaLibraryDialog;

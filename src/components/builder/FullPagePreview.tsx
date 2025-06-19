
import React from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, Monitor, Tablet, Smartphone } from "lucide-react";
import { ComponentData } from './BuilderLayout';
import BlockRenderer from './blocks/BlockRenderer';

interface FullPagePreviewProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  components: ComponentData[];
}

const FullPagePreview: React.FC<FullPagePreviewProps> = ({
  open,
  onOpenChange,
  components
}) => {
  const [viewportSize, setViewportSize] = React.useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  const getPreviewClass = () => {
    switch (viewportSize) {
      case 'mobile':
        return 'max-w-sm mx-auto';
      case 'tablet':
        return 'max-w-2xl mx-auto';
      case 'desktop':
      default:
        return 'w-full';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[95vw] max-h-[95vh] p-0">
        {/* Header avec contrôles */}
        <div className="flex items-center justify-between p-4 border-b bg-white">
          <div className="flex items-center space-x-2">
            <h2 className="font-semibold">Aperçu de la page</h2>
            <div className="flex items-center space-x-1 ml-4">
              <Button
                variant={viewportSize === 'desktop' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewportSize('desktop')}
              >
                <Monitor size={16} />
              </Button>
              <Button
                variant={viewportSize === 'tablet' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewportSize('tablet')}
              >
                <Tablet size={16} />
              </Button>
              <Button
                variant={viewportSize === 'mobile' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewportSize('mobile')}
              >
                <Smartphone size={16} />
              </Button>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onOpenChange(false)}
          >
            <X size={16} />
          </Button>
        </div>

        {/* Zone de preview */}
        <div className="flex-1 overflow-auto bg-gray-100 p-4">
          <div className={`${getPreviewClass()} bg-white shadow-lg min-h-[600px]`}>
            {components.map((component, index) => (
              <div key={component.id || index}>
                <BlockRenderer 
                  component={component} 
                  isSelected={false}
                />
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FullPagePreview;

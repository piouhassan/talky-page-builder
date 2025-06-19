
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface Template {
  id: string;
  title: string;
  description: string;
  preview: string;
  category: string;
}

interface TemplateSelectionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  category: string;
  templates: Template[];
  onSelectTemplate: (template: Template) => void;
}

const TemplateSelectionModal: React.FC<TemplateSelectionModalProps> = ({
  open,
  onOpenChange,
  category,
  templates,
  onSelectTemplate
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>Choisissez un template pour {category}</DialogTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onOpenChange(false)}
            >
              <X size={16} />
            </Button>
          </div>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {templates.map((template) => (
            <div
              key={template.id}
              className="border border-gray-200 rounded-lg overflow-hidden hover:border-builder-blue transition-colors cursor-pointer group"
              onClick={() => onSelectTemplate(template)}
            >
              <div className="aspect-video bg-gray-100 relative overflow-hidden">
                <img
                  src={template.preview}
                  alt={template.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-sm mb-1">{template.title}</h3>
                <p className="text-xs text-gray-600">{template.description}</p>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TemplateSelectionModal;

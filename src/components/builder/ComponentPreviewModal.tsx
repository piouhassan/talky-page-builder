
import React from 'react';
import { cn } from '@/lib/utils';

interface ComponentVariation {
  name: string;
  description: string;
  previewImage: string;
  type: string;
}

interface ComponentPreviewModalProps {
  isVisible: boolean;
  position: { x: number; y: number };
  componentType: string;
  title: string;
  description: string;
  onVariationSelect?: (variationType: string) => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

const ComponentPreviewModal: React.FC<ComponentPreviewModalProps> = ({
  isVisible,
  position,
  componentType,
  title,
  description,
  onVariationSelect,
  onMouseEnter,
  onMouseLeave
}) => {
  if (!isVisible) return null;

  // Define variations for each component type
  const getVariations = (type: string): ComponentVariation[] => {
    switch (type) {
      case 'Hero':
        return [
          {
            name: 'Hero Centré',
            description: 'Hero avec contenu centré et bouton principal',
            previewImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=150&fit=crop&auto=format',
            type: 'Hero'
          },
          {
            name: 'Hero Split',
            description: 'Hero avec image à droite et contenu à gauche',
            previewImage: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=300&h=150&fit=crop&auto=format',
            type: 'HeroSplit'
          },
          {
            name: 'Hero avec Badge',
            description: 'Hero avec badge de nouveauté en haut',
            previewImage: 'https://images.unsplash.com/photo-1558655146-364addf25b81?w=300&h=150&fit=crop&auto=format',
            type: 'HeroBadge'
          }
        ];
      case 'Features':
        return [
          {
            name: 'Features 3 Colonnes',
            description: 'Grille de fonctionnalités en 3 colonnes',
            previewImage: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=300&h=150&fit=crop&auto=format',
            type: 'Features'
          },
          {
            name: 'Features avec Icônes',
            description: 'Fonctionnalités avec grandes icônes colorées',
            previewImage: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=300&h=150&fit=crop&auto=format',
            type: 'FeaturesIcons'
          }
        ];
      case 'CTA':
        return [
          {
            name: 'CTA Centré',
            description: 'Call-to-action centré avec boutons',
            previewImage: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=300&h=150&fit=crop&auto=format',
            type: 'CTA'
          },
          {
            name: 'CTA Split',
            description: 'CTA avec image et contenu séparés',
            previewImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=150&fit=crop&auto=format',
            type: 'CTASplit'
          }
        ];
      case 'GridThreeCols':
        return [
          {
            name: 'Grille 3 Colonnes Standard',
            description: 'Disposition en 3 colonnes égales',
            previewImage: 'https://images.unsplash.com/photo-1558655146-f09347e92766?w=300&h=150&fit=crop&auto=format',
            type: 'GridThreeCols'
          },
          {
            name: 'Grille 3 Colonnes avec Gap',
            description: 'Grille avec espacement personnalisé',
            previewImage: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=300&h=150&fit=crop&auto=format',
            type: 'GridThreeColsGap'
          }
        ];
      default:
        return [
          {
            name: title,
            description: description,
            previewImage: 'https://images.unsplash.com/photo-1558655146-364addf25b81?w=300&h=150&fit=crop&auto=format',
            type: componentType
          }
        ];
    }
  };

  const variations = getVariations(componentType);

  return (
    <div 
      className="fixed z-50 bg-white border border-gray-200 rounded-lg shadow-xl overflow-hidden w-96"
      style={{
        left: position.x,
        top: position.y,
        transform: 'translateY(-50%)',
        maxHeight: '70vh'
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-100">
        <h4 className="font-semibold text-base text-gray-900 mb-1">{title}</h4>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
      
      {/* Variations */}
      <div className="max-h-80 overflow-y-auto">
        {variations.map((variation, index) => (
          <div 
            key={index}
            className="cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={() => onVariationSelect && onVariationSelect(variation.type)}
          >
            {/* Preview Image */}
            <div className="aspect-video bg-gray-50 overflow-hidden">
              <img 
                src={variation.previewImage} 
                alt={variation.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Variation Info */}
            <div className="p-3 border-b border-gray-100 last:border-b-0">
              <h5 className="font-medium text-sm text-gray-900 mb-1">{variation.name}</h5>
              <p className="text-xs text-gray-500">{variation.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComponentPreviewModal;

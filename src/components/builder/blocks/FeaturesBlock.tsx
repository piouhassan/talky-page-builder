
import React from 'react';

interface FeaturesBlockProps {
  content?: {
    title?: string;
    subtitle?: string;
    features?: Array<{
      title: string;
      description: string;
      icon?: string;
    }>;
  };
  style?: {
    backgroundColor?: string;
    padding?: string;
    textAlign?: 'left' | 'center' | 'right' | 'justify';
  };
}

const FeaturesBlock: React.FC<FeaturesBlockProps> = ({ content, style }) => {
  // Default features if none provided
  const defaultFeatures = [
    {
      title: "Simple d'utilisation",
      description: "Notre application est conçue pour être facile à utiliser dès le premier jour."
    },
    {
      title: "Rapide et fiable",
      description: "Performance optimisée pour vous offrir la meilleure expérience possible."
    },
    {
      title: "Sécurisé",
      description: "Vos données sont protégées avec les meilleures pratiques de sécurité."
    }
  ];
  
  // Apply CSS classes based on style props
  const containerClass = `bg-${style?.backgroundColor || 'white'} p-${style?.padding || '12'} text-${style?.textAlign || 'center'}`;
  const features = content?.features || defaultFeatures;
  
  return (
    <div className={containerClass}>
      <div className="max-w-5xl mx-auto">
        {content?.title && (
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{content.title}</h2>
        )}
        {content?.subtitle && (
          <p className="text-lg text-gray-600 mb-12 max-w-3xl mx-auto">{content.subtitle}</p>
        )}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-builder-light-blue rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d={getIconPath(index)} stroke="#4361EE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-center">{feature.title}</h3>
              <p className="text-gray-600 text-center">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Helper function to get different icons for each feature
const getIconPath = (index: number): string => {
  const paths = [
    "M5 3v4M3 5h4M6 17v4M4 19h4M13 3l4 4M17 5l-4 4M14 17l3 3M17 17l-3 3",
    "M12 2v6M12 22v-6M4.93 4.93l4.24 4.24M14.83 14.83l4.24 4.24M2 12h6M22 12h-6M4.93 19.07l4.24-4.24M14.83 9.17l4.24-4.24",
    "M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zM9 12l2 2 4-4"
  ];
  
  return paths[index % paths.length];
};

export default FeaturesBlock;

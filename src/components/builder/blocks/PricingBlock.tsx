
import React, { useMemo } from 'react';
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface PricingPlan {
  title: string;
  price: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  buttonText: string;
  buttonUrl?: string;
}

interface PricingBlockProps {
  content?: {
    title?: string;
    subtitle?: string;
    plans?: PricingPlan[];
  };
  style?: {
    backgroundColor?: string;
    padding?: string;
    textAlign?: 'left' | 'center' | 'right' | 'justify';
  };
}

const PricingBlock: React.FC<PricingBlockProps> = ({ content, style }) => {
  const containerClass = useMemo(() => {
    const bgClass = style?.backgroundColor ? `bg-${style.backgroundColor}` : 'bg-white';
    const paddingClass = style?.padding ? `p-${style.padding}` : 'p-6';
    const alignClass = style?.textAlign ? `text-${style.textAlign}` : 'text-center';
    
    return cn(bgClass, paddingClass, alignClass);
  }, [style?.backgroundColor, style?.padding, style?.textAlign]);

  const defaultPlans: PricingPlan[] = [
    {
      title: "Basic",
      price: "9€",
      description: "Parfait pour les débutants",
      features: [
        "Accès à tous les modules de base",
        "Support par email",
        "Mises à jour gratuites"
      ],
      buttonText: "Commencer"
    },
    {
      title: "Pro",
      price: "19€",
      description: "La solution idéale pour les professionnels",
      features: [
        "Toutes les fonctionnalités Basic",
        "Accès API illimité",
        "Support prioritaire 24/7",
        "Fonctionnalités avancées"
      ],
      isPopular: true,
      buttonText: "Essai gratuit"
    },
    {
      title: "Enterprise",
      price: "49€",
      description: "Pour les grandes équipes",
      features: [
        "Toutes les fonctionnalités Pro",
        "Déploiement sur site",
        "Assistance dédiée",
        "Formation personnalisée",
        "SLA garantie"
      ],
      buttonText: "Contacter les ventes"
    }
  ];

  const plans = content?.plans || defaultPlans;
  
  return (
    <div className={containerClass}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">{content?.title || "Nos Formules"}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {content?.subtitle || "Choisissez le plan qui correspond à vos besoins."}
          </p>
        </div>
        
        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`rounded-lg p-6 shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl ${
                plan.isPopular ? 'border-2 border-blue-500 relative' : 'border border-gray-200'
              }`}
            >
              {plan.isPopular && (
                <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-3">
                  <span className="bg-blue-500 text-white text-xs px-3 py-1 rounded-full font-medium">
                    Populaire
                  </span>
                </div>
              )}
              
              <h3 className="text-xl font-bold mb-2">{plan.title}</h3>
              <div className="mb-4">
                <span className="text-3xl font-bold">{plan.price}</span>
                <span className="text-gray-600">/mois</span>
              </div>
              <p className="text-gray-600 mb-6">{plan.description}</p>
              
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, fidx) => (
                  <li key={fidx} className="flex items-start">
                    <Check className="text-green-500 mr-2 h-5 w-5 inline shrink-0" />
                    <span className="text-gray-700 text-left">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <button 
                className={`w-full py-2 px-4 rounded-md font-medium transition-colors ${
                  plan.isPopular 
                    ? 'bg-blue-500 hover:bg-blue-600 text-white' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                }`}
              >
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingBlock;

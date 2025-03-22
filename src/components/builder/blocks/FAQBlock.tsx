
import React, { useMemo, useState } from 'react';
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQBlockProps {
  content?: {
    title?: string;
    subtitle?: string;
    faqs?: FAQItem[];
  };
  style?: {
    backgroundColor?: string;
    padding?: string;
    textAlign?: 'left' | 'center' | 'right' | 'justify';
  };
}

const FAQBlock: React.FC<FAQBlockProps> = ({ content, style }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  
  const containerClass = useMemo(() => {
    const bgClass = style?.backgroundColor ? `bg-${style.backgroundColor}` : 'bg-white';
    const paddingClass = style?.padding ? `p-${style.padding}` : 'p-6';
    const alignClass = style?.textAlign ? `text-${style.textAlign}` : 'text-left';
    
    return cn(bgClass, paddingClass, alignClass);
  }, [style?.backgroundColor, style?.padding, style?.textAlign]);

  const defaultFAQs: FAQItem[] = [
    {
      question: "Comment puis-je m'inscrire ?",
      answer: "Vous pouvez vous inscrire en cliquant sur le bouton 'S'inscrire' en haut à droite de la page d'accueil. Suivez ensuite les instructions pour créer votre compte."
    },
    {
      question: "Quels sont les modes de paiement acceptés ?",
      answer: "Nous acceptons les cartes de crédit (Visa, MasterCard, American Express), PayPal, et les virements bancaires pour les comptes professionnels."
    },
    {
      question: "Comment puis-je contacter le support client ?",
      answer: "Notre équipe de support est disponible 24/7. Vous pouvez nous contacter par email à support@exemple.com ou via le chat en direct sur notre site."
    },
    {
      question: "Puis-je annuler mon abonnement à tout moment ?",
      answer: "Oui, vous pouvez annuler votre abonnement à tout moment depuis votre tableau de bord. L'annulation prendra effet à la fin de votre période de facturation en cours."
    }
  ];

  const faqs = content?.faqs || defaultFAQs;
  
  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  
  return (
    <div className={containerClass}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className={cn("mb-10", style?.textAlign === 'center' ? 'text-center' : '')}>
          <h2 className="text-3xl font-bold mb-4">{content?.title || "Questions fréquentes"}</h2>
          {content?.subtitle && (
            <p className="text-lg text-gray-600">
              {content.subtitle}
            </p>
          )}
        </div>
        
        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="border border-gray-200 rounded-lg overflow-hidden"
            >
              <button 
                className="w-full px-6 py-4 text-left flex justify-between items-center bg-gray-50 hover:bg-gray-100"
                onClick={() => toggleFAQ(index)}
              >
                <span className="font-medium text-gray-900">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                )}
              </button>
              
              {openIndex === index && (
                <div className="px-6 py-4 bg-white">
                  <p className="text-gray-700">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQBlock;

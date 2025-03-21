
import React from 'react';
import { ComponentData } from '../BuilderLayout';
import HeroBlock from './HeroBlock';
import FeaturesBlock from './FeaturesBlock';
import ParagraphBlock from './ParagraphBlock';
import ButtonBlock from './ButtonBlock';

interface BlockRendererProps {
  component: ComponentData;
  isSelected: boolean;
}

const BlockRenderer: React.FC<BlockRendererProps> = ({ component, isSelected }) => {
  const { type, content, style } = component;
  
  switch(type) {
    case "Hero":
      return <HeroBlock content={content} style={style} />;
    case "Features":
      return <FeaturesBlock content={content} style={style} />;
    case "Paragraphe":
      return <ParagraphBlock content={content} style={style} />;
    case "Bouton":
      return <ButtonBlock content={content} style={style} />;
    default:
      return (
        <div className="bg-gray-100 p-6 text-center">
          <p className="text-gray-500">Composant non reconnu: {type}</p>
        </div>
      );
  }
};

export default BlockRenderer;

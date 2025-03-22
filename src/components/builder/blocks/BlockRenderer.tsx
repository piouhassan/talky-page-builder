
import React from 'react';
import { ComponentData } from '../BuilderLayout';
import HeroBlock from './HeroBlock';
import FeaturesBlock from './FeaturesBlock';
import ParagraphBlock from './ParagraphBlock';
import ButtonBlock from './ButtonBlock';
import ImageBlock from './ImageBlock';
import TestimonialBlock from './TestimonialBlock';
import NavbarBlock from './NavbarBlock';
import FooterBlock from './FooterBlock';
import ContainerBlock from './ContainerBlock';
import GridTwoColsBlock from './GridTwoColsBlock';
import GridThreeColsBlock from './GridThreeColsBlock';
import FlexboxBlock from './FlexboxBlock';
import PricingBlock from './PricingBlock';
import FAQBlock from './FAQBlock';
import CTABlock from './CTABlock';

interface BlockRendererProps {
  component: ComponentData;
  isSelected: boolean;
}

const BlockRenderer: React.FC<BlockRendererProps> = ({ component, isSelected }) => {
  const { type, content, style } = component;
  
  switch(type) {
    // Layout blocks
    case "Container":
      return <ContainerBlock content={content} style={style} isSelected={isSelected} />;
    case "GridTwoCols":
      return <GridTwoColsBlock content={content} style={style} />;
    case "GridThreeCols":
      return <GridThreeColsBlock content={content} style={style} />;
    case "Flexbox":
      return <FlexboxBlock content={content} style={style} />;
      
    // Content blocks  
    case "Hero":
      return <HeroBlock content={content} style={style} />;
    case "Features":
      return <FeaturesBlock content={content} style={style} />;
    case "Paragraphe":
      return <ParagraphBlock content={content} style={style} />;
    case "Bouton":
      return <ButtonBlock content={content} style={style} />;
    case "Image":
      return <ImageBlock content={content} style={style} />;
    case "Testimonial":
      return <TestimonialBlock content={content} style={style} />;
    case "Pricing":
      return <PricingBlock content={content} style={style} />;
    case "FAQ":
      return <FAQBlock content={content} style={style} />;
    case "CTA":
      return <CTABlock content={content} style={style} />;
      
    // Navigation blocks  
    case "Navbar":
      return <NavbarBlock content={content} style={style} />;
    case "Footer":
      return <FooterBlock content={content} style={style} />;
      
    default:
      return (
        <div className="bg-gray-100 p-6 text-center">
          <p className="text-gray-500">Composant non reconnu: {type}</p>
        </div>
      );
  }
};

export default BlockRenderer;

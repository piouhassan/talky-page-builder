
import React from 'react';
import { ComponentData } from '../BuilderLayout';
import HeroBlock from './HeroBlock';
import FeaturesBlock from './FeaturesBlock';
import ParagraphBlock from './ParagraphBlock';
import ButtonBlock from './ButtonBlock';
import ImageBlock from './ImageBlock';
import TestimonialBlock from './TestimonialBlock';
import PricingBlock from './PricingBlock';
import FAQBlock from './FAQBlock';
import CTABlock from './CTABlock';

// Import layout components
import {
  ContainerLayout,
  FlexboxLayout,
  GridTwoColsLayout,
  GridThreeColsLayout,
  NavbarLayout,
  FooterLayout
} from '../layouts';

interface BlockRendererProps {
  component: ComponentData;
  isSelected: boolean;
  onContainerDrop?: (e: React.DragEvent, containerId: string) => void;
  onColumnDrop?: (e: React.DragEvent, containerId: string, columnIndex: number) => void;
}

const BlockRenderer: React.FC<BlockRendererProps> = ({ component, isSelected, onContainerDrop, onColumnDrop }) => {
  const { type, content, style, id } = component;
  
  const handleContainerDrop = (e: React.DragEvent) => {
    if (onContainerDrop && id) {
      onContainerDrop(e, id);
    }
  };
  
  const handleColumnDrop = (e: React.DragEvent, columnIndex: number) => {
    if (onColumnDrop && id) {
      onColumnDrop(e, id, columnIndex);
    }
  };
  
  switch(type) {
    // Layout blocks
    case "Container":
      return <ContainerLayout content={content} style={style} isSelected={isSelected} onDrop={handleContainerDrop} />;
    case "GridTwoCols":
      return <GridTwoColsLayout content={content} style={style} isSelected={isSelected} onColumnDrop={handleColumnDrop} />;
    case "GridThreeCols":
      return <GridThreeColsLayout content={content} style={style} isSelected={isSelected} onColumnDrop={handleColumnDrop} />;
    case "Flexbox":
      return <FlexboxLayout content={content} style={style} isSelected={isSelected} onDrop={handleContainerDrop} />;
      
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
      return <NavbarLayout content={content} style={style} />;
    case "Footer":
      return <FooterLayout content={content} style={style} />;
      
    default:
      return (
        <div className="bg-gray-100 p-6 text-center">
          <p className="text-gray-500">Composant non reconnu: {type}</p>
        </div>
      );
  }
};

export default BlockRenderer;

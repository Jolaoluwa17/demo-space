import { useState, FC } from 'react';

import './accordion.css';
import AccordionDownArrow from '@/icons/AccordionDownArrow';
import AccordionLeftArrow from '@/icons/AccordionLeftArrow';

// Type definition for the items prop
interface AccordionItemProps {
  title: string;
  content: string;
}

// Props for the Accordion component
interface AccordionProps {
  items: AccordionItemProps[];
}

// Accordion Component
const Accordion: FC<AccordionProps> = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // Toggle accordion state
  const toggleAccordion = (index: number) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className="accordion">
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          index={index}
          isActive={index === activeIndex}
          title={item.title}
          content={item.content}
          toggleAccordion={() => toggleAccordion(index)}
        />
      ))}
    </div>
  );
};

// Accordion Item Component
interface AccordionItemComponentProps extends AccordionItemProps {
  index: number;
  isActive: boolean;
  toggleAccordion: () => void;
}

const AccordionItem: FC<AccordionItemComponentProps> = ({
  index,
  isActive,
  title,
  content,
  toggleAccordion,
}) => (
  <div className={`accordion-item ${isActive ? 'active' : ''}`} key={index}>
    <div className="accordion_main" onClick={toggleAccordion}>
      <div className="accordion-header">
        <div className="accordion_title">{title}</div>
        <span className="accordion-icon">
          {isActive ? (
            <AccordionDownArrow />
          ) : (
            <div style={{ paddingTop: '12px' }}>
              <AccordionLeftArrow />
            </div>
          )}
        </span>
      </div>
      <div className={`accordion-content ${isActive ? 'show' : ''}`}>
        <p>{content}</p>
      </div>
    </div>
  </div>
);

export default Accordion;

import { useRef, useState } from 'react';
import { IoIosArrowDown, IoIosArrowForward } from 'react-icons/io';

import './accordion.css';

interface AccordionItemProps {
  title: string;
  content: string;
}

interface Props {
  items: AccordionItemProps[];
}

const Accordion: React.FC<Props> = ({ items }) => {
  const contentRef = useRef<HTMLDivElement | null>(null);

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="accordion_root">
      {items.map((data, index) => (
        <div
          className="main"
          key={index}
          onClick={() => toggleAccordion(index)}
        >
          <div className="accordion_title">
            <div style={{ width: '80%' }}>{data.title}</div>
            {openIndex === index ? (
              <div
                className="accordion_arrow_icon"
                style={{ backgroundColor: '#007BFF' }}
              >
                <IoIosArrowDown
                  size={18}
                  color="white"
                  style={{ marginTop: '2.5px', marginRight: '1px' }}
                />
              </div>
            ) : (
              <div
                className="accordion_arrow_icon"
                style={{ boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px' }}
              >
                <IoIosArrowForward
                  size={18}
                  color="#0057D8"
                  // style={{ marginLeft: '2px' }}
                />
              </div>
            )}
          </div>
          <div
            ref={contentRef}
            className="accordion_content_container"
            style={{
              maxHeight:
                openIndex === index
                  ? `${contentRef.current?.scrollHeight || 0}px`
                  : '0',
            }}
          >
            <div className="accordion_content">{data.content}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Accordion;

import React, { useEffect, useRef } from 'react';
import './modal.css';

interface Props {
  modal: boolean;
  children: React.ReactNode;
  zindex?: number;
  left?: string;
  onClose: () => void; // Function to close the modal
}

const Modal: React.FC<Props> = ({ modal, children, zindex = 1, left = "0px", onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Close the modal when clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (modal) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [modal, onClose]);

  if (!modal) return null;

  return (
    <div className="modal_main" style={{ zIndex: zindex, left: left }} onClick={() => onClose()}>
      <div
        className="modal_content"
        ref={modalRef}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal content
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;

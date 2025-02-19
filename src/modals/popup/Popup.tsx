import { useEffect, useRef } from 'react';
import './popup.css';

interface Props {
  popup: boolean;
  children: React.ReactNode;
  closePopup?: () => void;
  darkmode?: boolean
}

const Popup: React.FC<Props> = ({ popup, children, closePopup, darkmode }) => {
  const popupRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        if (closePopup) {
          closePopup();
        }
      }
    };

    if (popup) {
      document.addEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [popup, closePopup]);

  if (!popup) return null;

  return (
    <div className={`popup_root ${darkmode && "popup_root_dark"}`}>
      <div className="popup_main" ref={popupRef}>
        {children}
      </div>
    </div>
  );
};

export default Popup;

import { BellIcon } from '@heroicons/react/24/outline';
import { useEffect, useRef, useState } from 'react';
import './header.css';
import UserDropdown from '../userDropdown/UserDropdown';

interface Props {
  activeLink: string;
  userName: string;
}

const Header: React.FC<Props> = ({ activeLink }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [notification, setNotification] = useState(false);

  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        if (isOpen) {
          setIsOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <header className="header">
      <h1 className="header_title">{activeLink}</h1>
      <div className="header_right_section">
        <div
          onClick={() => setNotification(!notification)}
          className="header_bell_icon"
        >
          <BellIcon className="bell-icon" />
        </div>
        <div className="profile-dropdown">
          <div className="profile-container">
            <UserDropdown />
          </div>
          <div className="profile_dropdown_text">
            <div className='profile_dropdown_text_name'>Hi, Daniel!</div>
            <div className='profile_dropdown_text_preview'>Here's what you can do next.</div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

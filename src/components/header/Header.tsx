import { useEffect, useRef, useState } from 'react';

import './header.css';
import { BellIcon } from '@heroicons/react/24/outline';
import UserDropdown from '../userDropdown/UserDropdown';
import Popup from '@/modals/popup/Popup';
import Xicon from '@/icons/Xicon';
import { useGetUserQuery } from '@/services/features/user/userSlice';

interface Props {
  activeLink: string;
  userName: string;
}

interface UserType {
  response: {
    fullName: string;
    email: string;
  };
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

  const userid = sessionStorage.getItem('id');

  const { data } = useGetUserQuery(userid ? userid : '') as {
    data: UserType | undefined;
    error: undefined;
    isLoading: boolean;
  };

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
            <div className="profile_dropdown_text_name">
              Hi,{' '}
              {data && (
                <span style={{ fontWeight: '600' }}>
                  {data?.response?.fullName}
                </span>
              )}
            </div>
            <div className="profile_dropdown_text_preview">
              Here's what you can do next.
            </div>
          </div>
        </div>
      </div>

      <Popup popup={notification} closePopup={() => setNotification(false)}>
        <div className="notification_popup">
          <div className="notification_title">
            <span>Notification</span>
            <button
              className="notification_cancel_btn"
              onClick={() => setNotification(!notification)}
            >
              <Xicon />
            </button>
          </div>
          <img src="/images/Notification.svg" alt="" />
          <div className="notification_popup_text">
            <p>New Update Avaliable</p>
            <div>
              Get the latest bug fixes and <br /> improvements for a faster,
              smoother <br />
              experience. Update today!
            </div>
          </div>
        </div>
      </Popup>
    </header>
  );
};

export default Header;

import Xicon from '@/icons/Xicon';
import Popup from '@/modals/popup/Popup';
import { useEffect, useRef, useState } from 'react';
import UserDropdown from '../userDropdown/UserDropdown';
import AdminBellIcon from '@/icons/AdminBellIcon';

interface Props {
  activeLink: string;
  userName: string;
}

const AdminHeader: React.FC<Props> = ({ activeLink }) => {
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

  const closePopup = () => setNotification(false);

  return (
    <header className="header" style={{ border: 'none' }}>
      <h1 className="header_title">{activeLink}</h1>
      <div className="header_right_section">
        <div
          onClick={() => setNotification(!notification)}
          style={{ marginRight: '33px' }}
          className="bellIcon"
        >
          <AdminBellIcon />
          <div className="notification_indicator_no">4</div>
        </div>
        <div className="profile-dropdown">
          <div className="profile-container">
            <UserDropdown />
          </div>
          <div className="profile_dropdown_text">
            <div className="profile_dropdown_text_name">Hi, Daniel!</div>
            <div className="profile_dropdown_text_preview">
              Here's what you can do next.
            </div>
          </div>
        </div>
      </div>

      <Popup popup={notification} closePopup={closePopup}>
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

export default AdminHeader;

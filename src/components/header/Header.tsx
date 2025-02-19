import { useEffect, useRef, useState } from 'react';

import './header.css';
import UserDropdown from '../userDropdown/UserDropdown';
import { useGetUserQuery } from '@/services/features/user/userSlice';

interface Props {
  activeLink: string;
  userName: string;
  darkmode: boolean;
}

interface UserType {
  response: {
    fullName: string;
    email: string;
    firstName: string;
    lastName: string;
    profileImg: string; // Add this field
  };
}


const Header: React.FC<Props> = ({ activeLink, darkmode }) => {
  const [isOpen, setIsOpen] = useState(false);
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
    <header
      className={`header ${darkmode ? 'darkmode_theme' : 'lightmode_theme'}`}
    >
      <h1 className="header_title">{activeLink}</h1>
      <div className="header_right_section">
        <div className="profile-dropdown">
          <div className="profile-container">
            <UserDropdown darkmode={darkmode} userData={data ?? undefined} />
          </div>
          <div className="profile_dropdown_text">
            <div className="profile_dropdown_text_name">
              Hi,{' '}
              {data && (
                <span style={{ fontWeight: '600' }}>
                  {data?.response?.lastName} {data?.response?.firstName}
                </span>
              )}
            </div>
            <div className="profile_dropdown_text_preview">
              Here's what you can do next.
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

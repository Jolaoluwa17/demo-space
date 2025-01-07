import { useEffect, useRef, useState } from 'react';

import './header.css';
import UserDropdown from '../userDropdown/UserDropdown';
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
    </header>
  );
};

export default Header;

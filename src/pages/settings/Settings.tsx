import RightArrowIcon from '../../icons/RightArrowIcon';
import './settings.css';
import ProfileIcon from '../../icons/ProfileIcon';
import LockIcon from '../../icons/LockIcon';
import SupportIcon from '../../icons/SupportIcon';
import InstagramIcon from '../../icons/InstagramIcon';
import MailIcon from '../../icons/MailIcon';
import TwitterIcon from '../../icons/TwitterIcon';
import SettingsDeleteIcon from '../../icons/SettingsDeleteIcon';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
  const navigate = useNavigate();

  return (
    <div className="settings_root">
      <div className="settings_base_header">Settings</div>
      <div className="settings_option_container">
        <div className="settings_base_option">
          <div className="settings_label">Profile</div>
          <div
            className="settings_base_option_button"
            onClick={() => navigate('/dashboard/profile/profile-settings')}
          >
            <div className="first_section">
              <ProfileIcon />
              <div className="settings_base_option_text">Profile Setting</div>
            </div>
            <RightArrowIcon />
          </div>
        </div>
        <div className="settings_base_option">
          <div className="settings_label">Security</div>
          <div
            className="settings_base_option_button"
            onClick={() => navigate('/dashboard/profile/change-password')}
          >
            <div className="first_section">
              <LockIcon />
              <div className="settings_base_option_text">Change Password</div>
            </div>
            <RightArrowIcon />
          </div>
        </div>
      </div>
      <div className="settings_label2">Contact and Social Media</div>
      <div className="settings_option_container">
        <div className="settings_base_option_button2">
          <div className="first_section">
            <SupportIcon />
            <div className="settings_base_option_text">01 - 2345678 - 9</div>
          </div>
          <RightArrowIcon />
        </div>
        <div className="settings_base_option_button2">
          <div className="first_section">
            <InstagramIcon />
            <div className="settings_base_option_text">Techwings_global</div>
          </div>
          <RightArrowIcon />
        </div>
        <div className="settings_base_option_button2">
          <div className="first_section">
            <MailIcon />
            <div className="settings_base_option_text">
              support@techwings.com
            </div>
          </div>
          <RightArrowIcon />
        </div>
        <div className="settings_base_option_button2">
          <div className="first_section">
            <TwitterIcon />
            <div className="settings_base_option_text">Techwings_global</div>
          </div>
          <RightArrowIcon />
        </div>
        <div
          className="settings_base_option_button2"
          style={{ backgroundColor: 'red' }}
          onClick={() => navigate('/dashboard/profile/delete-account')}
        >
          <div className="first_section">
            <SettingsDeleteIcon />
            <div
              className="settings_base_option_text"
              style={{ color: 'white' }}
            >
              Delete Account
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;

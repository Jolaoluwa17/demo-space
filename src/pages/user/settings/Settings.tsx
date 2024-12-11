import './settings.css';

import { useNavigate } from 'react-router-dom';
import RightArrowIcon from '@/icons/RightArrowIcon';
import { FiTwitter, FiInstagram, FiHeadphones } from 'react-icons/fi';
import { LuMail } from 'react-icons/lu';
import { SlLock } from 'react-icons/sl';
import { IoPersonOutline } from 'react-icons/io5';
import { MdDelete } from 'react-icons/md';

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
              <IoPersonOutline size={25} color="#6a757e" />
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
              <SlLock size={25} color="#6a757e" />
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
            <FiHeadphones size={25} color="#6a757e" />
            <div className="settings_base_option_text">01 - 2345678 - 9</div>
          </div>
          <RightArrowIcon />
        </div>
        <div className="settings_base_option_button2">
          <div className="first_section">
            <FiInstagram size={25} color="#6a757e" />
            <div className="settings_base_option_text">Techwings_global</div>
          </div>
          <RightArrowIcon />
        </div>
        <div className="settings_base_option_button2">
          <div className="first_section">
            <LuMail size={25} color="#6a757e" />
            <div className="settings_base_option_text">
              support@techwings.com
            </div>
          </div>
          <RightArrowIcon />
        </div>
        <div className="settings_base_option_button2">
          <div className="first_section">
            <FiTwitter size={25} color="#6a757e" />
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
            <MdDelete size={27} color="white" />
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

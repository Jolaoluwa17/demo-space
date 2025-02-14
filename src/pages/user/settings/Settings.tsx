import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FiTwitter, FiInstagram, FiHeadphones } from 'react-icons/fi';
import { LuMail } from 'react-icons/lu';
import { IoPersonOutline } from 'react-icons/io5';
import { MdDelete } from 'react-icons/md';
import { CiLight, CiDark } from 'react-icons/ci';

import './settings.css';
import RightArrowIcon from '@/icons/RightArrowIcon';
import Popup from '@/modals/popup/Popup';
import { useDeleteUserMutation } from '@/services/features/user/userSlice';
import { logout } from '@/services/features/auth/authSlice';

interface Props {
  darkmode: boolean;
  setDarkMode: (darkmode: boolean) => void;
}

const Settings: React.FC<Props> = ({ darkmode, setDarkMode }) => {
  const navigate = useNavigate();

  const [showPopup, setShowPopup] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const dispatch = useDispatch();
  const userid = sessionStorage.getItem('id');

  const [deleteUser, { isLoading: deleteUserLoading }] =
    useDeleteUserMutation();

  const handleDeleteUser = async () => {
    const userData = { id: userid };
    try {
      await deleteUser(userData).unwrap();
      setShowSuccess(true);

      setTimeout(() => {
        dispatch(logout());
        navigate('/auth/login');
      }, 3000);
    } catch (error: unknown) {
      console.log(error);
    }
  };

  const handleDarkMode = () => {
    setDarkMode(!darkmode);
  };

  return (
    <div className={`settings_root ${darkmode && 'settings_root_dark'}`}>
      <div className="settings_base_header">Settings</div>
      <div className="settings_option_container">
        <div className="settings_base_option">
          <div className="settings_label">Profile</div>
          <div
            className="settings_base_option_button"
            onClick={() => navigate('/dashboard/profile/profile-settings')}
          >
            <div className="first_section">
              <IoPersonOutline
                size={25}
                color={darkmode ? 'white' : '#6a757e'}
              />
              <div className="settings_base_option_text">Profile Setting</div>
            </div>
            <RightArrowIcon />
          </div>
        </div>
      </div>
      <div className="settings_label2">Contact and Social Media</div>
      <div className="settings_option_container">
        <div className="settings_base_option_button2">
          <div className="first_section">
            <FiHeadphones size={25} color={darkmode ? 'white' : '#6a757e'} />
            <div className="settings_base_option_text">01 - 2345678 - 9</div>
          </div>
          <RightArrowIcon />
        </div>
        <a
          href="https://www.instagram.com/officialtechwingsglobal?igsh=MWJoM2YwZ3JzYXpmaA=="
          style={{ textDecoration: 'none' }}
          target="_blank"
          className="settings_base_option_button2"
        >
          <div className="first_section">
            <FiInstagram size={25} color={darkmode ? 'white' : '#6a757e'} />
            <div className="settings_base_option_text">
              officialtechwingsglobal
            </div>
          </div>
          <RightArrowIcon />
        </a>
        <a
          href="mailto:info@techwingsglobal.com"
          style={{ textDecoration: 'none' }}
          className="settings_base_option_button2"
        >
          <div className="first_section">
            <LuMail size={25} color={darkmode ? 'white' : '#6a757e'} />
            <div className="settings_base_option_text">
              info@techwingsglobal.com
            </div>
          </div>
          <RightArrowIcon />
        </a>
        <a
          href="https://x.com/techwingsllc/"
          className="settings_base_option_button2"
          style={{ textDecoration: 'none' }}
          target="_blank"
        >
          <div className="first_section">
            <FiTwitter size={25} color={darkmode ? 'white' : '#6a757e'} />
            <div className="settings_base_option_text">techwingsllc</div>
          </div>
          <RightArrowIcon />
        </a>
        <div className="settings_base_option_button2" onClick={handleDarkMode}>
          <div className="first_section">
            {darkmode ? (
              <CiDark size={27} color="white" />
            ) : (
              <CiLight size={27} color="#6a757e" />
            )}
            <div className="settings_base_option_text">
              Theme {darkmode ? 'Dark' : 'Light'}
            </div>
          </div>
        </div>
        <div
          className="settings_base_option_button2"
          style={{ backgroundColor: 'red' }}
          onClick={() => setShowPopup(true)}
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

      <Popup popup={showPopup}>
        {!showSuccess ? (
          <div style={{ width: '100%' }}>
            <div className="decision_title">
              Are you sure you want to delete your account
            </div>
            <div className="decision_container">
              <div
                className="decision_btn"
                style={{
                  backgroundColor: !deleteUserLoading ? '#007BFF' : 'grey',
                  cursor: !deleteUserLoading ? 'pointer' : 'not-allowed',
                  color: !deleteUserLoading ? 'white' : 'grey',
                }}
                onClick={deleteUserLoading ? undefined : handleDeleteUser}
              >
                {deleteUserLoading ? <div className="spinner"></div> : 'Yes'}
              </div>
              <div
                className="decision_btn"
                style={{
                  cursor: !deleteUserLoading ? 'pointer' : 'not-allowed',
                  color: !deleteUserLoading ? 'black' : 'grey',
                }}
                onClick={
                  deleteUserLoading ? undefined : () => setShowPopup(false)
                }
              >
                {deleteUserLoading ? <div className="spinner"></div> : 'No'}
              </div>
            </div>
          </div>
        ) : (
          <div className="delete_account_popup">
            <img src="/images/DeleteAccount.svg" alt="" />
            <div className="delete_account_text">
              <p>Account Deleted Successfully</p>
            </div>
          </div>
        )}
      </Popup>
    </div>
  );
};

export default Settings;

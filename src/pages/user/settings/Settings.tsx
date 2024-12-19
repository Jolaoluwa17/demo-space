import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FiTwitter, FiInstagram, FiHeadphones } from 'react-icons/fi';
import { LuMail } from 'react-icons/lu';
import { IoPersonOutline } from 'react-icons/io5';
import { MdDelete } from 'react-icons/md';

import './settings.css';
import RightArrowIcon from '@/icons/RightArrowIcon';
import Popup from '@/modals/popup/Popup';
import { useDeleteUserMutation } from '@/services/features/user/userSlice';
import { logout } from '@/services/features/auth/authSlice';

const Settings = () => {
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

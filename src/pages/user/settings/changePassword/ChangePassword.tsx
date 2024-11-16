import { useNavigate } from 'react-router-dom';
import './changePassword.css';
import { useEffect, useState } from 'react';
import PageHeader from '@/components/pageHeader/PageHeader';
import EyeOpen from '@/icons/Eye';
import EyeClosed from '@/icons/EyeClosed';
import Popup from '@/modals/popup/Popup';


const ChangePassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [popup, setPopup] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  // Check if both passwords are filled and match
  useEffect(() => {
    if (
      password &&
      confirmPassword &&
      password === confirmPassword &&
      oldPassword
    ) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [password, confirmPassword, oldPassword]);

  const handleBackClick = () => {
    navigate('/dashboard/profile');
  };

  const handleHiddenTrigger = () => {
    setShowPassword(!showPassword);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
  };

  const handleOldPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOldPassword(e.target.value);
  };

  const handleChangePassword = () => {
    setPopup(true);

    setTimeout(() => {
      setPopup(false);
      navigate('/auth/login');
    }, 3000);
  };

  return (
    <div className="change_password_root">
      <PageHeader
        pageTitle="Change Password"
        handleBackClick={handleBackClick}
      />
      <div className="change_password_form">
        <div className="change_password_form_item">
          <div className="form_item">
            <label htmlFor="">Enter Old Password</label>
            <input
              type="password"
              className="change_password_input"
              value={oldPassword}
              onChange={handleOldPasswordChange}
            />
          </div>
          <div className="form_item">
            <label htmlFor="">Enter New Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              className="change_password_input"
              value={password}
              onChange={handlePasswordChange}
            />
            <div
              onClick={handleHiddenTrigger}
              className="change_password_see_password"
            >
              {showPassword ? <EyeOpen /> : <EyeClosed />}
            </div>
          </div>
          <div className="form_item">
            <label htmlFor="">Re - type New Password</label>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              className="change_password_input"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
            <div
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="change_password_see_password"
            >
              {showConfirmPassword ? <EyeOpen /> : <EyeClosed />}
            </div>
          </div>
          <div
            className={`change_password_confirm_btn ${isButtonDisabled ? 'disabled' : ''}`}
            onClick={!isButtonDisabled ? handleChangePassword : undefined}
            style={{
              backgroundColor: isButtonDisabled ? 'grey' : '',
              cursor: isButtonDisabled ? 'not-allowed' : 'pointer',
            }}
          >
            Change Password
          </div>

          <Popup popup={popup}>
            <div className="change_password_popup">
              <img src="/public/images/DeleteAccount.svg" alt="" />
              <div className="change_password_popup_text">
                <p>Successful</p>
                <div>
                  Your password has been successfully <br /> updated
                </div>
              </div>
            </div>
          </Popup>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;

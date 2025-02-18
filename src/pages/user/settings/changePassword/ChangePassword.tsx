import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './changePassword.css';
import PageHeader from '@/components/pageHeader/PageHeader';
import Popup from '@/modals/popup/Popup';
import EyeOpen from '@/icons/Eye';
import EyeClosed from '@/icons/EyeClosed';
import { useChangepasswordMutation } from '@/services/features/auth/authApiSlice';
import ErrorResponse from '@/types/ErrorResponse';
import { BiSolidErrorAlt } from 'react-icons/bi';

interface Props {
  darkmode: boolean;
}

const ChangePassword: React.FC<Props> = ({ darkmode }) => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [popup, setPopup] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const hasMinLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>_]/.test(password);

  // Check if both passwords are filled and match
  useEffect(() => {
    if (
      password &&
      confirmPassword &&
      password === confirmPassword &&
      oldPassword &&
      hasMinLength &&
      hasUppercase &&
      hasLowercase &&
      hasNumber &&
      hasSpecialChar
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

  const handleOldPassword = () => {
    setShowOldPassword(!showOldPassword);
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

  const [changePassword, { isLoading }] = useChangepasswordMutation({});
  const [err, setErr] = useState<string>('');

  const handleChangePassword = async () => {
    const userData = { newPassword: password };
    try {
      const res = await changePassword(userData).unwrap();
      console.log(res);
      setPopup(true);
    } catch (error: unknown) {
      const err = error as ErrorResponse;
      setErr(
        err.data.error === 'User with the given email not found'
          ? 'User not found'
          : 'Something went wrong'
      );
    } finally {
      setTimeout(() => {
        setPopup(false);
        navigate('/auth/login');
      }, 3000);
    }
  };

  return (
    <div
      className={`change_password_root ${darkmode && 'change_password_root_dark'}`}
    >
      <PageHeader
        pageTitle="Change Password"
        handleBackClick={handleBackClick}
        darkmode={darkmode}
      />
      <div className="change_password_form">
        <div className="change_password_form_item">
          <div className="form_item">
            <label htmlFor="">Enter Old Password</label>
            <input
              type={showOldPassword ? 'text' : 'password'}
              className="change_password_input"
              value={oldPassword}
              onChange={handleOldPasswordChange}
            />
            <div
              onClick={handleOldPassword}
              className="change_password_see_password"
            >
              {showOldPassword ? <EyeOpen /> : <EyeClosed />}
            </div>
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
            <div
              style={{
                color:
                  hasMinLength &&
                  hasUppercase &&
                  hasLowercase &&
                  hasSpecialChar &&
                  hasNumber
                    ? 'green'
                    : 'red',
                width: '100%',
              }}
            >
              Your password must be at least 8 characters long, have at least 1
              capital letter, have at least 1 lowercase letter, have at least 1
              special character, and must have at least 1 number
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
          {err && (
            <div className="error_message">
              <BiSolidErrorAlt fontSize={18} />
              <div style={{ paddingLeft: '5px' }}>{err}</div>
            </div>
          )}
          <div
            className={`change_password_confirm_btn ${isButtonDisabled ? 'disabled' : ''}`}
            onClick={
              !isButtonDisabled && isLoading ? handleChangePassword : undefined
            }
            style={{
              backgroundColor: isButtonDisabled && !isLoading ? 'grey' : '',
              cursor:
                isButtonDisabled && !isLoading ? 'not-allowed' : 'pointer',
            }}
          >
            Change Password
          </div>

          <Popup popup={popup} closePopup={() => setPopup(false)} darkmode>
            <div className="change_password_popup">
              <img src="/images/DeleteAccount.svg" alt="" />
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

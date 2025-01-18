import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FaArrowLeftLong } from 'react-icons/fa6';
import { IoEye, IoEyeOff } from 'react-icons/io5';

import './resetPassword.css';
import { useResetPasswordMutation } from '@/services/features/auth/authApiSlice';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const samePassword = password === confirmPassword;
  // Password validation conditions
  const hasMinLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>_]/.test(password);
  const isFormValid =
    hasMinLength &&
    hasUppercase &&
    hasLowercase &&
    hasNumber &&
    hasSpecialChar &&
    samePassword &&
    password !== '' &&
    confirmPassword !== '';

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

  const navigator = useNavigate();

  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const handleResetPassword = async () => {
    const userData = {
      token: token,
      password: password,
      confirmpassword: confirmPassword,
    };
    try {
      await resetPassword(userData).unwrap();
      navigator('/auth/login');
    } catch (error: unknown) {
      console.log(error);
    }
  };

  return (
    <div className="resetpassword_root">
      <div className="techwings_logo_forgotpassword">
        <img
          src="/images/ProficioNextLogo.png"
          alt=""
          className="proficioNext_logo_size"
          onClick={() => navigator('/')}
          loading="lazy"
        />
      </div>
      <div className="resetpassword_container">
        <div className="resetpassword_form">
          <div
            className="back_to_signup"
            onClick={() => navigator('/auth/login')}
          >
            <FaArrowLeftLong />
            <div style={{ marginLeft: '12px' }}>Back to login</div>
          </div>
          <div className="resetpassword_title">Set a password</div>
          <p>
            Your password has been reset. Please create a new password to secure
            your account.
          </p>
          <div className="form_item">
            <label htmlFor="password">Enter Password</label>
            <div className="password_input">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="************"
                className="input"
                value={password}
                onChange={handlePasswordChange}
              />
              <div onClick={handleHiddenTrigger} className="see_password">
                {showPassword ? (
                  <IoEye className="password_visibility_icon" color="#818181" />
                ) : (
                  <IoEyeOff
                    className="password_visibility_icon"
                    color="#818181"
                  />
                )}
              </div>
            </div>
          </div>

          {/* Password Validator */}
          {password.length > 0 && (
            <div
              className="password_indicator_option"
              style={{
                color:
                  hasMinLength &&
                  hasUppercase &&
                  hasLowercase &&
                  hasSpecialChar &&
                  hasNumber
                    ? 'green'
                    : 'red',
                marginTop: '20px',
              }}
            >
              Your password must be at least 8 characters long, have at least 1
              capital letter, have at least 1 lowercase letter, have at least 1
              special character, and must have at least 1 number
            </div>
          )}

          <div className="form_item">
            <label htmlFor="password">Confirm Password</label>
            <div className="password_input">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="password"
                placeholder="************"
                className="input"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
              />
              <div
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="see_password"
              >
                {showConfirmPassword ? (
                  <IoEye className="password_visibility_icon" color="#818181" />
                ) : (
                  <IoEyeOff
                    className="password_visibility_icon"
                    color="#818181"
                  />
                )}
              </div>
            </div>
          </div>
          <button
            className="submit_btn"
            style={{
              backgroundColor: isFormValid && !isLoading ? '#007BFF' : 'grey',
              cursor: isFormValid && !isLoading ? 'pointer' : 'not-allowed',
            }}
            onClick={handleResetPassword}
            disabled={!isFormValid || isLoading}
          >
            {isLoading ? <div className="spinner"></div> : 'Set Password'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;

import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import './resetPassword.css';
import LeftArrow from '@/icons/LeftArrow';
import EyeOpen from '@/icons/Eye';
import EyeClosed from '@/icons/EyeClosed';
import { useResetPasswordMutation } from '@/services/features/auth/authApiSlice';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const samePassword = password === confirmPassword;
  const isFormValid = samePassword && password !== '' && confirmPassword !== '';

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
      const res = await resetPassword(userData).unwrap();
      console.log(res);
      // navigator('/auth/login')
    } catch (error: unknown) {
      console.log(error);
    }
  };

  return (
    <div className="resetpassword_root">
      <div className="resetpassword_container">
        <div className="techwings_logo_forgotpassword">
          <img
            src="/images/ProficioNextLogo.png"
            alt=""
            className="proficioNext_logo_size"
            onClick={() => navigator('/')}
            loading="lazy"
          />
        </div>
        <div className="resetpassword_form">
          <div
            className="back_to_signup"
            onClick={() => navigator('/auth/login')}
          >
            <LeftArrow />
            <div style={{ marginLeft: '12px' }}>Back to login</div>
          </div>
          <div className="resetpassword_title">Set a password</div>
          <p>
            Your previous password has been reseted. Please set a new password
            for your <br /> account.
          </p>
          {/* <div className="form_item">
            <label htmlFor="code">Enter Reset Code</label>
            <input
              type="text"
              name="code"
              placeholder="123456"
              className="input"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </div> */}
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
                {showPassword ? <EyeOpen /> : <EyeClosed />}
              </div>
            </div>
          </div>
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
                {showConfirmPassword ? <EyeOpen /> : <EyeClosed />}
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

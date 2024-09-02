import { useState } from 'react';
import LeftArrow from '../../icons/LeftArrow';
import './resetPassword.css';
import EyeOpen from '../../icons/Eye';
import EyeClosed from '../../icons/EyeClosed';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const samePassword = password === confirmPassword;
  const isFormValid = otp !== '' && samePassword;

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

  return (
    <div className="resetpassword_root">
      <div className="resetpassword_container">
        <div className="techwings_logo_forgotpassword">
          <img src="/assets/images/TechWingLogo.svg" alt="login_image" />
        </div>
        <div className="resetpassword_form">
          <div className="back_to_signup">
            <LeftArrow />
            <div style={{ marginLeft: '12px' }}>Back to sign up</div>
          </div>
          <div className="resetpassword_title">Set a password</div>
          <p>
            Your previous password has been reseted. Please set a new password
            for your <br /> account.
          </p>
          <div className="form_item">
            <label htmlFor="code">Enter Reset Code</label>
            <input
              type="text"
              name="code"
              placeholder="123456"
              className="input"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </div>
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
              backgroundColor: isFormValid ? '#4274BA' : 'grey',
              cursor: isFormValid ? 'pointer' : 'not-allowed',
            }}
            onClick={() => navigator('/auth/login')}
            disabled={!isFormValid}
          >
            Set password
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;

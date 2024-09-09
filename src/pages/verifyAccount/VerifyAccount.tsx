import { useState } from 'react';
import LeftArrow from '../../icons/LeftArrow';
import './verifyAccount.css';
import { useNavigate } from 'react-router-dom';

const VerifyAccount = () => {
  const [otp, setOtp] = useState('');
  const isFormValid = otp !== '';

  const navigator = useNavigate();

  return (
    <div className="verify_account_root">
      <div className="verify_account_container">
        <div className="left_section">
          <img
            src="/assets/images/VerifyAccount.svg"
            alt="login_image"
            className="verify_account_img"
          />
        </div>
        <div className="right_section">
          <div className="techwings_logo">
            <img src="/assets/images/TechWingLogo.svg" alt="login_image" />
          </div>
          <div className="verify_account_form">
            <div className="back_to_signup">
              <LeftArrow />
              <div
                style={{ marginLeft: '12px' }}
                onClick={() => navigator('/auth/signup')}
              >
                Back to sign up
              </div>
            </div>
            <div className="verify_account_title">Verify code</div>
            <p>An authentication code has been sent to your email.</p>
            <div className="form_item">
              <label htmlFor="code">Enter Code</label>
              <input
                type="text"
                name="code"
                placeholder="7789BM6X"
                className="input"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>
            <div className="resend_code">
              Already have an account?{' '}
              <span
                style={{
                  color: '#FF8682',
                  fontWeight: '600',
                  cursor: 'pointer',
                  marginLeft: '8px',
                }}
              >
                Resend
              </span>
            </div>
            <button
              className="verify_btn"
              style={{
                backgroundColor: isFormValid ? '#4274BA' : 'grey',
                cursor: isFormValid ? 'pointer' : 'not-allowed',
              }}
              onClick={() => navigator('/user-profile')}
              disabled={!isFormValid}
            >
              Verify
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyAccount;

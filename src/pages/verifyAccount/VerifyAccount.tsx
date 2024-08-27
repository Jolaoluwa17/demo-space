import { useState } from 'react';
import LeftArrow from '../../icons/LeftArrow';
import './verifyAccount.css';

const VerifyAccount = () => {
  const [otp, setOtp] = useState('');
  const isFormValid = otp !== '';

  return (
    <div className="verify_account_root">
      <div className="verify_account_container">
        <div className="techwings_logo">
          <img src="/assets/images/TechWingLogo.svg" alt="login_image" />
        </div>
        <div className="left_section">
          <img
            src="/assets/images/VerifyAccount.svg"
            alt="login_image"
            style={{ width: '482.42px', height: '816px', borderRadius: '24px' }}
          />
        </div>
        <div className="right_section">
          <div className="verify_account_form">
            <div className="back_to_signup">
              <LeftArrow />
              <div style={{ marginLeft: '12px' }}>Back to sign up</div>
            </div>
            <div className="login_title">Verify code</div>
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
            <div
              className="verify_btn"
              style={{
                backgroundColor: isFormValid ? '#4274BA' : 'grey',
                cursor: isFormValid ? 'pointer' : 'not-allowed',
              }}
            >
              Verify
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyAccount;

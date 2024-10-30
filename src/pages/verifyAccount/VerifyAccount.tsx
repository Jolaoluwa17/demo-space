import { useState, useEffect } from 'react';
import LeftArrow from '../../icons/LeftArrow';
import './verifyAccount.css';
import { useNavigate } from 'react-router-dom';
import {
  useRequestCodeMutation,
  useVerifyAccountMutation,
} from '../../services/features/auth/authApiSlice';
import { BiSolidErrorAlt } from 'react-icons/bi';
import { useSelector } from 'react-redux';
import { RootState } from '../../services/store';

const VerifyAccount = () => {
  const [otp, setOtp] = useState('');
  const isFormValid = otp !== '';

  const navigate = useNavigate();

  const [verifyAccount, { isLoading }] = useVerifyAccountMutation();
  const [err, setErr] = useState<string>('');
  const [countdown, setCountdown] = useState(0); // Countdown state in seconds

  const handleVerifyAccount = async () => {
    const userData = {
      verificationCode: otp,
    };
    try {
      const res = await verifyAccount(userData).unwrap();
      console.log(res);
      navigate('/auth/login');
    } catch (error: unknown) {
      console.log(error);
      setErr('Wrong OTP');
    }
  };

  const [requestCode] = useRequestCodeMutation();
  const email = useSelector((state: RootState) => state.auth.email);

  const handleRequestCode = async () => {
    const userData = { email: email };
    try {
      await requestCode(userData).unwrap();
      setCountdown(120); // Start countdown for 2 minutes (120 seconds)
    } catch (error: unknown) {
      console.log(error);
      setErr('Something went wrong');
    }
  };

  // Countdown effect
  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);

      // Clear timer when countdown reaches zero or component unmounts
      return () => clearInterval(timer);
    }
  }, [countdown]);

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
                onClick={() => navigate('/auth/signup')}
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
            {err && (
              <div className="error_message">
                <BiSolidErrorAlt fontSize={18} />
                <div style={{ paddingLeft: '5px' }}>{err}</div>
              </div>
            )}
            <div className="resend_code">
              Already have an account?{' '}
              <span
                style={{
                  color: countdown === 0 ? '#FF8682' : 'grey',
                  fontWeight: '600',
                  cursor: countdown === 0 ? 'pointer' : 'not-allowed',
                  marginLeft: '8px',
                }}
                onClick={countdown === 0 ? handleRequestCode : undefined}
              >
                {countdown === 0 ? 'Resend' : `Resend in ${countdown}s`}
              </span>
            </div>
            <button
              className="verify_btn"
              style={{
                backgroundColor: isFormValid && !isLoading ? '#4274BA' : 'grey',
                cursor: isFormValid && !isLoading ? 'pointer' : 'not-allowed',
              }}
              onClick={handleVerifyAccount}
              disabled={!isFormValid || isLoading}
            >
              {isLoading ? <div className="spinner"></div> : 'Verify'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyAccount;

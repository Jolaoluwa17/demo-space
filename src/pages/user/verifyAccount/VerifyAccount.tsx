import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { BiSolidErrorAlt } from 'react-icons/bi';

import './verifyAccount.css';
import LeftArrow from '@/icons/LeftArrow';
import {
  useLoginMutation,
  useRequestCodeMutation,
  useVerifyAccountMutation,
} from '@/services/features/auth/authApiSlice';
import { RootState } from '@/services/store';
import { setAuthState } from '@/services/features/auth/authSlice';

const VerifyAccount = () => {
  const [otp, setOtp] = useState('');
  const isFormValid = otp !== '';

  const navigate = useNavigate();

  const [verifyAccount, { isLoading }] = useVerifyAccountMutation();
  const [err, setErr] = useState<string>('');
  const [countdown, setCountdown] = useState(0); // Countdown state in seconds

  const email = useSelector((state: RootState) => state.auth.email);
  const password = useSelector((state: RootState) => state.auth.password);

  const handleVerifyAccount = async () => {
    const userData = {
      verificationCode: otp,
    };
    try {
      const res = await verifyAccount(userData).unwrap();
      console.log(res);
      handleLogin();
    } catch (error: unknown) {
      console.log(error);
      setErr('Invalid OTP');
    }
  };

  const [login, { isLoading: loginLoading }] = useLoginMutation();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    const userData = {
      userType: 'User',
      email: email,
      password: password,
    };
    console.log(userData);
    try {
      const res = await login(userData).unwrap();
      dispatch(
        setAuthState({
          isAuthenticated: true,
          token: res.token,
          id: res.user._id ?? '',
          userType: 'User',
        })
      );
      navigate('/user-profile');
      console.log(res);
    } catch (error: unknown) {
      console.log(error);
    }
  };

  const [requestCode] = useRequestCodeMutation();

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
            src="/images/VerifyAccount.svg"
            alt="login_image"
            className="verify_account_img"
          />
        </div>
        <div className="right_section">
          <div className="techwings_logo">
            <img
              src="/images/ProficioNextLogo.png"
              alt=""
              className="proficioNext_logo_size"
              onClick={() => navigate('/')}
              loading="lazy"
            />
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
                placeholder="7789"
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
                backgroundColor:
                  isFormValid && !isLoading && !loginLoading
                    ? '#007BFF'
                    : 'grey',
                cursor:
                  isFormValid && !isLoading && !loginLoading
                    ? 'pointer'
                    : 'not-allowed',
              }}
              onClick={handleVerifyAccount}
              disabled={!isFormValid || isLoading || loginLoading}
            >
              {isLoading || loginLoading ? (
                <div className="spinner"></div>
              ) : (
                'Verify'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyAccount;

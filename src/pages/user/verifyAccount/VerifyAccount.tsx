import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { BiSolidErrorAlt } from 'react-icons/bi';

import '../signup/signup.css';
import {
  useLoginMutation,
  useRequestCodeMutation,
  useVerifyAccountMutation,
} from '@/services/features/auth/authApiSlice';
import { RootState } from '@/services/store';
import { setAuthState } from '@/services/features/auth/authSlice';
import { FaArrowLeftLong } from 'react-icons/fa6';

const VerifyAccount = () => {
  const [otp, setOtp] = useState('');
  const isFormValid = otp.length === 4;

  const navigate = useNavigate();

  const [verifyAccount, { isLoading }] = useVerifyAccountMutation();
  const [err, setErr] = useState<string>('');
  const [countdown, setCountdown] = useState(120); // Countdown state in seconds

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
      setCountdown(120);
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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value;
    if (/^\d$/.test(value)) {
      // Allow only a single digit
      const newOtp = otp.substring(0, index) + value + otp.substring(index + 1);
      setOtp(newOtp);

      // Move to the next input if available
      const inputs = document.querySelectorAll(
        '.verify_account_otp_input'
      ) as NodeListOf<HTMLInputElement>;
      if (index < 3) inputs[index + 1].focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === 'Backspace') {
      const newOtp = otp.substring(0, index) + '' + otp.substring(index + 1);
      setOtp(newOtp);

      // Move to the previous input if available
      const inputs = document.querySelectorAll(
        '.verify_account_otp_input'
      ) as NodeListOf<HTMLInputElement>;
      if (index > 0) inputs[index - 1].focus();
    }
  };

  return (
    <div className="signup_root">
      <div className="left">
        <div className="right_P_side">
          <img src="/images/rightPSide.svg" alt="" />
        </div>
        <div className="left_P_side">
          <img src="/images/leftPSide.svg" alt="" />
        </div>
      </div>
      <div className="right">
        <div className="right_verifyAccount_content">
          <div className="signup_techwings_logo">
            <div className="signup_logo_absolute" onClick={() => navigate('/')}>
              <img
                src="/images/ProficioNextLogo.png"
                alt="ProficioNext Logo"
                className="proficioNext_logo_size"
              />
            </div>
          </div>
          <div className="signup_title">Verify Account</div>
          <div className="signup_subTitle" style={{ marginBottom: '20px' }}>
            An authentication code has been sent to your email.
          </div>
          <div className="verify_account_otp_container">
            {[...Array(4)].map((_, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                className="verify_account_otp_input"
                inputMode="numeric"
                value={otp[index] || ''} // Get character at index
                onChange={(e) => handleInputChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
              />
            ))}
          </div>
          <div
            className="already_have_acc"
            style={{ textAlign: 'left', marginTop: '20px' }}
          >
            Didn't receive the email?{' '}
            <span
              style={{
                color: countdown === 0 ? '#FF8682' : 'grey',
                cursor: countdown === 0 ? 'pointer' : 'not-allowed',
                marginLeft: '5px',
              }}
              onClick={countdown === 0 ? handleRequestCode : undefined}
            >
              {countdown === 0
                ? ' Click to resend'
                : `Resend in ${Math.floor(countdown / 60)}:${String(countdown % 60).padStart(2, '0')}`}
            </span>
          </div>
          <button
            className="create_acc_btn"
            style={{
              backgroundColor:
                isFormValid && !isLoading && !loginLoading ? '#007BFF' : 'grey',
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
          {err && (
            <div className="error_message">
              <BiSolidErrorAlt fontSize={18} />
              <div style={{ paddingLeft: '5px' }}>{err}</div>
            </div>
          )}

          <div
            className="verify_account_back_to_login"
            onClick={() => navigate('/auth/login')}
          >
            <FaArrowLeftLong />
            <div style={{ marginLeft: '12px' }}>Back to login</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyAccount;

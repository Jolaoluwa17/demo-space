import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BiSolidErrorAlt } from 'react-icons/bi';
import { FaArrowLeftLong } from 'react-icons/fa6';
import { IoInformationCircleSharp } from 'react-icons/io5';

import './forgotPassword.css';
import { useForgotPasswordMutation } from '@/services/features/auth/authApiSlice';
import ErrorResponse from '@/types/ErrorResponse';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState<boolean>(true);
  const isFormValid = !emailError;
  const [success, setIsSuccess] = useState(false);

  const validateEmail = (email: string) => {
    // Basic email validation regex
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    if (!validateEmail(value)) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
  };

  const navigator = useNavigate();
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const [err, setErr] = useState<string>('');

  const handleForgotPassword = async () => {
    const userData = { email: email };
    try {
      const res = await forgotPassword(userData).unwrap();
      console.log(res);
      setIsSuccess(true);
      setEmail('');
    } catch (error: unknown) {
      const err = error as ErrorResponse;
      setErr(
        err.data.error === 'User with the given email not found'
          ? 'User already exists'
          : 'Something went wrong'
      );
    }
  };

  return (
    <div className="forgotpassword_root">
      <div className="techwings_logo_forgotpassword">
        <img
          src="/images/ProficioNextLogo.png"
          alt=""
          className="proficioNext_logo_size"
          onClick={() => navigator('/')}
          loading="lazy"
        />
      </div>
      <div className="forgotpassword_container">
        <div className="forgotpassword_form">
          <div className="back_to_signup">
            <FaArrowLeftLong />
            <div
              style={{ marginLeft: '12px' }}
              onClick={() => navigator('/auth/login')}
            >
              Back to login
            </div>
          </div>
          <div className="forgotpassword_title">Forgot your password?</div>
          <p>
            Don't worry, happens to all of us. Enter your email below to recover
            your password.
          </p>
          <div className="form_item">
            <label htmlFor="email">Enter Email</label>
            <input
              type="email"
              name="email"
              placeholder="ysemiraefe@gmail.com"
              className="input"
              value={email}
              onChange={(e) => handleEmailChange(e.target.value)}
            />
          </div>
          {err && (
            <div className="error_message">
              <BiSolidErrorAlt fontSize={18} />
              <div style={{ paddingLeft: '5px' }}>{err}</div>
            </div>
          )}
          <button
            className="submit_btn"
            style={{
              backgroundColor:
                isFormValid && !isLoading && !success ? '#007BFF' : 'grey',
              cursor:
                isFormValid && !isLoading && !success
                  ? 'pointer'
                  : 'not-allowed',
            }}
            onClick={handleForgotPassword}
            disabled={!isFormValid || isLoading || success}
          >
            {isLoading ? <div className="spinner"></div> : 'Reset Password'}
          </button>
          {success && (
            <div className="success_sent_link">
              <IoInformationCircleSharp
                size={20}
                style={{ paddingRight: '5px' }}
              />
              Password Reset Link Sent
            </div>
          )}
          <div className="or_forgotpassword">
            <hr />
            <div>or login with</div>
            <hr />
          </div>
          <div className="other_forgotpassword_options">
            <div className="forgotpassword_options">
              <img src="/images/Google.svg" alt="login_image" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;

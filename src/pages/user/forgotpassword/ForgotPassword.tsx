import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BiSolidErrorAlt } from 'react-icons/bi';

import './forgotPassword.css';
import { useForgotPasswordMutation } from '@/services/features/auth/authApiSlice';
import LeftArrow from '@/icons/LeftArrow';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState<boolean>(true);
  const isFormValid = !emailError;

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
  const [forgotPassword] = useForgotPasswordMutation();
  const [err, setErr] = useState<string>('');

  const handleForgotPassword = async () => {
    const userData = { email: email };
    try {
      const res = await forgotPassword(userData).unwrap();
      // navigator('/auth/resetpassword');
      console.log(res);
    } catch (error: unknown) {
      setErr('Something went wrong');
      console.log(error);
    }
  };

  return (
    <div className="forgotpassword_root">
      <div className="forgotpassword_container">
        <div className="techwings_logo_forgotpassword">
          <img
            src="/images/ProficioNextLogo.png"
            alt=""
            className="proficioNext_logo_size"
            onClick={() => navigator('/')}
            loading="lazy"
          />
        </div>
        <div className="forgotpassword_form">
          <div className="back_to_signup">
            <LeftArrow />
            <div
              style={{ marginLeft: '12px' }}
              onClick={() => navigator('/auth/login')}
            >
              Back to login
            </div>
          </div>
          <div className="forgotpassword_title">Forgot your password?</div>
          <p>
            Don’t worry, happens to all of us. Enter your email below to recover
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
              backgroundColor: isFormValid ? '#007BFF' : 'grey',
              cursor: isFormValid ? 'pointer' : 'not-allowed',
            }}
            onClick={handleForgotPassword}
            disabled={!isFormValid}
          >
            Submit
          </button>
          <div className="or_forgotpassword">
            <hr />
            <div>Or login with</div>
            <hr />
          </div>
          <div className="other_forgotpassword_options">
            <div className="forgotpassword_options">
              <img src="/images/Google.svg" alt="login_image" />
            </div>
            <div className="forgotpassword_options">
              <img src="/images/Apple.svg" alt="login_image" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;

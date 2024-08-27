import { useState } from 'react';
import LeftArrow from '../../icons/LeftArrow';
import './forgotPassword.css';
import { useNavigate } from 'react-router';

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


  return (
    <div className="forgotpassword_root">
      <div className="forgotpassword_container">
        <div className="techwings_logo_forgotpassword">
          <img src="/assets/images/TechWingLogo.svg" alt="login_image" />
        </div>
        <div className="forgotpassword_form">
          <div className="back_to_signup">
            <LeftArrow />
            <div style={{ marginLeft: '12px' }}>Back to sign up</div>
          </div>
          <div className="forgotpassword_title">Forgot your password?</div>
          <p>
            Don’t worry, happens to all of us. Enter your email below to recover
            your <br /> password.
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
          <div
            className="submit_btn"
            style={{
              backgroundColor: isFormValid ? '#4274BA' : 'grey',
              cursor: isFormValid ? 'pointer' : 'not-allowed',
            }}
            onClick={() => navigator('/auth/resetpassword')}

          >
            Submit
          </div>
          <div className="or_forgotpassword">
            <hr />
            <div>Or login with</div>
            <hr />
          </div>
          <div className="other_forgotpassword_options">
            <div className="forgotpassword_options">
              <img src="/assets/images/Google.svg" alt="login_image" />
            </div>
            <div className="forgotpassword_options">
              <img src="/assets/images/Apple.svg" alt="login_image" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;

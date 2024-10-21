import { useState } from 'react';
import './signup.css';
import EyeOpen from '../../icons/Eye';
import EyeClosed from '../../icons/EyeClosed';
import { useNavigate } from 'react-router-dom';
import { useSignUpMutation } from '../../services/features/auth/authApiSlice';
import { BiSolidErrorAlt } from 'react-icons/bi';

const Signup = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [emailError, setEmailError] = useState<boolean>(true);
  const [termsAccepted, setTermsAccepted] = useState<boolean>(false);
  const samePassword = password === confirmPassword;
  const isFormValid =
    password !== '' && !emailError && samePassword && termsAccepted;
  const navigator = useNavigate();

  const validateEmail = (email: string) => {
    // Basic email validation regex
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

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

  const handleTermsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTermsAccepted(e.target.checked);
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    if (!validateEmail(value)) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
  };

  const [signup, { isLoading }] = useSignUpMutation();
  const [err, setErr] = useState<string>('');

  const handleSignup = async () => {
    const userData = {
      email: email,
      password: password,
    };
    try {
      const res = await signup(userData).unwrap();
      console.log(res);
      navigator('/auth/verifyaccount');
    } catch (error: unknown) {
      console.log(error);
      setErr('Something went wrong');
    }
  };

  return (
    <div className="signup_root">
      <div className="signup_container">
        <div className="left_section">
          <img
            src="/assets/images/Signup.svg"
            alt="signup_image"
            className="signup_img"
          />
        </div>
        <div className="right_section">
          <div className="techwings_logo">
            <img
              src="/assets/images/TechWingLogo.svg"
              alt="techwings_logo"
              onClick={() => navigator('/')}
            />
          </div>
          <div className="signup_form">
            <div className="login_title">Sign up</div>
            <p>
              Let’s get you all set up so you can access your personal account.
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

            {err && (
              <div className="error_message">
                <BiSolidErrorAlt fontSize={18} />
                <div style={{ paddingLeft: '5px' }}>{err}</div>
              </div>
            )}

            <div className="TOS">
              <input
                type="checkbox"
                style={{ cursor: 'pointer' }}
                checked={termsAccepted}
                onChange={handleTermsChange}
              />
              <div style={{ marginLeft: '8px' }}>
                I agree to all the{' '}
                <span
                  style={{
                    color: '#FF8682',
                    fontWeight: '600',
                    cursor: 'pointer',
                  }}
                >
                  Terms
                </span>{' '}
                and{' '}
                <span
                  style={{
                    color: '#FF8682',
                    fontWeight: '600',
                    cursor: 'pointer',
                  }}
                >
                  Privacy Policies
                </span>
              </div>
            </div>

            <button
              className="signup_btn"
              style={{
                backgroundColor: isFormValid && !isLoading ? '#4274BA' : 'grey',
                cursor: isFormValid && !isLoading ? 'pointer' : 'not-allowed',
              }}
              onClick={() => navigator('/auth/verifyaccount')}
              disabled={!isFormValid || isLoading}
            >
              {isLoading ? <div className="spinner"></div> : 'Create Account'}
            </button>

            <div className="already_have_acc">
              Already have an account?{' '}
              <span
                style={{
                  color: '#FF8682',
                  fontWeight: '600',
                  cursor: 'pointer',
                }}
                onClick={() => navigator('/auth/login')}
              >
                Login
              </span>
            </div>

            <div className="or_signup">
              <hr />
              <div>Or Sign up with</div>
              <hr />
            </div>

            <div className="other_signup_options">
              <div className="signup_options">
                <img src="/assets/images/Google.svg" alt="Google signup" />
              </div>
              <div className="signup_options">
                <img src="/assets/images/Apple.svg" alt="Apple signup" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;

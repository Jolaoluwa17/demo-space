import { useState } from 'react';
import './signup.css';

import { useNavigate } from 'react-router-dom';
import { BiSolidErrorAlt } from 'react-icons/bi';
import { useDispatch } from 'react-redux';
import { useSignUpMutation } from '@/services/features/auth/authApiSlice';
import { setCredentials } from '@/services/features/auth/authSlice';
import EyeOpen from '@/icons/Eye';
import EyeClosed from '@/icons/EyeClosed';
import { IoClose, IoCheckmarkDoneOutline } from 'react-icons/io5';

interface ErrorResponse {
  status: number;
  data: {
    error: string;
    response: string;
  };
}

const Signup = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [emailError, setEmailError] = useState<boolean>(true);
  const [termsAccepted, setTermsAccepted] = useState<boolean>(false);
  const [err, setErr] = useState<string>('');

  const navigator = useNavigate();
  const dispatch = useDispatch();
  const [signup, { isLoading }] = useSignUpMutation();

  // Password validation conditions
  const hasMinLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>_]/.test(password);

  const samePassword = password === confirmPassword;
  const isFormValid =
    hasMinLength &&
    hasUppercase &&
    hasLowercase &&
    hasNumber &&
    hasSpecialChar &&
    !emailError &&
    samePassword &&
    termsAccepted;

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

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
    setEmailError(!validateEmail(value));
  };

  const handleSignup = async () => {
    const userData = { email, password };
    try {
      await signup(userData).unwrap();
      dispatch(setCredentials({ email, password }));
      navigator('/auth/verifyaccount');
    } catch (error: unknown) {
      console.log(error);
      const err = error as ErrorResponse;
      setErr(
        err.data.response === 'User already exists'
          ? 'User already exists'
          : 'Something went wrong'
      );
    }
  };

  return (
    <div className="signup_root">
      <div className="signup_container">
        <div className="left_section">
          <img
            src="/assets/images/Signup.png"
            alt="signup_image"
            className="signup_img"
            style={{ borderRadius: '10px' }}
            loading="lazy"
          />
        </div>
        <div className="right_section">
          <div className="techwings_logo">
            <img
              src="/assets/images/TechWingLogo.svg"
              alt="techwings_logo"
              onClick={() => navigator('/')}
              loading="lazy"
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
                disabled={isLoading}
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
                  disabled={isLoading}
                  style={samePassword ? {} : { border: '1px solid red' }}
                />
                <div onClick={handleHiddenTrigger} className="see_password">
                  {showPassword ? <EyeOpen /> : <EyeClosed />}
                </div>
              </div>
            </div>

            <div className="password_validator">
              <div
                className="password_indicator_option"
                style={{ color: hasMinLength ? 'green' : 'red' }}
              >
                {hasMinLength ? (
                  <IoCheckmarkDoneOutline style={{ paddingRight: '5px' }} />
                ) : (
                  <IoClose style={{ paddingRight: '5px' }} />
                )}
                8 Characters
              </div>
              <div
                className="password_indicator_option"
                style={{ color: hasUppercase ? 'green' : 'red' }}
              >
                {hasUppercase ? (
                  <IoCheckmarkDoneOutline style={{ paddingRight: '5px' }} />
                ) : (
                  <IoClose style={{ paddingRight: '5px' }} />
                )}
                An Uppercase Letter
              </div>
              <div
                className="password_indicator_option"
                style={{ color: hasLowercase ? 'green' : 'red' }}
              >
                {hasLowercase ? (
                  <IoCheckmarkDoneOutline style={{ paddingRight: '5px' }} />
                ) : (
                  <IoClose style={{ paddingRight: '5px' }} />
                )}
                A Lowercase Letter
              </div>
              <div
                className="password_indicator_option"
                style={{ color: hasSpecialChar ? 'green' : 'red' }}
              >
                {hasSpecialChar ? (
                  <IoCheckmarkDoneOutline style={{ paddingRight: '5px' }} />
                ) : (
                  <IoClose style={{ paddingRight: '5px' }} />
                )}
                A Special Character
              </div>
              <div
                className="password_indicator_option"
                style={{ color: hasNumber ? 'green' : 'red' }}
              >
                {hasNumber ? (
                  <IoCheckmarkDoneOutline style={{ paddingRight: '5px' }} />
                ) : (
                  <IoClose style={{ paddingRight: '5px' }} />
                )}
                A Number
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
                  disabled={isLoading}
                  style={samePassword ? {} : { border: '1px solid red' }}
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
              onClick={handleSignup}
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
              <div style={{ textAlign: 'center' }}>Or Sign up with</div>
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

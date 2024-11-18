import { useState } from 'react';
import './login.css';
import EyeOpen from '../../icons/Eye';
import EyeClosed from '../../icons/EyeClosed';
import { useNavigate } from 'react-router-dom';
import {
  useLoginMutation,
  useRequestCodeMutation,
} from '../../services/features/auth/authApiSlice';
import { useDispatch } from 'react-redux';
import {
  setAuthState,
  setCredentials,
} from '../../services/features/auth/authSlice';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState<boolean>(true);
  const isFormValid = password !== '' && !emailError;

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

  const handleEmailChange = (value: string) => {
    setEmail(value);
    if (!validateEmail(value)) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
  };

  const navigator = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    const userData = {
      email: email,
      password: password,
    };

    try {
      const res = await login(userData).unwrap();
      console.log(res);
      dispatch(
        setAuthState({
          isAuthenticated: true,
          token: res.token,
          emailVerified: res.user.status ?? false,
          id: res.user._id ?? '',
        })
      );
      if (res.user.status === false) {
        dispatch(setCredentials({ email: email, password: password }));
        handleRequestCode();
        navigator('/auth/verifyaccount');
      } else if (!res.user.fullName) {
        navigator('/user-profile');
      } else {
        navigator('/dashboard');
      }
    } catch (error: unknown) {
      console.log(error);
    }
  };

  const [requestCode] = useRequestCodeMutation();

  const handleRequestCode = async () => {
    const userData = { email: email };
    try {
      await requestCode(userData).unwrap();
    } catch (error: unknown) {
      console.log(error);
    }
  };

  return (
    <div className="login_root">
      <div className="login_container">
        <div className="left_section">
          <div className="techwings_logo_login">
            <img
              src="/assets/images/TechWingLogo.svg"
              alt="login_image"
              onClick={() => navigator('/')}
            />
          </div>
          <div className="login_form">
            <div className="login_title">Login</div>
            <p>
              Please provide the information below to login and access your
              account
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
            <div className="others">
              <div className="rememberMe">
                <input type="checkbox" style={{ cursor: 'pointer' }} />
                <div style={{ marginLeft: '8px' }}>Remember me</div>
              </div>
              <div
                style={{ color: '#FF8682', cursor: 'pointer' }}
                onClick={() => navigator('/auth/forgotpassword')}
                className="forgot_password_text"
              >
                Forgot Password
              </div>
            </div>
            <button
              className="login_btn"
              style={{
                backgroundColor: isFormValid && !isLoading ? '#4274BA' : 'grey',
                cursor: isFormValid && !isLoading ? 'pointer' : 'not-allowed',
              }}
              onClick={handleLogin}
              disabled={!isFormValid || isLoading}
            >
              {isLoading ? <div className="spinner"></div> : 'Login'}
            </button>
            <div className="doAccount">
              Don’t have an account?{' '}
              <span
                style={{
                  color: '#FF8682',
                  fontWeight: '600',
                  cursor: 'pointer',
                }}
                onClick={() => navigator('/auth/signup')}
              >
                Sign up
              </span>
            </div>
            <div className="or_login">
              <hr />
              <div>Or login with</div>
              <hr />
            </div>
            <div className="other_login_options">
              <div className="login_options">
                <img src="/assets/images/Google.svg" alt="login_image" />
              </div>
              <div className="login_options">
                <img src="/assets/images/Apple.svg" alt="login_image" />
              </div>
            </div>
          </div>
        </div>
        <div className="right_section">
          <img
            src="/assets/images/Login.svg"
            alt="login_image"
            className="login_img"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;

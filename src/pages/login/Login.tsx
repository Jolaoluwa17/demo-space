import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BiSolidErrorAlt } from 'react-icons/bi';
import { useDispatch } from 'react-redux';

import './login.css';
import EyeOpen from '@/icons/Eye';
import EyeClosed from '@/icons/EyeClosed';
import {
  useLoginMutation,
  useRequestCodeMutation,
} from '@/services/features/auth/authApiSlice';
import {
  setAuthState,
  setCredentials,
} from '@/services/features/auth/authSlice';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState<boolean>(true);
  const [rememberMe, setRememberMe] = useState(false);
  const isFormValid = password !== '' && !emailError;
  const [errMsg, setErrMsg] = useState<string>('');

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

  const handleRememberMeChange = () => {
    setRememberMe(!rememberMe);
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    if (!validateEmail(value)) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
  };

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    const userData = {
      email: email,
      password: password,
      userType: 'User',
    };

    if (rememberMe) {
      localStorage.setItem('evaluator', email);
    } else {
      localStorage.removeItem('evaluator');
    }

    try {
      const res = await login(userData).unwrap();
      console.log(res);
      dispatch(
        setAuthState({
          isAuthenticated: true,
          token: res.token,
          emailVerified: res.user.status ?? false,
          id: res.user._id ?? '',
          userType: 'User',
        })
      );
      if (res.user.status === false) {
        dispatch(
          setCredentials({
            email: email,
            password: password,
            userType: 'User',
          })
        );
        handleRequestCode();
        navigate('/auth/verifyaccount');
      } else if (!res.user.fullName) {
        navigate('/user-profile');
      } else {
        navigate('/dashboard');
      }
    } catch (error) {
      console.log(error);
      setErrMsg('Invalid email or password');
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

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' && isFormValid && !isLoading) {
      handleLogin();
    }
  };

  return (
    <div className="login_root" onKeyDown={handleKeyDown} tabIndex={0}>
      <div className="login_container">
        <div className="left">
          <div className="techwings_logo_login">
            <img
              src="/images/ProficioNextLogo.png"
              alt=""
              className="proficioNext_logo_size"
              onClick={() => navigate('/')}
              loading="lazy"
            />
          </div>
          <div className="login_title_container">
            <div className="login_title">Login</div>
          </div>
          <div className="login_sub_title">
            Please provide the information below to login and access your
            account
          </div>
          <div className="login_form_item">
            <label htmlFor="">Enter Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => handleEmailChange(e.target.value)}
              placeholder="ysemiraefe@gmail.com"
              disabled={isLoading}
            />
          </div>
          <div className="login_form_item">
            <label htmlFor="">Enter Password</label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={handlePasswordChange}
                placeholder="************"
                disabled={isLoading}
              />
              <div
                className="login_password_visibility"
                onClick={handleHiddenTrigger}
              >
                {showPassword ? <EyeOpen /> : <EyeClosed />}
              </div>
            </div>
          </div>
          <div className="login_configurations">
            <div className="remember_me">
              <input
                type="checkbox"
                style={{ cursor: 'pointer' }}
                onChange={handleRememberMeChange}
              />
              <div style={{ marginLeft: '8px' }}>Remember me</div>
            </div>
            <div
              className="forgot_password_btn"
              style={{ color: '#FF8682', cursor: 'pointer', fontSize: '14px' }}
              onClick={() => navigate('/auth/forgotpassword')}
            >
              Forgot Password
            </div>
          </div>
          <button
            className="login_btn"
            style={{
              backgroundColor: isFormValid && !isLoading ? '#007BFF' : 'grey',
              cursor: isFormValid && !isLoading ? 'pointer' : 'not-allowed',
            }}
            onClick={handleLogin}
            disabled={!isFormValid || isLoading}
          >
            {isLoading ? <div className="spinner"></div> : 'Login'}
          </button>
          {errMsg && (
            <div className="error_message">
              <BiSolidErrorAlt fontSize={18} style={{ paddingRight: '5px' }} />
              {errMsg}
            </div>
          )}
          <div className="donot_have_acc">
            Don't have an account?{' '}
            <span
              style={{ color: '#FF8682', cursor: 'pointer', fontWeight: '600' }}
              onClick={() => navigate('/auth/signup')}
            >
              Sign up
            </span>
          </div>
          {/* <div className="or_login">
            <hr />
            <div style={{ padding: '0px 10px', textAlign: 'center' }}>
              Or login with
            </div>
            <hr />
          </div> */}
          {/* <div className="login_options">
            <div className="login_options_button">
              <img src="/assets/images/Google.svg" alt="login_image" />
            </div>
            <div className="login_options_button">
              <img src="/assets/images/Apple.svg" alt="login_image" />
            </div>
          </div> */}
          <div className="image_container"></div>
        </div>
        <div className="right">
          <img
            src="/assets/images/Login.png"
            alt="login_image"
            className="login_img"
            style={{ borderRadius: '10px', position: 'inherit' }}
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;

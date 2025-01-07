import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BiSolidErrorAlt } from 'react-icons/bi';
import { useDispatch } from 'react-redux';

import './login.css';
import {
  useLoginMutation,
  useRequestCodeMutation,
} from '@/services/features/auth/authApiSlice';
import {
  setAuthState,
  setCredentials,
} from '@/services/features/auth/authSlice';
import { IoEye, IoEyeOff } from 'react-icons/io5';
import { FcGoogle } from 'react-icons/fc';

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
    <div className="signup_root" onKeyDown={handleKeyDown} tabIndex={0}>
      <div className="right">
        <div className="right_signup_content">
          <div className="signup_techwings_logo">
            <div className="signup_logo_absolute">
              <img
                src="/images/ProficioNextLogo.png"
                alt=""
                className="proficioNext_logo_size"
              />
            </div>
          </div>
          <div className="signup_title">Login</div>
          <div className="signup_subTitle">
            Please provide the information below to login and access your
            account
          </div>
          <div className="signup_form">
            <div className="signup_form_item">
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
            <div className="signup_form_item">
              <label htmlFor="email">Enter Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="************"
                  value={password}
                  onChange={handlePasswordChange}
                  disabled={isLoading}
                />
                <div
                  onClick={handleHiddenTrigger}
                  className="password_visibility"
                >
                  {showPassword ? (
                    <IoEye
                      className="password_visibility_icon"
                      color="#818181"
                    />
                  ) : (
                    <IoEyeOff
                      className="password_visibility_icon"
                      color="#818181"
                    />
                  )}
                </div>
              </div>
            </div>
            {errMsg && (
              <div
                className="error_message"
                style={{ marginTop: '-10px', marginBottom: '20px' }}
              >
                <BiSolidErrorAlt
                  fontSize={18}
                  style={{ paddingRight: '5px' }}
                />
                {errMsg}
              </div>
            )}

            <div className="other_login_options">
              <div className="TOS_container">
                <input type="checkbox" onChange={handleRememberMeChange} />
                <div className="TOS">Rememeber me</div>
              </div>
              <div
                className="TOS"
                style={{ color: '#FF8682', cursor: 'pointer' }}
                onClick={() => navigate('/auth/forgotpassword')}
              >
                Forgot Password
              </div>
            </div>
            <button
              className="create_acc_btn"
              style={{
                backgroundColor: isFormValid && !isLoading ? '#007BFF' : 'grey',
                cursor: isFormValid && !isLoading ? 'pointer' : 'not-allowed',
              }}
              onClick={handleLogin}
              disabled={!isFormValid || isLoading}
            >
              {isLoading ? <div className="spinner"></div> : 'Login'}
            </button>
            <div
              className="already_have_acc"
              style={{ marginTop: '30px', marginBottom: '30px' }}
            >
              Don't have an account?{' '}
              <span
                style={{
                  color: '#FF8682',
                  cursor: 'pointer',
                }}
                onClick={() => navigate('/auth/signup')}
              >
                Signup
              </span>
            </div>
            <div className="or_sign_up_with" style={{ marginBottom: '30px' }}>
              <hr />
              <span>or login with</span>
              <hr />
            </div>
            <div className="google_sign">
              <FcGoogle size={20} />
            </div>
          </div>
        </div>
      </div>
      <div className="left"></div>
    </div>
  );
};

export default Login;

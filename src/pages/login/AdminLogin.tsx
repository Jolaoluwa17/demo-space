import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import './login.css';
import ErrorResponse from '@/types/ErrorResponse';
import { useLoginMutation } from '@/services/features/auth/authApiSlice';
import { setAuthState } from '@/services/features/auth/authSlice';
import { BiSolidErrorAlt } from 'react-icons/bi';
import EyeOpen from '@/icons/Eye';
import EyeClosed from '@/icons/EyeClosed';

const AdminLogin = () => {
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
      userType: 'Admin',
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
          userType: 'Admin',
        })
      );

      navigator('/admin/dashboard');
    } catch (error: unknown) {
      const err = error as ErrorResponse;

      if (err?.status === 404) {
        setErrMsg('Invalid email or password');
      } else {
        setErrMsg('Something went wrong');
      }
      console.log(error);
    }
  };

  const navigator = useNavigate();

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' && isFormValid && !isLoading) {
      handleLogin();
    }
  };

  return (
    <div className="login_root_admin" onKeyDown={handleKeyDown} tabIndex={0}>
      <div className="login_container_admin">
        <div className="left_admin">
          <div className="techwings_logo_login_admin">
            <img
              src="/images/proficioNext.svg"
              alt="TechWings Global"
              onClick={() => navigator('/')}
              loading="lazy"
            />
          </div>
          <div className="login_title_container">
            <div className="login_title">Admin Login</div>
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
          <div className="image_container"></div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;

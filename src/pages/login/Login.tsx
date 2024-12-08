import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';
import EyeOpen from '@/icons/Eye';
import EyeClosed from '@/icons/EyeClosed';
import {
  useLoginMutation,
  useRequestCodeMutation,
} from '@/services/features/auth/authApiSlice';
import { useDispatch } from 'react-redux';
import {
  setAuthState,
  setCredentials,
} from '@/services/features/auth/authSlice';
import { BiSolidErrorAlt } from 'react-icons/bi';
import CustomSelect from '@/components/customselect/CustomSelect';

interface ErrorResponse {
  status: number;
  data: {
    error: string;
    response: string;
  };
}

const userList = ['User', 'Admin'];

const Login = () => {
  const [typeOfUser, setTypeOfUser] = useState('User');
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
      userType: typeOfUser,
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
          userType: typeOfUser,
        })
      );
      if (typeOfUser === 'User' && res.user.status === false) {
        dispatch(
          setCredentials({
            email: email,
            password: password,
            userType: typeOfUser,
          })
        );
        handleRequestCode();
        navigator('/auth/verifyaccount');
      } else if (typeOfUser === 'User' && !res.user.fullName) {
        navigator('/user-profile');
      } else if (typeOfUser === 'User') {
        navigator('/dashboard');
      } else {
        navigator('/admin/dashboard');
      }
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

  const [requestCode] = useRequestCodeMutation();

  const handleRequestCode = async () => {
    const userData = { email: email };
    try {
      await requestCode(userData).unwrap();
    } catch (error: unknown) {
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
    <div className="login_root" onKeyDown={handleKeyDown} tabIndex={0}>
      <div className="login_container">
        <div className="left">
          <div className="techwings_logo_login">
            <img
              src="/images/proficioNext.svg"
              alt="TechWings Global"
              onClick={() => navigator('/')}
              loading="lazy"
            />
          </div>
          <div className="login_title_container">
            <div className="login_title">Login</div>
            <div className="usertype_selector" style={{ fontSize: '14px' }}>
              <CustomSelect
                options={userList}
                value={typeOfUser}
                onChange={(value) => setTypeOfUser(value)}
                minWidth="100px"
              />
            </div>
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
              onClick={() => navigator('/auth/forgotpassword')}
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
              onClick={() => navigator('/auth/signup')}
            >
              Sign up
            </span>
          </div>
          <div className="or_login">
            <hr />
            <div style={{ padding: '0px 10px', textAlign: 'center' }}>
              Or login with
            </div>
            <hr />
          </div>
          <div className="login_options">
            <div className="login_options_button">
              <img src="/assets/images/Google.svg" alt="login_image" />
            </div>
            <div className="login_options_button">
              <img src="/assets/images/Apple.svg" alt="login_image" />
            </div>
          </div>
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

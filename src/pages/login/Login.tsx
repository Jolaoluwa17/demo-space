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
      <div className="techwings_logo_login">
        <img
          src="/assets/images/TechWingLogo.svg"
          alt="login_image"
          onClick={() => navigator('/')}
        />
      </div>
      <div className="login_container">
        <div className="left"></div>
        <div className="right"></div>
      </div>
    </div>
  );
};

export default Login;

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { IoEye, IoEyeOff } from 'react-icons/io5';
import { FcGoogle } from 'react-icons/fc';
import { BiSolidErrorAlt } from 'react-icons/bi';

import './signup.css';
import {
  // useGoogleAuthQuery,
  useSignUpMutation,
} from '@/services/features/auth/authApiSlice';
import { setCredentials } from '@/services/features/auth/authSlice';

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
      dispatch(setCredentials({ email, password, userType: 'User' }));
      navigator('/auth/verifyaccount');
    } catch (error: unknown) {
      console.log(error);
      const err = error as ErrorResponse;
      setErr(
        err.data.error === 'User with this email already exists.'
          ? 'User already exists'
          : 'Something went wrong'
      );
    }
  };

  // const { data, isLoading: googleLoading, error } = useGoogleAuthQuery({});

  // console.log(data)

  // const handleGoogleLogin = async () => {
  //   try {
  //     const response = await fetch("https://evaluatorappapi.onrender.com/api/user/auth/google", {
  //       method: "GET",
  //       //credentials: "include", // Ensures cookies/session are passed if needed
  //     });

  //     const data = await response.json();
  //     if (data.success) {
  //       console.log("Login Successful:", data);
  //       localStorage.setItem("token", data.token); // Store token for authentication
  //       localStorage.setItem("user", JSON.stringify(data.user)); // Store user details
  //       // dispatch(setCredentials({ email, password, userType: 'User' }));
  //     } else {
  //       console.error("Google Login Failed");
  //     }
  //   } catch (error) {
  //     console.error("Error during Google Login:", error);
  //   }
  // };

  const handleGoogleLogin = () => {
    window.location.href = "https://evaluatorappapi.onrender.com/api/user/auth/google";
  };
  

  return (
    <div className="signup_root">
      <div className="left">
        <div className="right_P_side">
          <img
            src="/images/rightPSide.svg"
            alt="design"
            className="P_side_main"
          />
        </div>
        <div className="left_P_side">
          <img
            src="/images/leftPSide.svg"
            alt="design"
            className="P_side_main"
          />
        </div>
        <div
          className="proficio_next_logo_large"
          onClick={() => navigator('/')}
          style={{ cursor: 'pointer' }}
        >
          <img
            src="/images/ProfiocioNextLogo.png"
            alt="Proficio Logo"
            style={{ height: '100%' }}
          />
        </div>
      </div>
      <div className="right">
        <div className="right_signup_content">
          <div className="signup_techwings_logo">
            <div
              className="signup_logo_absolute"
              onClick={() => navigator('/')}
            >
              <img
                src="/images/ProficioNextLogo.png"
                alt="Proficio Logo"
                className="proficioNext_logo_size"
              />
            </div>
          </div>
          <div className="signup_title">Sign up</div>
          <div className="signup_subTitle">
            Let's get you all started up so you can access your personal
            account.
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
                  style={
                    samePassword
                      ? {}
                      : { border: '1px solid red', outline: 'none' }
                  }
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
            {password.length > 0 && (
              <div
                className="password_indicator_option"
                style={{
                  color:
                    hasMinLength &&
                    hasUppercase &&
                    hasLowercase &&
                    hasSpecialChar &&
                    hasNumber
                      ? 'green'
                      : 'red',
                }}
              >
                Your password must be at least 8 characters long, have at least
                1 capital letter, have at least 1 lowercase letter, have at
                least 1 special character, and must have at least 1 number
              </div>
            )}
            <div className="signup_form_item">
              <label htmlFor="email">Confirm Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="************"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  disabled={isLoading}
                  style={
                    samePassword
                      ? {}
                      : { border: '1px solid red', outline: 'none' }
                  }
                />
                <div
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="password_visibility"
                >
                  {showConfirmPassword ? (
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
            {err && (
              <div
                className="error_message"
                style={{ marginTop: '-10px', marginBottom: '16px' }}
              >
                <BiSolidErrorAlt fontSize={18} />
                <div style={{ paddingLeft: '5px' }}>{err}</div>
              </div>
            )}
            <div className="TOS_container">
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={handleTermsChange}
              />
              <div className="TOS">
                I agree to all the{' '}
                <span
                  style={{
                    color: '#FF8682',
                    cursor: 'pointer',
                  }}
                  className="underline_link"
                >
                  Terms
                </span>{' '}
                and{' '}
                <span
                  style={{
                    color: '#FF8682',
                    cursor: 'pointer',
                  }}
                  className="underline_link"
                >
                  Privacy Policies
                </span>
              </div>
            </div>
            <button
              className="create_acc_btn"
              style={{
                backgroundColor: isFormValid && !isLoading ? '#007BFF' : 'grey',
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
                  cursor: 'pointer',
                }}
                className="underline_link"
                onClick={() => navigator('/auth/login')}
              >
                Login
              </span>
            </div>
            <div className="or_sign_up_with">
              <hr />
              <span>or sign up with</span>
              <hr />
            </div>
            <div className="google_sign" onClick={handleGoogleLogin}>
              <FcGoogle size={20} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;

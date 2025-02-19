import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BiSolidErrorAlt } from 'react-icons/bi';
import { FaArrowLeftLong } from 'react-icons/fa6';

import './forgotPassword.css';
import { useForgotPasswordMutation } from '@/services/features/auth/authApiSlice';
import ErrorResponse from '@/types/ErrorResponse';
import { AnimatePresence, motion } from 'framer-motion';
import NotificationToast from '@/components/notificationToast/NotificationToast';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState<boolean>(true);
  const isFormValid = !emailError && email.length !== 0;
  const [success, setIsSuccess] = useState(false);

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
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const [err, setErr] = useState<string>('');

  const handleForgotPassword = async () => {
    const userData = { email: email };
    try {
      const res = await forgotPassword(userData).unwrap();
      console.log(res);
      setIsSuccess(true);
      setEmail('');
    } catch (error: unknown) {
      const err = error as ErrorResponse;
      setErr(
        err.data.error === 'User with the given email not found'
          ? 'User not found'
          : 'Something went wrong'
      );
    } finally {
      setTimeout(() => {
        setIsSuccess(false);
      }, 3000);
    }
  };

  return (
    <div className="forgotpassword_root">
      <div className="techwings_logo_forgotpassword">
        <img
          src="/images/ProficioNextLogo.png"
          alt=""
          className="proficioNext_logo_size"
          onClick={() => navigator('/')}
          loading="lazy"
        />
      </div>
      <div className="forgotpassword_container">
        <div className="forgotpassword_form">
          <div
            className="back_to_signup underline_link"
            onClick={() => navigator('/auth/login')}
          >
            <FaArrowLeftLong />
            <div style={{ marginLeft: '12px' }}>Back to login</div>
          </div>
          <div className="forgotpassword_title">Forgot your password?</div>
          <p>
            Don't worry, happens to all of us. Enter your email below to recover
            your password.
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
          {err && (
            <div className="error_message">
              <BiSolidErrorAlt fontSize={18} />
              <div style={{ paddingLeft: '5px' }}>{err}</div>
            </div>
          )}
          <button
            className="submit_btn"
            style={{
              backgroundColor:
                isFormValid && !isLoading && !success ? '#007BFF' : 'grey',
              cursor:
                isFormValid && !isLoading && !success
                  ? 'pointer'
                  : 'not-allowed',
            }}
            onClick={handleForgotPassword}
            disabled={!isFormValid || isLoading || success}
          >
            {isLoading ? <div className="spinner"></div> : 'Reset Password'}
          </button>
          <div className="or_forgotpassword">
            <hr />
            <div>or login with</div>
            <hr />
          </div>
          <div className="other_forgotpassword_options">
            <div className="forgotpassword_options">
              <img src="/images/Google.svg" alt="login_image" />
            </div>
          </div>
        </div>
      </div>
      {success && (
        <AnimatePresence>
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.5 }}
            className="notification-toast-wrapper"
          >
            <NotificationToast
              msg="Message sent 👍🏼! Please check your mail or spam mail"
              toastType="success"
              cancel={() => setIsSuccess(false)}
            />
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
};

export default ForgotPassword;

import { useNavigate } from 'react-router-dom';
import PageHeader from '../../../components/pageHeader/PageHeader';
import './deleteAccount.css';
import { useState, useEffect } from 'react';
import EyeOpen from '../../../icons/Eye';
import EyeClosed from '../../../icons/EyeClosed';
import Popup from '../../../modals/popup/Popup';

const DeleteAccount = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [popup, setPopup] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const navigate = useNavigate();

  // Check if both passwords are filled and match
  useEffect(() => {
    if (password && confirmPassword && password === confirmPassword) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [password, confirmPassword]);

  const handleBackClick = () => {
    navigate('/dashboard/profile');
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

  const handleDeleteAccount = () => {
    setPopup(true);

    setTimeout(() => {
      setPopup(false);
      navigate('/auth/login');
    }, 3000);
  };

  return (
    <div className="delete_account_root">
      <PageHeader
        pageTitle="Delete Account"
        handleBackClick={handleBackClick}
      />
      <div className="delete_account_form">
        <div className="delete_account_form_item">
          <div className="form_item">
            <label htmlFor="">Enter Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              className="delete_account_input"
              value={password}
              onChange={handlePasswordChange}
            />
            <div
              onClick={handleHiddenTrigger}
              className="delete_account_see_password"
            >
              {showPassword ? <EyeOpen /> : <EyeClosed />}
            </div>
          </div>
          <div className="form_item">
            <label htmlFor="">Confirm Password</label>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              className="delete_account_input"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
            <div
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="delete_account_see_password"
            >
              {showConfirmPassword ? <EyeOpen /> : <EyeClosed />}
            </div>
          </div>

          <div
            className={`delete_account_confirm_btn ${isButtonDisabled ? 'disabled' : ''}`}
            onClick={!isButtonDisabled ? handleDeleteAccount : undefined}
            style={{
              backgroundColor: isButtonDisabled ? 'grey' : '', 
              cursor: isButtonDisabled ? 'not-allowed' : 'pointer',
            }}
          >
            Confirm
          </div>

          <Popup popup={popup}>
            <div className="delete_account_popup">
              <img src="/public/images/DeleteAccount.svg" alt="" />
              <div className="delete_account_popup_text">
                <p>We hope to see you soon</p>
                <div>
                  Your Account has been deleted <br /> successfully
                </div>
              </div>
            </div>
          </Popup>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccount;

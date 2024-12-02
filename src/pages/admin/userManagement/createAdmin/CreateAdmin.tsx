import PageHeader from '@/components/pageHeader/PageHeader';
import { useNavigate } from 'react-router-dom';
import { IoPersonSharp } from 'react-icons/io5';
import './createAdmin.css';
import Popup from '@/modals/popup/Popup';
import { useState } from 'react';
import { useCreateAdminMutation } from '@/services/features/admin/adminSlice';
import ErrorResponse from '@/types/ErrorResponse';
import { BiSolidErrorAlt } from 'react-icons/bi';

const CreateAdmin = () => {
  const navigate = useNavigate();

  const [showPopup, setShowPopup] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [errMsg, setErrMsg] = useState('');

  const [createAdmin, { isLoading }] = useCreateAdminMutation();

  const handleCreateAdmin = async () => {
    const adminData = {
      name: name,
      email: email,
    };
    try {
      const res = await createAdmin(adminData).unwrap();
      setShowPopup(true);

      setTimeout(() => {
        setShowPopup(false);
      }, 3000);

      console.log(res);
    } catch (error: unknown) {
      const err = error as ErrorResponse;
      if (err?.data.error === 'This record already exists') {
        setErrMsg('Admin already exists');
      } else {
        setErrMsg('Something went wrong');
      }

      console.log(error);
    }
  };

  return (
    <div className="create_admin_root">
      <PageHeader
        pageTitle="Create An Admin"
        handleBackClick={() =>
          navigate('/admin/dashboard/user-management/view-admin')
        }
      />
      <div className="create_admin_content">
        <div className="create_admin_title">Personal Information</div>
        <div className="create_subTitle">
          This information will be used to create your personal profile.
        </div>
        <div className="create_admin_img">
          <IoPersonSharp size={80} />
        </div>
        <div className="create_admin_form_item">
          <label htmlFor="name">Enter Full Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Olusanya Jolaoluwa"
          />
        </div>
        <div className="create_admin_form_item">
          <label htmlFor="email">Enter Email Address</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="j.olusanya@gmail.com"
          />
        </div>
        {errMsg && (
          <div className="error_message">
            <BiSolidErrorAlt fontSize={18} style={{ paddingRight: '5px' }} />
            {errMsg}
          </div>
        )}
        <div className="create_admin_btn_container">
          <div
            className="create_admin_btn"
            style={{
              backgroundColor:
                !isLoading && name !== '' && email !== '' ? '' : 'grey',
              cursor:
                !isLoading && name !== '' && email !== ''
                  ? 'pointer'
                  : 'not-allowed',
              color:
                !isLoading && name !== '' && email !== '' ? 'white' : 'white',
            }}
            onClick={
              isLoading || name === '' || email === ''
                ? undefined
                : handleCreateAdmin
            }
          >
            {isLoading ? <div className="spinner"></div> : 'CREATE ADMIN'}
          </div>
        </div>
      </div>
      <Popup popup={showPopup} closePopup={() => setShowPopup(false)}>
        <div className="change_password_popup">
          <img src="/public/images/DeleteAccount.svg" alt="" />
          <div className="change_password_popup_text">
            <p>{name} has been created successfully</p>
          </div>
        </div>
      </Popup>
    </div>
  );
};

export default CreateAdmin;

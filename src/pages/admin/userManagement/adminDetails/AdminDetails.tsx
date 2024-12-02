import PageHeader from '@/components/pageHeader/PageHeader';
import '../userDetails/userDetails.css';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  useDeleteAdminMutation,
  useGetAdminQuery,
} from '@/services/features/admin/adminSlice';
import { IoPersonSharp } from 'react-icons/io5';
import { FadeLoader } from 'react-spinners';
import { useState } from 'react';
import Popup from '@/modals/popup/Popup';

const AdminDetails = () => {
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate('/admin/dashboard/user-management/view-admin');
  };

  const location = useLocation();

  // Use URLSearchParams to get query parameters
  const queryParams = new URLSearchParams(location.search);
  const userId = queryParams.get('id');
  const { data, isLoading } = useGetAdminQuery(userId);

  const [deleteAdmin, { isLoading: deleteAdminLoading }] =
    useDeleteAdminMutation();
  const [showSuccess, setShowSuccess] = useState(false);

  const handleDeleteAdmin = async () => {
    const userData = { id: userId };
    try {
      await deleteAdmin(userData).unwrap();
      setShowSuccess(true);
      setTimeout(() => {
        handleBackClick();
      }, 2000);
    } catch (error: unknown) {
      console.log(error);
    }
  };

  return (
    <div className="user_details_root">
      <PageHeader pageTitle="User Details" handleBackClick={handleBackClick} />
      {isLoading ? (
        <div className="loadingData">
          <FadeLoader color="#4274ba" />
        </div>
      ) : (
        <div className="user_details_content">
          <div className="user_details_user_profile">
            <div className="user_profile">
              <IoPersonSharp size={80} color="white" />
            </div>
          </div>
          <div className="user_details_section">
            <div className="section_header">Personal Information</div>
            <div className="section_item">
              <div className="item_title">UserId</div>
              <div>{data?.response._id}</div>
            </div>
            <div className="section_item">
              <div className="item_title">Name</div>
              <div>{data?.response.name ? data?.response.name : 'null'}</div>
            </div>
            <div className="section_item">
              <div className="item_title">Email</div>
              <div>{data?.response.email ? data?.response.email : 'null'}</div>
            </div>
            <div className="section_item">
              <div className="item_title">Role</div>
              <div>Admin</div>
            </div>
          </div>
          <div
            className="delete_account_btn"
            style={{
              backgroundColor: !deleteAdminLoading ? 'red' : 'grey',
              cursor: !deleteAdminLoading ? 'pointer' : 'not-allowed',
              color: !deleteAdminLoading ? 'white' : 'grey',
            }}
            onClick={deleteAdminLoading ? undefined : handleDeleteAdmin}
          >
            Delete Account
          </div>
        </div>
      )}
      <Popup popup={showSuccess}>
        <div className="change_password_popup">
          <img src="/public/images/DeleteAccount.svg" alt="" />
          <div className="change_password_popup_text">
            <p>
              {data?.response.name ? data?.response.name : 'null'}{' '}
              record deleted successfully
            </p>
          </div>
        </div>
      </Popup>
    </div>
  );
};

export default AdminDetails;

import EditProfileIcon from '../../icons/EditProfileIcon';
import './pages.css';

const PersonalInformation = () => {
  return (
    <div className="settings_content">
      <div className="settings_main">
        <div className="settings_page_header">Personal Information</div>
        <div className="settings_page_subHeader">
          This information will be used to create your personal profile.
        </div>
        <div className="settings_page_profile_pic">
          <img
            src="/images/DummyProfilePic.svg"
            alt="profile_picture"
            style={{ width: '100%', height: '100%' }}
          />
          <div className="profile_edit">
            <EditProfileIcon />
          </div>
        </div>
        <div className="profile_form_item">
          <label htmlFor="fullName">Enter Full Name</label>
          <input type="text" className="profile_input_item" name="fullName" />
        </div>
        <div className="profile_form_item">
          <label htmlFor="phoneNo">Enter Phone No.</label>
          <input type="text" className="profile_input_item" name="phoneNo" />
        </div>
        <div className="profile_form_item">
          <label htmlFor="email">Enter Email Address</label>
          <input type="text" className="profile_input_item" name="email" />
        </div>
        <div className="settings_edit_btn_container">
          <div className="settings_edit_btn">Edit</div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInformation;

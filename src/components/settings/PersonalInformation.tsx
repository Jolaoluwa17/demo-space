import React, { useState } from 'react';
import EditProfileIcon from '../../icons/EditProfileIcon';
import './pages.css';

const PersonalInformation = () => {
  const [profileImage, setProfileImage] = useState<string>(
    '/images/DummyProfilePic.svg'
  );

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const fileType = file.type;
      if (
        fileType === 'image/jpeg' ||
        fileType === 'image/jpg' ||
        fileType === 'image/svg+xml'
      ) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setProfileImage(reader.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        alert('Please upload an image file of type JPEG, JPG, or SVG.');
      }
    }
  };

  return (
    <div className="settings_content">
      <div className="settings_main">
        <div className="settings_page_header">Personal Information</div>
        <div className="settings_page_subHeader">
          This information will be used to create your personal profile.
        </div>
        <div
          className="settings_page_profile_pic"
          onClick={() => document.getElementById('fileInput')?.click()}
        >
          <img
            src={profileImage}
            alt="profile_picture"
            style={{ width: '100%', height: '100%', borderRadius: '50%' }}
          />
          <div className="profile_edit">
            <EditProfileIcon />
          </div>
        </div>
        <input
          type="file"
          id="fileInput"
          style={{ display: 'none' }}
          accept=".jpeg,.jpg,.svg"
          onChange={handleImageUpload}
        />
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
          <div className="settings_edit_btn">SAVE INFORMATION</div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInformation;

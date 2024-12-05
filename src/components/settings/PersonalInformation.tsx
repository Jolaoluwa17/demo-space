import React, { useRef } from 'react';
import EditProfileIcon from '../../icons/EditProfileIcon';
import './pages.css';
import { IoPersonSharp } from 'react-icons/io5';

interface Props {
  fullName?: string;
  setFullName?: (fullName: string) => void;
  phoneNo?: string;
  setPhoneNo?: (phoneNo: string) => void;
  email?: string;
  setEmail?: (email: string) => void;
  isLoading?: boolean;
  image?: string | null;
  setImage?: React.Dispatch<React.SetStateAction<string | null>>;
  handleFileChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  userDataIsLoading?: boolean;
  handleUpdateProfile?: () => Promise<void>;
}

const PersonalInformation: React.FC<Props> = ({
  fullName,
  setFullName,
  phoneNo,
  setPhoneNo,
  email,
  setEmail,
  handleFileChange,
  image,
  userDataIsLoading,
  handleUpdateProfile,
  isLoading,
}) => {
  // Using useRef for the file input element
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="settings_content">
      <div className="settings_main">
        <div className="settings_page_header">Personal Information</div>
        <div className="settings_page_subHeader">
          This information will be used to create your personal profile.
        </div>
        <div className="settings_page_profile_pic" onClick={triggerFileUpload}>
          {image ? (
            <img
              src={image}
              alt="profile_picture"
              style={{
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                objectFit: 'cover',
              }}
            />
          ) : (
            <IoPersonSharp fontSize={60} color="white" />
          )}
          <div className="profile_edit">
            <EditProfileIcon />
          </div>
        </div>
        <input
          type="file"
          ref={fileInputRef}
          accept=".png, .jpeg, .jpg, .svg"
          style={{ display: 'none' }}
          onChange={handleFileChange}
          disabled={userDataIsLoading || isLoading}
        />

        {/* Full Name Input */}
        <div className="profile_form_item">
          <label htmlFor="fullName">Enter Full Name</label>
          <input
            type="text"
            className="profile_input_item"
            name="fullName"
            value={fullName || ''}
            onChange={(e) => setFullName?.(e.target.value)}
            disabled={userDataIsLoading || isLoading}
          />
        </div>

        {/* Phone Number Input */}
        <div className="profile_form_item">
          <label htmlFor="phoneNo">Enter Phone No.</label>
          <input
            type="text"
            className="profile_input_item"
            name="phoneNo"
            value={phoneNo || ''}
            onChange={(e) => setPhoneNo?.(e.target.value)}
            disabled={userDataIsLoading || isLoading}
          />
        </div>

        {/* Email Input */}
        <div className="profile_form_item">
          <label htmlFor="email">Enter Email Address</label>
          <input
            type="text"
            className="profile_input_item"
            name="email"
            value={email || ''}
            onChange={(e) => setEmail?.(e.target.value)}
            disabled
          />
        </div>

        {/* Save Button */}
        <div className="settings_edit_btn_container">
          <div
            className="settings_edit_btn"
            style={{
              backgroundColor: isLoading ? 'grey' : '#007BFF',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              pointerEvents: isLoading ? 'none' : 'auto',
            }}
            onClick={!isLoading ? handleUpdateProfile : undefined}
          >
            {isLoading ? <div className="spinner"></div> : 'SAVE INFORMATION'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInformation;

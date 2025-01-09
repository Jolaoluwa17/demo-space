import React, { useState, useEffect } from 'react';

import './pages.css';
import UploadIcon from '@/icons/UploadIcon';
import DeleteIcon from '@/icons/DeleteIcon';

interface Props {
  setCurrentPage: (page: number) => void;
  fullName: string; // Full Name from the backend
  setFullName: (fullName: string) => void; // Function to update fullName in the parent
  phoneNo: string;
  setPhoneNo: (phoneNo: string) => void;
  isLoading: boolean;
  setFileInput: React.Dispatch<React.SetStateAction<HTMLInputElement | null>>;
  image: string | null;
  setImage: React.Dispatch<React.SetStateAction<string | null>>;
  imageName: string;
  setImageName: React.Dispatch<React.SetStateAction<string>>;
  handleFileUpload: () => void; // Prop for file upload
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Pageone: React.FC<Props> = ({
  setCurrentPage,
  fullName,
  setFullName,
  phoneNo,
  setPhoneNo,
  isLoading,
  setFileInput,
  image,
  setImage,
  imageName,
  setImageName,
  handleFileChange,
  handleFileUpload,
}) => {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [isFormValid, setIsFormValid] = useState<boolean>(false);

  // Initialize firstName and lastName from fullName once
  useEffect(() => {
    if (fullName) {
      const nameParts = fullName.split(' ');
      setLastName(nameParts[0]); // Last name is the first part
      setFirstName(nameParts.slice(1).join(' ')); // First name is the remaining part
    }
  }, [fullName]);

  const handleFirstNameChange = (value: string) => {
    setFirstName(value);
    setFullName(`${lastName} ${value}`); // Update fullName in the parent
  };

  const handleLastNameChange = (value: string) => {
    setLastName(value);
    setFullName(`${value} ${firstName}`); // Update fullName in the parent
  };

  const handleRemoveImage = () => {
    setImage(null);
    setImageName('');
  };

  // Form validation
  useEffect(() => {
    setIsFormValid(
      firstName.trim() !== '' && lastName.trim() !== '' && phoneNo.trim() !== ''
    );
  }, [firstName, lastName, phoneNo]);

  return (
    <div className="profile_pageone_root">
      <div className="profile_pageone_title">Personal Information</div>
      <div className="profile_pageone_subTitle">
        This information will be used to create your personal profile.
      </div>

      {/* First Name Input */}
      <div className="profile_pageone_form_item">
        <label htmlFor="firstName">Enter First Name</label>
        <input
          type="text"
          name="firstName"
          className="profile_pageone_input"
          value={firstName}
          onChange={(e) => handleFirstNameChange(e.target.value)}
        />
      </div>

      {/* Last Name Input */}
      <div className="profile_pageone_form_item">
        <label htmlFor="lastName">Enter Last Name</label>
        <input
          type="text"
          name="lastName"
          className="profile_pageone_input"
          value={lastName}
          onChange={(e) => handleLastNameChange(e.target.value)}
        />
      </div>

      {/* Phone Number Input */}
      <div className="profile_pageone_form_item">
        <label htmlFor="phoneNo">Enter Phone Number</label>
        <input
          type="text"
          name="phoneNo"
          className="profile_pageone_input"
          value={phoneNo}
          onChange={(e) => setPhoneNo(e.target.value)}
        />
      </div>

      {/* Image Upload */}
      {image === null && (
        <div className="upload_profile_pic" onClick={handleFileUpload}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <UploadIcon />
            <div className="upload_profile_pic_text">
              Click here to add a Profile photo{' '}
              <span style={{ color: '#007BFF', fontWeight: '600' }}>
                Browse
              </span>
            </div>
          </div>
          <div style={{ color: 'red', fontSize: '14px' }}>* optional</div>
        </div>
      )}
      <input
        type="file"
        ref={(input) => setFileInput(input)}
        accept=".png, .jpeg, .jpg, .svg"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      {image && (
        <div className="image_tag">
          <div className="image_holder">
            <img
              src={image}
              alt="Uploaded"
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
          </div>
          <div className="image_name">{imageName}</div>
          <div className="delete_icon" onClick={handleRemoveImage}>
            <DeleteIcon />
          </div>
        </div>
      )}

      {/* Next Button */}
      <button
        className={`next_btn`}
        onClick={() => setCurrentPage(2)}
        style={{
          backgroundColor: isFormValid && !isLoading ? '#007BFF' : 'grey',
          cursor: isFormValid && !isLoading ? 'pointer' : 'not-allowed',
        }}
        disabled={!isFormValid || isLoading}
      >
        {isLoading ? <div className="spinner"></div> : 'Next'}
      </button>
    </div>
  );
};

export default Pageone;

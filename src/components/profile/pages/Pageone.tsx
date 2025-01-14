import React, { useState, useEffect } from 'react';

import './pages.css';
import UploadIcon from '@/icons/UploadIcon';
import DeleteIcon from '@/icons/DeleteIcon';

interface Props {
  setCurrentPage: (page: number) => void;
  firstName: string;
  setFirstName: (firstName: string) => void;
  lastName: string;
  setLastName: (lastName: string) => void;
  linkedIn: string;
  setLinkedIn: (linkedIn: string) => void;
  github: string;
  setGitHub: (github: string) => void;
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
  firstName,
  setFirstName,
  lastName,
  setLastName,
  linkedIn,
  setLinkedIn,
  github,
  setGitHub,
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
  const [isFormValid, setIsFormValid] = useState<boolean>(false);

  const handleRemoveImage = () => {
    setImage(null);
    setImageName('');
  };

  // Form validation
  useEffect(() => {
    setIsFormValid(
      firstName.trim() !== '' &&
        lastName.trim() !== '' &&
        phoneNo.trim() !== '' &&
        (github.trim() !== '' || linkedIn.trim() !== '')
    );
  }, [firstName, lastName, phoneNo, github, linkedIn]);

  return (
    <div className="profile_pageone_root">
      <div className="profile_pageone_title">Personal Information</div>
      <div className="profile_pageone_subTitle">
        This information will be used to create your personal profile. Please
        either enter a github link or linkedIn link as this will further help us
        to reach out to you
      </div>

      {/* First Name Input */}
      <div className="profile_pageone_form_item">
        <label htmlFor="firstName">Enter First Name</label>
        <input
          type="text"
          name="firstName"
          className="profile_pageone_input"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
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
          onChange={(e) => setLastName(e.target.value)}
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

      {/* LinkedIn Input */}
      <div className="profile_pageone_form_item">
        <label htmlFor="linkedIn">LinkedIn</label>
        <input
          type="text"
          name="linkedIn"
          className="profile_pageone_input"
          value={linkedIn}
          onChange={(e) => setLinkedIn(e.target.value)}
        />
      </div>

      {/* GitHub Input */}
      <div className="profile_pageone_form_item">
        <label htmlFor="github">GitHub</label>
        <input
          type="text"
          name="github"
          className="profile_pageone_input"
          value={github}
          onChange={(e) => setGitHub(e.target.value)}
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

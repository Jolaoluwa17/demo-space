import React, { useState, useEffect } from 'react';

import './pages.css';
import UploadIcon from '@/icons/UploadIcon';
import DeleteIcon from '@/icons/DeleteIcon';

interface Props {
  setCurrentPage: (page: number) => void;
  fullName: string;
  setFullName: (fullName: string) => void;
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
  const [isFormValid, setIsFormValid] = useState<boolean>(false);

  const handleRemoveImage = () => {
    setImage(null);
    setImageName('');
  };

  // Form validation
  useEffect(() => {
    setIsFormValid(fullName.trim() !== '' && phoneNo.trim() !== '');
  }, [fullName, phoneNo]);

  return (
    <div className="profile_pageone_root">
      <div className="profile_pageone_title">Personal Information</div>
      <div className="profile_pageone_subTitle">
        This information will be used to create your personal profile.
      </div>
      <div className="profile_pageone_form_item">
        <label htmlFor="fullName">Enter Full Name</label>
        <input
          type="text"
          name="fullName"
          className="profile_pageone_input"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
      </div>
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
          <div style={{ color: 'red' }}>* optional</div>
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

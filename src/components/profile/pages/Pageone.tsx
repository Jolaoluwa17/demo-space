import React, { useState, useRef, useEffect } from 'react';
import UploadIcon from '@/icons/UploadIcon';
import './pages.css';
import DeleteIcon from '@/icons/DeleteIcon';
import {
  useGetUserQuery,
  useUpdateUserProfileMutation,
} from '@/services/features/user/userSlice';

interface Props {
  setCurrentPage: (page: number) => void;
}

const Pageone: React.FC<Props> = ({ setCurrentPage }) => {
  const [image, setImage] = useState<string | null>(null);
  const [imageName, setImageName] = useState<string>('');
  const [fullName, setFullName] = useState<string>('');
  const [phoneNo, setPhoneNo] = useState<string>('');
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const userid = sessionStorage.getItem('id');

  const { data, isLoading: isUserLoading } = useGetUserQuery(
    userid ? userid : ''
  );

  // Populate form fields when user data is available
  useEffect(() => {
    if (data && !isUserLoading) {
      setFullName(data.response.fullName || '');
      setPhoneNo(data.response.phoneNumber || '');
    }
  }, [data, isUserLoading]);

  const handleFileUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
      setImageName(file.name); // Set the image name
    }
  };

  const handleRemoveImage = () => {
    setImage(null); // Clear the image URL
    setImageName(''); // Clear the image name
  };

  useEffect(() => {
    setIsFormValid(
      fullName.trim() !== '' && phoneNo.trim() !== '' && image !== null
    );
  }, [fullName, phoneNo, image]);

  const [updateUserProfile, { isLoading }] = useUpdateUserProfileMutation();

  const handleUpdateProfile = async () => {
    const userData = {
      fullName: fullName,
      phoneNumber: phoneNo,
      id: userid,
    };

    try {
      await updateUserProfile(userData).unwrap();
      setCurrentPage(2);
    } catch (error: unknown) {
      console.log(error);
    }
  };

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
          disabled={isUserLoading}
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
          disabled={isUserLoading}
        />
      </div>
      {image === null && (
        <div className="upload_profile_pic" onClick={handleFileUpload}>
          <UploadIcon />
          <div className="upload_profile_pic_text">
            Click here to add a Profile photo{' '}
            <span style={{ color: '#4274ba', fontWeight: '600' }}>Browse</span>
          </div>
        </div>
      )}
      <input
        type="file"
        ref={fileInputRef}
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
        onClick={handleUpdateProfile}
        style={{
          backgroundColor: isFormValid && !isLoading ? '#4274BA' : 'grey',
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

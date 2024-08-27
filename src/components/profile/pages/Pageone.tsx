import React, { useState, useRef, useEffect } from 'react';
import UploadIcon from '../../../icons/UploadIcon';
import './pages.css';
import DeleteIcon from '../../../icons/DeleteIcon';

interface Props {
  setCurrentPage: (page: number) => void;
}

const Pageone: React.FC<Props> = ({ setCurrentPage }) => {
  const [image, setImage] = useState<string | null>(null);
  const [imageName, setImageName] = useState<string>('');
  const [fullName, setFullName] = useState<string>('');
  const [phoneNo, setPhoneNo] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
      fullName.trim() !== '' &&
        phoneNo.trim() !== '' &&
        email.trim() !== '' &&
        image !== null
    );
  }, [fullName, phoneNo, email, image]);

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
      <div className="profile_pageone_form_item">
        <label htmlFor="email">Enter Email</label>
        <input
          type="email"
          name="email"
          className="profile_pageone_input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
        onClick={() => setCurrentPage(2)}
        disabled={!isFormValid}
      >
        Next
      </button>
    </div>
  );
};

export default Pageone;

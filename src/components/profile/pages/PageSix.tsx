import React, { useState, useEffect } from 'react';
import AddIcon from '@/icons/AddIcon';
import './pages.css';
import DeleteIcon from '@/icons/DeleteIcon';

interface Certification {
  name: string;
  issuedBy: string;
  dateObtained: string;
}

interface Props {
  certifications: Certification[];
  setCertifications: React.Dispatch<React.SetStateAction<Certification[]>>;
  isLoading: boolean;
  handleUpdateProfile: () => Promise<void>;
}

const PageSix: React.FC<Props> = ({
  certifications,
  setCertifications,
  isLoading,
  handleUpdateProfile,
}) => {
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);

  const handleInputChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    const updatedCertifications = [...certifications];
    updatedCertifications[index] = {
      ...updatedCertifications[index],
      [name]: value,
    };
    setCertifications(updatedCertifications);
  };

  const handleAddCertification = () => {
    setCertifications([
      ...certifications,
      { name: '', issuedBy: '', dateObtained: '' },
    ]);
  };

  const handleRemoveEntry = (index: number) => {
    setCertifications(certifications.filter((_, i) => i !== index));
  };

  // Check if the Done button should be disabled
  useEffect(() => {
    const allCertificationsFilled = certifications.every(
      (cert) => cert.name && cert.issuedBy && cert.dateObtained
    );
    setIsButtonDisabled(!allCertificationsFilled);
  }, [certifications]);

  return (
    <div className="profile_pageone_root">
      <div className="profile_pageone_title">Certifications</div>
      <div className="profile_pageone_subTitle">
        List any certifications you have obtained.
      </div>
      {certifications.map((cert, index) => (
        <div key={index}>
          <div className="profile_pageone_form_item">
            <label htmlFor={`certificate-${index}`}>
              Certificate Name
              {index > 0 && (
                <div
                  className="remove_entry_button"
                  onClick={() => handleRemoveEntry(index)}
                >
                  <DeleteIcon color="red" />
                  Remove
                </div>
              )}
            </label>
            <input
              type="text"
              name="name"
              id={`certificate-${index}`}
              value={cert.name}
              className="profile_pageone_input"
              onChange={(event) => handleInputChange(index, event)}
            />
          </div>
          <div className="profile_pageone_form_item">
            <label htmlFor={`issuedBy-${index}`}>Issuing Organisation</label>
            <input
              type="text"
              name="issuedBy"
              id={`issuedBy-${index}`}
              value={cert.issuedBy}
              className="profile_pageone_input"
              onChange={(event) => handleInputChange(index, event)}
            />
          </div>
          <div className="profile_pageone_form_item">
            <label htmlFor={`dateObtained-${index}`}>Issue Date</label>
            <input
              type="date"
              name="dateObtained"
              id={`dateObtained-${index}`}
              value={cert.dateObtained}
              className="profile_pageone_input"
              onChange={(event) => handleInputChange(index, event)}
            />
          </div>
        </div>
      ))}
      <div className="add_another_entry">
        <div
          className="content"
          onClick={
            !isButtonDisabled && !isLoading ? handleAddCertification : undefined
          }
          style={
            isButtonDisabled || isLoading
              ? { color: 'grey', cursor: 'not-allowed' }
              : {}
          }
        >
          <AddIcon
            color={isButtonDisabled || isLoading ? '#808080' : '#4274BA'}
          />
          <div style={{ fontSize: '14px', paddingBottom: '4px' }}>
            Add Another Entry
          </div>
        </div>
      </div>
      <div className="skip_btn" onClick={handleUpdateProfile}>
        Skip
      </div>
      <button
        className={`next_btn`}
        onClick={handleUpdateProfile}
        style={{
          backgroundColor: isButtonDisabled || isLoading ? 'grey' : '#4274BA',
          cursor: isButtonDisabled || isLoading ? 'not-allowed' : 'pointer',
        }}
        disabled={isButtonDisabled || isLoading}
      >
        {isLoading ? <div className="spinner"></div> : 'Next'}
      </button>
    </div>
  );
};

export default PageSix;

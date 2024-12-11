import React, { useEffect } from 'react';

import './pages.css';
import AddIcon from '../../icons/AddIcon';
import { FiMinusCircle } from 'react-icons/fi';

interface Props {
  certifications?: Certification[];
  setCertifications?: React.Dispatch<React.SetStateAction<Certification[]>>;
  userDataIsLoading?: boolean;
  isLoading?: boolean;
  handleUpdateProfile?: () => Promise<void>;
}

interface Certification {
  name: string;
  issuedBy: string;
  dateObtained: string;
}

const Certificate: React.FC<Props> = ({
  certifications = [],
  setCertifications,
  userDataIsLoading,
  isLoading,
  handleUpdateProfile,
}) => {
  // Set default certification if no certifications are passed in
  useEffect(() => {
    if (certifications.length === 0 && setCertifications) {
      setCertifications([
        { name: '', issuedBy: '', dateObtained: getCurrentDate() },
      ]);
    }
  }, [certifications, setCertifications]);

  console.log(certifications);

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

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
    if (setCertifications) {
      setCertifications(updatedCertifications);
    }
  };

  const handleAddCertification = () => {
    if (setCertifications) {
      setCertifications([
        ...certifications,
        { name: '', issuedBy: '', dateObtained: getCurrentDate() },
      ]);
    }
  };

  const handleRemoveEntry = (index: number) => {
    if (setCertifications) {
      setCertifications(certifications.filter((_, i) => i !== index));
    }
  };

  // Ensure at least one input field is visible when certifications are empty
  const certificationsToDisplay =
    certifications.length > 0
      ? certifications
      : [{ name: '', issuedBy: '', dateObtained: getCurrentDate() }];

  return (
    <div className="settings_content">
      <div className="settings_main">
        <div className="settings_page_header">Certifications</div>
        <div className="settings_page_subHeader">
          List any certifications you have obtained.
        </div>
        {certificationsToDisplay.map((cert, index) => (
          <div
            key={index}
            className="certificate_entry"
            style={{
              marginBottom:
                index < certificationsToDisplay.length - 1 ? '100px' : '0',
            }}
          >
            <div className="profile_form_item">
              <label htmlFor={`certificate-${index}`}>
                Certification Name
                {index > 0 && (
                  <div
                    className="remove_entry_main"
                    onClick={() => handleRemoveEntry(index)}
                  >
                    <FiMinusCircle
                      style={{ paddingRight: '10px' }}
                      className="minus_circle_icon"
                    />
                    Remove Entry
                  </div>
                )}
              </label>
              <input
                type="text"
                name="name"
                id={`certificate-${index}`}
                value={cert.name || ''} // Fallback to empty string if cert.name is null
                className="profile_input_item"
                onChange={(event) => handleInputChange(index, event)}
                disabled={userDataIsLoading || isLoading}
              />
            </div>
            <div className="profile_form_item">
              <label htmlFor={`organization-${index}`}>
                Issuing Organization
              </label>
              <input
                type="text"
                name="issuedBy"
                id={`organization-${index}`}
                value={cert.issuedBy || ''} // Fallback to empty string if cert.issuedBy is null
                className="profile_input_item"
                onChange={(event) => handleInputChange(index, event)}
                disabled={userDataIsLoading || isLoading}
              />
            </div>
            <div className="profile_form_item">
              <label htmlFor={`issueDate-${index}`}>Issue Date</label>
              <input
                type="date"
                name="dateObtained"
                id={`issueDate-${index}`}
                value={cert.dateObtained ? cert.dateObtained.split('T')[0] : ''} // Fallback to empty string if cert.dateObtained is null
                className="profile_input_item"
                onChange={(event) => handleInputChange(index, event)}
                disabled={userDataIsLoading || isLoading}
              />
            </div>
          </div>
        ))}
        <div className="add_another_entry_2">
          <div className="content" onClick={handleAddCertification}>
            <AddIcon />
            <div
              style={{
                fontSize: '14px',
                paddingBottom: '4px',
                paddingLeft: '10px',
              }}
            >
              Add Another Entry
            </div>
          </div>
        </div>
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

export default Certificate;

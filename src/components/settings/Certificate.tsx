import React, { useEffect, useState } from 'react';

import './pages.css';
import AddIcon from '@/icons/AddIcon';
import { FiMinusCircle } from 'react-icons/fi';
import { PulseLoader } from 'react-spinners';

interface Props {
  certifications?: Certification[];
  setCertifications?: React.Dispatch<React.SetStateAction<Certification[]>>;
  userDataIsLoading?: boolean;
  isLoading?: boolean;
  handleUpdateProfile?: () => Promise<void>;
  userDataError?: boolean;
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
  userDataError,
}) => {
  // Set default certification if no certifications are passed in
  useEffect(() => {
    if (certifications.length === 0 && setCertifications) {
      setCertifications([
        { name: '', issuedBy: '', dateObtained: getCurrentDate() },
      ]);
    }
  }, [certifications, setCertifications]);

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

  const [edit, setEdit] = useState(false);

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
                {index > 0 && edit && (
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
              {edit ? (
                <input
                  type="text"
                  name="name"
                  id={`certificate-${index}`}
                  value={cert.name || ''}
                  className="profile_input_item"
                  onChange={(event) => handleInputChange(index, event)}
                  disabled={userDataIsLoading || isLoading}
                />
              ) : userDataIsLoading ? (
                <div className="profile_input_item_none">
                  <PulseLoader size={8} color="#007bff" />
                </div>
              ) : userDataError || !cert.name ? (
                <div className="profile_input_item_none">No Data</div>
              ) : (
                <div className="profile_input_item_none">
                  {cert.name || null}
                </div>
              )}
            </div>
            <div className="profile_form_item">
              <label htmlFor={`organization-${index}`}>
                Issuing Organization
              </label>
              {edit ? (
                <input
                  type="text"
                  name="issuedBy"
                  id={`organization-${index}`}
                  value={cert.issuedBy || ''} // Fallback to empty string if cert.issuedBy is null
                  className="profile_input_item"
                  onChange={(event) => handleInputChange(index, event)}
                  disabled={userDataIsLoading || isLoading}
                />
              ) : userDataIsLoading ? (
                <div className="profile_input_item_none">
                  <PulseLoader size={8} color="#007bff" />
                </div>
              ) : userDataError || !cert.issuedBy ? (
                <div className="profile_input_item_none">No Data</div>
              ) : (
                <div className="profile_input_item_none">
                  {cert.issuedBy || null}
                </div>
              )}
            </div>
            <div className="profile_form_item">
              <label htmlFor={`issueDate-${index}`}>Issue Date</label>
              {edit ? (
                <input
                  type="date"
                  name="dateObtained"
                  id={`issueDate-${index}`}
                  value={
                    cert.dateObtained ? cert.dateObtained.split('T')[0] : ''
                  } // Fallback to empty string if cert.dateObtained is null
                  className="profile_input_item"
                  onChange={(event) => handleInputChange(index, event)}
                  disabled={userDataIsLoading || isLoading}
                />
              ) : userDataIsLoading ? (
                <div className="profile_input_item_none">
                  <PulseLoader size={8} color="#007bff" />
                </div>
              ) : userDataError || !cert.dateObtained ? (
                <div className="profile_input_item_none">No Data</div>
              ) : (
                <div className="profile_input_item_none">
                  {cert.dateObtained ? cert.dateObtained.split('T')[0] : null}
                </div>
              )}
            </div>
          </div>
        ))}
        {edit && (
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
        )}
        <div className="settings_edit_btn_container">
          <div
            className="settings_edit_btn"
            style={{
              backgroundColor:
                isLoading || userDataIsLoading || userDataError
                  ? 'grey'
                  : edit
                    ? 'red'
                    : '#007BFF',
              cursor:
                isLoading || userDataIsLoading || userDataError
                  ? 'not-allowed'
                  : 'pointer',
            }}
            onClick={() => {
              if (!isLoading && !userDataIsLoading && !userDataError) {
                setEdit(!edit);
              }
            }}
          >
            {isLoading ? (
              <div className="spinner"></div>
            ) : edit ? (
              'CANCEL'
            ) : (
              'EDIT INFORMATION'
            )}
          </div>
          {edit && (
            <div
              className="settings_edit_btn"
              style={{
                backgroundColor: isLoading ? 'grey' : '#007BFF',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                pointerEvents: isLoading ? 'none' : 'auto',
              }}
              onClick={() => {
                if (!isLoading && handleUpdateProfile) {
                  // Check if handleUpdateProfile is defined
                  handleUpdateProfile();
                  setEdit(false); // Set edit to false after clicking
                }
              }}
            >
              {isLoading ? <div className="spinner"></div> : 'SAVE INFORMATION'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Certificate;

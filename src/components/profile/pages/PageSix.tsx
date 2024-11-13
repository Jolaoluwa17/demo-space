import React, { useState, useEffect } from 'react';
import AddIcon from '../../../icons/AddIcon';
import './pages.css';
import DeleteIcon from '../../../icons/DeleteIcon';
import { useNavigate } from 'react-router-dom';
import {
  useGetUserQuery,
  useUpdateUserProfileMutation,
} from '@/services/features/user/userSlice';

interface Certification {
  certificate: string;
  organization: string;
  issueDate: string;
}

const PageSix = () => {
  const [certifications, setCertifications] = useState<Certification[]>([
    { certificate: '', organization: '', issueDate: '' },
  ]);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
  const userid = sessionStorage.getItem('id');

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
      { certificate: '', organization: '', issueDate: '' },
    ]);
  };

  const handleRemoveEntry = (index: number) => {
    setCertifications(certifications.filter((_, i) => i !== index));
  };

  // Check if the Done button should be disabled
  useEffect(() => {
    const allCertificationsFilled = certifications.every(
      (cert) => cert.certificate && cert.organization && cert.issueDate
    );
    setIsButtonDisabled(!allCertificationsFilled);
  }, [certifications]);

  const navigator = useNavigate();

  const { data, isLoading: isUserLoading } = useGetUserQuery(
    userid ? userid : ''
  );

  useEffect(() => {
    if (data && Array.isArray(data.response.certifications) && !isUserLoading) {
      // Map the educationalBackground array to the format used by educationEntries
      const formattedEntries = data.response.certifications.map(
        (entry: {
          name?: string;
          issuedBy?: string;
          dateObtained?: string;
        }) => ({
          certificate: entry.name || '',
          organization: entry.issuedBy || '',
          issueDate: entry.dateObtained
            ? new Date(entry.dateObtained).toISOString().split('T')[0]
            : '',
        })
      );

      // Set the formatted entries to the state
      setCertifications(formattedEntries);
    }
  }, [data, isUserLoading]);

  const [updateUserProfile, { isLoading }] = useUpdateUserProfileMutation();

  const handleUpdateProfile = async () => {
    const userData = {
      id: userid,
      certifications: certifications,
    };

    try {
      await updateUserProfile(userData).unwrap();
      navigator('/dashboard');
    } catch (error: unknown) {
      console.log(error);
    }
  };

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
              name="certificate"
              id={`certificate-${index}`}
              value={cert.certificate}
              className="profile_pageone_input"
              onChange={(event) => handleInputChange(index, event)}
              disabled={isUserLoading}
            />
          </div>
          <div className="profile_pageone_form_item">
            <label htmlFor={`organization-${index}`}>
              Issuing Organisation
            </label>
            <input
              type="text"
              name="organization"
              id={`organization-${index}`}
              value={cert.organization}
              className="profile_pageone_input"
              onChange={(event) => handleInputChange(index, event)}
              disabled={isUserLoading}
            />
          </div>
          <div className="profile_pageone_form_item">
            <label htmlFor={`issueDate-${index}`}>Issue Date</label>
            <input
              type="date"
              name="issueDate"
              id={`issueDate-${index}`}
              value={cert.issueDate}
              className="profile_pageone_input"
              onChange={(event) => handleInputChange(index, event)}
              disabled={isUserLoading}
            />
          </div>
        </div>
      ))}
      <div className="add_another_entry">
        <div className="content" onClick={handleAddCertification}>
          <AddIcon />
          <div style={{ fontSize: '14px', paddingBottom: '4px' }}>
            Add Another Entry
          </div>
        </div>
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

import React, { useState, useEffect } from 'react';
import AddIcon from '../../../icons/AddIcon';
import './pages.css';
import DeleteIcon from '../../../icons/DeleteIcon';

interface Certification {
  certificate: string;
  organization: string;
  issueDate: string;
}

interface Props {
  setCurrentPage: (page: number) => void;
}

const PageSix: React.FC<Props> = ({ setCurrentPage }) => {
  const [certifications, setCertifications] = useState<Certification[]>([
    { certificate: '', organization: '', issueDate: '' },
  ]);
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
        onClick={() => setCurrentPage(1)}
        disabled={isButtonDisabled}
      >
        Done
      </button>
    </div>
  );
};

export default PageSix;

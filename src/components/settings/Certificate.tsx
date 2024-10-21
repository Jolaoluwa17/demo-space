import React, { useState } from 'react';

import './pages.css';
import DeleteIcon from '../../icons/DeleteIcon';
import AddIcon from '../../icons/AddIcon';

interface Certification {
  certificate: string;
  organization: string;
  issueDate: string;
}

const Certificate: React.FC = () => {
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const [certifications, setCertifications] = useState<Certification[]>([
    { certificate: '', organization: '', issueDate: getCurrentDate() },
  ]);

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
      { certificate: '', organization: '', issueDate: getCurrentDate() },
    ]);
  };

  const handleRemoveEntry = (index: number) => {
    setCertifications(certifications.filter((_, i) => i !== index));
  };

  return (
    <div className="settings_content">
      <div className="settings_main">
        <div className="settings_page_header">Certifications</div>
        <div className="settings_page_subHeader">
          List any certifications you have obtained.
        </div>
        {certifications.map((cert, index) => (
          <div key={index} className="certificate_entry">
            <div className="profile_form_item">
              <label htmlFor={`certificate-${index}`}>
                Certification Name
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
                className="profile_input_item"
                onChange={(event) => handleInputChange(index, event)}
              />
            </div>
            <div className="profile_form_item">
              <label htmlFor={`organization-${index}`}>
                Issuing Organization
              </label>
              <input
                type="text"
                name="organization"
                id={`organization-${index}`}
                value={cert.organization}
                className="profile_input_item"
                onChange={(event) => handleInputChange(index, event)}
              />
            </div>
            <div className="profile_form_item">
              <label htmlFor={`issueDate-${index}`}>Issue Date</label>
              <input
                type="date"
                name="issueDate"
                id={`issueDate-${index}`}
                value={cert.issueDate}
                className="profile_input_item"
                onChange={(event) => handleInputChange(index, event)}
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
          <div className="settings_edit_btn">SAVE INFORMATION</div>
        </div>
      </div>
    </div>
  );
};

export default Certificate;

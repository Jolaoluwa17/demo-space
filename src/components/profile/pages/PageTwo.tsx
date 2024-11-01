import React, { useState, useEffect } from 'react';
import AddIcon from '../../../icons/AddIcon';
import './pages.css';
import DeleteIcon from '../../../icons/DeleteIcon';

interface Props {
  setCurrentPage: (page: number) => void;
}

interface EducationEntry {
  institution: string;
  degree: string;
  degreeType: string;
  graduationDate: string;
}

const PageTwo: React.FC<Props> = ({ setCurrentPage }) => {
  const [educationEntries, setEducationEntries] = useState<EducationEntry[]>([
    { institution: '', degree: '', degreeType: '', graduationDate: '' },
  ]);
  const [isFormValid, setIsFormValid] = useState<boolean>(false);

  const handleAddEntry = () => {
    setEducationEntries([
      ...educationEntries,
      { institution: '', degree: '', degreeType: '', graduationDate: '' },
    ]);
  };

  const handleRemoveEntry = (index: number) => {
    const newEntries = educationEntries.filter((_, i) => i !== index);
    setEducationEntries(newEntries);
  };

  const handleInputChange = (
    index: number,
    field: keyof EducationEntry,
    value: string
  ) => {
    const newEntries = [...educationEntries];
    newEntries[index][field] = value;
    setEducationEntries(newEntries);
  };

  useEffect(() => {
    const validateForm = () => {
      return educationEntries.every(
        (entry) =>
          entry.institution.trim() !== '' &&
          entry.degree.trim() !== '' &&
          entry.degreeType.trim() !== '' &&
          entry.graduationDate.trim() !== ''
      );
    };

    setIsFormValid(validateForm());
  }, [educationEntries]);

  return (
    <div className="profile_pageone_root">
      <div className="profile_pageone_title">Educational Background</div>
      <div className="profile_pageone_subTitle">
        Tell us about your academic qualifications.
      </div>

      {educationEntries.map((entry, index) => (
        <div key={index} className="education_entry">
          <div className="profile_pageone_form_item">
            <label htmlFor={`institution-${index}`}>
              Institution Name
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
              name={`institution-${index}`}
              className="profile_pageone_input"
              value={entry.institution}
              onChange={(e) =>
                handleInputChange(index, 'institution', e.target.value)
              }
            />
          </div>
          <div className="profile_pageone_form_item">
            <label htmlFor={`degree-${index}`}>Degree Obtained</label>
            <input
              type="text"
              name={`degree-${index}`}
              className="profile_pageone_input"
              value={entry.degree}
              onChange={(e) =>
                handleInputChange(index, 'degree', e.target.value)
              }
            />
          </div>
          <div className="profile_pageone_form_item">
            <label htmlFor={`degreeType-${index}`}>Degree Type</label>
            <input
              type="text"
              name={`degreeType-${index}`}
              className="profile_pageone_input"
              value={entry.degreeType}
              onChange={(e) =>
                handleInputChange(index, 'degreeType', e.target.value)
              }
            />
          </div>
          <div className="profile_pageone_form_item">
            <label htmlFor={`graduationDate-${index}`}>Graduation Date</label>
            <input
              type="date"
              name={`graduationDate-${index}`}
              className="profile_pageone_input"
              value={entry.graduationDate}
              onChange={(e) =>
                handleInputChange(index, 'graduationDate', e.target.value)
              }
            />
          </div>
        </div>
      ))}

      <div className="add_another_entry" onClick={handleAddEntry}>
        <div className="content">
          <AddIcon />
          <div style={{ fontSize: '14px', paddingBottom: '4px' }}>
            Add Another entry
          </div>
        </div>
      </div>
      <button
        className={`next_btn`}
        onClick={() => setCurrentPage(3)}
        disabled={!isFormValid}
      >
        Next
      </button>
    </div>
  );
};

export default PageTwo;

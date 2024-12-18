import React, { useState, useEffect } from 'react';
import AddIcon from '@/icons/AddIcon';
import './pages.css';
import { FiMinusCircle } from 'react-icons/fi';

interface Props {
  setCurrentPage: (page: number) => void;
  educationEntries: EducationEntry[];
  setEducationEntries: React.Dispatch<React.SetStateAction<EducationEntry[]>>;
  isLoading: boolean;
}

interface EducationEntry {
  institutionName: string;
  degreeObtained: string;
  degreeType: string;
  graduationDate: string;
}

const PageTwo: React.FC<Props> = ({
  setCurrentPage,
  educationEntries,
  setEducationEntries,
  isLoading,
}) => {
  const [isFormValid, setIsFormValid] = useState<boolean>(false);

  const handleAddEntry = () => {
    setEducationEntries([
      ...educationEntries,
      {
        institutionName: '',
        degreeObtained: '',
        degreeType: '',
        graduationDate: '',
      },
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
          entry.institutionName.trim() !== '' &&
          entry.degreeObtained.trim() !== '' &&
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
        <div
          key={index}
          className="education_entry"
          style={{
            marginBottom: index < educationEntries.length - 1 ? '100px' : '0',
          }}
        >
          <div className="profile_pageone_form_item">
            <label htmlFor={`institution-${index}`}>
              Institution Name
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
              name={`institution-${index}`}
              className="profile_pageone_input"
              value={entry.institutionName}
              onChange={(e) =>
                handleInputChange(index, 'institutionName', e.target.value)
              }
            />
          </div>
          <div className="profile_pageone_form_item">
            <label htmlFor={`degree-${index}`}>Degree Obtained</label>
            <input
              type="text"
              name={`degree-${index}`}
              className="profile_pageone_input"
              value={entry.degreeObtained}
              onChange={(e) =>
                handleInputChange(index, 'degreeObtained', e.target.value)
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

      <div className="add_another_entry">
        <div
          className="content"
          onClick={isFormValid && !isLoading ? handleAddEntry : undefined}
          style={
            !isFormValid || isLoading
              ? { color: 'grey', cursor: 'not-allowed' }
              : {}
          }
        >
          <AddIcon color={!isFormValid || isLoading ? '#808080' : '#007BFF'} />
          <div style={{ fontSize: '14px', paddingBottom: '4px' }}>
            Add Another Entry
          </div>
        </div>
      </div>
      <div className="skip_btn" onClick={() => setCurrentPage(3)}>
        Skip
      </div>
      <button
        className={`next_btn`}
        onClick={() => setCurrentPage(3)}
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

export default PageTwo;

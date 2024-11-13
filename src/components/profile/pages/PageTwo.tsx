import React, { useState, useEffect } from 'react';
import AddIcon from '../../../icons/AddIcon';
import './pages.css';
import DeleteIcon from '../../../icons/DeleteIcon';
import {
  useGetUserQuery,
  useUpdateUserProfileMutation,
} from '@/services/features/user/userSlice';

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
  const userid = sessionStorage.getItem('id');

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

  const { data, isLoading: isUserLoading } = useGetUserQuery(
    userid ? userid : ''
  );

  useEffect(() => {
    if (data && Array.isArray(data.response.education) && !isUserLoading) {
      // Map the educationalBackground array to the format used by educationEntries
      const formattedEntries = data.response.education.map(
        (entry: {
          institution?: string;
          degree?: string;
          degreeType?: string;
          graduationDate?: string;
        }) => ({
          institution: entry.institution || '',
          degree: entry.degree || '',
          degreeType: entry.degreeType || '',
          graduationDate: entry.graduationDate
            ? new Date(entry.graduationDate).toISOString().split('T')[0]
            : '',
        })
      );

      // Set the formatted entries to the state
      setEducationEntries(formattedEntries);
    }
  }, [data, isUserLoading]);

  const [updateUserProfile, { isLoading }] = useUpdateUserProfileMutation();

  const handleUpdateProfile = async () => {
    try {
      await updateUserProfile(educationEntries).unwrap();
      setCurrentPage(3);
    } catch (error: unknown) {
      console.log(error);
    }
  };

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
              disabled={isUserLoading}
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
              disabled={isUserLoading}
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
              disabled={isUserLoading}
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
              disabled={isUserLoading}
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

export default PageTwo;

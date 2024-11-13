import React, { useState, useEffect } from 'react';
import AddIcon from '../../../icons/AddIcon';
import './pages.css';
import DeleteIcon from '../../../icons/DeleteIcon';
import {
  useGetUserQuery,
  useUpdateUserProfileMutation,
} from '@/services/features/user/userSlice';
import RememberMeCheckBox from '@/icons/RememberMeCheckBox';

interface Entry {
  jobTitle: string;
  jobDescription: string;
  startDate: string;
  endDate: string;
  companyName: string;
  currentlyWorking: boolean;
}

interface Props {
  setCurrentPage: (page: number) => void;
}

const PageFive: React.FC<Props> = ({ setCurrentPage }) => {
  const [entries, setEntries] = useState<Entry[]>([
    {
      jobTitle: '',
      jobDescription: '',
      companyName: '',
      startDate: '',
      endDate: '',
      currentlyWorking: false,
    },
  ]);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
  const userid = sessionStorage.getItem('id');

  const handleInputChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    const updatedEntries = [...entries];
    updatedEntries[index] = { ...updatedEntries[index], [name]: value };
    setEntries(updatedEntries);
  };

  const handleAddEntry = () => {
    setEntries([
      ...entries,
      {
        jobTitle: '',
        jobDescription: '',
        companyName: '',
        startDate: '',
        endDate: '',
        currentlyWorking: false,
      },
    ]);
  };

  const handleRemoveEntry = (index: number) => {
    setEntries(entries.filter((_, i) => i !== index));
  };

  const handleCheckboxChange = (index: number) => {
    const updatedEntries = [...entries];
    updatedEntries[index].currentlyWorking =
      !updatedEntries[index].currentlyWorking;
    setEntries(updatedEntries);
  };

  // Check if the Next button should be disabled
  useEffect(() => {
    const allEntriesFilled = entries.every(
      (entry) =>
        entry.jobTitle &&
        entry.jobDescription &&
        entry.startDate &&
        (entry.currentlyWorking || entry.endDate)
    );
    setIsButtonDisabled(!allEntriesFilled);
  }, [entries]);

  const { data, isLoading: isUserLoading } = useGetUserQuery(
    userid ? userid : ''
  );

  useEffect(() => {
    if (data && Array.isArray(data.response.job) && !isUserLoading) {
      const formattedEntries = data.response.job.map(
        (entry: {
          title?: string;
          description?: string;
          companyName?: string;
          startDate?: string;
          endDate?: string;
          currentlyWorking?: boolean;
        }): Entry => ({
          jobTitle: entry.title || '',
          jobDescription: entry.description || '',
          companyName: entry.companyName || '',
          startDate: entry.startDate
            ? new Date(entry.startDate).toISOString().split('T')[0]
            : '',
          endDate: entry.endDate
            ? new Date(entry.endDate).toISOString().split('T')[0]
            : '',
          currentlyWorking: entry.currentlyWorking || false,
        })
      );

      setEntries(formattedEntries);
    }
  }, [data, isUserLoading]);

  const [updateUserProfile, { isLoading }] = useUpdateUserProfileMutation();

  const handleUpdateProfile = async () => {
    const userData = {
      id: userid,
      job: entries,
    };

    try {
      await updateUserProfile(userData).unwrap();
      setCurrentPage(5);
    } catch (error: unknown) {
      console.log(error);
    }
  };

  return (
    <div className="profile_pageone_root">
      <div className="profile_pageone_title">Experience</div>
      <div className="profile_pageone_subTitle">
        Provide your work experience details.
      </div>
      {entries.map((entry, index) => (
        <div key={index} className="education_entry">
          <div className="profile_pageone_form_item">
            <label htmlFor={`jobTitle-${index}`}>
              Job Title
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
          </div>
          <input
            type="text"
            name="jobTitle"
            id={`jobTitle-${index}`}
            value={entry.jobTitle}
            className="profile_pageone_input"
            onChange={(event) => handleInputChange(index, event)}
          />
          <div className="profile_pageone_form_item">
            <label htmlFor={`companyName-${index}`}>Company Name</label>
            <input
              type="text"
              name="companyName"
              id={`companyName-${index}`}
              value={entry.companyName}
              className="profile_pageone_input"
              onChange={(event) => handleInputChange(index, event)}
            />
          </div>
          <div className="profile_pageone_form_item">
            <label htmlFor={`jobDescription-${index}`}>Job Description</label>
            <textarea
              name="jobDescription"
              id={`jobDescription-${index}`}
              value={entry.jobDescription}
              className="profile_pageone_textarea"
              rows={5}
              onChange={(event) => handleInputChange(index, event)}
            />
          </div>
          <div className="profile_pageone_form_item">
            <label htmlFor={`startDate-${index}`}>Start Date</label>
            <input
              type="date"
              name="startDate"
              id={`startDate-${index}`}
              value={entry.startDate}
              className="profile_pageone_input"
              onChange={(event) => handleInputChange(index, event)}
            />
          </div>
          <div className="profile_pageone_form_item">
            <label htmlFor={`endDate-${index}`}>End Date</label>
            <input
              type="date"
              name="endDate"
              id={`endDate-${index}`}
              value={entry.endDate}
              className="profile_pageone_input"
              onChange={(event) => handleInputChange(index, event)}
              disabled={entry.currentlyWorking} // Disable if currently working
            />
          </div>
          <div className="currently_working_here">
            <div
              onClick={() => handleCheckboxChange(index)}
              style={{
                cursor: 'pointer',
                marginRight: '10px',
                width: '15px',
                height: '15px',
              }}
            >
              {entry.currentlyWorking ? (
                <div style={{ paddingTop: '-5px' }}>
                  <RememberMeCheckBox />
                </div>
              ) : (
                <div className="pages_empty_checkbox"></div>
              )}
            </div>
            <div style={{ paddingTop: '5px' }}>Currently Working Here</div>
          </div>
        </div>
      ))}
      <div className="add_another_entry">
        <div className="content" onClick={handleAddEntry}>
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

export default PageFive;

import React, { useState, useEffect } from 'react';
import './pages.css';
import AddIcon from '../../icons/AddIcon';
import RememberMeCheckBox from '@/icons/RememberMeCheckBox';
import { RiDeleteBin6Line } from 'react-icons/ri';

interface Entry {
  title: string;
  description: string;
  startDate: string;
  endDate: string | null;
  companyName: string;
  currentlyWorking: boolean;
}

interface Props {
  entries?: Entry[];
  setEntries?: React.Dispatch<React.SetStateAction<Entry[]>>;
  userDataIsLoading?: boolean;
  isLoading?: boolean;
  handleUpdateProfile?: () => Promise<void>;
}

const Experience: React.FC<Props> = ({
  entries = [],
  setEntries,
  userDataIsLoading,
  isLoading,
  handleUpdateProfile,
}) => {
  const getCurrentDate = (addDays = 0) => {
    const today = new Date();
    today.setDate(today.getDate() + addDays); // Add the specified number of days
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const handleInputChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    const updatedEntries = [...entries];
    updatedEntries[index] = { ...updatedEntries[index], [name]: value };
    setEntries?.(updatedEntries); // Safe call with optional chaining
  };

  const handleAddEntry = () => {
    setEntries?.([
      // Adding a new entry with empty values
      ...entries,
      {
        title: '',
        description: '',
        companyName: '',
        startDate: getCurrentDate(),
        endDate: getCurrentDate(1),
        currentlyWorking: false,
      },
    ]);
  };

  const handleRemoveEntry = (index: number) => {
    setEntries?.(entries.filter((_, i) => i !== index));
  };

  // Check if the Edit button should be disabled
  useEffect(() => {
    const allEntriesFilled = entries.every(
      (entry) =>
        entry.title &&
        entry.description &&
        entry.companyName &&
        entry.startDate &&
        (entry.currentlyWorking || entry.endDate)
    );
    setIsButtonDisabled(!allEntriesFilled);
  }, [entries]);

  const handleCheckboxChange = (index: number) => {
    const updatedEntries = [...entries];
    const isCurrentlyWorking = !updatedEntries[index].currentlyWorking;

    // Toggle the `currentlyWorking` state
    updatedEntries[index].currentlyWorking = isCurrentlyWorking;

    // If `currentlyWorking` is true, set `endDate` to null; otherwise, provide a default date
    updatedEntries[index].endDate = isCurrentlyWorking
      ? null
      : getCurrentDate(1);

    setEntries?.(updatedEntries);
  };

  useEffect(() => {
    const updatedEntries = entries.map((entry) => ({
      ...entry,
      currentlyWorking: !entry.endDate,
    }));
    setEntries?.(updatedEntries);
  }, [entries, setEntries]);

  return (
    <div className="settings_content">
      <div className="settings_main">
        <div className="settings_page_header">Experience</div>
        <div className="settings_page_subHeader">
          Highlight your job experience
        </div>

        {entries.length === 0 ? (
          <div className="experience_entry">
            <div className="profile_form_item">
              <label htmlFor="jobTitle-0">Job Title</label>
              <input
                type="text"
                name="jobTitle"
                id="jobTitle-0"
                className="profile_input_item"
                onChange={(event) => handleInputChange(0, event)}
                disabled={userDataIsLoading}
              />
            </div>
            <div className="profile_form_item">
              <label htmlFor="companyName-0">Company Name</label>
              <input
                type="text"
                name="companyName"
                id="companyName-0"
                className="profile_input_item"
                onChange={(event) => handleInputChange(0, event)}
                disabled={userDataIsLoading}
              />
            </div>
            <div className="profile_form_item">
              <label htmlFor="jobDescription-0">Job Description</label>
              <textarea
                name="jobDescription"
                id="jobDescription-0"
                className="profile_input_textarea"
                rows={5}
                onChange={(event) => handleInputChange(0, event)}
                disabled={userDataIsLoading}
              />
            </div>
            <div className="profile_form_item">
              <label htmlFor="startDate-0">Start Date</label>
              <input
                type="date"
                name="startDate"
                id="startDate-0"
                className="profile_input_item"
                onChange={(event) => handleInputChange(0, event)}
                disabled={userDataIsLoading}
              />
            </div>
            <div className="profile_form_item">
              <label htmlFor="endDate-0">End Date</label>
              <input
                type="date"
                name="endDate"
                id="endDate-0"
                className="profile_input_item"
                onChange={(event) => handleInputChange(0, event)}
                disabled={userDataIsLoading}
              />
            </div>
            <div className="currently_working_here">
              <div
                onClick={() => handleCheckboxChange(0)}
                style={{
                  cursor: 'pointer',
                  marginRight: '10px',
                  width: '15px',
                  height: '15px',
                }}
              >
                {false ? (
                  <RememberMeCheckBox />
                ) : (
                  <div className="pages_empty_checkbox"></div>
                )}
              </div>
              <div style={{ paddingTop: '5px' }}>Currently Working Here</div>
            </div>
          </div>
        ) : (
          entries.map((entry, index) => (
            <div key={index} className="experience_entry">
              <div className="profile_form_item">
                <label htmlFor={`jobTitle-${index}`}>
                  Job Title
                  {index > 0 && (
                    <div
                      className="remove_entry_button"
                      onClick={() => handleRemoveEntry(index)}
                    >
                      <RiDeleteBin6Line
                        color="red"
                        size={20}
                        style={{ marginRight: '5px' }}
                      />
                      <span className="remove_text">Remove</span>
                    </div>
                  )}
                </label>
                <input
                  type="text"
                  name="title"
                  id={`jobTitle-${index}`}
                  value={entry.title || ''}
                  className="profile_input_item"
                  onChange={(event) => handleInputChange(index, event)}
                  disabled={userDataIsLoading}
                />
              </div>
              <div className="profile_form_item">
                <label htmlFor={`comapanyName-${index}`}>Company Name</label>
                <input
                  type="text"
                  name="companyName"
                  id={`companyName-${index}`}
                  value={entry.companyName || ''}
                  className="profile_input_item"
                  onChange={(event) => handleInputChange(index, event)}
                  disabled={userDataIsLoading}
                />
              </div>
              <div className="profile_form_item">
                <label htmlFor={`jobDescription-${index}`}>
                  Job Description
                </label>
                <textarea
                  name="description"
                  id={`jobDescription-${index}`}
                  value={entry.description || ''}
                  className="profile_input_textarea"
                  rows={5}
                  onChange={(event) => handleInputChange(index, event)}
                  disabled={userDataIsLoading}
                />
              </div>
              <div className="profile_form_item">
                <label htmlFor={`startDate-${index}`}>Start Date</label>
                <input
                  type="date"
                  name="startDate"
                  id={`startDate-${index}`}
                  value={
                    entry.startDate ? entry.startDate.substring(0, 10) : ''
                  }
                  className="profile_input_item"
                  onChange={(event) => handleInputChange(index, event)}
                  disabled={userDataIsLoading}
                />
              </div>
              <div className="profile_form_item">
                <label htmlFor={`endDate-${index}`}>End Date</label>
                <input
                  type="date"
                  name="endDate"
                  id={`endDate-${index}`}
                  value={entry.endDate ? entry.endDate.substring(0, 10) : ''}
                  className="profile_input_item"
                  onChange={(event) => handleInputChange(index, event)}
                  disabled={entry.currentlyWorking || userDataIsLoading}
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
                    <RememberMeCheckBox />
                  ) : (
                    <div className="pages_empty_checkbox"></div>
                  )}
                </div>
                <div style={{ paddingTop: '5px' }}>Currently Working Here</div>
              </div>
            </div>
          ))
        )}

        <div className="add_another_entry_2">
          <div className="content" onClick={handleAddEntry}>
            <AddIcon />
            <div
              style={{
                fontSize: '14px',
                paddingBottom: '4px',
                paddingLeft: '5px',
              }}
            >
              Add Another Entry
            </div>
          </div>
        </div>

        <div className="settings_edit_btn_container">
          <button
            className="settings_edit_btn"
            disabled={isButtonDisabled || isLoading}
            onClick={handleUpdateProfile}
            style={{
              backgroundColor:
                isLoading || isButtonDisabled ? 'grey' : '#4274BA',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              pointerEvents: isLoading ? 'none' : 'auto',
            }}
          >
            {isLoading ? <div className="spinner"></div> : 'SAVE INFORMATION'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Experience;

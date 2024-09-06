import React, { useState, useEffect } from 'react';

import './pages.css';
import DeleteIcon from '../../icons/DeleteIcon';
import AddIcon from '../../icons/AddIcon';

const Experience = () => {
  const [entries, setEntries] = useState([
    { jobTitle: '', jobDescription: '', startDate: '', endDate: '' },
  ]);

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

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
      { jobTitle: '', jobDescription: '', startDate: '', endDate: '' },
    ]);
  };

  const handleRemoveEntry = (index: number) => {
    setEntries(entries.filter((_, i) => i !== index));
  };

  // Check if the Edit button should be disabled
  useEffect(() => {
    const allEntriesFilled = entries.every(
      (entry) =>
        entry.jobTitle &&
        entry.jobDescription &&
        entry.startDate &&
        entry.endDate
    );
    setIsButtonDisabled(!allEntriesFilled);
  }, [entries]);

  return (
    <div className="settings_content">
      <div className="settings_main">
        <div className="settings_page_header">Experience</div>
        <div className="settings_page_subHeader">
          Highlight your job experience
        </div>
        {entries.map((entry, index) => (
          <div key={index} className="experience_entry">
            <div className="profile_form_item">
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
              <input
                type="text"
                name="jobTitle"
                id={`jobTitle-${index}`}
                value={entry.jobTitle}
                className="profile_input_item"
                onChange={(event) => handleInputChange(index, event)}
              />
            </div>
            <div className="profile_form_item">
              <label htmlFor={`jobDescription-${index}`}>Job Description</label>
              <textarea
                name="jobDescription"
                id={`jobDescription-${index}`}
                value={entry.jobDescription}
                className="profile_input_textarea"
                rows={5}
                onChange={(event) => handleInputChange(index, event)}
              />
            </div>
            <div className="profile_form_item">
              <label htmlFor={`startDate-${index}`}>Start Date</label>
              <input
                type="date"
                name="startDate"
                id={`startDate-${index}`}
                value={entry.startDate}
                className="profile_input_item"
                onChange={(event) => handleInputChange(index, event)}
              />
            </div>
            <div className="profile_form_item">
              <label htmlFor={`endDate-${index}`}>End Date</label>
              <input
                type="date"
                name="endDate"
                id={`endDate-${index}`}
                value={entry.endDate}
                className="profile_input_item"
                onChange={(event) => handleInputChange(index, event)}
              />
            </div>
          </div>
        ))}
        <div className="add_another_entry_2">
          <div className="content" onClick={handleAddEntry}>
            <AddIcon />
            <div style={{ fontSize: '14px', paddingBottom: '4px' }}>
              Add Another Entry
            </div>
          </div>
        </div>
        <div className="settings_edit_btn_container">
          <button className="settings_edit_btn" disabled={isButtonDisabled}>
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Experience;

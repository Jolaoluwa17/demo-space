import React, { useState, useEffect } from 'react';
import AddIcon from '../../../icons/AddIcon';
import './pages.css';
import DeleteIcon from '../../../icons/DeleteIcon';

interface Entry {
  jobTitle: string;
  jobDescription: string;
  startDate: string;
  endDate: string;
}

interface Props {
  setCurrentPage: (page: number) => void;
}

const PageFive: React.FC<Props> = ({ setCurrentPage }) => {
  const [entries, setEntries] = useState<Entry[]>([
    { jobTitle: '', jobDescription: '', startDate: '', endDate: '' },
  ]);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);

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

  // Check if the Next button should be disabled
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
            />
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
        onClick={() => setCurrentPage(6)}
        disabled={isButtonDisabled}
      >
        Next
      </button>
    </div>
  );
};

export default PageFive;

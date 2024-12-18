import React, { useState, useEffect } from 'react';
import AddIcon from '@/icons/AddIcon';
import './pages.css';
import RememberMeCheckBox from '@/icons/RememberMeCheckBox';
import { FiMinusCircle } from 'react-icons/fi';

interface Entry {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  companyName: string;
  currentlyWorking: boolean;
}

interface Props {
  setCurrentPage: (page: number) => void;
  entries: Entry[];
  setEntries: React.Dispatch<React.SetStateAction<Entry[]>>;
  isLoading: boolean;
}

const PageFive: React.FC<Props> = ({
  setCurrentPage,
  entries,
  setEntries,
  isLoading,
}) => {
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
      {
        title: '',
        description: '',
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
    const isCurrentlyWorking = !updatedEntries[index].currentlyWorking;

    // Toggle the `currentlyWorking` state
    updatedEntries[index].currentlyWorking = isCurrentlyWorking;

    // If `currentlyWorking` is true, clear the `endDate`
    if (isCurrentlyWorking) {
      updatedEntries[index].endDate = '';
    }

    setEntries(updatedEntries);
  };

  // Check if the Next button should be disabled
  useEffect(() => {
    const allEntriesFilled = entries.every(
      (entry) =>
        entry.title &&
        entry.description &&
        entry.startDate &&
        (entry.currentlyWorking || entry.endDate)
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
        <div
          key={index}
          className="education_entry"
          style={{
            marginBottom: index < entries.length - 1 ? '100px' : '0',
          }}
        >
          <div className="profile_pageone_form_item">
            <label htmlFor={`title-${index}`}>
              Job Title
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
          </div>
          <input
            type="text"
            name="title"
            id={`title-${index}`}
            value={entry.title}
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
            <label htmlFor={`description-${index}`}>Job Description</label>
            <textarea
              name="description"
              id={`description-${index}`}
              value={entry.description}
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
          {!entry.currentlyWorking && (
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
          )}

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
        <div
          className="content"
          onClick={!isButtonDisabled && !isLoading ? handleAddEntry : undefined}
          style={
            isButtonDisabled || isLoading
              ? { color: 'grey', cursor: 'not-allowed' }
              : {}
          }
        >
          <AddIcon
            color={isButtonDisabled || isLoading ? '#808080' : '#007BFF'}
          />
          <div style={{ fontSize: '14px', paddingBottom: '4px' }}>
            Add Another Entry
          </div>
        </div>
      </div>
      <div className="skip_btn" onClick={() => setCurrentPage(6)}>
        Skip
      </div>
      <button
        className={`next_btn`}
        onClick={() => setCurrentPage(6)}
        style={{
          backgroundColor: isButtonDisabled || isLoading ? 'grey' : '#007BFF',
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

import { useState, useEffect } from 'react';
import { FiMinusCircle } from 'react-icons/fi';
import AddIcon from '@/icons/AddIcon';
import RememberMeCheckBox from '@/icons/RememberMeCheckBox';
import { PulseLoader } from 'react-spinners';

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
  userDataError?: boolean;
  darkmode: boolean;
}

const Experience: React.FC<Props> = ({
  entries = [],
  setEntries,
  userDataIsLoading,
  isLoading,
  handleUpdateProfile,
  userDataError,
  darkmode,
}) => {
  const [edit, setEdit] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [originalEntries, setOriginalEntries] = useState<Entry[]>([]);

  const getCurrentDate = (addDays = 0) => {
    const today = new Date();
    today.setDate(today.getDate() + addDays);
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleInputChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    const updatedEntries = [...entries];
    updatedEntries[index] = { ...updatedEntries[index], [name]: value };
    setEntries?.(updatedEntries);
  };

  const handleAddEntry = () => {
    setEntries?.([
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

  const handleCheckboxChange = (index: number) => {
    const updatedEntries = [...entries];
    const isCurrentlyWorking = !updatedEntries[index].currentlyWorking;
    updatedEntries[index].currentlyWorking = isCurrentlyWorking;
    updatedEntries[index].endDate = isCurrentlyWorking
      ? null
      : getCurrentDate(1);
    setEntries?.(updatedEntries);
  };

  const handleEditToggle = () => {
    if (!isLoading && !userDataIsLoading && !userDataError) {
      if (!edit) {
        setOriginalEntries([...entries]);
        setEdit(true);
      } else {
        setEntries?.(originalEntries);
        setEdit(false);
      }
    }
  };

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

  useEffect(() => {
    const updatedEntries = entries.map((entry) => ({
      ...entry,
      currentlyWorking: !entry.endDate,
    }));

    const hasChanges = updatedEntries.some(
      (updatedEntry, index) =>
        updatedEntry.currentlyWorking !== entries[index]?.currentlyWorking
    );

    if (hasChanges) {
      setEntries?.(updatedEntries);
    }
  }, [entries, setEntries]);

  const placeholderEntry = {
    currentlyWorking: false,
  };

  return (
    <div className={`settings_content ${darkmode && 'settings_content_dark'}`}>
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
                {placeholderEntry ? (
                  <RememberMeCheckBox />
                ) : (
                  <div className="pages_empty_checkbox"></div>
                )}
              </div>
              <div
                style={{ paddingTop: '5px' }}
                className="currently_working_here_text"
              >
                Currently Working Here
              </div>
            </div>
          </div>
        ) : (
          entries.map((entry, index) => (
            <div
              key={index}
              className="experience_entry"
              style={{
                marginBottom: index < entries.length - 1 ? '100px' : '0',
              }}
            >
              <div className="profile_form_item">
                <label htmlFor={`jobTitle-${index}`}>
                  Job Title
                  {index > 0 && edit && (
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
                {edit ? (
                  <input
                    type="text"
                    name="title"
                    id={`jobTitle-${index}`}
                    value={entry.title || ''}
                    className="profile_input_item"
                    onChange={(event) => handleInputChange(index, event)}
                    disabled={userDataIsLoading}
                  />
                ) : userDataIsLoading ? (
                  <div className="profile_input_item_none">
                    <PulseLoader size={8} color="#007bff" />
                  </div>
                ) : userDataError || !entry.title ? (
                  <div className="profile_input_item_none">No Data</div>
                ) : (
                  <div className="profile_input_item_none">
                    {entry.title || null}
                  </div>
                )}
              </div>
              <div className="profile_form_item">
                <label htmlFor={`companyName-${index}`}>Company Name</label>
                {edit ? (
                  <input
                    type="text"
                    name="companyName"
                    id={`companyName-${index}`}
                    value={entry.companyName || ''}
                    className="profile_input_item"
                    onChange={(event) => handleInputChange(index, event)}
                    disabled={userDataIsLoading}
                  />
                ) : userDataIsLoading ? (
                  <div className="profile_input_item_none">
                    <PulseLoader size={8} color="#007bff" />
                  </div>
                ) : userDataError || !entry.companyName ? (
                  <div className="profile_input_item_none">No Data</div>
                ) : (
                  <div className="profile_input_item_none">
                    {entry.companyName || null}
                  </div>
                )}
              </div>
              <div className="profile_form_item">
                <label htmlFor={`jobDescription-${index}`}>
                  Job Description
                </label>
                {edit ? (
                  <textarea
                    name="description"
                    id={`jobDescription-${index}`}
                    value={entry.description || ''}
                    className="profile_input_textarea"
                    rows={5}
                    onChange={(event) => handleInputChange(index, event)}
                    disabled={userDataIsLoading}
                  />
                ) : userDataIsLoading ? (
                  <div className="profile_input_item_none">
                    <PulseLoader size={8} color="#007bff" />
                  </div>
                ) : userDataError || !entry.description ? (
                  <div className="profile_input_item_none">No Data</div>
                ) : (
                  <div className="profile_input_item_none">
                    {entry.description || null}
                  </div>
                )}
              </div>
              <div className="profile_form_item">
                <label htmlFor={`startDate-${index}`}>Start Date</label>
                {edit ? (
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
                ) : userDataIsLoading ? (
                  <div className="profile_input_item_none">
                    <PulseLoader size={8} color="#007bff" />
                  </div>
                ) : userDataError || !entry.startDate ? (
                  <div className="profile_input_item_none">No Data</div>
                ) : (
                  <div className="profile_input_item_none">
                    {entry.startDate ? entry.startDate.substring(0, 10) : ''}
                  </div>
                )}
              </div>
              {!entry.currentlyWorking && (
                <div className="profile_form_item">
                  <label htmlFor={`endDate-${index}`}>End Date</label>
                  {edit ? (
                    <input
                      type="date"
                      name="endDate"
                      id={`endDate-${index}`}
                      value={
                        entry.endDate ? entry.endDate.substring(0, 10) : ''
                      }
                      className="profile_input_item"
                      onChange={(event) => handleInputChange(index, event)}
                      disabled={entry.currentlyWorking || userDataIsLoading}
                    />
                  ) : userDataIsLoading ? (
                    <div className="profile_input_item_none">
                      <PulseLoader size={8} color="#007bff" />
                    </div>
                  ) : userDataError || !entry.endDate ? (
                    <div className="profile_input_item_none">No Data</div>
                  ) : (
                    <div className="profile_input_item_none">
                      {entry.endDate ? entry.endDate.substring(0, 10) : ''}
                    </div>
                  )}
                </div>
              )}
              {edit || entry.currentlyWorking ? (
                <div className="currently_working_here">
                  {edit ? (
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
                  ) : userDataIsLoading ? (
                    <div
                      style={{
                        marginRight: '10px',
                        width: '15px',
                        height: '15px',
                      }}
                    >
                      <div className="pages_empty_checkbox"></div>
                    </div>
                  ) : (
                    <div
                      style={{
                        marginRight: '10px',
                        width: '15px',
                        height: '15px',
                      }}
                    >
                      <RememberMeCheckBox />
                    </div>
                  )}
                  <div
                    style={{ paddingTop: '5px' }}
                    className="currently_working_here_text"
                  >
                    Currently Working Here
                  </div>
                </div>
              ) : null}
            </div>
          ))
        )}

        {edit && (
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
        )}

        <div className="settings_edit_btn_container">
          <div
            className="settings_edit_btn"
            style={{
              backgroundColor:
                isLoading || userDataIsLoading || userDataError
                  ? 'grey'
                  : edit
                    ? 'red'
                    : '#007BFF',
              cursor:
                isLoading || userDataIsLoading || userDataError
                  ? 'not-allowed'
                  : 'pointer',
            }}
            onClick={handleEditToggle}
          >
            {isLoading ? (
              <div className="spinner"></div>
            ) : edit ? (
              'CANCEL'
            ) : (
              'EDIT INFORMATION'
            )}
          </div>
          {edit && (
            <button
              className="settings_edit_btn"
              disabled={isButtonDisabled || isLoading}
              onClick={() => {
                if (!isLoading && handleUpdateProfile) {
                  // Check if handleUpdateProfile is defined
                  handleUpdateProfile();
                  setEdit(false); // Set edit to false after clicking
                }
              }}
              style={{
                backgroundColor:
                  isLoading || isButtonDisabled ? 'grey' : '#007BFF',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                pointerEvents: isLoading ? 'none' : 'auto',
              }}
            >
              {isLoading ? <div className="spinner"></div> : 'SAVE INFORMATION'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Experience;

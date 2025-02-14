import { useEffect, useState } from 'react';
import { FiMinusCircle } from 'react-icons/fi';
import './pages.css';
import CustomSelect from '../customselect/CustomSelect';
import AddIcon from '@/icons/AddIcon';
import { PulseLoader } from 'react-spinners';

interface Props {
  educationEntries?: EducationEntry[];
  setEducationEntries?: React.Dispatch<React.SetStateAction<EducationEntry[]>>;
  userDataIsLoading?: boolean;
  isLoading?: boolean;
  userDataError?: boolean;
  handleUpdateProfile?: () => Promise<void>;
  darkmode: boolean;
}

const degreeOptions = [
  'Associate Degree',
  "Bachelor's Degree",
  "Master's Degree",
  'Doctoral Degree',
  'Diploma',
  'Certificate',
  'Professional Degree',
  'Other',
];

interface EducationEntry {
  institutionName: string;
  degreeObtained: string;
  degreeType: string;
  graduationDate: string;
}

const EducationalBackground: React.FC<Props> = ({
  educationEntries = [],
  setEducationEntries,
  userDataIsLoading,
  isLoading,
  handleUpdateProfile,
  userDataError,
  darkmode,
}) => {
  const [edit, setEdit] = useState(false);
  // Store the original entries in a separate state variable
  const [originalEntries, setOriginalEntries] = useState<EducationEntry[]>([]);

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Ensure the state is initialized with at least one empty entry
  useEffect(() => {
    if (educationEntries.length === 0 && setEducationEntries) {
      const initialEntry = {
        institutionName: '',
        degreeObtained: '',
        degreeType: '',
        graduationDate: getCurrentDate(),
      };
      setEducationEntries([initialEntry]);
      setOriginalEntries([initialEntry]);
    }
  }, [educationEntries, setEducationEntries]);

  const handleInputChange = (
    index: number,
    field: keyof EducationEntry,
    value: string
  ) => {
    const updatedEntries = [...educationEntries];
    updatedEntries[index] = {
      ...updatedEntries[index],
      [field]: value,
    };
    setEducationEntries?.(updatedEntries);
  };

  const addNewEntry = () => {
    const newEntry = {
      institutionName: '',
      degreeObtained: '',
      degreeType: '',
      graduationDate: getCurrentDate(),
    };
    setEducationEntries?.([...educationEntries, newEntry]);
  };

  const handleRemoveEntry = (index: number) => {
    const updatedEntries = educationEntries.filter((_, i) => i !== index);
    setEducationEntries?.(updatedEntries.length > 0 ? updatedEntries : []);
  };

  // Handle entering edit mode
  const handleEditClick = () => {
    if (!isLoading && !userDataIsLoading && !userDataError) {
      // Create a deep copy of the current entries
      const entriesCopy = educationEntries.map((entry) => ({
        institutionName: entry.institutionName,
        degreeObtained: entry.degreeObtained,
        degreeType: entry.degreeType,
        graduationDate: entry.graduationDate,
      }));
      setOriginalEntries(entriesCopy);
      setEdit(true);
    }
  };

  // Handle cancel
  const handleCancel = () => {
    // Restore the original entries from our backup
    setEducationEntries?.(
      originalEntries.map((entry) => ({
        institutionName: entry.institutionName,
        degreeObtained: entry.degreeObtained,
        degreeType: entry.degreeType,
        graduationDate: entry.graduationDate,
      }))
    );
    setEdit(false);
  };

  return (
    <div className={`settings_content ${darkmode && 'settings_content_dark'}`}>
      <div className="settings_main">
        <div className="settings_page_header">Educational Background</div>
        <div className="settings_page_subHeader">
          Tell us about your academic qualifications.
        </div>

        {educationEntries.map((entry, index) => (
          <div
            key={index}
            className="profile_form_item_group"
            style={{
              marginBottom: index < educationEntries.length - 1 ? '100px' : '0',
            }}
          >
            <div className="profile_form_item">
              <div>
                <label htmlFor={`institution_${index}`}>
                  Institution Name{' '}
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
              </div>
              {edit ? (
                <input
                  type="text"
                  className="profile_input_item"
                  name={`institution_${index}`}
                  value={entry.institutionName}
                  onChange={(e) =>
                    handleInputChange(index, 'institutionName', e.target.value)
                  }
                  disabled={userDataIsLoading || isLoading}
                />
              ) : userDataIsLoading ? (
                <div className="profile_input_item_none">
                  <PulseLoader size={8} color="#007bff" />
                </div>
              ) : userDataError || !entry.institutionName ? (
                <div className="profile_input_item_none">No Data</div>
              ) : (
                <div className="profile_input_item_none">
                  {entry.institutionName}
                </div>
              )}
            </div>
            <div className="profile_form_item">
              <label htmlFor={`degreeObtained_${index}`}>Degree Obtained</label>
              {edit ? (
                <input
                  type="text"
                  className="profile_input_item"
                  name={`degreeObtained_${index}`}
                  value={entry.degreeObtained}
                  onChange={(e) =>
                    handleInputChange(index, 'degreeObtained', e.target.value)
                  }
                  disabled={userDataIsLoading || isLoading}
                />
              ) : userDataIsLoading ? (
                <div className="profile_input_item_none">
                  <PulseLoader size={8} color="#007bff" />
                </div>
              ) : userDataError || !entry.degreeObtained ? (
                <div className="profile_input_item_none">No Data</div>
              ) : (
                <div className="profile_input_item_none">
                  {entry.degreeObtained}
                </div>
              )}
            </div>
            <div className="profile_form_item">
              <label htmlFor={`degreeType_${index}`}>Degree Type</label>
              {edit ? (
                <div className="profile_custom_select">
                  <CustomSelect
                    options={degreeOptions}
                    value={entry.degreeType}
                    onChange={(value) =>
                      handleInputChange(index, 'degreeType', value)
                    }
                    placeholder="Select your degree type"
                    darkmode={darkmode}
                  />
                </div>
              ) : userDataIsLoading ? (
                <div className="profile_input_item_none">
                  <PulseLoader size={8} color="#007bff" />
                </div>
              ) : userDataError || !entry.degreeType ? (
                <div className="profile_input_item_none">No Data</div>
              ) : (
                <div className="profile_input_item_none">
                  {entry.degreeType}
                </div>
              )}
            </div>
            <div className="profile_form_item">
              <label htmlFor={`graduationDate_${index}`}>Graduation Date</label>
              {edit ? (
                <input
                  type="date"
                  className="profile_input_item"
                  name={`graduationDate_${index}`}
                  value={
                    entry.graduationDate
                      ? new Date(entry.graduationDate)
                          .toISOString()
                          .split('T')[0]
                      : getCurrentDate()
                  }
                  onChange={(e) =>
                    handleInputChange(index, 'graduationDate', e.target.value)
                  }
                  disabled={userDataIsLoading || isLoading}
                />
              ) : userDataIsLoading ? (
                <div className="profile_input_item_none">
                  <PulseLoader size={8} color="#007bff" />
                </div>
              ) : userDataError || !entry.graduationDate ? (
                <div className="profile_input_item_none">No Data</div>
              ) : (
                <div className="profile_input_item_none">
                  {entry.graduationDate
                    ? new Date(entry.graduationDate).toISOString().split('T')[0]
                    : getCurrentDate()}
                </div>
              )}
            </div>
          </div>
        ))}

        {edit && (
          <div className="add_another_entry_2">
            <div
              className="content"
              onClick={!isLoading ? addNewEntry : undefined}
              style={isLoading ? { color: 'grey', cursor: 'not-allowed' } : {}}
            >
              <AddIcon color={isLoading ? '#808080' : '#007BFF'} />
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
            onClick={edit ? handleCancel : handleEditClick}
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
            <div
              className="settings_edit_btn"
              style={{
                backgroundColor: isLoading ? 'grey' : '#007BFF',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                pointerEvents: isLoading ? 'none' : 'auto',
              }}
              onClick={() => {
                if (!isLoading && handleUpdateProfile) {
                  handleUpdateProfile();
                  setEdit(false);
                }
              }}
            >
              {isLoading ? <div className="spinner"></div> : 'SAVE INFORMATION'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EducationalBackground;

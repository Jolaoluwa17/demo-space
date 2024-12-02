import './pages.css';
import CustomSelect from '../customselect/CustomSelect'; // Adjust the import path as necessary
import AddIcon from '../../icons/AddIcon';
import DeleteIcon from '../../icons/DeleteIcon';

interface Props {
  educationEntries?: EducationEntry[];
  setEducationEntries?: React.Dispatch<React.SetStateAction<EducationEntry[]>>;
  userDataIsLoading?: boolean;
  isLoading?: boolean;
  handleUpdateProfile?: () => Promise<void>;
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
}) => {
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleInputChange = (
    index: number,
    field: keyof EducationEntry,
    value: string
  ) => {
    const updatedEntries = [...educationEntries];
    updatedEntries[index][field] = value;
    setEducationEntries?.(updatedEntries);
  };

  const addNewEntry = () => {
    setEducationEntries?.([
      ...educationEntries,
      {
        institutionName: '',
        degreeObtained: '',
        degreeType: '',
        graduationDate: getCurrentDate(),
      },
    ]);
  };

  const handleRemoveEntry = (index: number) => {
    setEducationEntries?.(educationEntries.filter((_, i) => i !== index));
  };

  // Ensure at least one empty entry is present if no data exists
  const entriesToDisplay =
    educationEntries.length > 0
      ? educationEntries
      : [
          {
            institutionName: '',
            degreeObtained: '',
            degreeType: '',
            graduationDate: getCurrentDate(),
          },
        ];

  return (
    <div className="settings_content">
      <div className="settings_main">
        <div className="settings_page_header">Educational Background</div>
        <div className="settings_page_subHeader">
          Tell us about your academic qualifications.
        </div>

        {entriesToDisplay.map((entry, index) => (
          <div key={index} className="profile_form_item_group">
            <div className="profile_form_item">
              <div>
                <label htmlFor={`institution_${index}`}>
                  Institution Name{' '}
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
                className="profile_input_item"
                name={`institution_${index}`}
                value={entry.institutionName}
                onChange={(e) =>
                  handleInputChange(index, 'institutionName', e.target.value)
                }
                disabled={userDataIsLoading || isLoading}
              />
            </div>
            <div className="profile_form_item">
              <label htmlFor={`degreeObtained_${index}`}>Degree Obtained</label>
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
            </div>
            <div className="profile_form_item">
              <label htmlFor={`degreeType_${index}`}>Degree Type</label>
              <div className="profile_custom_select">
                <CustomSelect
                  options={degreeOptions}
                  value={entry.degreeType}
                  onChange={(value) =>
                    handleInputChange(index, 'degreeType', value)
                  }
                  placeholder="Select your degree type"
                />
              </div>
            </div>
            <div className="profile_form_item">
              <label htmlFor={`graduationDate_${index}`}>Graduation Date</label>
              <input
                type="date"
                className="profile_input_item"
                name={`graduationDate_${index}`}
                value={
                  entry.graduationDate
                    ? new Date(entry.graduationDate).toISOString().split('T')[0]
                    : getCurrentDate() // Fallback to current date if graduationDate is invalid
                }
                onChange={(e) =>
                  handleInputChange(index, 'graduationDate', e.target.value)
                }
                disabled={userDataIsLoading || isLoading}
              />
            </div>
          </div>
        ))}

        <div className="add_another_entry_2">
          <div
            className="content"
            onClick={!isLoading ? addNewEntry : undefined}
            style={isLoading ? { color: 'grey', cursor: 'not-allowed' } : {}}
          >
            <AddIcon color={isLoading ? '#808080' : '#4274BA'} />
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

        <div className="settings_edit_btn_container">
          <div
            className="settings_edit_btn"
            style={{
              backgroundColor: isLoading ? 'grey' : '#4274BA',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              pointerEvents: isLoading ? 'none' : 'auto',
            }}
            onClick={!isLoading ? handleUpdateProfile : undefined}
          >
            {isLoading ? <div className="spinner"></div> : 'SAVE INFORMATION'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationalBackground;

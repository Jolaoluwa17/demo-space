import { useState } from 'react';
import './pages.css';
import CustomSelect from '../customselect/CustomSelect'; // Adjust the import path as necessary
import AddIcon from '../../icons/AddIcon';
import DeleteIcon from '../../icons/DeleteIcon';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

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
  institution: string;
  degreeObtained: string;
  degreeType: string;
  graduationDate: string;
}

const EducationalBackground = () => {
  const [educationEntries, setEducationEntries] = useState<EducationEntry[]>([
    {
      institution: '',
      degreeObtained: '',
      degreeType: '',
      graduationDate: '',
    },
  ]);

  const handleInputChange = (
    index: number,
    field: keyof EducationEntry,
    value: string
  ) => {
    const updatedEntries = [...educationEntries];
    updatedEntries[index][field] = value;
    setEducationEntries(updatedEntries);
  };

  const addNewEntry = () => {
    setEducationEntries([
      ...educationEntries,
      {
        institution: '',
        degreeObtained: '',
        degreeType: '',
        graduationDate: '',
      },
    ]);
  };

  const handleRemoveEntry = (index: number) => {
    setEducationEntries(educationEntries.filter((_, i) => i !== index));
  };

  const [startDate, setStartDate] = useState(new Date());

  return (
    <div className="settings_content">
      <div className="settings_main">
        <div className="settings_page_header">Educational Background</div>
        <div className="settings_page_subHeader">
          Tell us about your academic qualifications.
        </div>

        {educationEntries.map((entry, index) => (
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
                value={entry.institution}
                onChange={(e) =>
                  handleInputChange(index, 'institution', e.target.value)
                }
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
              {/* <input
                type="date"
                className="profile_input_item"
                name={`graduationDate_${index}`}
                value={entry.graduationDate}
                onChange={(e) =>
                  handleInputChange(index, 'graduationDate', e.target.value)
                }
              /> */}
              <DatePicker
                selected={startDate}
                // onChange={(date) => setStartDate(date)}
                className="profile_input_item"
              />
            </div>
          </div>
        ))}

        <div className="add_another_entry_2">
          <div className="content" onClick={addNewEntry}>
            <AddIcon />
            <div style={{ fontSize: '14px', paddingBottom: '4px' }}>
              Add Another Entry
            </div>
          </div>
        </div>

        <div className="settings_edit_btn_container">
          <div className="settings_edit_btn">Edit</div>
        </div>
      </div>
    </div>
  );
};

export default EducationalBackground;

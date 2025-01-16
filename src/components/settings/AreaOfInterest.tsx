import { useState } from 'react';
import './pages.css';
import { PulseLoader } from 'react-spinners';

const interestsList = [
  'Artificial Intelligence',
  'Web Development',
  'Data Science',
  'Mobile Development',
  'Cybersecurity',
  'Cloud Computing',
  'Blockchain',
  'DevOps',
  'UI/UX Design',
  'Game Development',
];

interface Props {
  areaOfInterest?: string[];
  setAreaOfInterest?: React.Dispatch<React.SetStateAction<string[]>>;
  userDataIsLoading?: boolean;
  isLoading?: boolean;
  handleUpdateProfile?: () => Promise<void>;
  userDataError?: boolean;
}

const AreaOfInterest: React.FC<Props> = ({
  areaOfInterest = [],
  setAreaOfInterest,
  userDataIsLoading,
  isLoading,
  handleUpdateProfile,
  userDataError,
}) => {
  // Handle clicking on an interest div
  const handleInterestClick = (interest: string) => {
    if (setAreaOfInterest) {
      if (areaOfInterest.includes(interest)) {
        setAreaOfInterest(areaOfInterest.filter((item) => item !== interest));
      } else {
        setAreaOfInterest([...areaOfInterest, interest]);
      }
    }
  };

  const [edit, setEdit] = useState(false);

  return (
    <div className="settings_content">
      <div className="settings_main">
        <div className="settings_page_header">Area of interest</div>
        <div className="settings_page_subHeader">
          Highlight your areas of interest.
        </div>
        <div
          className="profile_pageone_form_item"
          style={{ marginTop: edit ? '' : '5px' }}
        >
          {edit && (
            <label>Multi-select dropdown for technologies and roles.</label>
          )}
          {edit ? (
            <div className="multi_select_interest">
              {interestsList.map((interest) => (
                <div
                  key={interest}
                  className="interests"
                  onClick={() => handleInterestClick(interest)}
                >
                  <div>{interest}</div>
                  <input
                    type="checkbox"
                    checked={areaOfInterest.includes(interest)}
                    readOnly
                    disabled={userDataIsLoading || isLoading}
                  />
                </div>
              ))}
            </div>
          ) : userDataIsLoading ? (
            <div
              className="profile_input_item_none"
              style={{ marginTop: '-10px' }}
            >
              <PulseLoader size={8} color="#007bff" />
            </div>
          ) : userDataError || areaOfInterest.length < 1 ? (
            <div
              className="profile_input_item_none"
              style={{ marginTop: '-10px' }}
            >
              No Data
            </div>
          ) : (
            <div className="multi_select_interest_new">
              {areaOfInterest.map((interest) => (
                <div key={interest} className="interests_uneditted">
                  <div>{interest}</div>
                </div>
              ))}
            </div>
          )}
        </div>
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
            onClick={() => {
              if (!isLoading && !userDataIsLoading && !userDataError) {
                setEdit(!edit);
              }
            }}
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
                  // Check if handleUpdateProfile is defined
                  handleUpdateProfile();
                  setEdit(false); // Set edit to false after clicking
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

export default AreaOfInterest;

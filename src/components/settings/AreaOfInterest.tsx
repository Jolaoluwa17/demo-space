import './pages.css';

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
}

const AreaOfInterest: React.FC<Props> = ({
  areaOfInterest = [],
  setAreaOfInterest,
  userDataIsLoading,
  isLoading,
  handleUpdateProfile,
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

  return (
    <div className="settings_content">
      <div className="settings_main">
        <div className="settings_page_header">Area of interest</div>
        <div className="settings_page_subHeader">
          Highlight your areas of interest.
        </div>
        <div className="profile_pageone_form_item">
          <label>Multi-select dropdown for technologies and roles.</label>
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
        </div>
        <div className="settings_edit_btn_container">
          <div
            className="settings_edit_btn"
            style={{
              backgroundColor: isLoading ? 'grey' : '#007BFF',
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

export default AreaOfInterest;

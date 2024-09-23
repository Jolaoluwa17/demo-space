import { useState } from 'react';
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

const AreaOfInterest = () => {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  // Handle clicking on an interest div
  const handleInterestClick = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(
        selectedInterests.filter((item) => item !== interest)
      );
    } else {
      setSelectedInterests([...selectedInterests, interest]);
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
                  checked={selectedInterests.includes(interest)}
                  readOnly
                />
              </div>
            ))}
          </div>
        </div>
        <div className="settings_edit_btn_container">
          <div className="settings_edit_btn">SAVE INFORMATION</div>
        </div>
      </div>
    </div>
  );
};

export default AreaOfInterest;

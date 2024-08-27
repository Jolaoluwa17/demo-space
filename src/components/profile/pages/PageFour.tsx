import React, { useState, useEffect } from 'react';
import './pages.css';

interface Props {
  setCurrentPage: (page: number) => void;
}

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

const PageFour: React.FC<Props> = ({ setCurrentPage }) => {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);

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

  // Check if the Next button should be disabled
  useEffect(() => {
    setIsButtonDisabled(selectedInterests.length === 0);
  }, [selectedInterests]);

  return (
    <div className="profile_pageone_root">
      <div className="profile_pageone_title">Areas of Interest</div>
      <div className="profile_pageone_subTitle">
        Select the technologies and roles you are interested in.
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
        <button
          className={`next_btn`}
          onClick={() => setCurrentPage(5)}
          disabled={isButtonDisabled}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PageFour;

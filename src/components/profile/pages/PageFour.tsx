import React, { useState, useEffect } from 'react';

import './pages.css';

interface Props {
  setCurrentPage: (page: number) => void;
  areaOfInterest: string[];
  setAreaOfInterest: React.Dispatch<React.SetStateAction<string[]>>;
  isLoading: boolean;
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

const PageFour: React.FC<Props> = ({
  setCurrentPage,
  areaOfInterest,
  setAreaOfInterest,
  isLoading,
}) => {
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);

  // Handle clicking on an interest div
  const handleInterestClick = (interest: string) => {
    if (areaOfInterest.includes(interest)) {
      setAreaOfInterest(areaOfInterest.filter((item) => item !== interest));
    } else {
      setAreaOfInterest([...areaOfInterest, interest]);
    }
  };

  // Check if the Next button should be disabled
  useEffect(() => {
    setIsButtonDisabled(areaOfInterest.length === 0);
  }, [areaOfInterest]);

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
                checked={areaOfInterest.includes(interest)}
                readOnly
              />
            </div>
          ))}
        </div>
        <div className="skip_btn" onClick={() => setCurrentPage(5)}>
          Skip
        </div>
        <button
          className={`next_btn`}
          onClick={() => setCurrentPage(5)}
          style={{
            backgroundColor: isButtonDisabled || isLoading ? 'grey' : '#007BFF',
            cursor: isButtonDisabled || isLoading ? 'not-allowed' : 'pointer',
          }}
          disabled={isButtonDisabled || isLoading}
        >
          {isLoading ? <div className="spinner"></div> : 'Next'}
        </button>
      </div>
    </div>
  );
};

export default PageFour;

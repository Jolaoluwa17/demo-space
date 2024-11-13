import React, { useState, useEffect } from 'react';
import './pages.css';
import {
  useGetUserQuery,
  useUpdateUserProfileMutation,
} from '@/services/features/user/userSlice';

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
  const userid = sessionStorage.getItem('id');

  const { data, isLoading: isUserLoading } = useGetUserQuery(
    userid ? userid : ''
  );

  useEffect(() => {
    if (data && !isUserLoading && data.response.areaOfInterest) {
      setSelectedInterests(data.response.areaOfInterest);
    }
  }, [data, isUserLoading]);

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

  const [updateUserProfile, { isLoading }] = useUpdateUserProfileMutation();

  const handleUpdateProfile = async () => {
    const userData = {
      id: userid,
      areaOfInterest: selectedInterests,
    };

    try {
      await updateUserProfile(userData).unwrap();
      setCurrentPage(5);
    } catch (error: unknown) {
      console.log(error);
    }
  };

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
          onClick={handleUpdateProfile}
          style={{
            backgroundColor: isButtonDisabled || isLoading ? 'grey' : '#4274BA',
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

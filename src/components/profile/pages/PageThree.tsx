import { useState, useEffect } from 'react';
import CancelIcon from '@/icons/CancelIcon';
import SearchIcon from '@/icons/SearchIcon';
import './pages.css';
import {
  useGetUserQuery,
  useUpdateUserProfileMutation,
} from '@/services/features/user/userSlice';

interface Props {
  setCurrentPage: (page: number) => void;
}

const PageThree: React.FC<Props> = ({ setCurrentPage }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
  const userid = sessionStorage.getItem('id');

  const { data, isLoading: isUserLoading } = useGetUserQuery(
    userid ? userid : ''
  );

  // Populate form fields when user data is available
  useEffect(() => {
    if (data && !isUserLoading && data.response.skillSet) {
      setSelectedSkills(data.response.skillSet);
    }
  }, [data, isUserLoading]);

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
  };

  // Handle the 'Enter' key press to add a skill
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      e.key === 'Enter' &&
      searchTerm.trim() !== '' &&
      selectedSkills.length < 10
    ) {
      e.preventDefault(); // Prevent form submission or unwanted behavior
      if (!selectedSkills.includes(searchTerm.trim())) {
        setSelectedSkills([...selectedSkills, searchTerm.trim()]);
        setSearchTerm(''); // Clear the input field
      }
    }
  };

  // Remove a skill from the selected skills list
  const handleSkillRemove = (skill: string) => {
    setSelectedSkills(selectedSkills.filter((s) => s !== skill));
  };

  // Check if the Next button should be disabled
  useEffect(() => {
    setIsButtonDisabled(selectedSkills.length === 0);
  }, [selectedSkills]);

  const [updateUserProfile, { isLoading }] = useUpdateUserProfileMutation();

  const handleUpdateProfile = async () => {
    const userData = {
      id: userid,
      skillSet: selectedSkills,
    };

    try {
      await updateUserProfile(userData).unwrap();
      setCurrentPage(4);
    } catch (error: unknown) {
      console.log(error);
    }
  };

  return (
    <div className="profile_pageone_root">
      <div className="profile_pageone_title">Your Skills</div>
      <div className="profile_pageone_subTitle">
        Highlight your technical and soft skills.
      </div>
      <div className="profile_pageone_form_item">
        <label htmlFor="skill">Add your Skill</label>
        <div className="profile_pageone_searchInput">
          <input
            type="text"
            name="skill"
            className="input"
            placeholder="Select Skill"
            value={searchTerm}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
            disabled={isUserLoading}
          />
          <SearchIcon />
        </div>
      </div>
      <div className="skillheader">You can add up to 10 skills</div>
      <div className="skills_container">
        {selectedSkills.map((skill) => (
          <div className="skill" key={skill}>
            <div style={{ marginRight: '12.5px' }}>{skill}</div>
            <div
              style={{ cursor: 'pointer' }}
              onClick={() => handleSkillRemove(skill)}
            >
              <CancelIcon />
            </div>
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
  );
};

export default PageThree;

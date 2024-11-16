import { useState, useEffect } from 'react';
import CancelIcon from '@/icons/CancelIcon';
import './pages.css';

interface Props {
  setCurrentPage: (page: number) => void;
  skillSet: string[];
  setskillSet: React.Dispatch<React.SetStateAction<string[]>>;
  isLoading: boolean;
}

const PageThree: React.FC<Props> = ({
  setCurrentPage,
  skillSet,
  setskillSet,
  isLoading,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
  };

  // Handle the 'Enter' key press to add a skill
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchTerm.trim() !== '' && skillSet.length < 10) {
      e.preventDefault(); // Prevent form submission or unwanted behavior
      if (!skillSet.includes(searchTerm.trim())) {
        setskillSet([...skillSet, searchTerm.trim()]);
        setSearchTerm(''); // Clear the input field
      }
    }
  };
  const handleAddSkill = () => {
    if (searchTerm.trim() !== '' && skillSet.length < 10) {
      if (!skillSet.includes(searchTerm.trim())) {
        setskillSet([...skillSet, searchTerm.trim()]);
        setSearchTerm(''); // Clear the input field
      }
    }
  };

  // Remove a skill from the selected skills list
  const handleSkillRemove = (skill: string) => {
    setskillSet(skillSet.filter((s) => s !== skill));
  };

  // Check if the Next button should be disabled
  useEffect(() => {
    setIsButtonDisabled(skillSet.length === 0);
  }, [skillSet]);

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
          />
          <div
            style={{ color: '#4274ba', fontWeight: '600', cursor: 'pointer' }}
            onClick={handleAddSkill}
          >
            Add
          </div>
        </div>
      </div>
      <div className="skillheader">You can add up to 10 skills</div>
      <div className="skills_container">
        {skillSet.map((skill) => (
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
      <div className="skip_btn" onClick={() => setCurrentPage(4)}>
        Skip
      </div>
      <button
        className={`next_btn`}
        onClick={() => setCurrentPage(4)}
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

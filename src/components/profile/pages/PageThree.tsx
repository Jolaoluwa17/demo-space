import { useState, useEffect } from 'react';
import CancelIcon from '@/icons/CancelIcon';
import './pages.css';

interface Props {
  setCurrentPage: (page: number) => void;
  skillSet: string[];
  setSkillSet: React.Dispatch<React.SetStateAction<string[]>>;
  isLoading: boolean;
}

const PageThree: React.FC<Props> = ({
  setCurrentPage,
  skillSet,
  setSkillSet,
  isLoading,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
  const [filteredSkills, setFilteredSkills] = useState<string[]>([]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    const skillsList = [
      'JavaScript',
      'Python',
      'React',
      'Node.js',
      'TypeScript',
      'CSS',
      'HTML',
      'Ruby',
      'Java',
      'SQL',
      'MongoDB',
      'Git',
      'Django',
      'Vue.js',
      'Angular',
      'Redux',
      'React Native',
      'Flutter',
    ];

    // Filter skills as the user types (case insensitive matching)
    const filtered = skillsList.filter(
      (skill) =>
        skill.toLowerCase().includes(value.toLowerCase()) &&
        !skillSet.includes(skill) &&
        value.trim() !== ''
    );
    setFilteredSkills(filtered);
  };

  // Handle the 'Enter' key press to add a skill
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchTerm.trim() !== '' && skillSet.length < 10) {
      e.preventDefault(); // Prevent form submission or unwanted behavior
      if (!skillSet.includes(searchTerm.trim())) {
        setSkillSet([...skillSet, searchTerm.trim()]);
        setSearchTerm(''); // Clear the input field
      }
    }
  };

  const handleSkillSelect = (skill: string) => {
    if (skillSet.length < 10 && !skillSet.includes(skill)) {
      setSkillSet?.([...skillSet, skill]);
      setSearchTerm('');
      setFilteredSkills([]);
    }
  };

  // Remove a skill from the selected skills list
  const handleSkillRemove = (skill: string) => {
    setSkillSet(skillSet.filter((s) => s !== skill));
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
        <div
          className="profile_pageone_searchInput"
          style={{ position: 'relative' }}
        >
          <input
            type="text"
            name="skill"
            className="input"
            placeholder="Select Skill"
            value={searchTerm}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
          />
          {/* Display filtered skill options as a dropdown */}
          {searchTerm && filteredSkills.length > 0 && (
            <div className="settings_profile_skills_dropdown">
              {filteredSkills.map((skill) => (
                <div
                  key={skill}
                  className="settings_profile_skill_item"
                  onClick={() => handleSkillSelect(skill)}
                >
                  {skill}
                </div>
              ))}
            </div>
          )}
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
          backgroundColor: isButtonDisabled || isLoading ? 'grey' : '#007BFF',
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

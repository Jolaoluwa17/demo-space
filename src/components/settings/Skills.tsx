import { useState } from 'react';
import './pages.css';
import CancelIcon from '../../icons/CancelIcon';

interface Props {
  skillSet?: string[]; // Default to an empty array if undefined
  setSkillSet?: React.Dispatch<React.SetStateAction<string[]>>;
  userDataIsLoading?: boolean;
  isLoading?: boolean;
  handleUpdateProfile?: () => Promise<void>;
}

const Skills: React.FC<Props> = ({
  skillSet = [], // Default to an empty array if undefined
  setSkillSet,
  userDataIsLoading,
  isLoading,
  handleUpdateProfile,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredSkills, setFilteredSkills] = useState<string[]>([]);

  // Predefined skills list (example)
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
  ];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Filter skills as the user types (case insensitive matching)
    const filtered = skillsList.filter(
      (skill) =>
        skill.toLowerCase().includes(value.toLowerCase()) &&
        !skillSet.includes(skill) && // Exclude already added skills
        value.trim() !== ''
    );
    setFilteredSkills(filtered);
  };

  const handleSkillSelect = (skill: string) => {
    if (skillSet.length < 10 && !skillSet.includes(skill)) {
      setSkillSet?.([...skillSet, skill]);
      setSearchTerm('');
      setFilteredSkills([]); // Clear filtered list after selection
    }
  };

  const handleSkillRemove = (skill: string) => {
    setSkillSet?.(skillSet.filter((s) => s !== skill));
  };

  // Filter out any empty or invalid skills
  const validSkills = skillSet.filter((skill) => skill.trim() !== '');

  return (
    <div className="settings_content">
      <div className="settings_main">
        <div className="settings_page_header">Your Skills</div>
        <div className="settings_page_subHeader">
          Highlight your technical and soft skills.
        </div>
        <div className="profile_form_item">
          <label htmlFor="skill">Add your Skill</label>
          <div className="settings_profile_searchInput">
            <input
              type="text"
              name="skill"
              className="input"
              placeholder="Select Skill"
              value={searchTerm}
              onChange={handleSearchChange}
              disabled={userDataIsLoading || isLoading}
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
          <div className="skillheader">You can add up to 10 skills</div>
          <div className="skills_container">
            {validSkills.map((skill) => (
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
        </div>
        <div className="settings_edit_btn_container">
          <div
            className="settings_edit_btn"
            style={{
              backgroundColor: isLoading ? 'grey' : '#4274BA',
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

export default Skills;

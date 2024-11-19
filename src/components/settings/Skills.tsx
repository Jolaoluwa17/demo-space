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

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchTerm.trim() !== '' && skillSet.length < 10) {
      e.preventDefault(); // Prevent form submission or unwanted behavior
      if (!skillSet.includes(searchTerm.trim())) {
        setSkillSet?.([...skillSet, searchTerm.trim()]);
        setSearchTerm(''); // Clear the input field
      }
    }
  };

  const handleSkillRemove = (skill: string) => {
    setSkillSet?.(skillSet.filter((s) => s !== skill));
  };

  const handleAddSkill = () => {
    const trimmedSkill = searchTerm.trim();
    if (
      trimmedSkill !== '' &&
      skillSet.length < 10 &&
      !skillSet.includes(trimmedSkill)
    ) {
      setSkillSet?.([...skillSet, trimmedSkill]);
      setSearchTerm(''); // Clear the input field
    }
  };

  // Filter out any empty or invalid skills
  const validSkills = skillSet.filter(
    (skill) =>
      skill !== 'null' &&
      skill !== undefined &&
      typeof skill === 'string' &&
      skill.trim() !== ''
  );

  return (
    <div className="settings_content">
      <div className="settings_main">
        <div className="settings_page_header">Your Skills</div>
        <div className="settings_page_subHeader">
          Highlight your technical and soft skills.
        </div>
        <div className="profile_form_item">
          <label htmlFor="fullName">Add your Skill</label>
          <div className="settings_profile_searchInput">
            <input
              type="text"
              name="skill"
              className="input"
              placeholder="Select Skill"
              value={searchTerm}
              onChange={handleSearchChange}
              onKeyDown={handleKeyDown}
              disabled={userDataIsLoading || isLoading}
            />
            <div
              style={{ color: '#4274ba', fontWeight: '600', cursor: 'pointer' }}
              onClick={handleAddSkill}
            >
              Add
            </div>
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

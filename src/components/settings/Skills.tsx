import { useState } from 'react';
import SearchIcon from '../../icons/SearchIcon';
import './pages.css';
import CancelIcon from '../../icons/CancelIcon';

const Skills = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([
    'JavaScript',
    'HTML',
  ]);

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
  };

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
            />
            <SearchIcon />
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
        </div>
        <div className="settings_edit_btn_container">
          <div className="settings_edit_btn">SAVE INFORMATION</div>
        </div>
      </div>
    </div>
  );
};

export default Skills;

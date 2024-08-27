import { useState } from 'react';
import SearchIcon from '../../icons/SearchIcon';
import './pages.css';
import CancelIcon from '../../icons/CancelIcon';

const allSkills = [
  'JavaScript',
  'CSS',
  'HTML',
  'React',
  'Node.js',
  'TypeScript',
  'Python',
  'Java',
  'C++',
  'SQL',
];

const Skills = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([
    'JavaScript',
    'HTML',
  ]);
  const [filteredSkills, setFilteredSkills] = useState<string[]>([]);

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value) {
      // Filter skills based on the search term
      const filtered = allSkills.filter((skill) =>
        skill.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredSkills(filtered);
    } else {
      setFilteredSkills([]);
    }
  };

  // Add a skill to the selected skills list
  const handleSkillClick = (skill: string) => {
    if (!selectedSkills.includes(skill) && selectedSkills.length < 10) {
      setSelectedSkills([...selectedSkills, skill]);
    }
    setSearchTerm('');
    setFilteredSkills([]);
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
            />
            <SearchIcon />
          </div>
          {filteredSkills.length > 0 && (
            <div className="settings_profile_skills_dropdown">
              {filteredSkills.map((skill) => (
                <div
                  key={skill}
                  className="skills_dropdown_item"
                  onClick={() => handleSkillClick(skill)}
                >
                  {skill}
                </div>
              ))}
            </div>
          )}
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
          <div className="settings_edit_btn">Edit</div>
        </div>
      </div>
    </div>
  );
};

export default Skills;

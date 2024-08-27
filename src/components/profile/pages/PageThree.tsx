import { useState, useEffect } from 'react';
import CancelIcon from '../../../icons/CancelIcon';
import SearchIcon from '../../../icons/SearchIcon';
import './pages.css';

interface Props {
  setCurrentPage: (page: number) => void;
}

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

const PageThree: React.FC<Props> = ({ setCurrentPage }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredSkills, setFilteredSkills] = useState<string[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);

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

  // Check if the Next button should be disabled
  useEffect(() => {
    setIsButtonDisabled(selectedSkills.length === 0);
  }, [selectedSkills]);

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
          />
          <SearchIcon />
        </div>
        {filteredSkills.length > 0 && (
          <div className="skills_dropdown">
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
        onClick={() => setCurrentPage(4)}
        disabled={isButtonDisabled}
      >
        Next
      </button>
    </div>
  );
};

export default PageThree;

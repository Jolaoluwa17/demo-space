import { useState } from 'react';

import './pages.css';
import CancelIcon from '@/icons/CancelIcon';
import { PulseLoader } from 'react-spinners';

interface Props {
  skillSet?: string[];
  setSkillSet?: React.Dispatch<React.SetStateAction<string[]>>;
  userDataIsLoading?: boolean;
  isLoading?: boolean;
  handleUpdateProfile?: () => Promise<void>;
  userDataError?: boolean;
}

const Skills: React.FC<Props> = ({
  skillSet = [],
  setSkillSet,
  userDataIsLoading,
  isLoading,
  handleUpdateProfile,
  userDataError,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredSkills, setFilteredSkills] = useState<string[]>([]);

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

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Filter skills as the user types (case insensitive matching)
    const filtered = skillsList.filter(
      (skill) =>
        skill.toLowerCase().includes(value.toLowerCase()) &&
        !skillSet.includes(skill) &&
        value.trim() !== ''
    );
    setFilteredSkills(filtered);
  };

  const handleSkillSelect = (skill: string) => {
    if (skillSet.length < 10 && !skillSet.includes(skill)) {
      setSkillSet?.([...skillSet, skill]);
      setSearchTerm('');
      setFilteredSkills([]);
    }
  };

  const handleSkillRemove = (skill: string) => {
    setSkillSet?.(skillSet.filter((s) => s !== skill));
  };

  // Filter out any empty, null, or invalid skills
  const validSkills = skillSet.filter((skill) => skill && skill.trim() !== '');

  const [edit, setEdit] = useState(false);

  return (
    <div className="settings_content">
      <div className="settings_main">
        <div className="settings_page_header">Your Skills</div>
        <div className="settings_page_subHeader">
          Highlight your technical and soft skills.
        </div>
        <div className="profile_form_item">
          {edit && <label htmlFor="skill">Add your Skill</label>}
          {edit && (
            <div className="settings_profile_searchInput">
              <input
                type="text"
                name="skill"
                className="input"
                placeholder="Search Skill"
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
          )}

          {edit && (
            <div className="skillheader">You can add up to 10 skills</div>
          )}
          {userDataIsLoading ? (
            <div
              className="profile_input_item_none"
              style={{ marginTop: '-10px' }}
            >
              <PulseLoader size={8} color="#007bff" />
            </div>
          ) : userDataError || validSkills.length < 1 ? (
            <div
              className="profile_input_item_none"
              style={{ marginTop: '-20px' }}
            >
              No Data
            </div>
          ) : (
            <div
              className="skills_container"
              style={{ marginTop: edit ? '' : '-10px' }}
            >
              {validSkills.map((skill) => (
                <div className="skill" key={skill}>
                  <div>{skill}</div>
                  {edit && (
                    <div
                      style={{ cursor: 'pointer', marginLeft: '12.5px' }}
                      onClick={() => handleSkillRemove(skill)}
                    >
                      <CancelIcon />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="settings_edit_btn_container">
          <div
            className="settings_edit_btn"
            style={{
              backgroundColor:
                isLoading || userDataIsLoading || userDataError
                  ? 'grey'
                  : edit
                    ? 'red'
                    : '#007BFF',
              cursor:
                isLoading || userDataIsLoading || userDataError
                  ? 'not-allowed'
                  : 'pointer',
            }}
            onClick={() => {
              if (!isLoading && !userDataIsLoading && !userDataError) {
                setEdit(!edit);
              }
            }}
          >
            {isLoading ? (
              <div className="spinner"></div>
            ) : edit ? (
              'CANCEL'
            ) : (
              'EDIT INFORMATION'
            )}
          </div>
          {edit && (
            <div
              className="settings_edit_btn"
              style={{
                backgroundColor: isLoading ? 'grey' : '#007BFF',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                pointerEvents: isLoading ? 'none' : 'auto',
              }}
              onClick={() => {
                if (!isLoading && handleUpdateProfile) {
                  // Check if handleUpdateProfile is defined
                  handleUpdateProfile();
                  setEdit(false); // Set edit to false after clicking
                }
              }}
            >
              {isLoading ? <div className="spinner"></div> : 'SAVE INFORMATION'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Skills;

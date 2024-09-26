import { useState } from 'react';
import SearchInput from '../../components/searchinput/SearchInput';
import SkillProgramCard from '../../components/skillscard/SkillProgramCard';
import SkillGapProgramData from '../../utils/SkillGapProgramData';
import './skillGap.css';
import { useNavigate } from 'react-router-dom';

const SkillGap = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Function to filter the data based on the search term
  const filteredSkillGapData = SkillGapProgramData.filter((card) =>
    card.language.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const navigate = useNavigate();

  return (
    <div className="skill_gap_root">
      <SearchInput handleSearch={(term: string) => setSearchTerm(term)} />
      <div
        className="skill_gap_container"
        onClick={() => navigate('/dashboard/skill-gap/details')}
      >
        {filteredSkillGapData.map((card, index) => (
          <SkillProgramCard
            key={index}
            imgSrc={card.imgSrc}
            language={card.language}
            description={card.description}
          />
        ))}
      </div>
    </div>
  );
};

export default SkillGap;

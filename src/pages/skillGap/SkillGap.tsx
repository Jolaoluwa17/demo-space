import SearchInput from '../../components/searchinput/SearchInput';
import SkillProgramCard from '../../components/skillscard/SkillProgramCard';
import SkillGapProgramData from '../../utils/SkillGapProgramData';
import './skillGap.css';

const SkillGap = () => {
  return (
    <div className="skill_gap_root">
      <SearchInput />
      <div className="skill_gap_container">
        {SkillGapProgramData.map((card, index) => (
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

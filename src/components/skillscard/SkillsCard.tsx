import RightArrowIcon from '../../icons/RightArrowIcon';
import './skillsCard.css';

interface Props {
  imgSrc: string;
  language: string;
  description: string;
}

const SkillsCard: React.FC<Props> = ({ imgSrc, language, description }) => {
  return (
    <div className="skills_card">
      <div className="skills_card_left_section">
        <img src={imgSrc} alt={language} />
        <div style={{ marginLeft: '8px' }}>
          <div className="skills_programming_language">{language}</div>
          <div className="skills_card_text">{description}</div>
        </div>
      </div>
      <div className="skills_card_right_section">
        <RightArrowIcon />
      </div>
    </div>
  );
};

export default SkillsCard;

import RightArrowIcon from '../../icons/RightArrowIcon';
import './skillsCard.css';

interface Props {
  imgSrc?: string;
  language: string;
  description?: string;
  onClick?: () => void;
}

const SkillsCard: React.FC<Props> = ({ language, onClick, description }) => {
  return (
    <div className="skills_card" onClick={onClick}>
      <div className="skills_card_left_section">
        <div className="skills_items_img">
          <img
            src={'/images/evaluationCode.jpg'}
            alt={language}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
        <div style={{ marginLeft: '10px' }}>
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

import RightArrowIcon from '../../icons/RightArrowIcon';
import './skillsCard.css';

interface Props {
  imgSrc?: string;
  language: string;
  description?: string;
  onClick?: () => void;
}

const SkillsCard: React.FC<Props> = ({ language, onClick, description }) => {
  const getRandomColor = () => {
    const letters = '89ABC'; // Adjusted for slightly darker colors
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * letters.length)];
    }
    return color;
  };

  const randomColor = getRandomColor();

  return (
    <div className="skills_card_component" onClick={onClick}>
      <div className="skills_card_component_left_section">
        <div
          className="skills_img_wrapper"
          style={{ backgroundColor: randomColor }}
        ></div>
        <div style={{ paddingLeft: '10px' }}>
          <div className="skills_component_programming_language">
            {language}
          </div>
          <div className="skills_component_card_text">{description}</div>
        </div>
      </div>
      <div className="skills_card_component_right_section">
        <RightArrowIcon />
      </div>
    </div>
  );
};

export default SkillsCard;

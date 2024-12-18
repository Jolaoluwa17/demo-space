import './skillsCard.css';
import RightArrowIcon from '@/icons/RightArrowIcon';

interface Props {
  imgSrc?: string;
  language: string;
  description?: string;
  category?: string;
  onClick?: () => void;
}

const SkillsCard: React.FC<Props> = ({
  language,
  onClick,
  description,
  category,
}) => {
  const getRandomColor = () => {
    const letters = '89ABC'; // Adjusted for slightly darker colors
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * letters.length)];
    }
    return color;
  };

  const randomColor = getRandomColor();

  const getLanguageImage = () => {
    const lowerCaseLanguage = (category || '').toLowerCase();

    if (lowerCaseLanguage.includes('frontend')) {
      return '/images/laptop.svg';
    }
    if (lowerCaseLanguage.includes('backend')) {
      return '/images/Database1.svg';
    }
    if (lowerCaseLanguage.includes('devops')) {
      return '/images/Database2.svg';
    }
    if (lowerCaseLanguage.includes('cyber')) {
      return '/images/Database2.svg';
    }
    if (lowerCaseLanguage.includes('ai')) {
      return '/images/AIand.svg';
    }
    if (lowerCaseLanguage.includes('cloud')) {
      return '/images/cloud.svg';
    }
    if (lowerCaseLanguage.includes('data')) {
      return '/images/chart.svg';
    }
    if (lowerCaseLanguage.includes('ui')) {
      return '/images/UI.svg';
    }
    return '/images/laptop.svg';
  };

  return (
    <div className="skills_card_component" onClick={onClick}>
      <div className="skills_card_component_left_section">
        <div
          className="skills_img_wrapper"
          style={{ backgroundColor: randomColor }}
        >
          <img src={getLanguageImage()} alt={`${language} icon`} />
        </div>
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

import './skillsCard.css';
import RightArrowIcon from '@/icons/RightArrowIcon';

interface Props {
  imgSrc?: string;
  language: string;
  description?: string;
  category?: string;
  onClick?: () => void;
  disabled?: boolean;
}

const SkillsCard: React.FC<Props> = ({
  language,
  onClick,
  description,
  category,
  disabled = false,
}) => {
  const getLanguageImageAndColor = () => {
    const lowerCaseLanguage = (category || '').toLowerCase();

    if (lowerCaseLanguage.includes('frontend')) {
      return { image: '/images/laptop.svg', color: '#B9C5FB' };
    }
    if (lowerCaseLanguage.includes('backend')) {
      return { image: '/images/Database1.svg', color: '#C9E6FF' };
    }
    if (lowerCaseLanguage.includes('devops')) {
      return { image: '/images/Database2.svg', color: '#FBC02D' };
    }
    if (lowerCaseLanguage.includes('cyber')) {
      return { image: '/images/Database2.svg', color: '#FBC02D' };
    }
    if (lowerCaseLanguage.includes('ai')) {
      return { image: '/images/AIand.svg', color: '#FFEEC2' };
    }
    if (lowerCaseLanguage.includes('cloud')) {
      return { image: '/images/cloud.svg', color: '#BFE5FF' };
    }
    if (lowerCaseLanguage.includes('data')) {
      return { image: '/images/chart.svg', color: '#FFD4E1' };
    }
    if (lowerCaseLanguage.includes('ui')) {
      return { image: '/images/UI.svg', color: '#FFE0B8' };
    }
    return { image: '/images/laptop.svg', color: '#B9C5FB' };
  };

  const { image, color } = getLanguageImageAndColor();

  return (
    <div
      className="skills_card_component"
      onClick={!disabled ? onClick : undefined}
    >
      <div className="skills_card_component_left_section">
        <div className="skills_img_wrapper" style={{ backgroundColor: color }}>
          <img src={image} alt={`${language} icon`} />
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

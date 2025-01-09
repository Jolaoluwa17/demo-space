import './skillsCard.css';
import RightArrowIcon from '@/icons/RightArrowIcon';

interface Props {
  language: string;
  description: string;
  onClick?: () => void;
}

const SkillProgramCard: React.FC<Props> = ({
  language,
  description,
  onClick,
}) => {
  const extractDescription = (htmlString: string) => {
    const descriptionMatch = htmlString.match(
      /<strong>Description:<\/strong>(.*?)<br>/
    );
    return descriptionMatch ? descriptionMatch[1].trim() : '';
  };

  const getLanguageImageAndColor = () => {
    const lowerCaseLanguage = (language || '').toLowerCase();

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
    <div className="skills_card_component" onClick={onClick}>
      <div className="skills_card_component_left_section">
        <div className="skills_img_wrapper" style={{ backgroundColor: color }}>
          <img src={image} alt={language} className="skills_img" />
        </div>
        <div style={{ marginLeft: '8px' }}>
          <div className="skills_component_programming_language">
            {language}
          </div>
          <div
            className="skills_component_card_text"
            dangerouslySetInnerHTML={{
              __html: extractDescription(description),
            }}
          />
        </div>
      </div>
      <div className="skills_card_component_right_section">
        <RightArrowIcon />
      </div>
    </div>
  );
};

export default SkillProgramCard;

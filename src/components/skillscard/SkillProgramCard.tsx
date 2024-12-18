import './skillsCard.css';
import RightArrowIcon from '@/icons/RightArrowIcon';

interface Props {
  language: string;
  description: string;
  onClick?: () => void;
}

const getRandomColor = () => {
  const letters = '89ABC'; // Adjusted for slightly darker colors
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * letters.length)];
  }
  return color;
};

const SkillProgramCard: React.FC<Props> = ({
  language,
  description,
  onClick,
}) => {
  const randomColor = getRandomColor();

  const extractDescription = (htmlString: string) => {
    const descriptionMatch = htmlString.match(
      /<strong>Description:<\/strong>(.*?)<br>/
    );
    return descriptionMatch ? descriptionMatch[1].trim() : '';
  };

  const getLanguageImage = () => {
    const lowerCaseLanguage = language.toLowerCase();

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
          <img src={getLanguageImage()} alt={language} className="skills_img" />
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

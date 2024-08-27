import React from 'react';
import RightArrowIcon from '../../icons/RightArrowIcon';
import './skillsCard.css';

interface Props {
  imgSrc: string;
  language: string;
  description: string;
}

const getRandomColor = () => {
  const letters = 'BCDEF'; // Higher values for light colors
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * letters.length)];
  }
  return color;
};

const SkillProgramCard: React.FC<Props> = ({
  imgSrc,
  language,
  description,
}) => {
  const randomColor = getRandomColor();

  return (
    <div className="skills_card">
      <div className="skills_card_left_section">
        <div
          className="skills_img_wrapper"
          style={{ backgroundColor: randomColor }}
        >
          <img src={imgSrc} alt={language} />
        </div>
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

export default SkillProgramCard;

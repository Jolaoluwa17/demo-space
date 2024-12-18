import React from 'react';

import './questionTypeCard.css';
import RightArrowIcon from '@/icons/RightArrowIcon';

interface QuestionTypeCardProps {
  title: string;
  description: string;
}

const QuestionTypeCard: React.FC<QuestionTypeCardProps> = ({
  title,
  description,
}) => {
  return (
    <div className="question_type_card">
      <div className="question_type_left_section">
        <div className="question_left_bar"></div>
        <div style={{ marginLeft: '16px' }}>
          <div style={{ fontSize: '16px', fontWeight: '600' }}>{title}</div>
          <div style={{ color: '#B0B0B0', fontSize: '14px' }}>
            {description}
          </div>
        </div>
      </div>
      <div className="question_type_right_section">
        <RightArrowIcon />
      </div>
    </div>
  );
};

export default QuestionTypeCard;

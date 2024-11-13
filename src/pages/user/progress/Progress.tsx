import SkillsEvaluationData from '@/utils/SkillsEvaluationData';
import './progress.css';

import { useNavigate } from 'react-router-dom';
import SkillsCard from '@/components/skillscard/SkillsCard';

const Progress = () => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate('/dashboard/progress/history');
  };

  return (
    <div className="progress_root">
      <div className="progress_header">Progress</div>
      <div className="progress_skills_container" onClick={handleCardClick}>
        {SkillsEvaluationData.map((card, index) => (
          <SkillsCard
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

export default Progress;

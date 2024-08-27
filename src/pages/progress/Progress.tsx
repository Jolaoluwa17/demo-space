import './progress.css';
import SkillsCard from '../../components/skillscard/SkillsCard';
import SkillsEvaluationData from '../../utils/SkillsEvaluationData';
import { useNavigate } from 'react-router-dom';

const Progress = () => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate('/progress/sub-test');
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

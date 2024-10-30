import './overview.css';
import SkillsEvaluationData from '../../utils/SkillsEvaluationData';
import SkillsCard from '../../components/skillscard/SkillsCard';
import SkillProgramCard from '../../components/skillscard/SkillProgramCard';
import SkillGapProgramData from '../../utils/SkillGapProgramData';
import { useNavigate } from 'react-router-dom';
import { useGetUserQuery } from '../../services/user/userSlice';

interface UserType {
  id: string;
  name: string;
}

const Overview = () => {
  const navigate = useNavigate();
  const userid = sessionStorage.getItem('id');

  const { data, error, isLoading } = useGetUserQuery(userid ? userid : '') as {
    data: UserType | undefined;
    error: any;
    isLoading: boolean;
  };


  return (
    <div className="overview_root">
      <div className="overview_header">
        <div className="overview_title">
          Welcome,{' '}
          <span style={{ fontWeight: '600' }}>{data?.name || 'John Doe'}</span>
        </div>
        <div className="overview_subTitle">
          Ready to continue your learning journey?
        </div>
      </div>

      <div className="overview_section">
        <div className="overview_section_title">
          <div>Start Your Skill Evaluation</div>
          <div
            style={{ color: '#4274BA', cursor: 'pointer' }}
            onClick={() => navigate('/dashboard/evaluation')}
          >
            See More
          </div>
        </div>
        <div className="overview_section_subTitle">
          Assess your abilities and identify areas for growth.
        </div>
        <div className="overview_section_card_container">
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

      <div className="overview_section">
        <div className="overview_section_title">
          <div>Start a Skill Gap Program</div>
          <div
            style={{ color: '#4274BA', cursor: 'pointer' }}
            onClick={() => navigate('/dashboard/skill-gap')}
          >
            See More
          </div>
        </div>
        <div className="overview_section_subTitle">
          Enhance your skills with our comprehensive programs.
        </div>
        <div className="overview_section_card_container">
          {SkillGapProgramData.map((card, index) => (
            <SkillProgramCard
              key={index}
              imgSrc={card.imgSrc}
              language={card.language}
              description={card.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Overview;

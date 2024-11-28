import { useGetUserQuery } from '@/services/features/user/userSlice';
import './overview.css';

import { useNavigate } from 'react-router-dom';
import SkillsCard from '@/components/skillscard/SkillsCard';
import SkillGapProgramData from '@/utils/SkillGapProgramData';
import SkillProgramCard from '@/components/skillscard/SkillProgramCard';
import { useGetAllAssessmentsQuery } from '@/services/features/quiz/quizSlice';
import descriptionGeneric from '@/utils/descriptionGeneric';

interface UserType {
  response: {
    fullName: string;
    email: string;
  };
}

const Overview = () => {
  const navigate = useNavigate();
  const userid = sessionStorage.getItem('id');

  const { data, isLoading } = useGetUserQuery(userid ? userid : '') as {
    data: UserType | undefined;
    isLoading: boolean;
  };

  const { data: assessmentData, isLoading: assessmentLoading } =
    useGetAllAssessmentsQuery({});

  const handleCardClick = (id: string) => {
    navigate(`/dashboard/evaluation/instructions?id=${id}`);
  };

  const getRandomDescription = () => {
    const randomIndex = Math.floor(Math.random() * descriptionGeneric.length);
    return descriptionGeneric[randomIndex].description;
  };

  return (
    <div className="overview_root">
      {isLoading ? (
        <div className="skeleton_loader_overview_header"></div>
      ) : (
        <div className="overview_header">
          <div className="overview_title">
            Welcome,{' '}
            {data && (
              <span style={{ fontWeight: '600' }}>
                {data?.response?.fullName}
              </span>
            )}
          </div>
          <div className="overview_subTitle">
            Ready to continue your learning journey?
          </div>
        </div>
      )}

      <div className="overview_section">
        <div className="overview_section_title">
          <div>Start Your Skill Evaluation</div>
          <div
            style={
              assessmentLoading
                ? { color: 'grey', cursor: 'not-allowed' }
                : { color: '#4274BA', cursor: 'pointer' }
            }
            onClick={
              assessmentLoading
                ? () => undefined
                : () => navigate('/dashboard/evaluation')
            }
          >
            See More
          </div>
        </div>
        <div className="overview_section_subTitle">
          Assess your abilities and identify areas for growth.
        </div>
        {assessmentLoading ? (
          <div className="overview_section_card_container">
            <div className="skeleton_loader_overview_section_card"></div>
            <div className="skeleton_loader_overview_section_card"></div>
            <div className="skeleton_loader_overview_section_card"></div>
            <div className="skeleton_loader_overview_section_card"></div>
          </div>
        ) : (
          <div className="overview_section_card_container">
            {assessmentData?.response.map(
              (card: { _id: string; course: string }, index: number) => (
                <SkillsCard
                  key={index}
                  language={card.course}
                  description={getRandomDescription()}
                  onClick={() => handleCardClick(card._id)}
                />
              )
            )}
          </div>
        )}
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

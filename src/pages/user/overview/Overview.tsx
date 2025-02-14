import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useGetUserQuery } from '@/services/features/user/userSlice';

import './overview.css';
import SkillsCard from '@/components/skillscard/SkillsCard';
import SkillProgramCard from '@/components/skillscard/SkillProgramCard';
import { useGetAllProgramsQuery } from '@/services/features/skillGap/skillGapSlice';
import { useGetAllAssessmentsQuery } from '@/services/features/quiz/quizSlice';
import descriptionGeneric from '@/utils/descriptionGeneric';

interface UserType {
  response: {
    firstName: string;
    lastName: string;
    email: string;
  };
}

interface Props {
  darkmode: boolean;
}

const Overview: React.FC<Props> = ({ darkmode }) => {
  const navigate = useNavigate();
  const userid = sessionStorage.getItem('id');

  const { data, isLoading, isError } = useGetUserQuery(
    userid ? userid : ''
  ) as {
    data: UserType | undefined;
    isLoading: boolean;
    isError: boolean;
  };

  const {
    data: assessmentData,
    isLoading: assessmentLoading,
    refetch: refetchAssessment,
    isError: assessmentError,
  } = useGetAllAssessmentsQuery({});
  const {
    data: programsData,
    isLoading: programsDataLoading,
    refetch: refecthProgramsData,
    isError: programDataError,
  } = useGetAllProgramsQuery({});

  const handleCardClick = (id: string, course: string, description: string) => {
    navigate(`/dashboard/evaluation/instructions?id=${id}`, {
      state: { course, description },
    });
  };

  const handleSkillClick = (id: string) => {
    navigate(`/dashboard/skill-gap/details?id=${id}`);
  };

  const getRandomDescription = () => {
    const randomIndex = Math.floor(Math.random() * descriptionGeneric.length);
    return descriptionGeneric[randomIndex].description;
  };

  const location = useLocation();

  // refetch data everytime the screen is rendered
  useEffect(() => {
    refecthProgramsData();
    refetchAssessment();
  }, [location.key, refecthProgramsData, refetchAssessment]);

  return (
    <div className={`overview_root ${darkmode ? 'overview_darkmode' : ''}`}>
      {isLoading || isError ? (
        <div className="skeleton_loader_overview_header"></div>
      ) : (
        <div className="overview_header">
          <div className="overview_title">
            Welcome,{' '}
            {data && (
              <span style={{ fontWeight: '600' }}>
                {data?.response?.firstName} {data?.response?.lastName}
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
                : { color: '#007BFF', cursor: 'pointer' }
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
        {assessmentLoading || assessmentError ? (
          <div className="overview_section_card_container">
            <div className="skeleton_loader_overview_section_card"></div>
            <div className="skeleton_loader_overview_section_card"></div>
            <div className="skeleton_loader_overview_section_card"></div>
            <div className="skeleton_loader_overview_section_card"></div>
          </div>
        ) : (
          <div className="overview_section_card_container">
            {assessmentData?.response.map(
              (
                card: { _id: string; course: string; category: string },
                index: number
              ) => {
                const description = getRandomDescription();
                return (
                  <SkillsCard
                    key={index}
                    language={card.course}
                    description={description}
                    category={card.category}
                    onClick={() =>
                      handleCardClick(card._id, card.course, description)
                    }
                    darkmode={darkmode}
                  />
                );
              }
            )}
          </div>
        )}
      </div>

      <div className="overview_section">
        <div className="overview_section_title">
          <div>Start a Skill Gap Program</div>
          <div
            style={{ color: '#007BFF', cursor: 'pointer' }}
            onClick={() => navigate('/dashboard/skill-gap')}
          >
            See More
          </div>
        </div>
        <div className="overview_section_subTitle">
          Enhance your skills with our comprehensive programs.
        </div>
        {programsDataLoading || programDataError ? (
          <div className="overview_section_card_container">
            <div className="skeleton_loader_overview_section_card"></div>
            <div className="skeleton_loader_overview_section_card"></div>
            <div className="skeleton_loader_overview_section_card"></div>
            <div className="skeleton_loader_overview_section_card"></div>
          </div>
        ) : (
          <div className="overview_section_card_container">
            {programsData?.response.map(
              (
                card: {
                  _id: string;
                  title: string;
                  discreption: string;
                },
                index: number
              ) => (
                <SkillProgramCard
                  key={index}
                  language={card.title}
                  description={card.discreption}
                  onClick={() => handleSkillClick(card._id)}
                  darkmode={darkmode}
                />
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Overview;

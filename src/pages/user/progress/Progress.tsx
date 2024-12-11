import './progress.css';

import { useNavigate } from 'react-router-dom';
import SkillsCard from '@/components/skillscard/SkillsCard';
import { useGetAllResultsQuery } from '@/services/features/result/resultSlice';
import descriptionGeneric from '@/utils/descriptionGeneric';
import { FadeLoader } from 'react-spinners';

const Progress = () => {
  const navigate = useNavigate();
  const userId = sessionStorage.getItem('id');

  const handleCardClick = (id: string, course: string, description: string) => {
    navigate(`/dashboard/progress/history?id=${id}`, {
      state: { course, description },
    });
  };

  const { data: resultsData, isLoading: resultDataLoading } =
    useGetAllResultsQuery({});

  const getRandomDescription = () => {
    const randomIndex = Math.floor(Math.random() * descriptionGeneric.length);
    return descriptionGeneric[randomIndex].description;
  };

  const filteredResults =
    resultsData?.response.filter(
      (item: { userId: { _id: string } }) =>
        item.userId && item.userId._id === userId
    ) || [];

  return (
    <div className="progress_root">
      <div className="progress_header">Progress</div>
      <div className="progress_skills_container">
        {resultDataLoading ? (
          <div className="loading_container">
            <FadeLoader color="#007BFF" />
          </div>
        ) : resultsData?.response.length === 0 ? (
          <div className="nodata_container">
            <img
              src="/images/NoData.jpg"
              alt=""
              style={{ width: '250px', height: '250px' }}
            />
            <div style={{ fontWeight: '600' }}>
              Oops, No Quiz Completed Yet 😭
            </div>
          </div>
        ) : (
          filteredResults.map(
            (
              card: {
                quizId: { _id: string; course: string; category: string };
              },
              index: number
            ) => {
              const description = getRandomDescription();
              return (
                <SkillsCard
                  key={index}
                  language={card.quizId.course}
                  description={description}
                  category={card.quizId.category}
                  onClick={() =>
                    handleCardClick(
                      card.quizId._id,
                      card.quizId.course,
                      description
                    )
                  }
                />
              );
            }
          )
        )}
      </div>
    </div>
  );
};

export default Progress;

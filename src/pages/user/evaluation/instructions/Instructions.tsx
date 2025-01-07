import { useEffect } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { FadeLoader } from 'react-spinners';
import { IoInformationCircleSharp } from 'react-icons/io5';
import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
} from 'date-fns';

import './instruction.css';
import PageHeader from '@/components/pageHeader/PageHeader';
import { useGetAllResultsQuery } from '@/services/features/result/resultSlice';

interface Result {
  userId: {
    _id: string;
  };
  quizId: {
    _id: string;
  };
}

const Instructions = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
  const userid = sessionStorage.getItem('id');
  const location = useLocation();
  const { course, description } = location.state || {};

  const handleClick = () => {
    navigate(`/dashboard/evaluation/multiple-choice?id=${id}`);
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  const instructions = [
    'Read each question carefully before answering.',
    'Ensure you understand the requirements for each task.',
    'Manage your time effectively during the evaluation.',
    'If you encounter any issues, contact the support team immediately.',
    'Review your answers before submitting.',
    'Ensure your internet connection is stable. If it goes offline, you will be stuck on the current question, and the timer will continue counting down.',
    'A notification will pop up if your internet connection is lost or restored.',
  ];

  const {
    data: resultsData,
    refetch: refetchResults,
    isLoading,
  } = useGetAllResultsQuery({});

  useEffect(() => {
    refetchResults();
  }, [refetchResults]);

  // Filter results based on the userId
  const filteredResults =
    resultsData?.response.filter(
      (result: Result) =>
        result.userId?._id === userid && result.quizId?._id === id
    ) || [];

  const calculateTimeLeft = () => {
    const resultDate = filteredResults[0]?.createdAt;
    if (!resultDate) return null;

    const targetDate = new Date(resultDate);
    targetDate.setDate(targetDate.getDate() + 30); // Add 30 days

    const now = new Date();
    if (targetDate <= now) return null; // Timer expired

    const days = differenceInDays(targetDate, now);
    const hours = differenceInHours(targetDate, now) % 24;
    const minutes = differenceInMinutes(targetDate, now) % 60;

    return { days, hours, minutes };
  };

  const timeLeft = calculateTimeLeft();

  return (
    <div className="instructions_root">
      <PageHeader handleBackClick={handleBackClick} pageTitle="Instructions" />
      {isLoading ? (
        <div className="loading_container">
          <FadeLoader color="#007BFF" />
        </div>
      ) : (
        <div>
          <div className="instructions_content">
            <div className="instructions_title">{course}</div>
            {filteredResults.length > 0 && (
              <div
                className="taken_assessment_indicator"
                style={{
                  marginTop: '10px',
                  marginBottom: '10px',
                }}
              >
                <IoInformationCircleSharp
                  size={20}
                  style={{
                    paddingRight: '5px',
                    color:
                      Number(filteredResults[0]?.score) < 69
                        ? 'red'
                        : '#28a745',
                  }}
                />
                {filteredResults[0]?.score > 69 ? (
                  <span style={{ color: '#28a745' }}>Assessment taken</span>
                ) : (
                  timeLeft && (
                    <span style={{ fontWeight: '600' }}>
                      You can take the quiz again in{' '}
                      {`${timeLeft.days}d ${timeLeft.hours}h ${timeLeft.minutes}m`}
                    </span>
                  )
                )}
              </div>
            )}

            <div className="instructions_subTitle">{description}</div>
            {instructions.map((instruction, index) => (
              <div key={index} className="instructions_text_container">
                <p style={{ marginRight: '5px' }}>{index + 1}.</p>
                <p className="instructions_text">{instruction}</p>
              </div>
            ))}
          </div>
          <div className="start_evaluation_btn_container">
            <div
              className="start_evaluation_btn"
              style={{
                backgroundColor:
                  filteredResults.length < 1 ||
                  !timeLeft ||
                  filteredResults[0]?.score > 69
                    ? ''
                    : 'grey',
                cursor:
                  filteredResults.length < 1 ||
                  !timeLeft ||
                  filteredResults[0]?.score > 69
                    ? 'pointer'
                    : 'not-allowed',
                color: 'white',
              }}
              onClick={
                filteredResults.length > 0 &&
                timeLeft &&
                filteredResults[0]?.score < 70
                  ? undefined
                  : handleClick
              }
            >
              Start Evaluation
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Instructions;

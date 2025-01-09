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
import { useTotalAttemptsQuery } from '@/services/features/quiz/quizSlice';

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

  const quizAttempt = [
    'Every participant has a maximum of 3 attempts to complete the quiz.',
    'If the Start Evaluation button is clicked and you leave the website before submitting, one of your attempts will be used, and your score for that quiz will be recorded as 0.',
  ];

  const {
    data: resultsData,
    refetch: refetchResults,
    isLoading,
  } = useGetAllResultsQuery({});

  const { data: totalAttemptData, isLoading: totalAttemptsLoading } =
    useTotalAttemptsQuery({ userId: userid, quizId: id });

  useEffect(() => {
    refetchResults();
  }, [refetchResults]);

  useEffect(() => {
    const countDownTimer = sessionStorage.getItem('countdownTime');
    const answers = sessionStorage.getItem('answers');

    if (countDownTimer || answers) {
      sessionStorage.removeItem('countdownTime');
      sessionStorage.removeItem('answers');
    }
  }, []);

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
    targetDate.setMonth(targetDate.getMonth() + 3); // Add 3 months

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
      {isLoading || totalAttemptsLoading ? (
        <div className="loading_container">
          <FadeLoader color="#007BFF" />
        </div>
      ) : (
        <div>
          <div className="instructions_content">
            <div className="instruction_title_container">
              <div className="instructions_title">{course}</div>
              <div className="no_of_attempts_left">
                No. of attempts left:{' '}
                <span style={{ fontWeight: '600' }}>
                  {!totalAttemptData
                    ? '0'
                    : 3 - totalAttemptData.response.noOfRetake}
                </span>
              </div>
            </div>
            {totalAttemptData.response.noOfRetake === 3 && (
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
                      Number(3 - totalAttemptData.response.noOfRetake) < 1
                        ? 'red'
                        : '#28a745',
                  }}
                />
                {totalAttemptData.response.noOfRetake === 3 && timeLeft && (
                  <span style={{ fontWeight: '600' }}>
                    Assessment limit maxed out time left before retake{' '}
                    {`${timeLeft.days}d ${timeLeft.hours}h ${timeLeft.minutes}m`}
                  </span>
                )}
              </div>
            )}

            <div className="instructions_subTitle">{description}</div>
            <div
              style={{ fontSize: '18px', fontWeight: '600', marginTop: '30px' }}
            >
              Instructions for the Evaluation:
            </div>
            {instructions.map((instruction, index) => (
              <div key={index} className="instructions_text_container">
                <div style={{ marginRight: '5px' }}>{index + 1}.</div>
                <div className="instructions_text">{instruction}</div>
              </div>
            ))}
            <div
              style={{ fontSize: '18px', fontWeight: '600', marginTop: '30px' }}
            >
              Important: Quiz Attempt Limit
            </div>
            {quizAttempt.map((instruction, index) => (
              <div key={index} className="instructions_text_container">
                <div style={{ marginRight: '5px' }}>{index + 1}.</div>
                <div className="instructions_text">{instruction}</div>
              </div>
            ))}
          </div>
          <div className="start_evaluation_btn_container">
            <div
              className="start_evaluation_btn"
              style={{
                backgroundColor:
                  !timeLeft ||
                  Number(3 - totalAttemptData.response.noOfRetake) > 0
                    ? ''
                    : 'grey',
                cursor:
                  !timeLeft ||
                  Number(3 - totalAttemptData.response.noOfRetake) > 0
                    ? 'pointer'
                    : 'not-allowed',
                color: 'white',
              }}
              onClick={
                timeLeft && Number(3 - totalAttemptData.response.noOfRetake) < 1
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

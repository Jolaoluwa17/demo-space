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

interface Props {
  darkmode: boolean;
}

const Instructions: React.FC<Props> = ({ darkmode }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get('quizId');
  const userid = sessionStorage.getItem('id');
  const location = useLocation();
  const { course, description } = location.state || {};

  const handleClick = () => {
    navigate(`/dashboard/evaluation/multiple-choice?quizId=${id}`);
  };

  const handleBackClick = () => {
    navigate('/dashboard/evaluation');
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
    'Do not refresh your page during the quiz. If the page refreshes, one of your attempts to take the quiz will be used.',
    'If the Start Evaluation button is clicked and you leave the website before submitting, one of your attempts will be used, and your score for that quiz will be null.',
  ];

  const {
    data: totalAttemptData,
    isLoading: totalAttemptsLoading,
    refetch: refetchTotalAttempts,
    isError: totalAttemptError,
  } = useTotalAttemptsQuery({ userId: userid, quizId: id });

  const {
    data: getAllResults,
    isLoading: getAllResultsLoading,
    refetch: getAllRefetch,
  } = useGetAllResultsQuery({});

  useEffect(() => {
    refetchTotalAttempts();
    getAllRefetch();
  }, [refetchTotalAttempts, getAllRefetch, location.key]);

  useEffect(() => {
    const countDownTimer = sessionStorage.getItem('countdownTime');
    const answers = sessionStorage.getItem('answers');

    if (countDownTimer || answers) {
      sessionStorage.removeItem('countdownTime');
      sessionStorage.removeItem('answers');
    }
  }, []);

  const filteredResults = Array.isArray(getAllResults?.response)
    ? getAllResults.response.filter(
        (item: { userId?: { _id?: string }; quizId?: { _id?: string } }) =>
          item.userId?._id === userid && item.quizId?._id === id
      )
    : [];

  const hasLowScore =
    filteredResults?.length > 0
      ? filteredResults.some((item: { score: number }) => item.score > 69)
      : undefined;

  const attemptsLeft = totalAttemptData?.response?.noOfRetake
    ? 3 - totalAttemptData.response.noOfRetake
    : 0;

  const calculateTimeLeft = () => {
    // Ensure response exists and is an array
    if (attemptsLeft === 0) {
      const resultDate = totalAttemptData?.response?.lastRetrieved;

      if (!resultDate) return null; // If there is no lastRetrieved, return null

      const targetDate = new Date(resultDate);
      targetDate.setMonth(targetDate.getMonth() + 3); // Add 3 months

      const now = new Date();
      if (targetDate <= now) return null; // Timer expired

      const days = differenceInDays(targetDate, now);
      const hours = differenceInHours(targetDate, now) % 24;
      const minutes = differenceInMinutes(targetDate, now) % 60;

      return { days, hours, minutes };
    }
  };

  const timeLeft = calculateTimeLeft();

  if (totalAttemptsLoading || getAllResultsLoading) {
    return (
      <div className="instructions_root">
        <PageHeader
          handleBackClick={handleBackClick}
          pageTitle="Instructions"
          darkmode={darkmode}
        />
        <div className="loading_container">
          <FadeLoader color="#007BFF" />
        </div>
      </div>
    );
  }

  const isButtonDisabled =
    (attemptsLeft === 0 && timeLeft) ||
    filteredResults.some((item: { score: number }) => item.score > 69);

  return (
    <div
      className={`instructions_root ${darkmode && 'instructions_root_dark'}`}
    >
      <PageHeader
        handleBackClick={handleBackClick}
        pageTitle="Instructions"
        darkmode={darkmode}
      />
      <div>
        <div className="instructions_content">
          <div className="instruction_title_container">
            <div className="instructions_title">{course}</div>
            {!hasLowScore && (
              <div className="no_of_attempts_left">
                No. of attempts left:{' '}
                <span style={{ fontWeight: '600' }}>
                  {totalAttemptError ? 3 : attemptsLeft}
                </span>
              </div>
            )}
          </div>
          {hasLowScore === undefined || !hasLowScore
            ? totalAttemptData?.response?.noOfRetake === 3 && (
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
                      color: '#c1121f',
                    }}
                  />
                  {timeLeft && (
                    <span style={{ fontWeight: '600', color: '#c1121f' }}>
                      Assessment limit maxed out time left before retake{' '}
                      {`${timeLeft.days}d ${timeLeft.hours}h ${timeLeft.minutes}m`}
                    </span>
                  )}
                </div>
              )
            : totalAttemptData?.response?.noOfRetake && (
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
                      color: '#28a745',
                    }}
                  />
                  <span style={{ fontWeight: '600', color: 'green' }}>
                    Assessment Passed
                  </span>
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
              backgroundColor: isButtonDisabled ? 'grey' : '',
              cursor: isButtonDisabled ? 'not-allowed' : 'pointer',
              color: 'white',
            }}
            onClick={isButtonDisabled ? undefined : handleClick}
          >
            Start Evaluation
          </div>
        </div>
      </div>
    </div>
  );
};

export default Instructions;

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
import { useGetResultByUserIdAndQuizIdQuery } from '@/services/features/result/resultSlice';
import { useTotalAttemptsQuery } from '@/services/features/quiz/quizSlice';

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
    'Do not refresh your page during the quiz. If the page refreshes, one of your attempts to take the quiz will be used.',
  ];

  const quizAttempt = [
    'Every participant has a maximum of 3 attempts to complete the quiz.',
    'If the Start Evaluation button is clicked and you leave the website before submitting, one of your attempts will be used, and your score for that quiz will be recorded as 0.',
  ];

  const {
    data: totalAttemptData,
    isLoading: totalAttemptsLoading,
    refetch: refetchTotalAttempts,
  } = useTotalAttemptsQuery({ userId: userid, quizId: id });

  const {
    data: getResultDataByUserIdAndQuizId,
    isLoading: loadingResultDataByUserIdAndQuizId,
    refetch: refetchDataByUserIdAndQuizId,
  } = useGetResultByUserIdAndQuizIdQuery({ userId: userid, quizId: id });

  useEffect(() => {
    refetchTotalAttempts();
    refetchDataByUserIdAndQuizId();
  }, [refetchTotalAttempts, refetchDataByUserIdAndQuizId]);

  useEffect(() => {
    const countDownTimer = sessionStorage.getItem('countdownTime');
    const answers = sessionStorage.getItem('answers');

    if (countDownTimer || answers) {
      sessionStorage.removeItem('countdownTime');
      sessionStorage.removeItem('answers');
    }
  }, []);

  const hasLowScore = getResultDataByUserIdAndQuizId?.response?.some(
    (item: { score: number }) => item.score < 69
  );

  const attemptsLeft = totalAttemptData?.response?.noOfRetake
    ? 3 - totalAttemptData.response.noOfRetake
    : 0;

  const calculateTimeLeft = () => {
    // Ensure response exists and is an array
    if (attemptsLeft === 0) {
      const sortedResults = [
        ...(getResultDataByUserIdAndQuizId?.response || []),
      ].sort(
        (a: { createdAt: string }, b: { createdAt: string }) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

      // Get the last (most recent) result
      const latestResult = sortedResults?.[0];
      const resultDate = latestResult?.createdAt;

      if (!resultDate) return null;

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

  if (totalAttemptsLoading || loadingResultDataByUserIdAndQuizId) {
    return (
      <div className="instructions_root">
        <PageHeader
          handleBackClick={handleBackClick}
          pageTitle="Instructions"
        />
        <div className="loading_container">
          <FadeLoader color="#007BFF" />
        </div>
      </div>
    );
  }

  const isButtonDisabled =
    (attemptsLeft === 0 && timeLeft) || // Only check timeLeft if attempts are 0
    getResultDataByUserIdAndQuizId?.response?.some(
      (item: { score: number }) => item.score > 69
    );

  return (
    <div className="instructions_root">
      <PageHeader handleBackClick={handleBackClick} pageTitle="Instructions" />
      <div>
        <div className="instructions_content">
          <div className="instruction_title_container">
            <div className="instructions_title">{course}</div>
            {hasLowScore && (
              <div className="no_of_attempts_left">
                No. of attempts left:{' '}
                <span style={{ fontWeight: '600' }}>{attemptsLeft}</span>
              </div>
            )}
          </div>
          {hasLowScore
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
                      color: 'red',
                    }}
                  />
                  {timeLeft && (
                    <span style={{ fontWeight: '600' }}>
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
                    You passed this assessment
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

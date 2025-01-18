import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FadeLoader } from 'react-spinners';
import { BiSolidErrorAlt } from 'react-icons/bi';
import { AnimatePresence, motion } from 'framer-motion';

import './multipleChoice.css';
import {
  useGetAllAssessmentsQuery,
  useGetQuizQuestionQuery,
  useTotalAttemptsQuery,
} from '@/services/features/quiz/quizSlice';
import CheckCircleIcon from '@/icons/CheckCircleIcon';
import ArrowLeftIcon from '@/icons/ArrowLeftIcon';
import ArrowRightIcon from '@/icons/ArrowRightIcon';
import NavigationArrow from '@/icons/NavigationArrow';
import { useCreateResultMutation } from '@/services/features/result/resultSlice';
import ErrorResponse from '@/types/ErrorResponse';
import NotificationToast from '@/components/notificationToast/NotificationToast';
import { usePageLeaveWarning } from '@/components/pageLeaveWarning/usePageLeavingWarning';
import Popup from '@/modals/popup/Popup';

declare interface NetworkInformation {
  downlink: number;
  effectiveType: string;
  rtt: number;
  saveData: boolean;
  type: string;
}

interface Assessment {
  _id: string;
  duration: number;
}

interface Question {
  question: string;
  optionA: string;
  optionB: string;
  optionC: string;
  answer: string;
}

interface Props {
  examInProgress: boolean;
  setExamInProgress: (examInProgress: boolean) => void;
}

const MultipleChoice: React.FC<Props> = ({ setExamInProgress }) => {
  // disable side bar and other buttons when quiz is in progress
  useEffect(() => {
    setExamInProgress(true);

    return () => {
      setExamInProgress(false);
    };
  }, [setExamInProgress]);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
  const questionId = searchParams.get('questionId');
  const userid = sessionStorage.getItem('id');
  const [showPopup, setShowPopup] = useState(false);

  const { data: assessmentData, isLoading: assessmentLoading } =
    useGetAllAssessmentsQuery({});
  const {
    data: questionsData,
    isLoading: questionsLoading,
    isError: questionError,
  } = useGetQuizQuestionQuery({ userId: userid, quizId: id });

  const [isInitialized, setIsInitialized] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<{
    [key: number]: string | null;
  }>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<
    number | null
  >(null);
  const initialTime = 10 * 60;
  const [time, setTime] = useState<number>(initialTime);
  const [randomizedOptions, setRandomizedOptions] = useState<string[]>([]);
  const [errMsg, setErrMsg] = useState<string>('');
  const [result, { isLoading: resultLoading }] = useCreateResultMutation();

  // Internet status states
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  const [internetSpeed, setInternetSpeed] = useState<string>('');
  const [success, setIsSuccess] = useState(false);
  const [onlineStatusMessage, setOnlineStatusMessage] = useState<string>('');

  // in the case the user refreshes 3 times it navigates them back to instruction page.
  useEffect(() => {
    if (questionError) {
      navigate('/dashboard/evaluation');
    }
  }, [questionError, navigate]);

  // warning message asking the user if they want to refresh
  usePageLeaveWarning(
    true,
    'Are you sure you want to leave? Your quiz progress will be lost!'
  );

  // Initialize assessment duration
  useEffect(() => {
    if (assessmentData) {
      const selectedAssessment = assessmentData.response.find(
        (item: Assessment) => item._id === id
      );
      if (selectedAssessment) {
        // Only set the time if it's not set already (to avoid overriding sessionStorage)
        setTime((prevTime) => prevTime || selectedAssessment.duration * 60);
      }
    }
  }, [assessmentData, id]);

  const {
    data: totalAttemptData,
    isLoading: totalAttemptsLoading,
    refetch: refetchTotalAttempts,
    isError: totalAttemptsError,
  } = useTotalAttemptsQuery({ userId: userid, quizId: id });

  useEffect(() => {
    refetchTotalAttempts();
  }, [refetchTotalAttempts]);

  // Initialize current question index
  useEffect(() => {
    if (questionsData?.data && !isInitialized) {
      let initialIndex = 0;

      if (questionId) {
        const questionIndex = questionsData.data.findIndex(
          (question: { _id: string }) => question._id === questionId
        );
        if (questionIndex !== -1) {
          initialIndex = questionIndex;
        }
      }

      setCurrentQuestionIndex(initialIndex);
      setIsInitialized(true);
    }
  }, [questionsData, questionId, isInitialized]);
  // console.log('questionData:' + questionsData?.data);
  console.log(questionsData)

  const QUESTIONS_PER_ATTEMPT = 10;
  let attemptIndex = 0;

  // Check if there is an error or no response for total attempts
  if (totalAttemptsError || !totalAttemptData?.response) {
    // First attempt if there's an error or no response
    attemptIndex = 0;
  } else if (totalAttemptData?.response?.noOfRetake === 1) {
    // Second attempt if noOfRetake is 1
    attemptIndex = 1;
  } else if (totalAttemptData?.response?.noOfRetake === 2) {
    // Third attempt if noOfRetake is 2
    attemptIndex = 2;
  }

  const questionsToShow = useMemo(() => {
    if (questionsData?.data) {
      const startIndex = attemptIndex * QUESTIONS_PER_ATTEMPT;
      const endIndex = startIndex + QUESTIONS_PER_ATTEMPT;
      console.log(questionsData.data.slice(startIndex, endIndex));
      return questionsData.data.slice(startIndex, endIndex);
    } else {
      console.log('Questions data is not available or empty.');
      return [];
    }
  }, [questionsData, attemptIndex, QUESTIONS_PER_ATTEMPT]);

  const [isShuffled, setIsShuffled] = useState(false);

  useEffect(() => {
    if (
      currentQuestionIndex !== null &&
      questionsToShow.length !== 0 &&
      !isShuffled
    ) {
      const currentQuestion = questionsToShow[currentQuestionIndex];
      if (currentQuestion) {
        // Extract the options for the current question
        const options = [
          currentQuestion.optionA,
          currentQuestion.optionB,
          currentQuestion.optionC,
          currentQuestion.answer,
        ].filter(Boolean); // Remove any undefined or null options

        // Shuffle the options (using a helper function to avoid mutation)
        const shuffledOptions = [...options];
        for (let i = shuffledOptions.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffledOptions[i], shuffledOptions[j]] = [
            shuffledOptions[j],
            shuffledOptions[i],
          ];
        }

        // Set the randomized options and mark as shuffled
        setRandomizedOptions(shuffledOptions);
        setIsShuffled(true); // Prevent further shuffling until a new question is selected
      }
    }
  }, [currentQuestionIndex, questionsToShow, isShuffled]);

  // Reset shuffling state when question changes (optional)
  useEffect(() => {
    setIsShuffled(false);
  }, [currentQuestionIndex]);

  // Internet status management
  useEffect(() => {
    const updateSpeed = () => {
      if ('connection' in navigator) {
        const connection = (
          navigator as Navigator & { connection?: NetworkInformation }
        ).connection;
        if (connection) {
          const downlink = connection.downlink || 0;
          setInternetSpeed(`${downlink} MB/S`);
        }
      }
    };

    updateSpeed();

    const handleOnlineStatus = () => {
      setIsOnline(true);
      updateSpeed();
      setOnlineStatusMessage('Back online! 😊');
      setIsSuccess(true);

      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    };

    const handleOfflineStatus = () => {
      setIsOnline(false);
      setInternetSpeed('0 MB/S');
      setOnlineStatusMessage(
        'Currently offline. Please check the internet connection.'
      );
      setIsSuccess(true);
    };

    window.addEventListener('online', handleOnlineStatus);
    window.addEventListener('offline', handleOfflineStatus);

    return () => {
      window.removeEventListener('online', handleOnlineStatus);
      window.removeEventListener('offline', handleOfflineStatus);
    };
  }, []);

  // Anti-copy mechanism
  useEffect(() => {
    const handleCopy = (event: ClipboardEvent) => {
      event.preventDefault();
      const characters =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
      let result = '';
      for (let i = 0; i < 20; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * characters.length)
        );
      }
      event.clipboardData?.setData('text/plain', result);
    };

    document.addEventListener('copy', handleCopy);
    return () => document.removeEventListener('copy', handleCopy);
  }, []);

  // format time to minutes and seconds
  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
  };

  // function to select an option
  const handleOptionClick = (option: string) => {
    if (currentQuestionIndex === null) return;

    setSelectedOptions((prevState) => ({
      ...prevState,
      [currentQuestionIndex]: option,
    }));
  };

  // function to go to next question
  const handleNextQuestion = () => {
    if (currentQuestionIndex === null) return;

    if (
      questionsData?.data &&
      currentQuestionIndex < questionsData.data.length - 1
    ) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  // function to go to next question
  const handlePreviousQuestion = () => {
    if (currentQuestionIndex === null) return;

    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  // function to submit quiz
  const handleSubmit = useCallback(async () => {
    if (!questionsToShow || questionsToShow.length === 0) {
      setErrMsg('No questions to submit.');
      return;
    }

    let userScore = 0;

    // Loop through questionsToShow instead of questionsData.data
    questionsToShow.forEach((question: Question, index: number) => {
      const selectedAnswer = selectedOptions[index]; // Ensure selectedOptions aligns with questionsToShow
      if (selectedAnswer === question.answer) {
        userScore += 1; // Increment score for correct answers
      }
    });

    const totalQuestions = questionsToShow.length; // Use questionsToShow length for total
    const percentageScore = (userScore / totalQuestions) * 100;
    console.log(percentageScore);

    const resultData = {
      score: percentageScore,
      quizId: id,
      userId: userid,
      answer: Object.values(selectedOptions).slice(0, totalQuestions),
    };

    try {
      const res = await result(resultData).unwrap();
      navigate('/dashboard/evaluation/status', {
        state: {
          score: userScore,
          noQuestions: totalQuestions,
          quizId: id,
          userId: userid,
        },
      });
      console.log('submitted successfully');
      setErrMsg(
        res.response === 'Result already submitted for this quiz'
          ? 'Quiz has been done'
          : ''
      );
    } catch (error: unknown) {
      const err = error as ErrorResponse;
      setErrMsg('Your attempts for this quiz has been maxed out');
      console.log(err);
    }
  }, [
    questionsToShow,
    selectedOptions,
    id,
    userid,
    result,
    navigate,
    setErrMsg,
  ]);

  const [submitted, setSubmitted] = useState<boolean>(false);
  // fucntion to submit quiz once time is up
  useEffect(() => {
    // If time reaches 0, submit the quiz and stop the timer
    if (time === 0 && !submitted) {
      handleSubmit();
      setSubmitted(true);
      return;
    }

    // Set up interval to countdown
    const timerId = setInterval(() => {
      setTime((prevTime) => prevTime - 1);
    }, 1000);

    // Clear the interval when time is 0 or component unmounts
    return () => {
      clearInterval(timerId);
    };
  }, [time, handleSubmit, submitted]);

  if (
    questionsLoading ||
    assessmentLoading ||
    currentQuestionIndex === null ||
    totalAttemptsLoading ||
    questionsToShow.length === 0
  ) {
    return (
      <div className="loading_container">
        <FadeLoader color="#007BFF" />
      </div>
    );
  }

  const currentQuestion = questionsToShow[currentQuestionIndex];
  const selectedOption = selectedOptions[currentQuestionIndex] || null;
  const isLastQuestion = currentQuestionIndex === questionsToShow.length - 1;
  const isFirstQuestion = currentQuestionIndex === 0;

  if (questionsData?.data?.length === 0) {
    return (
      <div className="nodata_container">
        <img
          src="/images/NoData.jpg"
          alt=""
          style={{ width: '250px', height: '250px' }}
        />
        <div style={{ fontWeight: '600' }}>Oops, No Questions Available 😭</div>
        <div
          className="navigation_btn"
          onClick={() => navigate('/dashboard/evaluation')}
        >
          Go back to Evaluation
          <div className="navigation_arrow">
            <NavigationArrow />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="multiple_choice_root">
      <div className="multiple_choice_header">
        <div>Questions</div>
        <div className="timer">{formatTime(time)}</div>
      </div>
      <div>
        <p>
          {isOnline ? `Internet speed is ${internetSpeed}` : 'You are offline'}
        </p>
      </div>
      <div className="question_container">
        <div className="question_out_of">
          Question {currentQuestionIndex + 1} of {questionsToShow.length}
        </div>
        <div className="question_text">{currentQuestion.question}</div>
        <div className="options">
          {randomizedOptions.map((option, index) => (
            <div
              key={index}
              className={`option_item ${
                selectedOption === option ? 'selected_option' : ''
              }`}
              onClick={() => handleOptionClick(option)}
            >
              <div className="check_icon">
                {selectedOption === option ? (
                  <CheckCircleIcon />
                ) : (
                  <div className="empty_check_circle"></div>
                )}
              </div>
              <div className="options_text">
                {['A', 'B', 'C', 'D'][index]}. {option}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="question_selectors">
        <button
          className={`back_and_next_button ${isFirstQuestion ? 'disabled' : ''}`}
          onClick={handlePreviousQuestion}
          disabled={isFirstQuestion || !isOnline}
        >
          <ArrowLeftIcon />
        </button>
        {isLastQuestion && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
            }}
          >
            <button
              className="question_submit_btn"
              style={{
                backgroundColor: !resultLoading ? '#007BFF' : 'grey',
                cursor: !resultLoading ? 'pointer' : 'not-allowed',
              }}
              onClick={() => setShowPopup(true)}
              disabled={questionsData.data.length < 1 || resultLoading}
            >
              {resultLoading ? <div className="spinner"></div> : 'Submit'}
            </button>
            {errMsg && (
              <div className="error_message">
                <BiSolidErrorAlt
                  fontSize={18}
                  style={{ paddingRight: '5px' }}
                />
                {errMsg}
              </div>
            )}
          </div>
        )}
        <button
          className={`back_and_next_button ${!isOnline || isLastQuestion ? 'disabled' : ''}`}
          onClick={handleNextQuestion}
          disabled={isLastQuestion || !isOnline}
        >
          <ArrowRightIcon />
        </button>
      </div>
      <AnimatePresence>
        {success && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.5 }}
            className="notification-toast-wrapper"
          >
            <NotificationToast
              msg={onlineStatusMessage}
              toastType={isOnline ? 'success' : 'error'}
              cancel={() => setIsSuccess(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>
      <Popup popup={showPopup}>
        <div style={{ width: '100%' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '10px',
            }}
          >
            <img
              src="/images/submit.png"
              alt=""
              style={{ width: '80%', height: '100%' }}
            />
          </div>
          <div className="decision_title">
            Are you sure you want to proceed with submitting your assessment?
          </div>
          <div className="decision_container">
            <div
              className="decision_btn"
              style={{
                backgroundColor: !resultLoading ? '#007BFF' : 'grey',
                cursor: !resultLoading ? 'pointer' : 'not-allowed',
                color: 'white',
              }}
              onClick={
                questionsData.data.length < 1 || resultLoading
                  ? undefined
                  : handleSubmit
              }
            >
              {resultLoading ? <div className="spinner"></div> : 'Yes'}
            </div>
            <div
              className="decision_btn"
              style={{
                cursor: !resultLoading ? 'pointer' : 'not-allowed',
                color: !resultLoading ? 'black' : 'grey',
              }}
              onClick={resultLoading ? undefined : () => setShowPopup(false)}
            >
              {resultLoading ? <div className="spinner"></div> : 'No'}
            </div>
          </div>
        </div>
      </Popup>
    </div>
  );
};

export default MultipleChoice;

import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FadeLoader } from 'react-spinners';
import { BiSolidErrorAlt } from 'react-icons/bi';
import { AnimatePresence, motion } from 'framer-motion';

import './multipleChoice.css';
import {
  useGetAllAssessmentsQuery,
  useGetQuizQuestionQuery,
} from '@/services/features/quiz/quizSlice';
import CheckCircleIcon from '@/icons/CheckCircleIcon';
import ArrowLeftIcon from '@/icons/ArrowLeftIcon';
import ArrowRightIcon from '@/icons/ArrowRightIcon';
import NavigationArrow from '@/icons/NavigationArrow';
import { useCreateResultMutation } from '@/services/features/result/resultSlice';
import ErrorResponse from '@/types/ErrorResponse';
import NotificationToast from '@/components/notificationToast/NotificationToast';

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
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get('id');
  const questionId = searchParams.get('questionId');
  const userid = sessionStorage.getItem('id');

  const { data: assessmentData, isLoading: assessmentLoading } =
    useGetAllAssessmentsQuery({});
  const { data: questionsData, isLoading: questionsLoading } =
    useGetQuizQuestionQuery({ userId: userid, quizId: id });

  const [isInitialized, setIsInitialized] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<{
    [key: number]: string | null;
  }>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<
    number | null
  >(null);
  const initialTime = 10 * 60;
  const [time, setTime] = useState<number>(() => {
    const storedTime = sessionStorage.getItem('countdownTime');
    return storedTime ? parseInt(storedTime, 10) : initialTime;
  });
  const [randomizedOptions, setRandomizedOptions] = useState<string[]>([]);
  const [answers, setAnswers] = useState<string[]>([]);
  const [errMsg, setErrMsg] = useState<string>('');
  const [result, { isLoading: resultLoading }] = useCreateResultMutation();

  // Internet status states
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  const [internetSpeed, setInternetSpeed] = useState<string>('');
  const [success, setIsSuccess] = useState(false);
  const [onlineStatusMessage, setOnlineStatusMessage] = useState<string>('');

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

  // Timer effect that updates both state and sessionStorage
  useEffect(() => {
    // Store the current time in sessionStorage when the time updates
    sessionStorage.setItem('countdownTime', time.toString());

    const timer = setInterval(() => {
      if (time > 0) {
        setTime((prevTime) => prevTime - 1);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [time]);

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

  // Update options when question changes
  useEffect(() => {
    if (currentQuestionIndex !== null && questionsData?.data) {
      const currentQuestion = questionsData.data[currentQuestionIndex];
      if (currentQuestion) {
        const options = [
          currentQuestion.optionA,
          currentQuestion.optionB,
          currentQuestion.optionC,
          currentQuestion.answer,
        ].filter(Boolean);
        setRandomizedOptions(options.sort(() => Math.random() - 0.5));
      }
    }
  }, [questionsData, currentQuestionIndex]);

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

  // Update URL when question changes
  useEffect(() => {
    if (
      currentQuestionIndex !== null &&
      questionsData?.data &&
      questionsData.data[currentQuestionIndex] &&
      isInitialized
    ) {
      const currentQuestionId = questionsData.data[currentQuestionIndex]._id;
      setSearchParams(
        (prev) => {
          const newParams = new URLSearchParams(prev);
          newParams.set('id', id || '');
          newParams.set('questionId', currentQuestionId);
          return newParams;
        },
        { replace: true }
      );
    }
  }, [currentQuestionIndex, questionsData, setSearchParams, id, isInitialized]);

  // Load saved answers
  useEffect(() => {
    const savedAnswers = sessionStorage.getItem('answers');
    if (savedAnswers && questionsData?.data) {
      const parsedAnswers = JSON.parse(savedAnswers);

      const initializedAnswers = Array(questionsData.data.length).fill(null);
      parsedAnswers.forEach((answer: string, index: number) => {
        if (index < questionsData.data.length) {
          initializedAnswers[index] = answer;
        }
      });

      setAnswers(initializedAnswers);

      const newSelectedOptions: { [key: number]: string | null } = {};
      initializedAnswers.forEach((answer, index) => {
        if (answer) {
          newSelectedOptions[index] = answer;
        }
      });
      setSelectedOptions(newSelectedOptions);
    }
  }, [questionsData]);

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

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
  };

  const handleOptionClick = (option: string) => {
    if (currentQuestionIndex === null) return;

    setSelectedOptions((prevState) => ({
      ...prevState,
      [currentQuestionIndex]: option,
    }));

    setAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[currentQuestionIndex] = option;

      sessionStorage.setItem('answers', JSON.stringify(updatedAnswers));
      localStorage.setItem('answers', JSON.stringify(updatedAnswers));
      localStorage.setItem('quizId', JSON.stringify(id));
      return updatedAnswers;
    });
  };

  useEffect(() => {
    // Check if the timestamp exists in localStorage
    const storedTimestamp = localStorage.getItem('answersTimestamp');

    // If the timestamp is not set, store the current timestamp
    if (!storedTimestamp) {
      const timestamp = Date.now();
      localStorage.setItem('answersTimestamp', JSON.stringify(timestamp));
    }
  }, []);

  const handleNextQuestion = () => {
    if (currentQuestionIndex === null) return;

    if (
      questionsData?.data &&
      currentQuestionIndex < questionsData.data.length - 1
    ) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex === null) return;

    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = async () => {
    if (!questionsData?.data) return;

    let userScore = 0;
    questionsData.data.forEach((question: Question, index: number) => {
      const selectedAnswer = selectedOptions[index];
      if (selectedAnswer === question.answer) {
        userScore += 1;
      }
    });

    const totalQuestions = questionsData.data.length;
    const percentageScore = (userScore / totalQuestions) * 100;

    const resultData = {
      score: percentageScore,
      quizId: id,
      userId: userid,
      answer: answers,
    };

    try {
      const res = await result(resultData).unwrap();
      navigate('/dashboard/evaluation/status', {
        state: { score: userScore, noQuestions: totalQuestions },
      });
      setErrMsg(
        res.response === 'Result already submitted for this quiz'
          ? 'Quiz has been done'
          : ''
      );
      sessionStorage.removeItem('answers');
    } catch (error: unknown) {
      const err = error as ErrorResponse;
      setErrMsg(
        err?.data.error === 'Validation Error'
          ? 'Score not recorded'
          : 'Something went wrong'
      );
      console.error(error);
    }
  };

  // useEffect to submit answers if the user leaves the website
  useEffect(() => {
    // Check if answers and timestamp exist in localStorage
    const storedAnswers = localStorage.getItem('answers');
    const storedTimestamp = localStorage.getItem('answersTimestamp');
    const quizId = localStorage.getItem('quizId');

    console.log(quizId);

    if (
      storedAnswers &&
      storedTimestamp &&
      quizId &&
      !isNaN(Number(quizId)) === !isNaN(Number(id))
    ) {
      console.log('hi');
      const parsedAnswers = JSON.parse(storedAnswers);
      const timestamp = JSON.parse(storedTimestamp);
      const currentTime = Date.now();
      console.log('valid quiz id');

      // Check if the timestamp is expired based on the duration of the assessment
      if (assessmentData) {
        const selectedAssessment = assessmentData.response.find(
          (item: Assessment) => item._id === id
        );

        if (selectedAssessment) {
          const expirationTime = selectedAssessment.duration * 60 * 1000;
          const timeDifference = currentTime - timestamp; // Calculate the time difference between current time and the saved timestamp

          // If the time difference is greater than the expiration time, it's expired
          if (timeDifference > expirationTime) {
            console.log('time difference valid');
            console.log(parsedAnswers);
            setAnswers(parsedAnswers);
            setSelectedOptions(parsedAnswers);
            handleSubmit();
            // Optionally, clear answers if expired
            localStorage.removeItem('answers');
            localStorage.removeItem('answersTimestamp');
          } else {
            // Restore answers if not expired
            // Pass answers to the state
            setAnswers(parsedAnswers);
          }
        }
      }
    }
  }, [id]);

  if (questionsLoading || assessmentLoading || currentQuestionIndex === null) {
    return (
      <div className="loading_container">
        <FadeLoader color="#007BFF" />
      </div>
    );
  }

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

  const currentQuestion = questionsData.data[currentQuestionIndex];
  const selectedOption = selectedOptions[currentQuestionIndex] || null;
  const isLastQuestion = currentQuestionIndex === questionsData.data.length - 1;
  const isFirstQuestion = currentQuestionIndex === 0;

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
          Question {currentQuestionIndex + 1} of {questionsData.data.length}
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
              onClick={handleSubmit}
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
          className={`back_and_next_button ${!isOnline ? 'disabled' : ''}`}
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
    </div>
  );
};

export default MultipleChoice;

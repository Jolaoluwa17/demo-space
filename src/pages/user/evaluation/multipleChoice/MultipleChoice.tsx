import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FadeLoader } from 'react-spinners';
import { BiSolidErrorAlt } from 'react-icons/bi';

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

const MultipleChoice: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');

  const { data: assessmentData, isLoading: assessmentLoading } =
    useGetAllAssessmentsQuery({});
  const { data: questionsData, isLoading: questionsLoading } =
    useGetQuizQuestionQuery(id);

  const [selectedOptions, setSelectedOptions] = useState<{
    [key: number]: string | null;
  }>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [time, setTime] = useState<number>(10 * 60);
  const [randomizedOptions, setRandomizedOptions] = useState<string[]>([]);
  const [answers, setAnswers] = useState<string[]>([]);
  const [errMsg, setErrMsg] = useState<string>('');
  const [result, { isLoading: resultLoading }] = useCreateResultMutation();
  const userid = sessionStorage.getItem('id');

  // State to manage the internet status
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);

  // Handle internet speed
  const [internetSpeed, setInternetSpeed] = useState<string>('');

  useEffect(() => {
    if (assessmentData) {
      const selectedAssessment = assessmentData.response.find(
        (item: Assessment) => item._id === id
      );
      if (selectedAssessment) {
        setTime(selectedAssessment.duration * 60);
      }
    }
  }, [assessmentData, id]);

  useEffect(() => {
    // Timer effect
    const timer = setInterval(() => {
      if (isOnline && time > 0) {
        setTime((prevTime) => prevTime - 1);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [isOnline, time]); // The timer depends on the online status and time

  useEffect(() => {
    const currentQuestion = questionsData?.data[currentQuestionIndex];
    if (currentQuestion) {
      const options = [
        currentQuestion.optionA,
        currentQuestion.optionB,
        currentQuestion.optionC,
        currentQuestion.answer,
      ].filter(Boolean);
      setRandomizedOptions(options.sort(() => Math.random() - 0.5));
    }
  }, [questionsData, currentQuestionIndex]);

  useEffect(() => {
    // Update internet speed when the browser is online or offline
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

    // Update speed when online
    updateSpeed();

    const handleOnlineStatus = () => {
      setIsOnline(true);
      updateSpeed();
    };

    const handleOfflineStatus = () => {
      setIsOnline(false);
      setInternetSpeed('0 MB/S');
    };

    window.addEventListener('online', handleOnlineStatus);
    window.addEventListener('offline', handleOfflineStatus);

    return () => {
      window.removeEventListener('online', handleOnlineStatus);
      window.removeEventListener('offline', handleOfflineStatus);
    };
  }, []);

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
  };

  const handleOptionClick = (option: string) => {
    setSelectedOptions((prevState) => ({
      ...prevState,
      [currentQuestionIndex]: option,
    }));

    // Update the answers array with the actual text
    setAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[currentQuestionIndex] = option;
      return updatedAnswers;
    });
  };

  const handleNextQuestion = () => {
    if (
      questionsData?.data &&
      currentQuestionIndex < questionsData.data.length - 1
    ) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = async () => {
    let userScore = 0;

    questionsData?.data.forEach((question: Question, index: number) => {
      const selectedAnswer = selectedOptions[index];
      if (selectedAnswer === question.answer) {
        userScore += 1;
      }
    });

    const totalQuestions = questionsData?.data.length || 1;
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
        state: { score: userScore, noQuestions: questionsData.data.length },
      });
      console.log(res);
      setErrMsg(
        res.response === 'Result already submitted for this quiz'
          ? 'Quiz has been done'
          : ''
      );
    } catch (error: unknown) {
      const err = error as ErrorResponse;
      setErrMsg(
        err?.data.error === 'Validation Error'
          ? 'Score not recorded'
          : 'Something went wrong'
      );
      console.log(error);
    }
  };

  const currentQuestion = questionsData?.data
    ? questionsData.data[currentQuestionIndex]
    : null;
  const selectedOption = selectedOptions[currentQuestionIndex] || null;
  const isLastQuestion =
    currentQuestionIndex === (questionsData?.data?.length || 0) - 1;
  const isFirstQuestion = currentQuestionIndex === 0;

  return (
    <div>
      {questionsLoading || assessmentLoading ? (
        <div className="loading_container">
          <FadeLoader color="#007BFF" />
        </div>
      ) : questionsData?.data?.length === 0 ? (
        <div className="nodata_container">
          <img
            src="/images/NoData.jpg"
            alt=""
            style={{ width: '250px', height: '250px' }}
          />
          <div style={{ fontWeight: '600' }}>
            Oops, No Questions Avaliable 😭
          </div>
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
      ) : (
        <div className="multiple_choice_root">
          <div className="multiple_choice_header">
            <div>Questions</div>
            <div className="timer">{formatTime(time)}</div>
          </div>
          <div>
            <p>
              {isOnline
                ? `Internet speed is ${internetSpeed}`
                : 'You are offline'}
            </p>
          </div>
          <div className="question_container">
            <div className="question_out_of">
              Question {currentQuestionIndex + 1} of {questionsData.data.length}
            </div>
            <div className="question_text">
              {currentQuestion ? currentQuestion.question : ''}
            </div>
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
                  disabled={questionsData?.data?.length < 1 || resultLoading}
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
              disabled={!selectedOption || !isOnline}
            >
              <ArrowRightIcon />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MultipleChoice;

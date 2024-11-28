import React, { useEffect, useState } from 'react';
import './multipleChoice.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  useGetAllAssessmentsQuery,
  useGetQuizQuestionQuery,
} from '@/services/features/quiz/quizSlice';
import CheckCircleIcon from '@/icons/CheckCircleIcon';
import ArrowLeftIcon from '@/icons/ArrowLeftIcon';
import ArrowRightIcon from '@/icons/ArrowRightIcon';
import { useCreateResultMutation } from '@/services/features/result/resultSlice';
import ErrorResponse from '@/types/ErrorResponse';
import { BiSolidErrorAlt } from 'react-icons/bi';
import { FadeLoader } from 'react-spinners';
import NavigationArrow from '@/icons/NavigationArrow';

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

  // console.log(questionsData);

  const [selectedOptions, setSelectedOptions] = useState<{
    [key: number]: string | null;
  }>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [time, setTime] = useState<number>(10 * 60);
  const [randomizedOptions, setRandomizedOptions] = useState<string[]>([]);
  const [errMsg, setErrMsg] = useState<string>('');
  const [result, { isLoading: resultLoading }] = useCreateResultMutation();
  const userid = sessionStorage.getItem('id');

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
    const timer = setInterval(() => {
      setTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

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

    const resultData = {
      score: userScore,
      quizId: id,
      userId: userid,
    };

    try {
      await result(resultData).unwrap();
      navigate('/dashboard/evaluation/status', {
        state: { score: userScore, noQuestions: questionsData.data.length },
      });
    } catch (error: unknown) {
      const err = error as ErrorResponse;
      setErrMsg(
        err?.data.error === 'Validation Error'
          ? 'Score not recorded'
          : 'Something went wrong'
      );
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
          <FadeLoader color="#4274ba" />
        </div>
      ) : questionsData?.data?.length === 0 ? (
        <div className="loading_container">
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
              className={`back_and_next_button ${
                isFirstQuestion ? 'disabled' : ''
              }`}
              onClick={handlePreviousQuestion}
              disabled={isFirstQuestion}
            >
              <ArrowLeftIcon />
            </button>
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
            <button
              className={`back_and_next_button ${
                isLastQuestion ? 'disabled' : ''
              }`}
              onClick={handleNextQuestion}
              disabled={isLastQuestion}
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

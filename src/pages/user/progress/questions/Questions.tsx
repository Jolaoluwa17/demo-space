import { useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { FadeLoader } from 'react-spinners';

import './questions.css';
import PageHeader from '@/components/pageHeader/PageHeader';
import CheckCircleIcon from '@/icons/CheckCircleIcon';
import ArrowLeftIcon from '@/icons/ArrowLeftIcon';
import ArrowRightIcon from '@/icons/ArrowRightIcon';
import { useGetQuizQuestionQuery } from '@/services/features/quiz/quizSlice';
import { useGetAllResultsQuery } from '@/services/features/result/resultSlice';

const Questions: React.FC = () => {
  const [searchParams] = useSearchParams();
  const userId = sessionStorage.getItem('id');
  const id = searchParams.get('id');
  const location = useLocation();
  const { course, description, questionId } = location.state || {};

  const {
    data: questionsData,
    isLoading: questionsLoading,
    error,
  } = useGetQuizQuestionQuery(id);

  const { data, isLoading } = useGetAllResultsQuery({});
  const userResults = data?.response.filter(
    (result: { quizId: { _id: string }; userId: { _id: string } }) =>
      result.quizId?._id === id && result.userId?._id === userId
  );

  const userAnswers = userResults?.[0]?.answer || [];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(`/dashboard/progress/history?id=${id}`, {
      state: { course, description, questionId },
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < (questionsData?.data.length || 0) - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
    }
  };

  if (questionsLoading || isLoading) {
    return (
      <div className="loading_container">
        <FadeLoader color="#007BFF" />
      </div>
    );
  }

  if (error || !questionsData?.data) {
    return (
      <div className="nodata_container">
        <img
          src="/images/NoData.jpg"
          alt=""
          style={{ width: '250px', height: '250px' }}
        />
        <div style={{ fontWeight: '600' }}>Error Loading Questions 😭</div>
      </div>
    );
  }

  const currentQuestion = questionsData.data[currentQuestionIndex];
  const isFirstQuestion = currentQuestionIndex === 0;
  const isLastQuestion = currentQuestionIndex === questionsData.data.length - 1;

  // Randomize values, but keep labels in order (A, B, C, D)
  const values = [
    currentQuestion.optionA,
    currentQuestion.optionB,
    currentQuestion.optionC,
    currentQuestion.answer,
  ];

  const randomizedValues = values.slice().sort(() => Math.random() - 0.5);

  const options = [
    { label: 'A', value: randomizedValues[0] },
    { label: 'B', value: randomizedValues[1] },
    { label: 'C', value: randomizedValues[2] },
    { label: 'D', value: randomizedValues[3] },
  ];

  return (
    <div className="questions_root">
      <PageHeader pageTitle="Questions" handleBackClick={handleBackClick} />
      <div className="question_container">
        <div className="question_out_of">
          Question {currentQuestionIndex + 1} of {questionsData.data.length}
        </div>
        <div>
          <div className="question_text">{currentQuestion.question}</div>
          <div className="options">
            {options.map(({ label, value }) => {
              // Check if the value is the correct answer
              const isCorrectAnswer = value === currentQuestion.answer;

              // Get the user's selected answer for the current question
              const isUserAnswer = userAnswers[currentQuestionIndex] === value;

              return (
                <div
                  key={label}
                  className={`question_option_item 
        ${isUserAnswer && !isCorrectAnswer ? 'wrong_option' : ''} 
        ${isCorrectAnswer ? 'highlight_correct' : ''}
      `}
                >
                  <div className="check_icon">
                    {/* Show check icon only if the user selected the option */}
                    {isUserAnswer && <CheckCircleIcon />}
                  </div>
                  <div className="options_text">
                    {label}. {value}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="question_selectors">
        <div
          className={`back_and_next_button ${isFirstQuestion ? 'disabled' : ''}`}
          onClick={handlePreviousQuestion}
          style={{ opacity: isFirstQuestion ? 0.5 : 1 }}
        >
          <ArrowLeftIcon />
        </div>
        <div
          className={`back_and_next_button ${isLastQuestion ? 'disabled' : ''}`}
          onClick={handleNextQuestion}
          style={{ opacity: isLastQuestion ? 0.5 : 1 }}
        >
          <ArrowRightIcon />
        </div>
      </div>
    </div>
  );
};

export default Questions;

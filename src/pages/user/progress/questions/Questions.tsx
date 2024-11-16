import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import './questions.css';
import { combinedQuestionsData } from '@/utils/CombinedQuestionsData';
import PageHeader from '@/components/pageHeader/PageHeader';
import CheckCircleIcon from '@/icons/CheckCircleIcon';
import ArrowLeftIcon from '@/icons/ArrowLeftIcon';
import ArrowRightIcon from '@/icons/ArrowRightIcon';


// Combined Questions Component
const Questions: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const questionId = id ? parseInt(id, 10) : null;

  // Memoize all questions (since only multiple-choice questions remain)
  const allQuestions = useMemo(() => combinedQuestionsData, []);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});

  // Effect to initialize the current question index based on URL params
  useEffect(() => {
    if (questionId !== null) {
      const index = allQuestions.findIndex((q) => q.id === questionId);
      if (index !== -1) {
        setCurrentQuestionIndex(index);
      }
    }
  }, [questionId, allQuestions]);

  // Effect to pre-fill the user's answer if available
  useEffect(() => {
    const currentQuestion = allQuestions[currentQuestionIndex];
    if (currentQuestion && currentQuestion.userAnswer) {
      setAnswers((prevAnswers) => ({
        ...prevAnswers,
        [currentQuestionIndex]: currentQuestion.userAnswer,
      }));
    }
  }, [currentQuestionIndex, allQuestions]);

  // Handle navigation between questions
  const handleNextQuestion = () => {
    if (currentQuestionIndex < allQuestions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
    }
  };

  const currentQuestion = allQuestions[currentQuestionIndex];

  const isFirstQuestion = currentQuestionIndex === 0;
  const isLastQuestion = currentQuestionIndex === allQuestions.length - 1;

  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/dashboard/progress/history');
  };

  return (
    <div className="questions_root">
      <PageHeader pageTitle="Questions" handleBackClick={handleBackClick} />
      <div className="question_container">
        <div className="question_out_of">
          Question {currentQuestionIndex + 1} of {allQuestions.length}
        </div>
        <div>
          <div className="question_text">{currentQuestion.question}</div>
          <div className="options">
            {currentQuestion.options &&
              currentQuestion.options.map((option, index) => {
                const label = ['A', 'B', 'C', 'D'][index] || '';
                const isCorrect = option === currentQuestion.correctAnswer;
                const isUserAnswer = option === answers[currentQuestionIndex];

                return (
                  <div
                    key={index}
                    className={`question_option_item ${
                      isUserAnswer
                        ? isCorrect
                          ? 'correct_option'
                          : 'wrong_option'
                        : isCorrect
                          ? 'highlight_correct'
                          : ''
                    }`}
                  >
                    <div className="check_icon">
                      {isUserAnswer ? (
                        <CheckCircleIcon />
                      ) : (
                        <div className="empty_check_circle"></div>
                      )}
                    </div>
                    <div className="options_text">
                      {label}. {option}
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

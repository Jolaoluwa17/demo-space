import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './shortAnswer.css';
import { combinedQuestionsData } from '@/utils/CombinedQuestionsData';
import ArrowLeftIcon from '@/icons/ArrowLeftIcon';
import ArrowRightIcon from '@/icons/ArrowRightIcon';

const ShortAnswer: React.FC = () => {
  const navigate = useNavigate();

  // Filter the questions to include only those with the type 'single'
  // const shortAnswerQuestions = combinedQuestionsData.filter(
  //   (question) => question.type === 'single'
  // );

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const answer = event.target.value;
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [currentQuestionIndex]: answer,
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < combinedQuestionsData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const currentQuestion = combinedQuestionsData[currentQuestionIndex];
  const currentAnswer = answers[currentQuestionIndex] || '';

  const isFirstQuestion = currentQuestionIndex === 0;
  const isLastQuestion =
    currentQuestionIndex === combinedQuestionsData.length - 1;

  return (
    <div className="short_answer_root">
      <div className="short_answer_header">Questions</div>
      <div className="question_container">
        <div className="question_out_of">
          Question {currentQuestionIndex + 1} of {combinedQuestionsData.length}
        </div>
        <div className="question_main_container">
          <div className="question_text">{currentQuestion.question}</div>
          <input
            type="text"
            className="answer_input"
            value={currentAnswer}
            onChange={handleInputChange}
          />
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
          className="question_submit_btn"
          onClick={() => navigate('/dashboard/evaluation/status')}
        >
          Submit
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

export default ShortAnswer;

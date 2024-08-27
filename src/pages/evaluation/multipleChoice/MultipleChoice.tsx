import React, { useState } from 'react';
import CheckCircleIcon from '../../../icons/CheckCircleIcon';
import './multipleChoice.css';
import ArrowLeftIcon from '../../../icons/ArrowLeftIcon';
import ArrowRightIcon from '../../../icons/ArrowRightIcon';
import { combinedQuestionsData } from '../../../utils/CombinedQuestionsData';
import { useNavigate } from 'react-router-dom';

const MultipleChoice: React.FC = () => {
  const navigate = useNavigate();
  const multipleChoiceQuestions = combinedQuestionsData.filter(
    (question) => question.type === 'multiple'
  );

  const [selectedOptions, setSelectedOptions] = useState<{
    [key: number]: string | null;
  }>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handleOptionClick = (option: string) => {
    setSelectedOptions((prevState) => ({
      ...prevState,
      [currentQuestionIndex]: option,
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < multipleChoiceQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const currentQuestion = multipleChoiceQuestions[currentQuestionIndex];
  const selectedOption = selectedOptions[currentQuestionIndex] || null;

  const isFirstQuestion = currentQuestionIndex === 0;
  const isLastQuestion =
    currentQuestionIndex === multipleChoiceQuestions.length - 1;

  // Option labels
  const optionLabels = ['A', 'B', 'C', 'D'];

  return (
    <div className="multiple_choice_root">
      <div className="multiple_choice_header">Questions</div>
      <div className="question_container">
        <div className="question_out_of">
          Question {currentQuestionIndex + 1} of{' '}
          {multipleChoiceQuestions.length}
        </div>
        <div className="question_text">{currentQuestion.question}</div>
        <div className="options">
          {currentQuestion.options &&
            currentQuestion.options.map((option, index) => {
              const label = optionLabels[index] || '';

              return (
                <div
                  key={index}
                  className={`option_item ${selectedOption === option ? 'selected_option' : ''}`}
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
                    {label}. {option}
                  </div>
                </div>
              );
            })}
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
          onClick={() => navigate('/evaluation/status')}
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

export default MultipleChoice;

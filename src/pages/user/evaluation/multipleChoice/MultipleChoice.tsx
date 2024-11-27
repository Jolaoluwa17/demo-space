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

  // Fetch all assessments and questions by quiz ID
  const { data: assessmentData, isLoading: assessmentLoading } =
    useGetAllAssessmentsQuery({});
  const { data: questionsData, isLoading: questionsLoading } =
    useGetQuizQuestionQuery(id);

  // State to keep track of selected options
  const [selectedOptions, setSelectedOptions] = useState<{
    [key: number]: string | null;
  }>({});

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // State to manage the timer
  const [time, setTime] = useState<number>(10 * 60);

  // Use effect to set the timer duration from assessment data
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

  // Timer logic
  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Format time as mm:ss
  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
  };

  // Handle option click
  const handleOptionClick = (option: string) => {
    setSelectedOptions((prevState) => ({
      ...prevState,
      [currentQuestionIndex]: option,
    }));
  };

  // Navigate to next/previous questions
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

  // Get current question data
  const currentQuestion = questionsData?.data
    ? questionsData.data[currentQuestionIndex]
    : null;
  const selectedOption = selectedOptions[currentQuestionIndex] || null;

  const isLastQuestion =
    currentQuestionIndex === (questionsData?.data?.length || 0) - 1;
  const isFirstQuestion = currentQuestionIndex === 0;

  // State to store randomized options
  const [randomizedOptions, setRandomizedOptions] = useState<string[]>([]);

  // Randomize options once when the page is loaded
  useEffect(() => {
    if (currentQuestion) {
      const options = [
        currentQuestion.optionA,
        currentQuestion.optionB,
        currentQuestion.optionC,
        currentQuestion.answer,
      ].filter((option) => option);

      // Randomize options once
      setRandomizedOptions(options.sort(() => Math.random() - 0.5));
    }
  }, [currentQuestion]);

  // Handle submit action to calculate the score
  const handleSubmit = () => {
    let userScore = 0;

    // Loop through all questions and check selected answers
    questionsData?.data.forEach((question: Question, index: number) => {
      const selectedAnswer = selectedOptions[index];
      if (selectedAnswer === question.answer) {
        userScore += 1; // Increment score if answer is correct
      }
    });

    console.log(`Your score is: ${userScore}`); // Log the score

    navigate('/dashboard/evaluation/status', {
      state: { score: userScore, noQuestions: questionsData.data.length },
    });
  };

  return (
    <div>
      {questionsLoading || assessmentLoading || !questionsData?.data ? (
        <div>Loading...</div>
      ) : (
        <div className="multiple_choice_root">
          <div className="multiple_choice_header">
            <div>Questions</div>
            <div className="timer">{formatTime(time)}</div>
          </div>
          <div className="question_container">
            <div className="question_out_of">
              {questionsData?.data?.length > 0 ? (
                <>
                  Question {currentQuestionIndex + 1} of{' '}
                  {questionsData.data.length}
                </>
              ) : (
                <>No questions available</>
              )}
            </div>
            <div className="question_text">
              {currentQuestion ? currentQuestion.question : ''}
            </div>
            <div className="options">
              {randomizedOptions.map((option, index) => {
                const label = ['A', 'B', 'C', 'D'][index];
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
              className={`back_and_next_button ${isFirstQuestion || questionsData?.data?.length < 1 ? 'disabled' : ''}`}
              onClick={handlePreviousQuestion}
              style={{
                opacity:
                  isFirstQuestion || questionsData?.data?.length < 1 ? 0.5 : 1,
              }}
            >
              <ArrowLeftIcon />
            </div>
            <div
              className={`question_submit_btn ${questionsData?.data?.length < 1 ? 'disabled' : ''}`}
              onClick={handleSubmit} // Submit the quiz to calculate the score
            >
              Submit
            </div>
            <div
              className={`back_and_next_button ${isLastQuestion || questionsData?.data?.length < 1 ? 'disabled' : ''}`}
              onClick={handleNextQuestion}
              style={{
                opacity:
                  isLastQuestion || questionsData?.data?.length < 1 ? 0.5 : 1,
              }}
            >
              <ArrowRightIcon />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MultipleChoice;

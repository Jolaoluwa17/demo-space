import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import './status.css';
import NavigationArrow from '@/icons/NavigationArrow';
import { useTotalAttemptsQuery } from '@/services/features/quiz/quizSlice';

const Status = () => {
  const location = useLocation();
  const userScore = location.state?.score;
  const noQuestions = location.state?.noQuestions;
  const quizId = location.state?.quizId;
  const userId = location.state?.userId;

  const { data: totalAttemptData, isLoading: totalAttemptsLoading } =
    useTotalAttemptsQuery({ userId: userId, quizId: quizId });
  console.log(totalAttemptData);

  const [percentage, setPercentage] = useState<number | null>(null);

  useEffect(() => {
    if (userScore !== undefined && noQuestions !== undefined) {
      const calculatedPercentage = (userScore / noQuestions) * 100;
      setPercentage(calculatedPercentage);
    }
  }, [userScore, noQuestions]);

  const navigate = useNavigate();

  return (
    <div className="status_root">
      {totalAttemptsLoading ? (
        <div>Loading...</div>
      ) : (
        totalAttemptData &&
        (percentage !== null && percentage < 70 ? (
          <div>
            <div className="status_container">
              <img src="/images/failure.svg" alt="failure" />
              <div className="status_grade_percentage_fail">
                {percentage}/100
              </div>
              <div className="status_text">
                Don't Worry! You didn't pass this time.
              </div>
              {totalAttemptData.response.noOfRetake === 3 ? (
                <div className="status_statement">
                  We recommend you take our Skill Gap Program <br /> to improve
                  your skills and try again.
                </div>
              ) : (
                <div className="status_statement">
                  You have another opportunity to improve your performance. Take
                  some time to review and retake the quiz to improve your score.
                </div>
              )}
              {totalAttemptData.response.noOfRetake === 3 ? (
                <div
                  className="navigation_btn"
                  onClick={() => navigate('/dashboard/skill-gap')}
                >
                  Go to Skill Gap program
                  <div className="navigation_arrow">
                    <NavigationArrow />
                  </div>
                </div>
              ) : (
                <div
                  className="navigation_btn"
                  onClick={() => navigate('/dashboard')}
                >
                  Go to dashboard
                  <div className="navigation_arrow">
                    <NavigationArrow />
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div>
            <div className="status_container">
              <img src="/images/success.svg" alt="success" />
              <div className="status_grade_percentage_pass">
                {percentage}/100
              </div>
              <div className="status_text">Congratulations!</div>
              <div className="status_statement">
                You have successfully passed the evaluation and <br /> will
                receive an email with login details to access <br /> VetPro, our
                job portal website.
              </div>
              <div
                className="navigation_btn"
                onClick={() => navigate('/dashboard')}
              >
                Back to home
                <div className="navigation_arrow">
                  <NavigationArrow />
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Status;

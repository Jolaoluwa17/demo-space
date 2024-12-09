import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

import './history.css';
import LeftArrowIcon from '@/icons/LeftArrowIcon';
import SidebarProgress from '@/icons/SidebarProgress';
import RightArrowIcon from '@/icons/RightArrowIcon';
import { useGetAllResultsQuery } from '@/services/features/result/resultSlice';
import { useGetQuizQuestionQuery } from '@/services/features/quiz/quizSlice';
import { FadeLoader } from 'react-spinners';

const History = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
  const location = useLocation();
  const { course, description } = location.state || {};

  const navigateToQuestion = (questionId: string) => {
    navigate(`/dashboard/progress/question?id=${id}`, {
      state: { course, description, questionId },
    });
  };

  const { data, isLoading } = useGetAllResultsQuery({});
  const userResults = data?.response.filter(
    (result: { quizId: string }) => result.quizId === id
  );

  const { data: questionsData, isLoading: questionsLoading } =
    useGetQuizQuestionQuery(id);

  const correctAnswersCount = questionsData?.data.reduce(
    (acc: number, question: { answer: string; userAnswer: string }) => {
      const userAnswer = userResults?.[0]?.answer?.find(
        (ans: string) => question.answer === ans
      );
      return userAnswer === question.answer ? acc + 1 : acc;
    },
    0
  );

  const totalQuestions = questionsData?.data?.length;

  return (
    <div className="history_root">
      {isLoading || questionsLoading ? (
        <div className="loading_container">
          <FadeLoader color="#007BFF" />
        </div>
      ) : (
        <div>
          <div className="history_header">
            <div className="history_innner_header">
              <div
                className="history_back_btn"
                onClick={() => navigate('/dashboard/progress')}
              >
                <div className="left_arrow_icon">
                  <LeftArrowIcon />
                </div>
                <div className="back_text">Back</div>
              </div>
              <div className="history_text">
                <div
                  style={{
                    paddingRight: '5px',
                    color: '#007BFF',
                    fontWeight: 'normal',
                  }}
                >
                  History
                </div>
                <SidebarProgress color={'#007BFF'} />
              </div>
            </div>
          </div>
          <div className="history_title">
            {/* <div className="img_holder"></div> */}
            <div className="history_skill_text">{course}</div>
            <div className="history_skill_description">{description}</div>
          </div>
          <div className="history_overview">
            <div className="history_overview_item">
              <div style={{ color: 'grey' }} className="history_overview_title">
                Percentage
              </div>
              <div
                style={{ fontWeight: '600', color: '#6A757E' }}
                className="history_overview_content"
              >
                {userResults[0].score.toFixed(0)}%
              </div>
            </div>
            <div className="history_overview_item">
              <div style={{ color: 'grey' }} className="history_overview_title">
                Correct
              </div>
              <div
                style={{ fontWeight: '600', color: '#6A757E' }}
                className="history_overview_content"
              >
                {correctAnswersCount}/{totalQuestions}
              </div>
            </div>
            <div className="history_overview_item">
              <div style={{ color: 'grey' }} className="history_overview_title">
                Passing Grade
              </div>
              <div
                style={{ fontWeight: '600', color: '#6A757E' }}
                className="history_overview_content"
              >
                70%
              </div>
            </div>
          </div>
          <div className="list_of_ques">List of Questions</div>
          <div className="question_list_container">
            {questionsData?.data && questionsData.data.length > 0 ? (
              questionsData.data.map(
                (question: {
                  _id: string;
                  question: string;
                  answer: string;
                }) => {
                  // Find the corresponding answer from the userResults
                  const userAnswer = userResults?.[0]?.answer?.find(
                    (ans: string) => question.answer === ans // Check if any user answer matches the correct answer
                  );

                  return (
                    <div
                      className="question_list_card"
                      key={question._id}
                      onClick={() => navigateToQuestion(question._id)}
                    >
                      <div>
                        <div className="history_question_text">
                          {question.question}
                        </div>
                        <div
                          style={{
                            color:
                              userAnswer === question.answer
                                ? '#61E44F'
                                : '#E44F4F',
                          }}
                          className="correct_or_wrong"
                        >
                          {userAnswer === question.answer
                            ? 'Correct Answer'
                            : 'Wrong Answer'}
                        </div>
                      </div>
                      <div style={{ marginRight: '25.45px' }}>
                        <RightArrowIcon />
                      </div>
                    </div>
                  );
                }
              )
            ) : (
              <div className="nodata_container">
                <img
                  src="/images/NoData.jpg"
                  alt=""
                  style={{ width: '250px', height: '250px' }}
                />
                <div style={{ fontWeight: '600' }}>
                  Oops, No Data Avaliable 😭
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default History;

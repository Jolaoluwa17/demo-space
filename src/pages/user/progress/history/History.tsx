import { useLocation, useNavigate } from 'react-router-dom';

import './history.css';
import LeftArrowIcon from '@/icons/LeftArrowIcon';

const History = () => {
  const navigate = useNavigate();
  // const [searchParams] = useSearchParams();
  // const userId = sessionStorage.getItem('id');
  // const id = searchParams.get('id');
  const location = useLocation();
  const { course, description } = location.state || {};

  // const navigateToQuestion = (questionId: string) => {
  //   navigate(`/dashboard/progress/question?id=${id}`, {
  //     state: { course, description, questionId },
  //   });
  // };

  // const { data, isLoading } = useGetAllResultsQuery({});
  // const userResults = data?.response.filter(
  //   (result: { quizId: { _id: string }; userId: { _id: string } }) =>
  //     result.quizId?._id === id && result.userId?._id === userId
  // );

  // const { data: questionsData, isLoading: questionsLoading } =
  //   useGetQuizQuestionQuery(id);

  // const correctAnswersCount = questionsData?.data.reduce(
  //   (acc: number, question: { answer: string; userAnswer: string }) => {
  //     const userAnswer = userResults?.[0]?.answer?.find(
  //       (ans: string) => question.answer === ans
  //     );
  //     return userAnswer === question.answer ? acc + 1 : acc;
  //   },
  //   0
  // );

  // const totalQuestions = questionsData?.data?.length;

  return (
    <div className="history_root">
      <div className="history_header">
        <div className="history_inner_header">
          <div className="history_back_btn" onClick={() => navigate(-1)}>
            <div className="left_arrow_icon">
              <LeftArrowIcon />
            </div>
            Back
          </div>
        </div>
      </div>
      <div className="history_title">
        <div className="img_holder"></div>
        <div style={{ marginLeft: '20px' }}>
          <div className="history_skill_text">{course}</div>
          <div className="history_skill_description">{description}</div>
        </div>
      </div>
      <div className="history_table_container">
        <table className="history_quiz_table">
          <thead>
            <tr>
              <th>Attempt</th>
              <th>Date Taken</th>
              <th>Percentage</th>
              <th>Correct</th>
              <th>Passing Grade</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="history_table_first_data">1</td>
              <td>20/10/2024</td>
              <td>66%</td>
              <td>27/40</td>
              <td>70%</td>
              <td
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                }}
              >
                <div className="history_quiz_status">Pass</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default History;

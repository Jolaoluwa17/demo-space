import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import './history.css';
import LeftArrowIcon from '@/icons/LeftArrowIcon';
import { useGetAllResultsQuery } from '@/services/features/result/resultSlice';
import { useTotalAttemptsQuery } from '@/services/features/quiz/quizSlice';
import { FadeLoader } from 'react-spinners';
import { useEffect } from 'react';

interface Props {
  darkmode: boolean;
}

const History: React.FC<Props> = ({ darkmode }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const userId = sessionStorage.getItem('id');
  const id = searchParams.get('id');
  const location = useLocation();
  const { course, description } = location.state || {};

  const { data, isLoading, isError, refetch } = useGetAllResultsQuery({});
  const userResults =
    data?.response.filter(
      (result: { quizId: { _id: string }; userId: { _id: string } }) =>
        result.quizId?._id === id && result.userId?._id === userId
    ) || [];

  const {
    data: totalAttemptData,
    isLoading: totalAttemptsLoading,
    refetch: refetchTotalAttempts,
    isError: totalAttemptError,
  } = useTotalAttemptsQuery({ userId: userId, quizId: id });

  const attemptsLeft = totalAttemptData?.response?.noOfRetake
    ? 3 - totalAttemptData.response.noOfRetake
    : 0;

  useEffect(() => {
    refetch();
    refetchTotalAttempts();
  }, [location.key, refetch, refetchTotalAttempts]);

  const calculateDisplayedResults = () => {
    const results = [...userResults];

    if (attemptsLeft === 0) {
      // When no attempts left, always show 3 rows total
      while (results.length < 3) {
        results.push({
          createdAt: null,
          score: 0,
        });
      }
    } else {
      // When attempts left, only show completed attempts + remaining attempts
      const totalRowsToShow = results.length + attemptsLeft;
      while (results.length < totalRowsToShow) {
        results.push({
          createdAt: null,
          score: 0,
        });
      }
    }

    return results;
  };

  const displayedResults = calculateDisplayedResults();

  return (
    <div className={`history_root ${darkmode && "history_root_dark"}`}>
      {isLoading || totalAttemptsLoading ? (
        <div className="loading_container">
          <FadeLoader color="#007BFF" />
        </div>
      ) : totalAttemptError || isError ? (
        <div className="nodata_container">
          <img
            src="/images/NoData.jpg"
            alt="No Data"
            style={{ width: '250px', height: '250px' }}
          />
          <div style={{ fontWeight: '600' }}>
            Oops, No history at this time 😭
          </div>
        </div>
      ) : (
        <div>
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
            <div className="history_title_code_text">
              <div className="history_skill_text">
                {course}
                <div className="history_no_of_attempts_left">
                  No. of attempts left:{' '}
                  <span style={{ fontWeight: '600' }}>
                    {totalAttemptError ? 3 : attemptsLeft}
                  </span>
                </div>
              </div>
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
                  <th>Passing Grade</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {displayedResults.map(
                  (
                    data: { createdAt: string | null; score: number },
                    index: number
                  ) => (
                    <tr key={index}>
                      <td className="history_table_first_data">{index + 1}</td>
                      <td>
                        {data.createdAt
                          ? new Date(data.createdAt).toLocaleDateString(
                              'en-US',
                              {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                              }
                            )
                          : 'N/A'}
                      </td>
                      <td>{data.createdAt ? `${data.score}%` : 'N/A'}</td>
                      <td>70%</td>
                      <td
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '100%',
                        }}
                      >
                        <div
                          className="history_quiz_status"
                          style={{
                            borderColor:
                              data.createdAt === null || data.score < 70
                                ? '#FF0000'
                                : '',
                            backgroundColor:
                              data.createdAt === null || data.score < 70
                                ? '#FFEDED'
                                : '',
                          }}
                        >
                          {data.createdAt
                            ? data.score < 70
                              ? 'Fail'
                              : 'Pass'
                            : 'N/A'}
                        </div>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default History;

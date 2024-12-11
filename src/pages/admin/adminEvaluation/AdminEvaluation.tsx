import { IoMdAdd } from 'react-icons/io';
import './adminEvaluation.css';
import NotepadIcon from '@/icons/NotepadIcon';
import { IoMdCheckmark } from 'react-icons/io';
import { BiX } from 'react-icons/bi';
import { SlOptions } from 'react-icons/sl';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import TablePagination from '@/components/tablePagination/TablePagination';
import { useGetAllAssessmentsQuery } from '@/services/features/quiz/quizSlice';
import { useGetAllResultsQuery } from '@/services/features/result/resultSlice';
import { FadeLoader } from 'react-spinners';

const AdminEvaluation = () => {
  const {
    data: assessementData,
    isLoading: assessmentLoading,
    refetch: assessmentRefetch,
  } = useGetAllAssessmentsQuery({});

  const {
    data: resultsData,
    isLoading: resultsLoading,
    refetch: refetchResults,
  } = useGetAllResultsQuery({});

  const highScores =
    resultsData?.response?.filter(
      (result: { score: number }) => result.score >= 70
    ) || [];
  const lowScores =
    resultsData?.response?.filter(
      (result: { score: number }) => result.score < 70
    ) || [];

  const assessmentCount = assessementData?.response?.length || 0;
  const highScoresCount = highScores.length;
  const lowScoresCount = lowScores.length;

  const location = useLocation();

  // refetch data everytime the screen is rendered
  useEffect(() => {
    assessmentRefetch();
    refetchResults();
  }, [location.key, assessmentRefetch, refetchResults]);

  const overviewCards = [
    {
      id: 1,
      icon: <NotepadIcon color="#007BFF" />,
      backgroundColor: '#D5F1F6',
      title: 'Total Evaluation',
      number: assessmentCount,
    },
    {
      id: 2,
      icon: <IoMdCheckmark fontSize={20} color="#16A312" />,
      backgroundColor: '#D0FBD2',
      title: 'Total Pass',
      number: highScoresCount,
    },
    {
      id: 3,
      icon: <BiX fontSize={24} color="#FF0000" />,
      backgroundColor: '#FFCCCC',
      title: 'Total Fail',
      number: lowScoresCount,
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 8;

  const totalPages = Math.ceil(assessementData?.response.length / rowsPerPage);

  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const getPaginatedUsers = () => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    return assessementData?.response.slice(
      startIndex,
      startIndex + rowsPerPage
    );
  };

  const countParticipants = (quizId: string) => {
    // Filter results by quiz ID and return the count
    return (
      resultsData?.response?.filter(
        (result: { quizId: { _id: string } }) => result.quizId._id === quizId
      ).length || 0
    );
  };

  const calculatePassRate = (quizId: string) => {
    const quizResults =
      resultsData?.response?.filter(
        (result: { quizId: { _id: string } }) => result.quizId._id === quizId
      ) || [];

    const totalParticipants = quizResults.length;
    const passCount = quizResults.filter(
      (result: { score: number }) => result.score >= 70
    ).length;

    return totalParticipants > 0
      ? ((passCount / totalParticipants) * 100).toFixed(2) + '%'
      : '0.00%';
  };

  const navigate = useNavigate();

  const handleCardClick = (id: string, course: string) => {
    navigate(`evaluation-details?id=${id}`, {
      state: { course },
    });
  };

  return (
    <div className="admin_evaluation_root">
      <div className="metrics_overview">
        <div className="top_navigation">
          <div className="metrics_title">Metrics</div>
          <div
            className="create_evalution_btn"
            onClick={() => navigate('create-evaluation')}
          >
            <IoMdAdd style={{ marginRight: '5px' }} fontSize={18} />
            Create Evaluation
          </div>
        </div>
        <div className="admin_evaluation_overview_content">
          {overviewCards.map((card) => (
            <div key={card.id} className="admin_overview_card">
              <div
                className="admin_overview_icon"
                style={{ backgroundColor: card.backgroundColor }}
              >
                {card.icon}
              </div>
              <div className="admin_overview_text">
                <div className="admin_overview_text_tag">{card.title}</div>
                <div className="admin_overview_no">{card.number}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {assessmentLoading || resultsLoading ? (
        <div className="loadingData">
          <FadeLoader color="#007BFF" />
        </div>
      ) : assessementData?.response.length === 0 ? (
        <div className="nodata_container">
          <img
            src="/images/NoData.png"
            alt=""
            style={{ width: '250px', height: '250px' }}
          />
          <div style={{ fontWeight: '600' }}>Oops, No Data Avaliable</div>
        </div>
      ) : (
        <div className="admin_evaluation_table">
          <table>
            <thead>
              <tr>
                <th style={{ borderTopLeftRadius: '12px' }}>Evaluation Name</th>
                <th>Participants</th>
                <th>Pass Rate</th>
                <th style={{ borderTopRightRadius: '12px' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {getPaginatedUsers().map(
                (
                  user: {
                    _id: string;
                    course: string;
                    duration: number;
                    category: string;
                  },
                  index: number
                ) => (
                  <tr key={index}>
                    <td>{user.course}</td>
                    <td>{countParticipants(user._id)}</td>
                    <td>{calculatePassRate(user._id)}</td>
                    <td style={{ paddingLeft: '3.3%' }}>
                      <SlOptions
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleCardClick(user._id, user.course)}
                      />
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
          <TablePagination
            currentPage={currentPage}
            data={assessementData?.response}
            handlePageClick={handlePageClick}
            totalPages={totalPages}
            rowsPerPage={rowsPerPage}
          />
        </div>
      )}
    </div>
  );
};

export default AdminEvaluation;

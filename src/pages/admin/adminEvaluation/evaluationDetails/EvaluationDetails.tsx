import './evaluationDetails.css';
import { useEffect, useState } from 'react';
import { AiOutlineEdit } from 'react-icons/ai';
import SearchInput from '@/components/searchinput/SearchInput';
import { FaArrowLeftLong } from 'react-icons/fa6';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import TablePagination from '@/components/tablePagination/TablePagination';
import { useGetAllResultsQuery } from '@/services/features/result/resultSlice';
import CustomSelect from '@/components/customselect/CustomSelect';
import { FadeLoader } from 'react-spinners';

// Define the Result interface
interface Result {
  quizId: string;
  userId: {
    fullName: string;
    email: string;
  } | null;
  score: number;
}

const gradeList = ['All', 'Passed', 'Failed'];

const EvaluationDetails = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
  const location = useLocation();
  const { course } = location.state || {};
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 8;
  const [filterGrade, setFilterGrade] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const navigate = useNavigate();

  const handleEditEvaluation = () => {
    navigate(`/admin/dashboard/evaluation/create-evaluation?id=${id}`);
  };

  const {
    data: resultsData,
    refetch: refetchResults,
    isLoading,
  } = useGetAllResultsQuery({});

  // Refetch data every time the screen is rendered
  useEffect(() => {
    refetchResults();
  }, [location.key, refetchResults]);

  // Filter results by quizId and non-null userId
  const filteredResults = resultsData?.response.filter(
    (result: Result) => result.quizId === id && result.userId !== null
  );

  // Apply grade filter
  const applyGradeFilter = (data: Result[]): Result[] => {
    if (filterGrade === 'Passed') {
      return data.filter((user) => user.score > 69);
    }
    if (filterGrade === 'Failed') {
      return data.filter((user) => user.score <= 69);
    }
    return data;
  };

  // Apply search filter
  const applySearchFilter = (data: Result[]): Result[] => {
    if (searchTerm.trim()) {
      return data.filter(
        (user) =>
          user.userId?.fullName
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          user.userId?.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return data;
  };

  // Combine filters
  const getFilteredUsers = (): Result[] => {
    let filtered = filteredResults || [];
    filtered = applyGradeFilter(filtered);
    filtered = applySearchFilter(filtered);
    return filtered;
  };

  // Paginate results
  const getPaginatedUsers = (): Result[] => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    return getFilteredUsers().slice(startIndex, startIndex + rowsPerPage);
  };

  return (
    <div className="evaluation_details_root">
      <div className="evaluation_details_header">
        <div className="top_navigation">
          <div className="title">
            <FaArrowLeftLong
              style={{ marginRight: '15px', cursor: 'pointer' }}
              fontSize={15}
              onClick={() => navigate('/admin/dashboard/evaluation')}
            />
            {course}
          </div>
          <div>
            <CustomSelect
              options={gradeList}
              value={filterGrade}
              onChange={(value) => setFilterGrade(value)}
              minWidth="100px"
            />
          </div>
          <div className="edit_evaluation_btn" onClick={handleEditEvaluation}>
            <AiOutlineEdit fontSize={20} style={{ marginRight: '5px' }} />
            Edit Evaluation
          </div>
        </div>
        <div className="bottom_navigation">
          <div className="evaluation_details_search">
            <SearchInput handleSearch={(value) => setSearchTerm(value)} />
          </div>
        </div>
      </div>
      {isLoading ? (
        <div className="loadingData">
          <FadeLoader color="#007BFF" />
        </div>
      ) : resultsData?.response.length === 0 ? (
        <div className="nodata_container">
          <img
            src="/images/NoData.png"
            alt=""
            style={{ width: '250px', height: '250px' }}
          />
          <div style={{ fontWeight: '600' }}>Oops, No Data Available</div>
        </div>
      ) : (
        <div className="evaluation_details_table">
          <table>
            <thead>
              <tr>
                <th>User ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Score</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {getPaginatedUsers().map((user, index) => (
                <tr key={index}>
                  <td>{String(index + 1).padStart(3, '0')}</td>
                  <td>{user.userId?.fullName}</td>
                  <td>{user.userId?.email}</td>
                  <td>{user.score?.toFixed(2)}</td>
                  <td>{user.score > 69 ? 'Passed' : 'Failed'}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <TablePagination
            currentPage={currentPage}
            data={getFilteredUsers()}
            handlePageClick={handlePageClick}
            totalPages={Math.ceil(getFilteredUsers().length / rowsPerPage)}
            rowsPerPage={rowsPerPage}
          />
        </div>
      )}
    </div>
  );
};

export default EvaluationDetails;

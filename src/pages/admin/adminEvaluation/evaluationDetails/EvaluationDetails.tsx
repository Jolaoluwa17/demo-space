import LeftArrowIcon from '@/icons/LeftArrowIcon';
import './evaluationDetails.css';
import RightArrowIcon from '@/icons/RightArrowIcon';
import { useState } from 'react';
import CustomSelect from '@/components/customselect/CustomSelect';
import { AiOutlineEdit } from 'react-icons/ai';
import SearchInput from '@/components/searchinput/SearchInput';
import { evaluationDetailsData } from '@/utils/evaluationDetailsData';
import { FaArrowLeftLong } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import TablePagination from '@/components/tablePagination/TablePagination';

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
const currentYear = new Date().getFullYear();
const currentMonthIndex = new Date().getMonth();
const years = Array.from({ length: currentYear - 2020 + 1 }, (_, i) =>
  (2020 + i).toString()
);

const EvaluationDetails = () => {
  const [isYear, setYear] = useState(currentYear.toString());
  const [currentMonth, setCurrentMonth] = useState(currentMonthIndex);
  const handlePreviousMonth = () => {
    setCurrentMonth((prev) => {
      if (prev === 0) {
        // If January (0), wrap to December (11) and decrease the year
        setYear((prevYear) => (parseInt(prevYear) - 1).toString());
        return 11; // December
      }
      return prev - 1; // Just decrease the month
    });
  };

  // Function to go to the next month
  const handleNextMonth = () => {
    setCurrentMonth((prev) => {
      if (parseInt(isYear) === currentYear && prev === currentMonthIndex) {
        // Prevent moving past the current month if the year matches the current year
        return prev;
      }
      if (prev === 11) {
        // If December (11), wrap to January (0) and increase the year
        setYear((prevYear) => (parseInt(prevYear) + 1).toString());
        return 0; // January
      }
      return prev + 1; // Just increase the month
    });
  };

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 8;

  const totalPages = Math.ceil(evaluationDetailsData.length / rowsPerPage);

  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const getPaginatedUsers = () => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    return evaluationDetailsData.slice(startIndex, startIndex + rowsPerPage);
  };

  const navigate = useNavigate();

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
            Front End Evaluation
          </div>
          <div className="month_year_filter">
            <div className="left_month_controls" onClick={handlePreviousMonth}>
              <LeftArrowIcon />
            </div>
            <div className="right_month_controls" onClick={handleNextMonth}>
              <RightArrowIcon />
            </div>
            <div className="month_indicator">{monthNames[currentMonth]}</div>
            <CustomSelect
              options={years}
              value={isYear}
              onChange={setYear}
              placeholder="Year"
            />
          </div>
          <div className="edit_evaluation_btn">
            <AiOutlineEdit fontSize={20} style={{ marginRight: '5px' }} />
            Edit Evaluation
          </div>
        </div>
        <div className="bottom_navigation">
          <div className="evaluation_details_search">
            <SearchInput handleSearch={() => ''} />
          </div>
        </div>
      </div>
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
                <td>{user.userId}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.score}</td>
                <td>{user.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <TablePagination
          currentPage={currentPage}
          data={evaluationDetailsData}
          handlePageClick={handlePageClick}
          totalPages={totalPages}
          rowsPerPage={rowsPerPage}
        />
      </div>
    </div>
  );
};

export default EvaluationDetails;

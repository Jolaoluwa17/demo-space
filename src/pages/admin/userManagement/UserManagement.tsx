import './userManagement.css';
import RightArrowIcon from '@/icons/RightArrowIcon';
import LeftArrowIcon from '@/icons/LeftArrowIcon';
import CustomSelect from '@/components/customselect/CustomSelect';
import { useState } from 'react';
import SearchInput from '@/components/searchinput/SearchInput';
import { sampleUserManagement } from '@/utils/sampleUserManagement';
import { useNavigate } from 'react-router-dom';
import { IoMdAdd } from 'react-icons/io';
import TablePagination from '@/components/tablePagination/TablePagination';

const currentYear = new Date().getFullYear();
const currentMonthIndex = new Date().getMonth();
const years = Array.from({ length: currentYear - 2020 + 1 }, (_, i) =>
  (2020 + i).toString()
);

const UserManagement = () => {
  const [isYear, setYear] = useState(currentYear.toString());
  const [currentMonth, setCurrentMonth] = useState(currentMonthIndex);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 8;

  const totalPages = Math.ceil(sampleUserManagement.length / rowsPerPage);

  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

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

  const getPaginatedUsers = () => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    return sampleUserManagement.slice(startIndex, startIndex + rowsPerPage);
  };

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

  const navigate = useNavigate();

  return (
    <div className="user_management_root">
      <div className="user_management_overview">
        <div className="top_navigation">
          <div className="title">View All Users</div>
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
          <div
            className="create_user_btn"
            onClick={() => navigate('create-user')}
          >
            <IoMdAdd style={{ marginRight: '5px' }} fontSize={18} />
            Create User
          </div>
        </div>
        <div className="bottom_navigation">
          <div className="user_management_search">
            <SearchInput handleSearch={() => ''} />
          </div>
        </div>
      </div>
      <div className="user_management_table">
        <table>
          <thead>
            <tr>
              <th style={{ borderTopLeftRadius: '12px' }}>User ID</th>
              <th>Signup Date</th>
              <th>Name</th>
              <th>Email</th>
              <th style={{ borderTopRightRadius: '12px' }}>Last Login</th>
            </tr>
          </thead>
          <tbody>
            {getPaginatedUsers().map((user, index) => (
              <tr
                key={index}
                onClick={() => navigate('user-details')}
                style={{ cursor: 'pointer' }}
              >
                <td>{user.userId}</td>
                <td>{user.signupDate}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.lastLogin}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <TablePagination
          currentPage={currentPage}
          data={sampleUserManagement}
          handlePageClick={handlePageClick}
          totalPages={totalPages}
          rowsPerPage={rowsPerPage}
        />
      </div>
    </div>
  );
};

export default UserManagement;

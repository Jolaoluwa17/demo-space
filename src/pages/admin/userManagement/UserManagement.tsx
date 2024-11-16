import './userManagement.css';
import { useState } from 'react';
import SearchInput from '@/components/searchinput/SearchInput';
import { sampleUserManagement } from '@/utils/sampleUserManagement';
import { useNavigate } from 'react-router-dom';
import { IoMdAdd } from 'react-icons/io';
import TablePagination from '@/components/tablePagination/TablePagination';
import SortFilter from '@/components/sortFilter/SortFilter';
import DateFilter from '@/components/dateFilter/DateFilter';

type User = {
  userId: string;
  signupDate: string;
  name: string;
  email: string;
  lastLogin: string;
};

const currentYear = new Date().getFullYear();
const currentMonthIndex = new Date().getMonth();
const years = Array.from({ length: currentYear - 2020 + 1 }, (_, i) =>
  (2020 + i).toString()
);

const UserManagement = () => {
  const [isYear, setYear] = useState(currentYear.toString());
  const [currentMonth, setCurrentMonth] = useState(currentMonthIndex);
  const [currentPage, setCurrentPage] = useState(1);
  const [sort, setSort] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const rowsPerPage = 8;
  const totalPages = Math.ceil(sampleUserManagement.length / rowsPerPage);

  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const sortData = [
    { name: 'By date', key: 'signupDate' },
    { name: 'By name', key: 'name' },
    { name: 'By email', key: 'email' },
  ];

  const getSortedUsers = () => {
    const sortKey = sortData.find((item) => item.name === selectedFilter)
      ?.key as keyof User;
    if (!sortKey) return sampleUserManagement;

    const sortedData = [...sampleUserManagement].sort((a, b) => {
      const aValue = a[sortKey];
      const bValue = b[sortKey];

      if (sortOrder === 'asc') {
        return aValue.localeCompare(bValue);
      } else {
        return bValue.localeCompare(aValue);
      }
    });

    return sortedData;
  };

  const getPaginatedUsers = () => {
    const sortedUsers = getSortedUsers();
    const startIndex = (currentPage - 1) * rowsPerPage;
    return sortedUsers.slice(startIndex, startIndex + rowsPerPage);
  };

  const navigate = useNavigate();

  return (
    <div className="user_management_root">
      <div className="user_management_overview">
        <div className="top_navigation">
          <div className="title">View All Users</div>
          <DateFilter
            isYear={isYear}
            setYear={setYear}
            currentMonth={currentMonth}
            setCurrentMonth={setCurrentMonth}
            currentYear={currentYear}
            currentMonthIndex={currentMonthIndex}
            years={years}
          />
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
          <SortFilter
            selectedFilter={selectedFilter}
            setSelectedFilter={setSelectedFilter}
            sort={sort}
            setSort={setSort}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
            sortData={sortData}
          />
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

import './userManagement.css';
import { useEffect, useState } from 'react';
import SearchInput from '@/components/searchinput/SearchInput';
import { useLocation, useNavigate } from 'react-router-dom';
import TablePagination from '@/components/tablePagination/TablePagination';
import SortFilter from '@/components/sortFilter/SortFilter';
import DateFilter from '@/components/dateFilter/DateFilter';
import { useGetAllUserQuery } from '@/services/features/user/userSlice';
import { FadeLoader } from 'react-spinners';
import { IoCheckmarkDone } from 'react-icons/io5';
import { HiOutlineXMark } from 'react-icons/hi2';

type User = {
  _id: string;
  createdAt: string;
  fullName: string;
  email: string;
  status: boolean;
};

const currentYear = new Date().getFullYear();
const currentMonthIndex = new Date().getMonth();
const years = Array.from({ length: currentYear - 2020 + 1 }, (_, i) =>
  (2020 + i).toString()
);

const UserManagement = () => {
  const { data, isLoading, refetch } = useGetAllUserQuery({});
  const location = useLocation();

  const [isYear, setYear] = useState('All'); // 'All' as default year
  const [currentMonth, setCurrentMonth] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [sort, setSort] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    refetch();
  }, [location.key, refetch]);

  const rowsPerPage = 8;
  const totalPages = Math.ceil(data?.response.length / rowsPerPage);

  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const sortData = [
    { name: 'By date', key: 'createdAt' },
    { name: 'By name', key: 'fullName' },
    { name: 'By email', key: 'email' },
  ];

  const getSortedUsers = () => {
    const sortKey = sortData.find((item) => item.name === selectedFilter)
      ?.key as keyof User;

    // If sortKey is not found, return the data as is
    if (!sortKey) return data?.response;

    const sortedData = [...(data?.response || [])].sort((a, b) => {
      const aValue = a[sortKey] ?? '';
      const bValue = b[sortKey] ?? '';

      // Ensure that both values are strings before calling localeCompare
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        if (sortOrder === 'asc') {
          return aValue.localeCompare(bValue);
        } else {
          return bValue.localeCompare(aValue);
        }
      }

      return 0;
    });

    return sortedData;
  };

  const getFilteredUsers = () => {
    const sortedUsers = getSortedUsers();

    return sortedUsers.filter((user: User) => {
      const fullName = user.fullName ? user.fullName.toLowerCase() : '';
      const email = user.email ? user.email.toLowerCase() : '';
      const createdAt = new Date(user.createdAt);

      // Year filter: Show all data if "All" is selected, otherwise filter by selected year
      const yearMatch =
        isYear === 'All' ? true : createdAt.getFullYear().toString() === isYear;

      // Month filter: Show all data if "All" is selected, otherwise filter by selected month
      const monthMatch =
        currentMonth === 'All'
          ? true
          : createdAt.getMonth() === parseInt(currentMonth);

      // Search filter
      const searchMatch =
        fullName.includes(searchQuery.toLowerCase()) ||
        email.includes(searchQuery.toLowerCase());

      return yearMatch && monthMatch && searchMatch;
    });
  };

  const getPaginatedUsers = () => {
    const filteredUsers = getFilteredUsers();
    const startIndex = (currentPage - 1) * rowsPerPage;
    return filteredUsers.slice(startIndex, startIndex + rowsPerPage);
  };

  const navigate = useNavigate();

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

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
            onClick={() => navigate('view-admin')}
          >
            View Admin
          </div>
        </div>
        <div className="bottom_navigation">
          <div className="user_management_search">
            <SearchInput handleSearch={handleSearch} />
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
      {isLoading ? (
        <div className="loadingData">
          <FadeLoader color="#007BFF" />
        </div>
      ) : data?.response.length === 0 ? (
        <div className="nodata_container">
          <img
            src="/images/NoData.png"
            alt=""
            style={{ width: '250px', height: '250px' }}
          />
          <div style={{ fontWeight: '600' }}>Oops, No Data Avaliable</div>
        </div>
      ) : (
        <div className="user_management_table">
          <table>
            <thead>
              <tr>
                <th style={{ borderTopLeftRadius: '12px' }}>User ID</th>
                <th>Signup Date</th>
                <th>Name</th>
                <th>Email</th>
                <th style={{ borderTopRightRadius: '12px' }}>Verified</th>
              </tr>
            </thead>
            <tbody>
              {getPaginatedUsers().map((user: User, index: number) => (
                <tr
                  key={index}
                  onClick={() => navigate(`user-details?id=${user._id}`)}
                  style={{ cursor: 'pointer' }}
                >
                  <td>{String(index + 1).padStart(3, '0')}</td>
                  <td>
                    {new Date(user.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </td>
                  <td>{user.fullName}</td>
                  <td>{user.email}</td>
                  <td>
                    <div
                      style={{
                        color:
                          user.status === true
                            ? 'green'
                            : user.status === false
                              ? 'red'
                              : '#FFFCE7',
                        fontSize: '16px',
                        fontWeight: '550',
                      }}
                    >
                      {user.status === true ? (
                        <IoCheckmarkDone size={18} />
                      ) : (
                        <HiOutlineXMark size={18} />
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <TablePagination
            currentPage={currentPage}
            data={data?.response}
            handlePageClick={handlePageClick}
            totalPages={totalPages}
            rowsPerPage={rowsPerPage}
          />
        </div>
      )}
    </div>
  );
};

export default UserManagement;

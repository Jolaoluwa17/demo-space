import NotepadIcon from '@/icons/NotepadIcon';
import './skillGapProgram.css';
import { IoMdCheckmark } from 'react-icons/io';
import { useState } from 'react';
import { adminSkillGapProgramData } from '@/utils/adminSkillGapProgramData';
import { useNavigate } from 'react-router-dom';
import TablePagination from '@/components/tablePagination/TablePagination';
import SearchInput from '@/components/searchinput/SearchInput';
import DateFilter from '@/components/dateFilter/DateFilter';
import SortFilter from '@/components/sortFilter/SortFilter';

const currentYear = new Date().getFullYear();
const currentMonthIndex = new Date().getMonth();
const years = Array.from({ length: currentYear - 2020 + 1 }, (_, i) =>
  (2020 + i).toString()
);

const SkillGapProgram = () => {
  const [isYear, setYear] = useState(currentYear.toString());
  const [currentMonth, setCurrentMonth] = useState(currentMonthIndex);
  const overviewCards = [
    {
      id: 1,
      icon: <NotepadIcon color="#4274BA" />,
      backgroundColor: '#D5F1F6',
      title: 'Total Talent pool members',
      number: 50,
    },
    {
      id: 2,
      icon: <IoMdCheckmark fontSize={20} color="#16A312" />,
      backgroundColor: '#D0FBD2',
      title: 'Skill Gap programs ',
      number: 15,
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 8;

  const totalPages = Math.ceil(adminSkillGapProgramData.length / rowsPerPage);

  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const getPaginatedUsers = () => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    return adminSkillGapProgramData.slice(startIndex, startIndex + rowsPerPage);
  };

  const navigate = useNavigate();

  const [sort, setSort] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const sortData = [
    { name: 'By date', key: 'signupDate' },
    { name: 'By name', key: 'name' },
    { name: 'By email', key: 'email' },
  ];

  return (
    <div className="skill_gap_program_root">
      <div className="skill_gap_program_overview">
        <div className="top_navigation">
          <div className="title">Metrics</div>
          <div
            className="view_programs_btn"
            onClick={() => navigate('programs')}
          >
            View Programs
          </div>
        </div>
        <div className="skill_gap_program_overview_content">
          {overviewCards.map((card) => (
            <div key={card.id} className="skill_gap_program_card">
              <div
                className="skill_gap_program_icon"
                style={{ backgroundColor: card.backgroundColor }}
              >
                {card.icon}
              </div>
              <div className="skill_gap_program_text">
                <div className="skill_gap_program_text_tag">{card.title}</div>
                <div className="skill_gap_program_no">{card.number}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="skill_gap_program_table">
        <div className="top_filters_navigation">
          <div className="serach_input_tag">
            <SearchInput handleSearch={() => ''} />
          </div>
          <DateFilter
            isYear={isYear}
            setYear={setYear}
            currentMonth={currentMonth}
            setCurrentMonth={setCurrentMonth}
            currentYear={currentYear}
            currentMonthIndex={currentMonthIndex}
            years={years}
          />
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
        <table>
          <thead>
            <tr>
              <th>User ID</th>
              <th>Name</th>
              <th>Program</th>
              <th>Email</th>
              <th>Date</th>
              <th>Status</th>
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
                <td>{user.name}</td>
                <td>{user.program}</td>
                <td>{user.email}</td>
                <td>{user.date}</td>
                <td style={{ padding: '0px' }}>
                  <div
                    style={{
                      border:
                        user.status === 'Accepted'
                          ? '1px solid #00FF00'
                          : user.status === 'Rejected'
                            ? '1px solid #FF0000'
                            : '1px solid #FFDD00',
                      backgroundColor:
                        user.status === 'Accepted'
                          ? '#EDFFED'
                          : user.status === 'Rejected'
                            ? '#FFF4F4'
                            : '#FFFCE7',
                    }}
                    className="status_column"
                  >
                    {user.status}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <TablePagination
          currentPage={currentPage}
          data={adminSkillGapProgramData}
          handlePageClick={handlePageClick}
          totalPages={totalPages}
          rowsPerPage={rowsPerPage}
        />
      </div>
    </div>
  );
};

export default SkillGapProgram;

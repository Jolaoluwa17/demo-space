import NotepadIcon from '@/icons/NotepadIcon';
import './skillGapProgram.css';
import { IoMdCheckmark } from 'react-icons/io';
import { useState } from 'react';
import { adminSkillGapProgramData } from '@/utils/adminSkillGapProgramData';
import { useNavigate } from 'react-router-dom';
import TablePagination from '@/components/tablePagination/TablePagination';

const SkillGapProgram = () => {
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
        <table>
          <thead>
            <tr>
              <th>User ID</th>
              <th>Name</th>
              <th>Program</th>
              <th>Email</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {getPaginatedUsers().map((user, index) => (
              <tr key={index}>
                <td>{user.userId}</td>
                <td>{user.name}</td>
                <td>{user.program}</td>
                <td>{user.email}</td>
                <td>{user.score}</td>
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

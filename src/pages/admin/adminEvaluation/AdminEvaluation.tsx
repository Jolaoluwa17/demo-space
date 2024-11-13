import { IoMdAdd } from 'react-icons/io';
import './adminEvaluation.css';
import NotepadIcon from '@/icons/NotepadIcon';
import { IoMdCheckmark } from 'react-icons/io';
import { BiX } from 'react-icons/bi';
import { SlOptions } from 'react-icons/sl';
import { adminEvaluationData } from '@/utils/adminEvaluationData';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TablePagination from '@/components/tablePagination/TablePagination';

const AdminEvaluation = () => {
  const overviewCards = [
    {
      id: 1,
      icon: <NotepadIcon color="#4274BA" />,
      backgroundColor: '#D5F1F6',
      title: 'Total Evaluation',
      number: 2000,
    },
    {
      id: 2,
      icon: <IoMdCheckmark fontSize={20} color="#16A312" />,
      backgroundColor: '#D0FBD2',
      title: 'Total Pass',
      number: 1500,
    },
    {
      id: 3,
      icon: <BiX fontSize={24} color="#FF0000" />,
      backgroundColor: '#FFCCCC',
      title: 'Total Fail',
      number: 300,
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 8;

  const totalPages = Math.ceil(adminEvaluationData.length / rowsPerPage);

  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const getPaginatedUsers = () => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    return adminEvaluationData.slice(startIndex, startIndex + rowsPerPage);
  };

  const navigate = useNavigate();

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
            {getPaginatedUsers().map((user, index) => (
              <tr
                key={index}
                onClick={() => navigate('evaluation-details')}
                style={{ cursor: 'pointer' }}
              >
                <td>{user.evaluationName}</td>
                <td>{user.participants}</td>
                <td>{user.passRate}</td>
                <td style={{ paddingLeft: '3.3%' }}>
                  <SlOptions style={{ cursor: 'pointer' }} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <TablePagination
          currentPage={currentPage}
          data={adminEvaluationData}
          handlePageClick={handlePageClick}
          totalPages={totalPages}
          rowsPerPage={rowsPerPage}
        />
      </div>
    </div>
  );
};

export default AdminEvaluation;

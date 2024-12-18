import React from 'react';

import './pagination.css';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
}

const Pagination: React.FC<PaginationProps> = ({ totalPages, currentPage }) => {
  const renderCircles = () => {
    const elements = [];
    for (let i = 1; i <= totalPages; i++) {
      elements.push(
        <React.Fragment key={`circle-${i}`}>
          <div className={`circle ${i === currentPage ? 'active' : ''}`}>
            {i}
          </div>
          {i < totalPages && <div className="line"></div>}
        </React.Fragment>
      );
    }
    return elements;
  };

  return <div className="pagination-container">{renderCircles()}</div>;
};

export default Pagination;

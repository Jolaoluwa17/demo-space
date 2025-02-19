import React from "react";
import { IoMdCheckmark } from "react-icons/io";

import "./pagination.css";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
}

const Pagination: React.FC<PaginationProps> = ({ totalPages, currentPage }) => {
  const renderCircles = () => {
    const elements = [];
    for (let i = 1; i <= totalPages; i++) {
      const isCompleted = i < currentPage;
      const isActive = i === currentPage;

      elements.push(
        <React.Fragment key={`circle-${i}`}>
          <div className={`circle ${isActive ? "active" : ""} ${isCompleted ? "completed" : ""}`}>
            {isCompleted ? <IoMdCheckmark className="check-icon" /> : i}
          </div>
          {i < totalPages && (
            <div className={`line ${isCompleted ? "completed-line" : ""}`}></div>
          )}
        </React.Fragment>
      );
    }
    return elements;
  };

  return <div className="pagination-container">{renderCircles()}</div>;
};

export default Pagination;

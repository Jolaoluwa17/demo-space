import './tablePagination.css';

interface Props {
  currentPage: number;
  data: Array<any>; // Assuming this is an array of objects, you can further define a specific type if the data structure is known.
  handlePageClick: (page: number) => void;
  totalPages: number;
  rowsPerPage: number;
}

const TablePagination: React.FC<Props> = ({
  currentPage,
  data,
  handlePageClick,
  totalPages,
  rowsPerPage,
}) => {
  return (
    <div className="table_pagination_root">
      <div className="table_pagination_details">
        Showing {currentPage} to{' '}
        {Math.min(currentPage * rowsPerPage, data.length)} of {data.length}{' '}
        entries
      </div>
      <div className="table_pagination_main">
        {/* Always show the first page */}
        <div
          className={`table_pagination_controls ${currentPage === 1 ? 'active' : ''}`}
          onClick={() => handlePageClick(1)}
        >
          1
        </div>

        {/* Show dots if currentPage > 3 to indicate skipped pages */}
        {currentPage > 3 && <div className="pagination_dots">...</div>}

        {/* Display current, previous, and next pages without showing 1 or the last page again */}
        {Array.from({ length: 3 }, (_, i) => currentPage - 1 + i)
          .filter((page) => page > 1 && page < totalPages)
          .map((page) => (
            <div
              key={page}
              className={`table_pagination_controls ${currentPage === page ? 'active' : ''}`}
              onClick={() => handlePageClick(page)}
            >
              {page}
            </div>
          ))}

        {/* Show dots if currentPage is far from the last page */}
        {currentPage < totalPages - 2 && (
          <div className="pagination_dots">...</div>
        )}

        {/* Show the last page only if it's different from the first page */}
        {totalPages > 1 && currentPage !== totalPages && (
          <div
            className={`table_pagination_controls ${currentPage === totalPages ? 'active' : ''}`}
            onClick={() => handlePageClick(totalPages)}
          >
            {totalPages}
          </div>
        )}
      </div>
    </div>
  );
};

export default TablePagination;

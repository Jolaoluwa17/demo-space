import './tablePagination.css';

interface Props<T> {
  currentPage: number;
  data: T[]; // Use generic type T instead of any
  handlePageClick: (page: number) => void;
  totalPages: number;
  rowsPerPage: number;
}

const TablePagination = <T,>({
  currentPage,
  data,
  handlePageClick,
  totalPages,
  rowsPerPage,
}: Props<T>) => {
  const getPaginationRange = () => {
    const range = [];

    // Always show the first page
    range.push(1);

    // Add "..." if the current page is more than 3 away from the first page
    if (currentPage > 3) range.push('...');

    // Add the range of pages around the current page
    for (let i = currentPage - 1; i <= currentPage + 1; i++) {
      if (i > 1 && i < totalPages) range.push(i);
    }

    // Add "..." if the current page is more than 2 pages away from the last page
    if (currentPage < totalPages - 2) range.push('...');

    // Always show the last page if it's not the same as the first page or the current page
    if (
      totalPages > 1 &&
      currentPage !== totalPages &&
      !range.includes(totalPages)
    ) {
      range.push(totalPages);
    }

    return range;
  };

  return (
    <div className="table_pagination_root">
      <div className="table_pagination_details">
        Showing {currentPage} to{' '}
        {Math.min(currentPage * rowsPerPage, data.length)} of {data.length}{' '}
        entries
      </div>
      <div className="table_pagination_main">
        {/* Generate pagination buttons based on the range */}
        {getPaginationRange().map((page, index) => (
          <div
            key={index}
            className={`table_pagination_controls ${
              page === currentPage ? 'active' : ''
            } ${page === '...' ? 'dots' : ''}`}
            onClick={() => {
              if (page !== '...') {
                handlePageClick(page as number); // Cast '...' to number when clicked
              }
            }}
          >
            {page}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TablePagination;

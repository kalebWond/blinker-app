import React from "react";

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  maxVisible = 7,
}) => {
  const getPageNumbers = () => {
    const pages = [];
    const half = Math.floor(maxVisible / 2);
    let start = Math.max(1, currentPage - half);
    let end = Math.min(totalPages, currentPage + half);

    if (end - start + 1 < maxVisible) {
      if (start === 1) {
        end = Math.min(totalPages, start + maxVisible - 1);
      } else if (end === totalPages) {
        start = Math.max(1, end - maxVisible + 1);
      }
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  const pages = getPageNumbers();

  return (
    <div className="pagination">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className=""
      >
        Prev
      </button>

      {startEllipsis()}

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={page === currentPage ? "current-page" : ""}
        >
          {page}
        </button>
      ))}

      {endEllipsis()}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className=""
      >
        Next
      </button>
    </div>
  );

  function startEllipsis() {
    if (pages[0] > 1) {
      return (
        <>
          <button
            onClick={() => onPageChange(1)}
            className="px-3 py-1 border rounded"
          >
            1
          </button>
          {pages[0] > 2 && <span>...</span>}
        </>
      );
    }
    return null;
  }

  function endEllipsis() {
    if (pages[pages.length - 1] < totalPages) {
      return (
        <>
          {pages[pages.length - 1] < totalPages - 1 && <span>...</span>}
          <button
            onClick={() => onPageChange(totalPages)}
            className="px-3 py-1 border rounded"
          >
            {totalPages}
          </button>
        </>
      );
    }
    return null;
  }
};

export default Pagination;

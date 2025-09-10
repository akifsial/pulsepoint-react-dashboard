import React from "react";

interface PaginationProps {
  currentPage: number;
  totalRows: number;
  rowsPerPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalRows,
  rowsPerPage,
  onPageChange,
}) => {
  // const totalPages = Math.ceil(totalRows / rowsPerPage);
  const totalPages = Math.ceil((totalRows || 0) / rowsPerPage);


  const getPageNumbers = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);

      if (currentPage > 4) pages.push("...");

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) pages.push(i);

      if (currentPage < totalPages - 3) pages.push("...");

      pages.push(totalPages);
    }

    return pages;
  };

  const pages = getPageNumbers();

  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <div className="bg-[#f5f7fb] flex md:justify-between justify-center md:pt-0 pt-4 flex-wrap  items-center ps-[24px] pe-[24px]">
      <div>
        {/* <p className="font-medium text-[14px]">
          Showing {currentPage * rowsPerPage - rowsPerPage + 1} to{" "}
          {currentPage * rowsPerPage} of {totalRows} entries
        </p> */}
         <p className="font-medium text-[14px]">
          Showing {currentPage} to {" "}
          {totalPages} of {totalRows} entries
        </p>
      </div>
      <div className="flex flex-wrap md:gap-2 gap-1 items-center py-4 ">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className="text-gray-600 px-2 cursor-pointer disabled:opacity-50"
        >
          Prev
        </button>

        {pages.map((page) =>
          page === "..." ? (
            <span key={page} className="px-2 text-gray-500">
              ...
            </span>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(Number(page))}
              className={`sm:w-8 w-5 h-8 sm:h-8 rounded cursor-pointer ${
                currentPage === page
                  ? "bg-[#003CA6] text-white"
                  : "text-black hover:bg-blue-100"
              }`}
            >
              {page}
            </button>
          )
        )}

        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="text-blue-600 px-2 cursor-pointer disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;

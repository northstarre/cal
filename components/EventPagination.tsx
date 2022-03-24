// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import React from "react";

export default function EventPagination({ eventsPerPage, totalEvents, paginate, currPage }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalEvents / eventsPerPage); i++) {
    pageNumbers.push(i);
  }

  // console.log(eventsPerPage, totalEvents, pageNumbers, currPage);

  return (
    totalEvents > eventsPerPage && (
      <>
        <div className="flex items-center justify-between  bg-white px-4 py-3 sm:px-6">
          <div className="hidden items-center justify-center sm:flex sm:flex-1">
            <div>
              <nav
                className="relative z-0 inline-flex -space-x-px rounded-md shadow-sm"
                aria-label="Pagination">
                <span className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 "></span>

                {pageNumbers.map((num) => (
                  <a
                    onClick={() => paginate(num)}
                    key={num}
                    className={
                      currPage == num
                        ? "relative z-10 inline-flex items-center border border-[#379392] bg-[#ebf4f4] px-4 py-2 text-sm font-medium text-[#272d67]"
                        : "relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:cursor-pointer hover:bg-gray-50"
                    }>
                    {num}
                  </a>
                ))}
                {/* Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" */}

                <span className="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 "></span>
              </nav>
            </div>
          </div>
        </div>
      </>
    )
  );
}

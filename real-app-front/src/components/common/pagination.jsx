import React from "react";

function Pagination({ totalCards, cardsPerPage, setCurrentPAge, currentPage }) {
  let pages = [];

  for (let i = 1; i <= Math.ceil(totalCards / cardsPerPage); i++) {
    pages.push(i);
  }

  return (
    <nav aria-label="Page navigation example  ">
      <ul className="pagination justify-content-center m-4 ">
        <li
          className={`page-item border-2  ${
            currentPage === 1 ? "disabled" : ""
          }`}
        >
          <a
            className="page-link text-danger previous fw-bold"
            onClick={(e) => {
              e.preventDefault();
              if (currentPage > 1) setCurrentPAge(currentPage - 1);
            }}
          >
            Previous
          </a>
        </li>

        <li
          className={`page-item  ${
            currentPage === pages.length ? "disabled" : ""
          }`}
        >
          <a
            className="page-link text-success next fw-bold"
            onClick={(e) => {
              e.preventDefault();
              if (currentPage < pages.length) setCurrentPAge(currentPage + 1);
            }}
          >
            Next
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;

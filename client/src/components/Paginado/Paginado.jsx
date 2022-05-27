import React from "react";
import "./Paginado.css";
import Pagination from "@mui/material/Pagination";

export default function Paginado({
  recipesPerPage,
  allRecipes,
  paginado,
  currentPage,
}) {
  let pageNumber = [];

  for (let i = 1; i <= Math.ceil(allRecipes / recipesPerPage); i++) {
    pageNumber.push(i);
  }
  const handleChange = (event, value) => {
    paginado(value);
  };

  return (
    <div class="paginado">
      <Pagination
        count={pageNumber.length}
        page={currentPage}
        onChange={handleChange}
      />
      {/* {pageNumber &&
        pageNumber.map((number) => (
          <a key={number}>
            <button
              onClick={() => paginado(number)}
              class={currentPage === number ? "active" : "none"}
            >
              {number}
            </button>
          </a>
        ))} */}
    </div>
  );
}

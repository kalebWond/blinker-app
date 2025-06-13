import React, { useRef } from "react";
import Filter from "./Filter";
import Movie from "./Movie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import Pagination from "./Pagination";

function MoviesList({ movies = [], isLoading, searchTerm= '', currentPage=1, totalPages, onPageChange }) {
  const mainRef = useRef();
  useEffect(() => {
    if (movies.length > 0) {
      mainRef.current.scrollIntoView();
    }
  }, [movies]);

  return (
    <main ref={mainRef}>
      <div className="row container row--main">
        <div className="main__header">
          <div className="search-info">
            <h2 className="search-info__title">Search results: <span className="searchTerm">"{searchTerm}"</span></h2>
            <span className="search-info__param"></span>
          </div>
        </div>
        <div className="results">
          <div className={`results__overlay ${!isLoading ? "hidden" : ""}`}>
            <FontAwesomeIcon icon="spinner" />
          </div>
          <div className="results__list">
            {movies.length > 0 && movies.map((movie) => (
              <Movie key={movie.imdbID} movie={movie} />
            ))}
          </div>
          {movies.length > 0 && <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />}
        </div>
      </div>
    </main>
  );
}

export default MoviesList;

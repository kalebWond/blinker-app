import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "../components/Header";
import MoviesList from "../components/MovieList";
import { API_URL } from "../util";
import axios from "axios";
// import { fakes } from "../mock";

function MoviesPage() {
  const [search, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const currentPage = +search.get("page");

  async function searchMovies(value, page=1) {
    setIsLoading(true);
    setError(null);
    setMovies([]);
    setSearchParams({ search: value, page });
    try {
      const { data } = await axios.get(API_URL + `&s=${value}&page=${page}`);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setMovies(data.Search);
      setTotalPages(data.totalResults)
      setIsLoading(false);
    } catch (e) {
      setError(e);
    }
    // setTimeout(() => {
    // }, 1500);
  }

  function onPageChange(page) {
    setSearchParams({ search: search.get("search"), page });
  }

  useEffect(() => {
    const query = search.get("search");
    if (query) {
      searchMovies(query, currentPage);
    }
    // eslint-disable-next-line
  }, [currentPage]);

  return (
    <>
      <Header isLoading={isLoading} searchMovies={searchMovies} initSearch={search.get("search")} />
      {!error && (
        <MoviesList
          movies={movies}
          isLoading={isLoading}
          searchTerm={search.get("search")}
          currentPage={+currentPage}
          totalPages={Math.ceil(totalPages / 10)}
          onPageChange={onPageChange}
        />
      )}
      {error && (
        <h2 style={{ color: "tomato", textAlign: "center", marginTop: "64px" }}>
          Oops!! Something went wrong. Please, try again.
        </h2>
      )}
    </>
  );
}

export default MoviesPage;

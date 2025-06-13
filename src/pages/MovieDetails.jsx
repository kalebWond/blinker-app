import React, { useEffect, useState } from "react";
import Nav from "../components/Nav";
import { fakes } from "../mock";
import imdb from '../assets/logo-imdb.svg'
import meta from '../assets/meta.png'
import box from '../assets/box.png'
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import MovieDetailSkeleton from "../components/MovieDetailSkeleton";
import { API_URL } from "../util";

function MovieDetails() {
  const {id} = useParams();
  const [movie, setMovie] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const others = fakes.Search.filter(mv => mv.imdbID !== id).slice(5, 9);
  
  async function fetchMovie(id) {
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1750));
    const {data} = await axios.get(API_URL+`&i=${id}`)
    setMovie(data)
    setIsLoading(false)
  }

  useEffect(() => {
    fetchMovie(id);
  }, [id])

  return (
    <>
      <div className="nav-container">
        <div className="row">
          <Nav />
        </div>
      </div>
      <main>
        { isLoading && <MovieDetailSkeleton /> }
        { !isLoading && (
          <div className="row container row--main main-details">
          <div className="movie-details">
              <figure className="poster-wrapper">
                <img src={movie.Poster} alt="" className="poster" />
              </figure>
              <div className="details-right">
                <h2 className="details__title">{movie.Title}</h2>
                <h3 className="details__year">{movie.Rated} - {movie.Year}</h3>
                <h3 className="details__type">{movie.Genre}</h3>
                <p className="details__plot">{movie.Plot}</p>
                <div className="actors-list">
                  {movie.Actors?.split(',').map((actor, i) => <span key={i} className="actor">{actor}</span>)}
                </div>
                <div className="bottom-info">
                  <div className="info-row">
                    <div className="rating__wrapper">
                      <img width={32} src={meta} alt="" className="rating__img" />
                    </div>
                    <span className="rating__value">{movie.Metascore} <i>metascores</i> </span>
                  </div>
                  <div className="info-row">
                    <div className="rating__wrapper">
                      <img height={22} src={imdb} alt="" className="rating__img" />
                    </div>
                    <span className="rating__value">{movie.imdbRating} / 10</span>
                  </div>
                  <div className="info-row">
                    <div className="rating__wrapper">
                      <img width={32} src={box} alt="" className="rating__img" />
                    </div>
                    <span className="rating__value">{movie.BoxOffice || 'N/A'}</span>
                  </div>
                </div>
              </div>
          </div>
          <div className="movie-others">
            <h3 style={{color: "var(--black-color)"}}>Other movies</h3>
            <div className="others-list">
              {others.map((movie) => (
              <Link key={movie.imdbID} to={`/movies/${movie.imdbID}`}>
                <figure className="movie-small" title={movie.Title}>
                  <img src={movie.Poster} alt="" className="small-poster" />
                </figure>
              </Link>
            ))}
            </div>
          </div>
        </div>
        ) }
      </main>
    </>
  );
}

export default MovieDetails;

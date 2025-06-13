import React from 'react'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Movie({movie}) {
  return (
    <div className="movie">
        <figure className="movie__poster-wrapper">
          <img src={movie.Poster} alt="Movie Poster" className="movie__poster" />
          <div className="movie__overlay"></div>
          <figcaption className="movie__caption">
            <FontAwesomeIcon className="movie__star" 
              icon={Math.round(Math.random()) === 0 ? 'star' : 'star-half-alt'} />
            <div className="movie__type">{movie.Type}</div>
            <Link to={`/movies/${movie.imdbID}`} className="movie__btn">View Details</Link>
          </figcaption>
        </figure>
      <div className="movie__footer">
        <Link to={`/movies/${movie.imdbID}`} className="movie__title" title={movie.Title}>{movie.Title}</Link>
        <div className="movie__year">{movie.Year}</div>
      </div>
    </div>
  )
}

export default Movie;
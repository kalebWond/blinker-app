import React from "react";

function MovieDetailSkeleton() {
  return (
    <div className="row container row--main main-details main-details--skeleton">
      <div className="movie-details movie-details--skeleton">
        <div className="skeleton skeleton__poster"></div>
        <div className="details-right">
        <div className="skeleton skeleton__title"></div>
        <div className="skeleton skeleton__year"></div>
        <div className="skeleton skeleton__year"></div>
        <div className="skeleton skeleton__plot"></div>
        <div className="actors-list">
            <div className="skeleton skeleton__actor"></div>
            <div className="skeleton skeleton__actor"></div>
            <div className="skeleton skeleton__actor"></div>
        </div>
        <div className="bottom-info">
            <div className="info-row">
            <div className="skeleton skeleton__rating"></div>
            <div className="skeleton skeleton__rating"></div>
            </div>
            <div className="info-row">
            <div className="skeleton skeleton__rating"></div>
            <div className="skeleton skeleton__rating"></div>
            </div>
            <div className="info-row">
            <div className="skeleton skeleton__rating"></div>
            <div className="skeleton skeleton__rating"></div>
            </div>
        </div>
        </div>
      </div>
      <div className="movie-others movie-others--skeleton">
        <div className="others-list-skeleton">
          <div className="skeleton skeleton__others"></div>
          <div className="skeleton skeleton__others"></div>
          <div className="skeleton skeleton__others"></div>
          <div className="skeleton skeleton__others"></div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetailSkeleton;

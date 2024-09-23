import React from 'react';

const MovieCard = ({ movie, onShowAvailable }) => {
    return (
      <div className="movie-card">
      <h3>{movie.title}</h3>
      <p>{movie.description}</p>
      <p>Genre: {movie.genre}</p>
      <p>Director: {movie.director}</p>
      <p>Duration: {movie.duration}</p>

      {/* Visar Movie Poster */}
      <img src={movie.posterUrl} 
      alt={movie.title} style={{ width: '200px', height: 'auto' }} />

      <button onClick={() => onShowAvailable(movie._id)}>Se tillgängliga shower</button>
    </div>
  );
};

export default MovieCard;

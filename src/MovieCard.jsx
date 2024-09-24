import React from 'react';

const MovieCard = ({ movie, onShowAvailable }) => {
    return (
        <div className="movie-card">
            {/* Visar Movie Poster */}
            <img
                src={movie.posterUrl}
                alt={movie.title}
                style={{
                    width: '300px',
                    height: '350px',
                    borderRadius: '15px',
                }}
            />
            <h3>{movie.title}</h3>
            <p className="movie-description">{movie.description}</p>
            <p className="movie-genre"><b>Genre:</b> {movie.genre}</p>
            <p className="movie-director"><b>Director:</b> {movie.director}</p>
            <p className="movie-duration"><b>Duration:</b> {movie.duration}</p>




            <button onClick={() => onShowAvailable(movie._id)}>SEE AVAILABLE SHOWS</button>
        </div>
    );
};

export default MovieCard;

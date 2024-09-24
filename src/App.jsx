import React, { useState, useEffect } from 'react';
import MovieCard from './MovieCard';
import ShowCard from './ShowCard';
import BookingForm from './BookingForm';
import './App.css';
import logo from '/logo.png';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [shows, setShows] = useState([]);
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [currentPage, setCurrentPage] = useState('movies');
  const [selectedShow, setSelectedShow] = useState(null);

  // Hämta filmer
  const fetchMovies = async () => {
    try {
      const response = await fetch('https://cinema-api.henrybergstrom.com/api/v1/movies');
      const data = await response.json();
      setMovies(data);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  // Hämta shower för vald film
  const fetchShows = async (movieId) => {
    try {
      const response = await fetch(`https://cinema-api.henrybergstrom.com/api/v1/shows/movie/${movieId}`); // Använd rätt endpoint
      const data = await response.json();
      console.log('Fetched shows:', data); // Kontrollera API-svaret
      setShows(data); // Sätt shower i tillståndet
      setCurrentPage('shows'); // Visa shower
    } catch (error) {
      console.error('Error fetching shows:', error);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  // Hantera visning av tillgängliga shower
  const handleShowAvailable = (movieId) => {
    setSelectedMovieId(movieId);
    fetchShows(movieId); // Hämta shower för den specifika filmen
  };

  // Hantera bokning av show
  const handleBookShow = (show) => {
    setSelectedShow(show); // Sätt vald show
    setCurrentPage('booking'); // Gå till bokningsformulär
  };

  // Återgå till filmlistan
  const handleBackToMovies = () => {
    setCurrentPage('movies');
    setSelectedMovieId(null);
  };

  // Återgå till shower
  const handleBackToShows = () => {
    setCurrentPage('shows');
  };

  return (
    <div>
      {currentPage === 'movies' && (
        <>
          <div className="logo-container">
            <img src={logo} alt="Logo" className="logo" />
          </div>
          <div className="movie-card-container">
            {movies.map((movie) => (
              <MovieCard
                key={movie._id}
                movie={movie}
                onShowAvailable={handleShowAvailable} // Lägg till knapp för att se shower
              />
            ))}
          </div>
        </>
      )}

      {currentPage === 'shows' && (
        <>
          <div className="shows-container">
            <h1>AVAILABLE SHOWS</h1>
            <button className="back-to-movies-btn" onClick={handleBackToMovies}>BACK TO MOVIES</button>
          </div>
          <div className="show-card-container">
            {shows.map((show) => {
              const movieTitle = movies.find(movie => movie._id === selectedMovieId)?.title; // Hämta filmens titel
              return (
                <ShowCard
                  key={show._id}
                  show={show}
                  movieTitle={movieTitle} // Skicka filmens titel som prop
                  onBook={() => handleBookShow(show)} // Använd din befintliga funktion för bokning
                />
              );
            })}
          </div>
        </>
      )}

      {currentPage === 'booking' && selectedShow && (
        <>
          <div className="booking-container">
            <BookingForm
              show={selectedShow}
              bookedSeats={selectedShow.bookedSeats}
            />
            <button className="back-to-shows-btn" onClick={handleBackToShows}>BACK TO SHOWS</button>
          </div>
        </>
      )}
    </div>
  );
};

export default App;

import React, { useState, useEffect } from 'react';
import MovieCard from './MovieCard';
import ShowCard from './ShowCard';
import BookingForm from './BookingForm';
import './App.css';


const App = () => {
  const [movies, setMovies] = useState([]);
  const [shows, setShows] = useState([]);
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [currentPage, setCurrentPage] = useState('movies');
  const [selectedShow, setSelectedShow] = useState(null); // För att lagra vald show

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
      const response = await fetch(`https://cinema-api.henrybergstrom.com/api/v1/shows?movieId=${movieId}`);
      const data = await response.json();
      setShows(data);
      setCurrentPage('booking');
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
    fetchShows(movieId);
  };


  // Hantera bokning av show
  const handleBookShow = (show) => {
    setSelectedShow(show); // Sätt vald show
    setCurrentPage('booking'); // Gå till bokningssidan
  };


  // Återgå till filmlistan
  const handleBackToMovies = () => {
    setCurrentPage('movies');
    setSelectedMovieId(null);
  };

  return (
    <div>
      {currentPage === 'movies' && (
        <>
          <h1>Filmer</h1>
          {movies.map((movie) => (
            <MovieCard
              key={movie._id}
              movie={movie}
              onShowAvailable={handleShowAvailable} // Lägg till knapp för att se shower
            />
          ))}
        </>
      )}

      {currentPage === 'booking' && (
        <>
 <h1>Bokningssida</h1>
          <button onClick={handleBackToMovies}>Tillbaka till filmer</button>
          {shows.map((show) => (
            <ShowCard 
            key={show._id} 
            show={show} 
            onBook={handleBookShow} /> 
          ))}
          {selectedShow && <BookingForm show={selectedShow} />} {/* Skicka vald show till bokningsformulär */}
        </>
      )}
    </div>
  );
};

export default App;
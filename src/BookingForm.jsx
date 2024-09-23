import React from 'react';

const BookingForm = ({ show, onBack }) => {
  if (!show) return <p>Ingen show vald.</p>;

  return (
    <div>
      <h2>{show.movie.title}</h2>
      <p>{new Date(show.startTime).toLocaleString()}</p>
      <p>Tillgängliga platser:</p>
      <ul>
        {show.availableSeats.map((seat) => (
          <li key={seat}>{seat}</li>
        ))}
      </ul>
      <button onClick={onBack}>Tillbaka till filmer</button>
    </div>
  );
};

export default BookingForm;

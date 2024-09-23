import React, { useState } from 'react';
import './BookingForm.css'

const BookingForm = ({ show, bookedSeats }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [selectedSeat, setSelectedSeat] = useState('');

  const handleSeatClick = (seat) => {
    if (!bookedSeats.includes(seat)) { // Kontrollera om säte är bokat
      setSelectedSeat(seat);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const bookingDetails = {
      showId: show._id,
      name,
      phone,
      email,
      seat: selectedSeat,
    };

    // Skicka bokningsdata till API:et här
    console.log('Bokningsdetaljer:', bookingDetails);
    // Lägg till fetch-kod för att skicka bokningen
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Boka biljett till vald föreställning</h2>
      <p>Starttid: {new Date(show.startTime).toLocaleString()}</p>
      <p>Antal tillgängliga platser: {show.availableSeats.length}</p>


      <h3>Välj plats:</h3>
      <div className="seat-selection">
        {show.availableSeats.map((seat) => (
          <button
            key={seat}
            className={`seat ${selectedSeat === seat ? 'selected' : ''}`}
            onClick={() => handleSeatClick(seat)}
            type="button"
          >
            {seat}
          </button>
        ))}
        {bookedSeats.map((seat) => (
          <button
            key={seat}
            className="seat booked"
            type="button"
            disabled
          >
            {seat}
          </button>
        ))}
      </div>

      <label>
        Namn:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>
      <br />

      <label>
        Telefon:
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
      </label>
      <br />

      <label>
        Email-adress:
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <br />

      <button type="submit">Boka biljett</button>
    </form>
  );
};

export default BookingForm;

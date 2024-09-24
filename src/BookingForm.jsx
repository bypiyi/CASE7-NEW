import React, { useState } from 'react';
import './BookingForm.css';

const BookingForm = ({ show, bookedSeats, onBackToShows }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [selectedSeat, setSelectedSeat] = useState('');
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);

  const handleSeatClick = (seat) => {
    if (!bookedSeats.includes(seat)) {
      setSelectedSeat(seat);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const bookingDetails = {
      email: email,
      show: show._id,
      seats: [selectedSeat],
      bookingTime: new Date().toISOString(),
      totalPrice: 0,
    };

    fetch('https://cinema-api.henrybergstrom.com/api/v1/bookings', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookingDetails),
    })
      .then((response) => response.json())
      .then((data) => {
        setTotalPrice(data.totalPrice);
        const bookingTimeFormatted = new Date().toLocaleString();
        setConfirmationMessage(`Bokning bekräftad!
        - Plats: ${selectedSeat}
        - Totalpris: ${data.totalPrice} SEK
        - Datum & tid: ${new Date(show.startTime).toLocaleString()}
        - E-post: ${email}
        - Telefonnummer: ${phone}
        
        En bekräftelse har skickats till din e-post och telefon.`);
      })
      .catch((error) => {
        console.error('Fel vid bokningen:', error);
        setConfirmationMessage('Ett fel uppstod vid bokningen. Försök igen.');
      });
  };

  return (
    <div className="booking-page">

      <div className="booking-container">
        <div className="booking-info">
          <h2>CHOOSE A SEAT</h2>
          <p>Movie: {show.title}</p>
          <p>Date: {new Date(show.startTime).toLocaleString()}</p>
          <p>Available seats: {show.availableSeats.length}</p>

          <h3>Choose a seat:</h3>
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
              <button key={seat} className="seat booked" type="button" disabled>
                {seat}
              </button>
            ))}
          </div>
        </div>

        <div className="booking-form-container">
          <form onSubmit={handleSubmit}>
            <h2>BOOK YOUR TICKET</h2>

            <label>
              Name:
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </label>

            <label>
              Telephone:
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </label>

            <label>
              Email:
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>

            <button type="submit">BOOK TICKET</button>

            {confirmationMessage && <p>{confirmationMessage}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;

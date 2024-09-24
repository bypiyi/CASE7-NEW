import React, { useState } from 'react';
import './BookingForm.css';

const BookingForm = ({ show, bookedSeats }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [selectedSeat, setSelectedSeat] = useState('');
  const [confirmationMessage, setConfirmationMessage] = useState(''); // För bekräftelse
  const [totalPrice, setTotalPrice] = useState(0); // För totalpriset

  const handleSeatClick = (seat) => {
    if (!bookedSeats.includes(seat)) {
      setSelectedSeat(seat);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const bookingDetails = {
      email: email,
      show: show._id, // Skicka föreställningens ID
      seats: [selectedSeat], // Skicka valt säte som en array
      bookingTime: new Date().toISOString(), // Aktuell tid
      totalPrice: 0, // Låt API:n räkna ut priset
    };

    // Skicka POST-förfrågan till API:et
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
        // Spara totalpris från API-svaret och visa bekräftelse
        setTotalPrice(data.totalPrice);
        const bookingTimeFormatted = new Date().toLocaleString(); // Formatera bokningstid för användarvisning

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
    <div className="booking-form-container">
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
            <button key={seat} className="seat booked" type="button" disabled>
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

        {confirmationMessage && <p>{confirmationMessage}</p>}
      </form>
    </div>
  );
};

export default BookingForm;

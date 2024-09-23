import React, { useState } from 'react';

const BookingForm = ({ show }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [sms, setSms] = useState('');
  const [selectedSeat, setSelectedSeat] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const bookingDetails = {
      showId: show._id,
      name,
      phone,
      sms,
      seat: selectedSeat,
    };

    // Skicka bokningsdata till API:et här
    console.log('Bokningsdetaljer:', bookingDetails);
    // Lägg till fetch-kod för att skicka bokningen
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Boka biljett till {show.movie.title}</h2>
      <p>Starttid: {new Date(show.startTime).toLocaleString()}</p>
      <p>Antal tillgängliga platser: {show.availableSeats.length}</p>

      <label>
        Välj plats:
        <select value={selectedSeat} onChange={(e) => setSelectedSeat(e.target.value)}>
          <option value="">Välj en plats</option>
          {show.availableSeats.map((seat) => (
            <option key={seat} value={seat}>{seat}</option>
          ))}
        </select>
      </label>
      <br />

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
        SMS:
        <input
          type="text"
          value={sms}
          onChange={(e) => setSms(e.target.value)}
          required
        />
      </label>
      <br />

      <button type="submit">Boka biljett</button>
    </form>
  );
};

export default BookingForm;

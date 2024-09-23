import React from 'react';

const ShowCard = ({ show, onSelect, onBook }) => {
  // Konvertera starttid till ett läsbart format
  const startTime = new Date(show.startTime).toLocaleString();

  return (
    <div className="show-card" onClick={onSelect}>
      <p>{`Starttid: ${startTime}`}</p>
      <p>{`${show.availableSeats.length} platser tillgängliga`}</p>

      {/* För att komma till bokningssidan */}
      <button onClick={() => onBook(show)}>Boka biljett till denna show</button>
    </div>
  );
};
export default ShowCard;

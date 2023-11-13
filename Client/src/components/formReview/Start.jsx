import React, { useState } from 'react';

const Stars = ({ handleRatingChange }) => {
  const [hoveredRating, setHoveredRating] = useState(0); // Estado para almacenar la calificación al pasar el mouse
  const [rating, setRating] = useState(0); // Estado para almacenar la calificación final

  // Función para manejar el paso del mouse sobre una estrella
  const handleRatingHover = (value) => {
    setHoveredRating(value); // Actualiza la calificación al pasar el mouse
  };
  
  // Función para manejar el clic en una estrella
  const handleRatingClick = (value) => {
      setRating(value); // Establece la calificación final al hacer clic
    };
    
    return (
        <div className="rating">
                <label className="block uppercase text-gray-700 text-xs font-bold ">
                Rating
                </label>
        {/* <p>Calificación seleccionada: {rating} estrellas</p> */}
      {[1, 2, 3, 4, 5].map((value) => (
        <label
          key={value}
          title="text"
          htmlFor={`star${value}`}
          className={`text-2xl cursor-pointer transition-colors ${
            (value <= rating || value <= hoveredRating) ? 'text-yellow-400' : 'text-gray-400'
          }`}
          onMouseEnter={() => handleRatingHover(value)} // Manejar el paso del mouse
          // onClick={() => handleRatingClick(value)} // Manejar el clic
          onClick={() => handleRatingChange(value)} 
        >
          <input
            value={value}
            name="rate"
            id={`star${value}`}
            type="radio"
            className="hidden"
          />
          ★
        </label>
      ))}
    </div>
  );
};

export default Stars;

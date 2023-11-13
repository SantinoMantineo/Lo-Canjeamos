import React, { useState } from 'react';
import styles from './FormReview.module.css';
import { useParams } from 'react-router-dom';

const FormReview = ({userData}) => {
    const myUserId = userData.id;
    const {id} = useParams();
    
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [rating, setRating] = useState(0);

  const handleStarClick = (selectedRating) => {
    setRating(selectedRating);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Aquí puedes realizar acciones con los datos del formulario,
    // como enviarlos a un servidor o realizar alguna operación local.

    
    console.log('Título:', titulo);
    console.log('Descripción:', descripcion);
    console.log('Rating:', rating);

   // resetea los estados después de enviar el formulario.
    setTitulo('');
    setDescripcion('');
    setRating(0);
  };

  return (
    <form className={styles.formReview} onSubmit={handleSubmit}>
      <div className={styles.container}>
      <div>
       <label>Rating:</label>
         {[1, 2, 3, 4, 5].map((star) => (
         <span
         key={star}
         className={`${styles.star} ${star <= rating ? styles.active : ''}`}
         onClick={() => handleStarClick(star)}
        >
         &#9733;
        </span>
         ))}
        </div>
           <div>
            <label htmlFor="titulo">Título:</label>
            <input
            type="text"
            id="titulo"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />
      </div>

      <div>
        <label htmlFor="descripcion">Descripción:</label>
        <textarea
          id="descripcion"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />
      </div>
      </div>

      <button type="submit">Enviar</button>
    </form>
  );
};

export default FormReview;

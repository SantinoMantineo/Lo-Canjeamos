import React, { useState } from 'react'
// import provincia from './validation.js'
import style from './AddProduct.module.css'
import axios from 'axios';

export default function AddProduct() {
  const [ addPost, setPost ] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: "",
    image: "",
    ubication: "",
    category: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Realiza las validaciones aquí antes de enviar los datos al servidor
    if (!formData.title || !formData.description || !formData.image || !formData.ubication || !formData.category) {
      alert('Por favor, complete los campos obligatorios.');
      return;
    }

    let errorMessage = '';

    if (typeof formData.title !== 'string') {
      errorMessage = 'El titulo debe ser una cadena de texto.';
    } else if (typeof formData.image !== 'string') {
      errorMessage = 'La imagen debe ser una cadena de texto (URL).';
    }

    if (errorMessage) {
      alert(`Error de validación: ${errorMessage}`);
    } else {

    try {
        let newPost = {
          title: formData.title,
          description: formData.description,
          image: formData.image,
          ubication: formData.ubication,
          category: formData.category,
        }
      const response = await axios.post('http://localhost:3001/posts/', newPost)
        console.log(response)
      if (response) {
        // La solicitud se completó con éxito
       
        setPost(true)
      } else {
        // Hubo un error en la solicitud
        console.log('Hubo un error al crear la publicacion.');
      }
    } catch (error) {
      console.error('Error al enviar los datos al servidor:', error);
      console.log('Hubo un error al crear la publicacion.');
    }
  }
  };


  return (
    <>
    <div className={style.container}>
      <form onSubmit={handleSubmit} className={style.create}>
        <label>
          Titulo:
          <input
            className={style.input}
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder='Inserte titulo'
          />
        </label>
        <label>
          Descripcion:
          <input
          className={style.input}
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder='Inserte descripcion'
          />
        </label>
        <label>
          Imagen:
          <input
          className={style.input}
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder='Inserte imagen'
          />
        </label>
        <label>
          Ubicacion:
          <input
          className={style.input}
            type="string"
            name="ubication"
            value={formData.ubication}
            onChange={handleChange}
            placeholder='Inserte ubicacion'
          />
        </label>
        <label>
          Categoria:
          <input
          className={style.input}
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder='Inserte categoria'
          />
        </label>
        <button type="submit" className={style.button}>
          Crear Post
        </button>
      </form>
      </div>
      {addPost && 
      <div>
        Se creo el post!
      </div>
      }
    </>
  );
}
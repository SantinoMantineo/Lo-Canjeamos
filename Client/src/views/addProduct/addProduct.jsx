import React, { useState, useEffect, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import {motion} from 'framer-motion';
import Header from "../../components/header/Header";
import Banner from "../../assets/banner1.jpg";
import Banner2 from "../../assets/banner2.jpg";
import Modal from "../../components/modal/Modal.jsx"
import style from "./AddProduct.module.css";
import axios from "axios";
import { validateDescription, validateTitle } from './validation'

export default function AddProduct({ userData }) {
  const { id } = userData;

  //Configuración de la biblioteca para cargar imagenes.
  const thumbsContainer = {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 15,
    justifyContent: "center",
  };

  const img = {
    display: "block",
    borderRadius: 5,
    width: 60,
    height: 60,
    marginRight: 5,
  };

  // Constantes para Cloudinary.

  const preset_key = "postsimages";
  const cloud_name = "dlahgnpwp";
  const folderName = "postimages";

  const [showModal, setShowModal] = useState(false);
  const [files, setFiles] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [selectedIndices, setSelectedIndices] = useState([]);
  const [errors, setErrors] = useState({});

  const onDrop = useCallback((acceptedFiles) => {
    if (files.length + acceptedFiles.length > 3) {
      alert("¡No puedes cargar más de 3 imágenes!");
      return;
    }

    const updatedFiles = [...files, ...acceptedFiles];
    setFiles(updatedFiles);
  }, [files]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 3,
    accept: {'image/*': []}
  });

  useEffect(() => {
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, []);

  //Menejo de la API para obtener las provincias y las localidades.
  const [provinces, setProvinces] = useState([]);
  const [localities, setLocalities] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [localidad, setSelectedLocalidad] = useState("");
  useEffect(() => {
    fetch("https://apis.datos.gob.ar/georef/api/provincias")
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((json) => {
        setProvinces(json.provincias);
      })
      .catch((error) => {
        console.error(
          `Error: ${error.status}: ${error.statusText || "Ocurrió un error"}`
        );
      });
  }, []);

  const handleProvinceChange = (e) => {
    const selectedProvince = e.target.value;
    setSelectedProvince(selectedProvince);

    fetch(
      `https://apis.datos.gob.ar/georef/api/localidades?provincia=${selectedProvince}&max=500`
    )
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((json) => {
        setLocalities(json.localidades);
      })
      .catch((error) => {
        console.error(
          `Error al obtener las localidades: ${error.status}: ${
            error.statusText || "Ocurrió un error"
          }`
        );
      });
  };
  const handleLocalidadChange = (e) => {
    const selectedLocalidad = e.target.value;
    setSelectedLocalidad(selectedLocalidad);
  };
  const sortedProvinces = provinces.sort((a, b) => {
    return a.nombre.localeCompare(b.nombre);
  });

  const sortedLocalities = localities.sort((a, b) => {
    return a.nombre.localeCompare(b.nombre);
  });

  //Manejo de las categorías.
  const [selectedCategory, setSelectedCategory] = useState("");
  const categories = [
    "Rodados con motor",
    "Rodados sin motor",
    "Cámaras y accesorios",
    "Celulares",
    "Computadoras",
    "Audio y video",
    "Videojuegos",
    "Antiguedades",
    "Electrodomésticos",
    "Herramientas",
    "Muebles y hogar",
    "Arte y artesanías",
    "Instrumentos musicales",
    "Alimentos",
    "Joyas y relojes",
    "Ropa e indumentaria",
    "Varios",
  ];

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null,
    ubication: "",
    category: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    let error = "";

  if (name === "title") {
    error = validateTitle(value);
  } else if (name === "description") {
    error = validateDescription(value);
};
setErrors({ ...errors, [name]: error });
};

  const handleFile = (event) => {
    const selectedFiles = event.target.files;

    if (files.length + selectedFiles.length > 3) {
      alert("¡Solo puedes subir un máximo de 3 imágenes!");
      return;
    }

    const updatedFiles = [...files, ...selectedFiles];
    setFiles(updatedFiles);
  };

  const handleDeleteImage = (index) => {
    event.preventDefault();

    const updatedFiles = [...files];
    updatedFiles.splice(index, 1); // Eliminar el archivo del estado
    setFiles(updatedFiles);

    const updatedIndices = [...selectedIndices];
    updatedIndices.splice(index, 1); // Eliminar el índice de la lista de selección
    setSelectedIndices(updatedIndices);
  };

  // Función que se ejecuta al darle 'Crear Post'.

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Subir imágenes a Cloudinary y obtener las URLs.
    const uploadPromises = files.map((file) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", preset_key);
      formData.append("folder", folderName);

      return axios
        .post(
          `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload/`,
          formData
        )
        .then((res) => res.data.secure_url)
        .catch((error) => {
          console.log("Error al subir las imágenes: " + error);
          return null;
        });
    });

    const imageUrls = await Promise.all(uploadPromises);
    const errors = {};

    const titleError = validateTitle(formData.title);
      if (titleError) {
        errors.title = titleError;
      }
    
      const descriptionError = validateDescription(formData.description);
      if (descriptionError) {
        errors.description = descriptionError;
      }
    
      if (
        formData.title.trim() === "" ||
        imageUrls.length === 0 ||  // Reemplaza imageUrls2 por imageUrls
        selectedProvince === "" ||
        localidad === "" ||
        selectedCategory === ""
      ) {
        alert("Todos los campos marcados con * son obligatorios");
        return;
      }
      setErrors(errors);
    
      const errorKeys = Object.keys(errors);
    
      if (errorKeys.length > 0) {
        const errorMessage = errorKeys.map((key) => {
          if (key === "requiredFields") {
            return errors[key];
          }
          return `Hay un error en el campo ${key}`;
        });
    
        alert(errorMessage.join("\n"));
        return;
      }

    // Filtrar los resultados nulos, en caso de que haya habido errores.
    const validImageUrls = imageUrls.filter((url) => url !== null);

    // Guardar las URLs seguras de las imágenes en el estado.
    setImageUrls(validImageUrls);

    // Creación de la publicación.
    try {
      const newPost = {
        title: formData.title,
        description: formData.description,
        image: validImageUrls, 
        ubication: `${selectedProvince}, ${localidad}`,
        category: selectedCategory,
        UserId: id,
      };

      const response = await axios.post(
        "/posts/",
        newPost
      );

      if (response) {
        setShowModal(true)
        // Reinicio de campos.
        setFiles([]);
        setSelectedCategory("");
        setSelectedLocalidad("");
        setSelectedProvince("");
        setFormData({
          title: "",
          description: "",
        });
      } else {
        // Hubo un error en la solicitud
        console.log("Hubo un error al crear la publicación.");
      }
    } catch (error) {
      console.error("Error al enviar los datos al servidor:", error);
      console.log("Hubo un error al crear la publicación.");
    }
  };

  return (
    <>
      <Header banner1={Banner} banner2={Banner2}></Header>
      <motion.div
      initial={{
        opacity: 0,
        scale: 0.8,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      className={style.container}>
        <h3>Crear publicación</h3>
        <form className={style.create}>
          <div className={style.part1}>
            <label>
              Titulo*
              <input
                className={style.input}
                type='text'
                name='title'
                value={formData.title}
                onChange={handleChange}
                placeholder='Inserte titulo'
              />
              {errors.title && <div className="error-message">{errors.title}</div>}
            </label>
            <label>
              Descripción
              <textarea
                className={style.input}
                type='text'
                name='description'
                onChange={handleChange}
                value={formData.description}
                placeholder='Inserte descripcion'
              />
              {errors.description && <div className="error-message">{errors.description}</div>}
            </label>
            <label>
              Imagen*
              <section className={style.files}>
                <div
                  className={style.dropzone}
                  {...getRootProps()}
                  onClick={(event) => event.stopPropagation()}
                >
                  <input {...getInputProps()} onChange={handleFile} />
                  {isDragActive
                    ? "Suelta tus archivos aquí"
                    : "Selecciona o arrastra tus archivos aquí"}
                </div>
                {files.length > 0 && (
                  <div style={thumbsContainer}>
                    {files.map((file, index) => (
                      <div key={index}>
                      <img style={img} src={URL.createObjectURL(file)} alt={`Imagen ${index}`} />
                      <button type="button" onClick={() => handleDeleteImage(index)}>✖️</button>
                    </div>
                    ))}
                  </div>
                )}
              </section>
            </label>
          </div>
          <div className={style.part2}>
            <label>Provincia*</label>
            <select onChange={handleProvinceChange}>
              <option value='Elige una provincia'>Provincia</option>
              {sortedProvinces.map((province) => (
                <option key={province.id} value={province.nombre}>
                  {province.nombre}
                </option>
              ))}
            </select>
            <span></span>
            <label>Localidad*</label>
            <select id='selectLocalidades' onChange={handleLocalidadChange}>
              <option value='Elige una localidad'>Localidad</option>
              {sortedLocalities.map((locality) => (
                <option key={locality.id} value={locality.nombre}>
                  {locality.nombre}
                </option>
              ))}
            </select>
            <span></span>
            <label>Categoría*</label>
            <select
              name='category'
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value='Elige una categoría'>Categoría</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <span></span>
          </div>
        </form>
        <button type='submit' onClick={handleSubmit} className={style.button}>
          Crear
        </button>
        <h5 className={style.message}>Los campos con * son obligatorios</h5>
      </motion.div>
      {showModal && <Modal/>}
    </>
  );
}
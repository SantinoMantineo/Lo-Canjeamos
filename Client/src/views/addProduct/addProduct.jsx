import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import Header from "../../components/header/Header";
import Banner from "../../assets/banner1.jpg";
import Banner2 from "../../assets/banner2.jpg";
import style from "./AddProduct.module.css";
import axios from "axios";

export default function AddProduct() {

  //Configuración de la biblioteca para cargar imagenes.
  const thumbsContainer = {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 15,
  };

  const thumb = {
    display: "inline-flex",
    marginBottom: 8,
    marginRight: 8,
    width: 70,
    height: 70,
    padding: 4,
    boxSizing: "border-box",
  };

  const thumbInner = {
    display: "flex",
    minWidth: 0,
    overflow: "hidden",
  };

  const img = {
    display: "block",
    borderRadius: 5,
    width: 60,
    height: 60,
  };

  // Constantes para Cloudinary.

  const preset_key = "postsimages";
  const cloud_name = "dlahgnpwp";
  const folderName = "postimages";

  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 3,
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const thumbs = files.map((file) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img
          src={file.preview}
          style={img}
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
        />
      </div>
    </div>
  ));

  useEffect(() => {
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, []);

  //Manejo del formulario


  /* Tuve que borrar todo el manejo del formulario porque se me rompia todo y no queria estar buscando parte por parte,
  ya que basicamente tuve que reescribir todo el componenente.  */


  //Menejo de la API para obtener las provincias y las localidades.
  const [provinces, setProvinces] = useState([]);
  const [localities, setLocalities] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [ localidad, setSelectedLocalidad ] = useState("")
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
    "Alimentos",
    "Joyas y relojes",
    "Ropa e indumentaria",
    "Varios",
  ];

  
  const [formData, setFormData] = useState({
    title: '',
    description: "",
    image: null,
    ubication: "",
    category: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const [imageSecureUrl, setImageSecureUrl] = useState("");

  function handleFile(event) {
    const file = event.target.files[0];

    const newFiles = [
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      }),
      ...files,
    ];
  
    setFiles(newFiles);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', preset_key);
    formData.append("folder", folderName);
  
    axios
      .post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, formData)
      .then((res) => {
        setImageSecureUrl(res.data.secure_url);
      })
      .catch((error) => console.log(error));
  }

 const handleSubmit = async (e) => {
    e.preventDefault();

    try {

        let newPost = {
          title: formData.title,
          description: formData.description,
          image: imageSecureUrl,
          ubication: `${selectedProvince}, ${localidad}`,
          category: selectedCategory,
        }
        console.log(newPost)
      const response = await axios.post('http://localhost:3001/posts/', newPost)

      if (response) {
        // La solicitud se completó con éxito
        console.log('Producto cargado correctamente.');
      } else {
        // Hubo un error en la solicitud
        console.log('Hubo un error al crear la publicacion.');
      }
    } catch (error) {
      console.error('Error al enviar los datos al servidor:', error);
      console.log('Hubo un error al crear la publicacion.');
    }
  }

  
  
  
  return (
    <>
      <Header banner1={Banner} banner2={Banner2}></Header>
      <div className={style.container}>
        <h3>Crear publicación</h3>
        <form className={style.create}>
          <div className={style.part1}>
            <label>
              Titulo*
              <input
                className={style.input}
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Inserte titulo"
              />
            </label>
            <label>
              Descripción
              <input
                className={style.input}
                type="text"
                name="description"
                onChange={handleChange}
                value={formData.description}
                placeholder="Inserte descripcion"
              />
            </label>
            <label>
              Imagen*
              <section className={style.files}>
                <div {...getRootProps({ className: "dropzone" })}>
                  <input {...getInputProps()} onChange={handleFile}/>
                  <p>Arrastra o haz clic para seleccionar hasta 3 archivos.</p>
                </div>
                <aside style={thumbsContainer}>{thumbs}</aside>
              </section>
            </label>
          </div>
          <div className={style.part2}>
            <label>Provincias*</label>
            <select onChange={handleProvinceChange}>
              <option value="Elige una provincia">Provincia</option>
              {sortedProvinces.map((province) => (
                <option key={province.id} value={province.nombre}>
                  {province.nombre}
                </option>
              ))}
            </select>
            <span></span>
            <label>Localidad*</label>
            <select id="selectLocalidades" onChange={handleLocalidadChange}>
              <option value="Elige una localidad">Localidad</option>
              {sortedLocalities.map((locality) => (
                <option key={locality.id} value={locality.nombre}>
                  {locality.nombre}
                </option>
              ))}
            </select>
            <span></span>
            <label>Categoría*</label>
            <select
              name="category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="Elige una categoría">Categoría</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <span></span>
          </div>
        </form>
        <button type="submit" onClick={handleSubmit} className={style.button}>
          Crear
        </button>
        <h5 className={style.message}>Los campos con * son obligatorios</h5>
      </div>
    </>
  );
}

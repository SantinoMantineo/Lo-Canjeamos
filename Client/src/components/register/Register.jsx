import Logo from '../../assets/locan.png'
import React from "react";
import { useState, useEffect } from "react";
import style from "./Register.module.css";
import axios from "axios";
import { validateUsername, validateEmail, validatePassword, validateImagen, validateProvince, validateLocalidad, validatePasswordRepeat } from "./validations";
import Swal from 'sweetalert2';

const Register = ({setAuth}) => {

  const [provinces, setProvinces] = useState([]);
  const [localities, setLocalities] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [ localidad, setSelectedLocalidad ] = useState("")

    // Constantes para Cloudinary.

    const preset_key = "postsimages";
    const cloud_name = "dlahgnpwp";
    const folderName = "usersProfilePic";

    const [imageError, setImageError] = useState(null);
    const [provinceError, setProvinceError] = useState(null);
    const [localidadError, setLocalidadError] = useState(null);
  const [errors, setErrors] = useState({
    username: null,
    password: null,
    email: null,
    image: null,
    province: null,
    localidad: null,
  });
  
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

    const provinceError = validateProvince(selectedProvince);
    setErrors({ ...errors, province: provinceError });
    setProvinceError(provinceError);


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

    const localidadError = validateLocalidad(selectedLocalidad);
    setErrors({ ...errors, localidad: localidadError });
    setLocalidadError(localidadError);
  };
  const sortedProvinces = provinces.sort((a, b) => {
    return a.nombre.localeCompare(b.nombre);
  });

  const sortedLocalities = localities.sort((a, b) => {
    return a.nombre.localeCompare(b.nombre);
  });

  const [input, setInput] = useState({
    username: "",
    password: "",
    repeatPassword: "",
    email: "",
    image: "",
    imageFile: null,
    disabled: false,
  });

  const [imageFile, setImageFile] = useState(null);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });

    if (name === 'username') {
      setErrors({ ...errors, username: validateUsername(value) });
    } else if (name === 'email') {
      setErrors({ ...errors, email: validateEmail(value) });
    } else if (name === 'password') {
      setErrors({ ...errors, password: validatePassword(value) });
    } else if (name === 'repeatPassword') {
      setErrors({
        ...errors,
        repeatPassword: validatePasswordRepeat(value, input.password),
      });    
    } else if (name === 'image') {
      setErrors({ ...errors, image: validateImagen(value) });
    }
  };


  const [showPassword, setShowPassword] = useState(false);
    
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleFile = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setInput({
        ...input,
        image: imageUrl,
      });
      setImageFile(file); 
      setImageError(null)
    }
  };
  
  const handleImageClear = () => {
    setInput({
      ...input,
      image: '',
    });
    setImageFile(null);
  };



  const handleSumbit = async (e) => {
  e.preventDefault();
  setInput({
    ...input,
    disabled: true})

  if (
    !input.username ||
    !input.email ||
    !input.password ||
    !input.repeatPassword ||
    !input.image ||
    !selectedProvince ||
    !localidad
  )   
  {
 
    
  if (!input.image) {
    setImageError('Es necesario completar con una imagen.');
  } else {
    setImageError(null); 
  }

  if (!selectedProvince) {
    setProvinceError('Es necesario seleccionar una provincia.');
  } else {
    setProvinceError(null); 
  }

  if (!localidad) {
    setLocalidadError('Es necesario seleccionar una localidad.');
  } else {
    setLocalidadError(null); 
  }
  Swal.fire({
    icon: 'info',
    title: 'Campos incompletos',
    html: 'Todos los campos son obligatorios para completar el registro'
  });
    
    setInput({
      ...input,
      disabled: false,
    });
    return;
  }

  try {
    let secureUrl = '';

    if (imageFile) {
      const formData = new FormData();
      formData.append('file', imageFile);
      formData.append('upload_preset', preset_key);
      formData.append('folder', folderName);

      const responseImage = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload/`,
        formData
      );

      secureUrl = responseImage.data.secure_url;
    }

    let newUser = {
      username: input.username,
      password: input.password,
      email: input.email,
      image: secureUrl,
      ubication: `${selectedProvince}, ${localidad}`,
      origin: "DB"
    };

    const response = await axios.post('/users/register', newUser);

    if (response) {
      await localStorage.setItem('token', response.data.token);
      setAuth(true);

      // Mostrar una alerta de éxito
      Swal.fire({
        icon: 'success',
        title: 'Registro exitoso',
        text: '¡Te has registrado exitosamente!',
      });
    } else {
      console.log('Hubo un error al crear el usuario.');
    }
  } catch (error) {
    console.error('Error al enviar los datos al servidor:', error);
    console.log('Hubo un error al crear el usuario.');

    if (error.response && error.response.data === 'El email ya se encuentra registrado') {
      Swal.fire({
        icon: 'warning',
        title: 'Email en uso',
        text: 'El correo electrónico ya está en uso. Por favor, elige otro.',
      });
    } else if (error.response && error.response.data === 'El nombre de usuario ya se encuentra registrado') {
      Swal.fire({
        icon: 'warning',
        title: 'Nombre de usuario en uso',
        text: 'El nombre de usuario ya está en uso. Por favor, elige otro.',
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error al registrar',
        text: 'Hubo un error al registrar el usuario. Por favor, inténtalo de nuevo.',
      });
    }

    setInput({
      ...input,
      disabled: false,
    });
    return;
  }

  setInput({
    username: '',
    password: '',
    repeatPassword: '',
    email: '',
    image: '',
    imageFile: null,
    disabled: false,
  });
};

  function isSubmitDisabled() {
    return Object.values(errors).some((error) => error !== null);
  }

  return (
    <div className={style.container}>
      <img src={Logo} className={style.logo}/>
      <div className={style.title}>
        <h2>Regístrate</h2>
      </div>

      <div className={style.form}>
        <form onSubmit={handleSumbit}>
          <div>
            <input
              type="text"
              name="username"
              placeholder="Usuario"
              onChange={handleInputChange}
              value={input.username}
              disabled={input.disabled}
            />
             {errors.username && <span className={style.error}>{errors.username}</span>}
          </div>

          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleInputChange}
              value={input.email}
              disabled={input.disabled}
            />
            {errors.email && <span className={style.error}>{errors.email}</span>}
          </div>

          <div>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Contraseña"
              onChange={handleInputChange}
              value={input.password}
              disabled={input.disabled}
            />
            {/* <input
              type="checkbox"
              id="showPassword"
              onChange={handleShowPassword}
              checked={showPassword}
            /> */}
            {errors.password && <span className={style.error}>{errors.password}</span>}
          </div>
          <div>
          <input
            type="password"
            name="repeatPassword"
            placeholder="Repetir contraseña"
            onChange={handleInputChange}
            value={input.repeatPassword} // Asegúrate de tener un valor inicial en el estado
            disabled={input.disabled}
          />
            {errors.repeatPassword && <span className={style.error}>{errors.repeatPassword}</span>}
        </div>
            {/* <input
              type="checkbox"
              id="showPassword"
              onChange={handleShowPassword}
              checked={showPassword}
            /> */}
        <div className={style.fileInput} disabled={input.disabled}>
          <input
            type="file"
            accept="image/*"
            name="image"
            onChange={handleFile}
          />
          {input.image && (
            <div className={style.imagePreview}>
              <img src={input.image} alt="Preview" className={style.imgUser}/>
              <button onClick={handleImageClear}>✖️</button>
            </div>
          )}
          {/* {errors.image && <span className={style.error}>{errors.image}</span>} */}
          {imageError && <div className={style.error}>{imageError}</div>}
        </div>

            <select onChange={handleProvinceChange} disabled={input.disabled}>
              <option value="Elige una provincia">Provincia</option>
              {sortedProvinces.map((province) => (
                <option key={province.id} value={province.nombre}>
                  {province.nombre}
                </option>
              ))}
            </select>
            {/* {errors.province && <span className={style.error}>{errors.province}</span>} */}
            {provinceError && <div className={style.error}>{provinceError}</div>}
               
            <select id="selectLocalidades" onChange={handleLocalidadChange} disabled={input.disabled}>
              <option value="Elige una localidad">Localidad</option>
              {sortedLocalities.map((locality) => (
                <option key={locality.id} value={locality.nombre}>
                  {locality.nombre}
                </option>
              ))}
            </select>
            {/* {errors.localidad && <span className={style.error}>{errors.localidad}</span>} */}
            {localidadError && <div className={style.error}>{localidadError}</div>}
       
          <button className={isSubmitDisabled() ? `${style.register} ${style.buttonDisabled}` : style.register} disabled={isSubmitDisabled()} type="submit">
            Enviar
          </button>
          {input.disabled && <div className={style.loaderContainer}>
            <span>Creando usuario...</span>
            <div className={style.loader}></div>
          </div>}
        </form>
      </div>
    </div>
  );
};

export default Register;
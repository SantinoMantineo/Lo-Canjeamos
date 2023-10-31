import Logo from '../../assets/locan.png'
import React from "react";
import { useState, useEffect } from "react";
import style from "./Register.module.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { validateUsername, validateEmail, validatePassword, validateImagen, validateProvince, validateLocalidad } from "./validations";

const Register = ({setAuth}) => {

  const [provinces, setProvinces] = useState([]);
  const [localities, setLocalities] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [ localidad, setSelectedLocalidad ] = useState("")

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
    email: "",
    image: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
    
    // Realiza la validación y actualiza los errores
    if (name === "username") {
      setErrors({ ...errors, username: validateUsername(value) });
    } else if (name === "email") {
      setErrors({ ...errors, email: validateEmail(value) });
    } else if (name === "password") {
      setErrors({ ...errors, password: validatePassword(value) });
    } else if (name === "image") {
      setErrors({ ...errors, image: validateImagen(value) });
    }
  };

    const [showPassword, setShowPassword] = useState(false);
    
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSumbit = async (e) => {
    e.preventDefault();

    if (
      !input.username ||
      !input.email ||
      !input.password ||
      !input.image ||
      !selectedProvince ||
      !localidad
    ) {
      alert('Complete todos los campos antes de enviar el formulario.');
      return;
    }

    try {
        let newUser = {
          username: input.username,
          password: input.password,
          email: input.email,
          image: input.image,
          ubication: `${selectedProvince}, ${localidad}`,
        }
      const response = await axios.post('http://localhost:3001/users/register', newUser)

      if (response) {
        // La solicitud se completó con éxito
        await localStorage.setItem("token", response.data.token)
        setAuth(true)
      } else {
        // Hubo un error en la solicitud
        console.log('Hubo un error al crear el usuario.');
      }
    } catch (error) {
      console.error('Error al enviar los datos al servidor:', error);
      console.log('Hubo un error al crear el usuario.');
    }
  }

  function isSubmitDisabled() {
    return Object.values(errors).some((error) => error !== null);
  }

  return (
    <div className={style.container}>
      <img src={Logo}/>
      <div className={style.title}>
        <h2>Registrate</h2>
      </div>

      <div className={style.form}>
        <form onSubmit={handleSumbit}>
          <div>
            <input
              type="text"
              name="username"
              placeholder="nombre usuario"
              onChange={handleInputChange}
              value={input.username}
            />
             {errors.username && <span className="error">{errors.username}</span>}
          </div>

          <div>
            <input
              type="email"
              name="email"
              placeholder="email"
              onChange={handleInputChange}
              value={input.email}
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>

          <div>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="contraseña"
              onChange={handleInputChange}
              value={input.password}
            />
            {errors.password && <span className="error">{errors.password}</span>}
          </div>

          <div>
            <input
              type="imag"
              name="image"
              placeholder="imagen de perfil"
              onChange={handleInputChange}
              value={input.image}
            />
            {errors.image && <span className="error">{errors.image}</span>}
          </div>

           
            <select onChange={handleProvinceChange}>
              <option value="Elige una provincia">provincia</option>
              {sortedProvinces.map((province) => (
                <option key={province.id} value={province.nombre}>
                  {province.nombre}
                </option>
              ))}
            </select>
            {errors.province && <span className="error">{errors.province}</span>}
           

           
            <select id="selectLocalidades" onChange={handleLocalidadChange}>
              <option value="Elige una localidad">localidad</option>
              {sortedLocalities.map((locality) => (
                <option key={locality.id} value={locality.nombre}>
                  {locality.nombre}
                </option>
              ))}
            </select>
            {errors.localidad && <span className="error">{errors.localidad}</span>}
       

          <button className={isSubmitDisabled() ? `${style.register} ${style.buttonDisabled}` : style.register} disabled={isSubmitDisabled()} type="submit">
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
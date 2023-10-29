import Logo from '../../assets/locan.png'
import React from "react";
import { useState, useEffect } from "react";
import style from "./Register.module.css";
import { Link } from "react-router-dom";
import axios from "axios";

const Register = ({setAuth}) => {

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

  const [input, setInput] = useState({
    username: "",
    password: "",
    email: "",
    image: ""
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });

    //  setErrors(validate({
    //    ...form,
    //    [e.target.name]: e.target.value,
    //  }))
  };
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSumbit = async (e) => {
    e.preventDefault();

    try {
        let newUser = {
          username: input.username,
          password: input.password,
          email: input.email,
          image: input.image,
          ubication: `${selectedProvince}, ${localidad}`,
        }
      const response = await axios.post('http://localhost:3001/users/register', newUser)
      console.log(response);
      if (response) {
        // La solicitud se completó con éxito
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
          </div>

          <div>
            <input
              type="email"
              name="email"
              placeholder="email"
              onChange={handleInputChange}
              value={input.email}
            />
          </div>

          <div>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="contraseña"
              onChange={handleInputChange}
              value={input.password}
            />
          </div>

          <div>
            <input
              type="imag"
              name="image"
              placeholder="imagen de perfil"
              onChange={handleInputChange}
              value={input.image}
            />
          </div>

           
            <select onChange={handleProvinceChange}>
              <option value="Elige una provincia">provincia</option>
              {sortedProvinces.map((province) => (
                <option key={province.id} value={province.nombre}>
                  {province.nombre}
                </option>
              ))}
            </select>
           
           

           
            <select id="selectLocalidades" onChange={handleLocalidadChange}>
              <option value="Elige una localidad">localidad</option>
              {sortedLocalities.map((locality) => (
                <option key={locality.id} value={locality.nombre}>
                  {locality.nombre}
                </option>
              ))}
            </select>
            
       

          <button className={style.register}>Registrarse</button>
        </form>
      </div>
    </div>
  );
};

export default Register;

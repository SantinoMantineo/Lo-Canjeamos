
import React from "react";
import { useState, useEffect } from "react";
import style from "./Register.module.css";
import { Link } from "react-router-dom";

const Register = () => {

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
    fullname: "",
    username: "",
    password: "",
    email: "",
    imag: "",
    location: "",
  });
  console.log(input);

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

  return (
    <div className={style.container}>
      <div className={style.title}>
        <h2>Registrate</h2>
      </div>

      <div className={style.form}>
        <form>
          <div>
            <input
              type="text"
              name="fullname"
              placeholder="nombre completo"
              onChange={handleInputChange}
              value={input.fullname}
            />
          </div>

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
              name="imag"
              placeholder="imagen de perfil"
              onChange={handleInputChange}
              value={input.imag}
            />
          </div>

           
            <select onChange={handleProvinceChange}>
              <option value="Elige una provincia">Provincia</option>
              {sortedProvinces.map((province) => (
                <option key={province.id} value={province.nombre}>
                  {province.nombre}
                </option>
              ))}
            </select>
           
           

           
            <select id="selectLocalidades" onChange={handleLocalidadChange}>
              <option value="Elige una localidad">Localidad</option>
              {sortedLocalities.map((locality) => (
                <option key={locality.id} value={locality.nombre}>
                  {locality.nombre}
                </option>
              ))}
            </select>
            
       

          <Link to="/login">Enviar</Link>
        </form>
      </div>
    </div>
  );
};

export default Register;

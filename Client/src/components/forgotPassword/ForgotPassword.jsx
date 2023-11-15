/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import style from "./ForgotPassword.module.css";
import axios from "axios";
import Swal from 'sweetalert2';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    email: "",
  });
  const [error, setError] = useState({});
  // eslint-disable-next-line no-unused-vars

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    axios
      .post("/users/forgot-password", { email: input.email }) // Pass email from input state
      .then((res) => {
        if (res.data) {
          Swal.fire({
            icon: 'success',
            title: 'Solicitud de recuperacion de contraseña',
            text: '¡Hemos enviado un link a su correo!',
          });
          navigate("/login");
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {}, []);

  return (
    <div className={`${style.container} ${style.bgColor} ${style.fadeUp}`}>
      <form onSubmit={handleSubmit} className={style.form}>
        <div className={style.textContainer}>
          <h1 className={`${style.title} ${style.fontSemiBold}`}>
            Recuperar Contraseña
          </h1>
        </div>
        <div className={`${style.inputContainer} ${style.flexCol}`}>
          <label className={style.label}>Ingrese su email</label>
          <input
            type="text"
            name="email"
            value={input.email}
            onChange={handleChange}
            className={style.input}
          />
          {error.email && <span className={style.error}>{error.email}</span>}
        </div>
        <div className={style.buttonContainer}>
          <button
            type="submit"
            className={`${style.button} ${style.btnStone} ${style.btnHover}`}
            onClick={handleSubmit}
          >
            Enviar
          </button>
          <div className={style.registerLink}>¿No tiene una cuenta?</div>
            <Link to="/register" className={style.textYellow}>
              <button className={style.btnAqui}>Regístrate </button>
            </Link>
          
        </div>
      </form>
    </div>
  );
};

// Exportación del componente ForgotPassword para su uso en otros archivos
export default ForgotPassword;

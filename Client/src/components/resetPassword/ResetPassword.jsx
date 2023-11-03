/* eslint-disable react/no-unescaped-entities */
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import style from "./ResetPassword.module.css"
import axios from "axios";
import { validatePassw, validateRepeat } from "./validate";

const ResetPassword = () => {
  const navigate = useNavigate();
  const {id} = useParams() 
  const [input, setInput] = useState({
    password: "",
  });
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState({});
  // eslint-disable-next-line no-unused-vars
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
    if (name === 'password') {
      setError({ ...error, password: validatePassw(value) });
    } 
    else if (name === 'passwordRepeat') {
      setError({
        ...error,
        passwordRepeat: validateRepeat(value, input.password),
      });
  };
}
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (error.password || error.passwordRepeat) {
      return;
    }
    await axios
      .post(`/users/reset-password/${id}`, { password: input.password }) 
      .then((res) => {
        if (res.data) {
          navigate("/login");
        }
      })
      .catch((err) => console.log(err));
  };

    useEffect(()=> {
   
    // const logged = window.localStorage.getItem("logged")
    // const user = JSON.parse(logged)
    // setUser(user)
    // console.log(user)
  },[])
  const [showPassword, setShowPassword] = useState(false);
    
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  

  return (
    <div className={`${style.container} ${style.bgColor}`}>
      <form onSubmit={handleSubmit} className={style.form}>
        <div className={style.titleContainer}>
          <h1 className={style.title}>Subir Contraseña</h1>
        </div>
        <div className={style.inputContainer}>
          <label className={style.label}>Nueva contraseña</label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="contraseña"
            value={input.password}
            onChange={handleChange}
            className={style.input}
          />
              {error.password && <span className={style.error}>{error.password}</span>}
          <input
              type={showPassword ? "text" : "password"}
              name="passwordRepeat"
              placeholder="repetir contraseña"
              onChange={handleChange}
              value={input.passwordRepeat}
            />
              {error.passwordRepeat && <span className={style.error}>{error.passwordRepeat}</span>}
            <input
              type="checkbox"
              id="showPassword"
              onChange={handleShowPassword}
              checked={showPassword}
            />
        </div>
        <div className={style.buttonContainer}>
          <button
            type="submit"
            className={`${style.button} ${style.btnStone}`}
            onClick={handleSubmit}
          >
            Enviar
          </button>
          
          <span className={style.registerLink}> No tiene una cuenta?  <Link to='/register' 
          className={style.textYellow}><button className={style.btnAqui}>Registrese </button></Link>
          </span>

        </div>
      </form>
    </div>
  );
};

// Exportación del componente ResetPassword para su uso en otros archivos
export default ResetPassword;
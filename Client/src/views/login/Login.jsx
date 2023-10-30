import Logo from '../../assets/locan.png'
import { useState } from 'react'
import React from 'react'
import style from './Login.module.css'
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import LoginButton from '../Auth0/LoginButton';

const Login = ({ setAuth, userData }) => {
  const [ userValidated, setUser ] = useState(false);
  const [input, setInput] = useState({
    username: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    })
    
    //  setErrors(validate({
    //    ...form, 
    //    [e.target.name]: e.target.value,
    //  }))
  }

  const handleSumbit = async (e) => {
    e.preventDefault();
  
    try {
      let loginUser = {
        username: input.username,
        password: input.password,
      };
      const response = await axios.post("http://localhost:3001/users/login", loginUser);
  
      if (response.data && response.data.token) {
        const token = await localStorage.setItem("token", response.data.token);
        setAuth(true, userData); // Set auth to true and pass user data
      } else {
        console.log("Hubo un error al iniciar sesión.");
      }
    } catch (error) {
      console.error("Error al enviar los datos al servidor:", error);
      console.log("Hubo un error al iniciar sesión.");
    }
  };
  

  return (
    <div className={style.container}>
      <img src={Logo}/>
        <div>
          <h2>Iniciar sesión</h2>
        </div>
        <div className={style.form}>
          <form>
              <div>
                <input type="text" name="username" placeholder='usuario' onChange={handleInputChange}
                  value={input.username}/>
              </div>
              <div>
                <input type="password"name="password" placeholder='contraseña'onChange={handleInputChange}
                  value={input.password}/>
              </div>
              <button onClick={handleSumbit}>Iniciar sesión</button>
          </form>
        </div>

        <div className={style.buttons}>
          <span>
          No tienes una cuenta? 
          <Link to='/register' className={style.register}>Registrate</Link>
          </span>
        </div>

        <div className={style.buttons}>
          <span>
          o 
          <LoginButton/>
          </span>
        </div>

    </div>
    
  )
}

export default Login
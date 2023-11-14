/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import Logo from '../../assets/locan.png'
import { useState } from 'react'
import React from 'react'
import style from './Login.module.css'
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2'; 

import LoginButton from '../Auth0/LoginButton';

const Login = ({ setAuth, userData }) => {
  const [ userValidated, setUser ] = useState(false);
  const [input, setInput] = useState({
    username: "",
    password: "",
  });

  const [error, setErrors] = useState("")
  // const [userError, setUserErrors] = useState("")
  // const [passwordError, setPasswordErrors] = useState("")


  const handleInputChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    })
    
  }

  const handleSumbit = async (e) => {
    e.preventDefault();
  
    try {
      let loginUser = {
        username: input.username,
        password: input.password,
      };
      const response = await axios.post("/users/login", loginUser);
  
      if (response.data && response.data.token) {
        const token = await localStorage.setItem("token", response.data.token);
        setAuth(true, userData); // Set auth to true and pass user data

        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 1000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseleave', Swal.resumeTimer);
          }
        });
  
        Toast.fire({
          icon: 'success',
          title: 'Login exitoso',
        });

      } else {
        console.log("Hubo un error al iniciar sesión.");
        setErrors("Usuario o contraseña incorrectos")
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        setErrors(`Error: ${error.response.data.message}`);
      } else if (error.request) {
        console.log(error.request);
        setErrors('Error: No response received from server');
      }
      console.error("Error al enviar los datos al servidor:", error);
      // console.log("Hubo un error al iniciar sesión.");
      setErrors("Usuario o contraseña incorrectos")

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
                <input type="text" name="username" placeholder='Usuario' onChange={handleInputChange}
                  value={input.username}/>
              </div>
              <div>
                <input type="password"name="password" placeholder='Contraseña'onChange={handleInputChange}
                  value={input.password}/>
              </div>
              
              {error && <div className={style.error}>{error}</div> }
              <button onClick={handleSumbit} className={style.iniciar}>Iniciar sesión</button>
          </form>
        </div>

        <div className={style.buttons}>
          <span>
          ¿No tienes una cuenta? 
          <Link to='/register' className={style.register}>Regístrate</Link>
          </span>
        </div>

        <div className={style.buttons}>
          <span>
          o 
          <LoginButton/>
          </span>
        </div>
        <div className={style.buttons}>
          <span className={style.recover}>
          ¿Olvidaste la contraseña? 
          <Link to='/forgotpassword' className={style.register}>Recuperar</Link>
          </span>
        </div>
    </div>
    
  )
}

export default Login
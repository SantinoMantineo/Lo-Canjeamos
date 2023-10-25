import { useState } from 'react'
import React from 'react'
import style from './Register.module.css'
import { Link } from "react-router-dom";


const Register = () => {

  const [input, setInput] = useState({
    username: "",
    password: "",
  });

  return (
    <div className={style.container}>
        
        <div className={style.title}>
          <h2>Register</h2>
          <div><p>Completa con tus datos</p></div>
        </div>

        <div className={style.form}>
          <form>
            <div>
              <input type="text" name="username"/>
              <span>Nombre</span>
            </div>

            <div>
              <input type="text" name="apellido"/>
              <span>Apellido</span>
            </div>

            <div>
              <input type="mail" name="mail"/>
              <span>Mail</span>
            </div>

            <div>
              <input type="password" name="password"/>
              <span>Password</span>
            </div>

            <button>
              Register
            </button>
          </form>
        </div>
            <div>
                <button>
                 Queres Ser Premiun?          
                </button>
            </div>

    </div>
    
  )
}

export default Register
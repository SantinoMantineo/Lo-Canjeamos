/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import { useState } from 'react'
import React from 'react'
import style from './Login.module.css'
import { Link } from "react-router-dom";


const Login = () => {

  const [input, setInput] = useState({
    username: "",
    password: "",
  });

console.log(input)

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


  return (
    <div className={style.container}>
        <div>
          <h2>Login</h2>
        </div>
        <div>
          <form>
              <div>
                <input type="text" name="username" placeholder='UserName' onChange={handleInputChange}
                  value={input.username}/>
              </div>
              <div>
                <input type="password"name="password" placeholder='Password'onChange={handleInputChange}
                  value={input.password}/>
              </div>

              <Link to='/profile'>Sig In</Link>
          </form>
        </div>

        <div>
          <span>
          Don't have an account? 
          <Link to='/register' >Register</Link>
          </span>
        </div>

    </div>
    
  )
}

export default Login
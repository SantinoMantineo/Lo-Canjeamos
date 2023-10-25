/* eslint-disable no-unused-vars */
import React from 'react'
import { useState } from 'react'
import style from './Register.module.css'
import { Link } from "react-router-dom";


const Register = () => {

  const [input, setInput] = useState({
    fullname:"",
    username: "",
    password: "",
    email: "",
    imag: "",
    location: "",
  });
  console.log(input)

  const [showPassword, setShowPassword] = useState(false);

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
  const handleShowPassword = ()=> {
    setShowPassword(!showPassword)
}


  return (
    <div className={style.container}>
        
        <div className={style.title}>
          <h2>Register</h2>
          <div><p>Please Enter Your Details</p></div>
        </div>

        <div className={style.form}>
          <form>
            <div>
              <input type="text" name="fullname" placeholder='fullname' onChange={handleInputChange} value={input.fullname}/>
              <span>Full Name</span>
            </div>

            <div>
              <input type="text" name="username" placeholder='username' onChange={handleInputChange} value={input.username}/>
              <span>Username</span>
            </div>

            <div>
              <input type=  {showPassword ? "text" : "password"} name="password" placeholder='password' onChange={handleInputChange} value={input.password}/>
              <h2 className=''>Show Pasword <input type="checkbox" onClick={handleShowPassword} /></h2>
            </div>

            <div>
              <input type="email" name="email" placeholder='email' onChange={handleInputChange} value={input.email}/>
              <span>Email</span>
            </div>

            <div>
              <input type="imag" name="imag" placeholder='image' onChange={handleInputChange} value={input.imag}/>
              <span>Image</span>
            </div>

            <div>
              <input type="location" name="location" placeholder='location' onChange={handleInputChange} value={input.location}/>
              <span>Location</span>
            </div>

            <Link to='/login'>Register</Link>
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
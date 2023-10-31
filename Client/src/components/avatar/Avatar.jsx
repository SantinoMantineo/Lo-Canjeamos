/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import { Link } from 'react-router-dom';
import avatar from '../../assets/avatar.jpg'
import style from './Avatar.module.css'

const Avatar = () => {
  return (
    <>
    <div className={style.avatar}>
    <img src={avatar}></img>
    <h3>Emir Kalehb</h3>
    <p>San Cristóbal, Santa Fe</p>
    <div>⭐️⭐️⭐️⭐️⭐️</div>
    <button className={style.premium}>Sé Premium</button>
    <br/>
    <br/>
    <Link to="/login">
    <button className={style.logout}>Salir</button>
    </Link>
    </div>
    </>
  )
}

export default Avatar
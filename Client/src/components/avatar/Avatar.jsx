import React from 'react'
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
    <button className={style.logout}>Salir</button>
    
    </div>
    </>
  )
}

export default Avatar
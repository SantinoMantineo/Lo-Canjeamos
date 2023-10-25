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
    <button>Sé Premium</button>
    </div>
    </>
  )
}

export default Avatar
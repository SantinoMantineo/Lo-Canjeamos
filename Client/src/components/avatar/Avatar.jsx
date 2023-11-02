/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import avatar from '../../assets/avatar.jpg'
import style from './Avatar.module.css'

const Avatar = ({userData, setAuth}) => {

  const logout = () => {
    localStorage.removeItem("token");
    setAuth(false);
  };

  return (
    <>
    <div className={style.avatar}>
    <img src={avatar}></img>
    <h3>{userData.username}</h3>
    <p>{userData.email}</p>
    <div>⭐️⭐️⭐️⭐️⭐️</div>
    <button className={style.premium}>Sé Premium</button>
    <br/>
    <br/>
    <button className={style.logout} onClick={logout}>Salir</button>
    </div>
    </>
  )
}

export default Avatar
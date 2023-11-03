/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import avatar from '../../assets/avatar.jpg'
import style from './Avatar.module.css'
import { useAuth0 } from "@auth0/auth0-react";
const Avatar = ({userData, setAuth}) => {

  const {user,logout:loguotAuth0} = useAuth0()
  console.log(user);
  
  const logout = () => {
    localStorage.removeItem("token");
    setAuth(false);
  };

  return (
    <>
    <div className={style.avatar}>
    <img src={user.picture||avatar}></img>
    <h3>{userData.username||user.name}</h3>
    <p>{userData.email||user.email}</p>
    <div>⭐️⭐️⭐️⭐️⭐️</div>
    <button className={style.premium}>Sé Premium</button>
    <br/>
    <br/>
    <div>
  {user && (
    <button className={style.logout} onClick={loguotAuth0}>SalirGoogle</button>
  )}
  {!user && userData && (
    <button className={style.logout} onClick={logout}>SalirBaseDatos</button>
  )}
</div>
    </div>
    </>
  )
}

export default Avatar
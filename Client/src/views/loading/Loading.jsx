/* eslint-disable no-unused-vars */
import React from "react";
import style from './Loading.module.css';

const Loading = () => {
  return (
  <div className={style.loading}>
    <img width="40" height="40" src="https://img.icons8.com/color/48/cancel.png" alt="cancel"/>
    <h1>Inicia sesión para acceder a todas las funciones</h1>
  </div>
  )
};

export default Loading;
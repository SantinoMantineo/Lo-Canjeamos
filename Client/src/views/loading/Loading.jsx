import React from "react";
import {Link} from 'react-router-dom';
import style from "./Loading.module.css";

const Loading = () => {
  return (
    <>
      <div className={style.loading}>
        <img
          width="40"
          height="40"
          src="https://img.icons8.com/color/48/cancel.png"
          alt="cancel"
        />
        <h1>Inicia sesión para acceder a todas las funciones</h1>
        <Link to="/login">
        <button>Inicia sesión</button>
        </Link>
      </div>
    </>
  );
};

export default Loading;

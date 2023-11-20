/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import style from "./Loading.module.css";

const Loading = () => {
  const [showSpinner, setShowSpinner] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSpinner(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {showSpinner ? (
        <div className={style.sppiner}>
          <div className="spinner">
            <div className="bounce1"></div>
            <div className="bounce2"></div>
            <div className="bounce3"></div>
          </div>
        </div>
      ) : (
        <div className={style.loading}>
          <img
            width="48"
            height="48"
            src="https://img.icons8.com/emoji/48/warning-emoji.png"
            alt="warning-emoji"
          />
          <h3>
            Debes iniciar sesión para acceder a todas las funcionalidades.
          </h3>
          <Link to="/login">
            <button>Iniciar sesión</button>
          </Link>
        </div>
      )}
    </>
  );
};

export default Loading;

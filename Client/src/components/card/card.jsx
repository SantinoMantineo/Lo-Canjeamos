import React from "react";
import { Link } from 'react-router-dom'
import Shoes from "../../assets/shoes.jpeg";
import style from "./Card.module.css";

const Card = () => {

  return (
    <>
    <Link to="/detail">
    <div className={style.card}>
      <img src={Shoes} className={style.img} alt="Nike Air Jordan" />
        <p>Nike Air Jordan</p>
        <button>
          <img
            width="24"
            height="24"
            src="https://img.icons8.com/material-rounded/48/available-updates.png"
            alt="available-updates"
          />
        </button>
      </div>
      </Link>
      </>
  );
};

export default Card;

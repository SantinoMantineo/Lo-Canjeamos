import React from "react";
import Shoes from "../../assets/Shoes.jpeg";
import style from "./Card.module.css";

const Card = () => {
  return (
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
  );
};

export default Card;

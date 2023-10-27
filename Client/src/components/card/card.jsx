import React from "react";
import { Link } from "react-router-dom";
import Shoes from "../../assets/nike.jpeg";
import style from "./Card.module.css";

const Card = () => {
  return (
    <>
      <Link to="/detail" className={style.link}>
        <div className={style.card}>
          <img src={Shoes} className={style.img} alt="Nike Air Jordan" />
          <p>Nike Air</p>
          <h6>San Cristóbal, Santa Fe</h6>
        </div>
      </Link>
    </>
  );
};

export default Card;

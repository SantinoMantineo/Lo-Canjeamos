import React from "react";
import { Link } from 'react-router-dom';
import Product from "../../assets/product.jpeg";
import Product2 from "../../assets/shoes.jpeg";
import Logo from "../../../public/favicon.png"
import style from "./Matchs.module.css";

const Matchs = () => {
  return (
    <>
    <Link>
      <div className={style.matchs}>
        <img src={Product} className={style.img}></img>
        <img
          width="24"
          height="24"
          src={Logo}
          alt="available-updates"
          className={style.matchLogo}
        />
        <img src={Product2} className={style.img}></img>
      </div>
      </Link>
    </>
  );
};

export default Matchs;

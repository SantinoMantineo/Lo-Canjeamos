import React from "react";
import product from "../../assets/product.jpeg";
import style from "./Publication.module.css";

const Publication = () => {

  return (
    <>
     <div className={style.publication}>
        <img src={product} className={style.img}></img>
        <h3>Auriculares Sony</h3>
        <button className={style.trash}>
        <img width="24" height="24" src="https://img.icons8.com/color/48/delete-forever.png" alt="delete-forever"/>
        </button>
      </div>
    </>
  );
};

export default Publication;

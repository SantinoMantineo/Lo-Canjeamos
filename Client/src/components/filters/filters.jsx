import React from "react";
import Product from '../../assets/product.jpeg'
import style from "./Filters.module.css";

const Filters = () => {
  return (
    <>
      <div className={style.filters}>
        <select>
          <option>Ubicación</option>
          <option></option>
        </select>
        <img src={Product} className={style.avatar}/>
        <select>
          <option>Categoría</option>
          <option></option>
        </select>
      </div>
    </>
  );
};

export default Filters;

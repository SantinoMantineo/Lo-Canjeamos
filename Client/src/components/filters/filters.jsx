import React from "react";
import { Link } from "react-router-dom";
import Product from "../../assets/product.jpeg";
import style from "./Filters.module.css";

const Filters = () => {
  return (
    <>
      <div className={style.filters}>
        <Link to="/profile">
          <img src={Product} className={style.product} />
        </Link>
        <span>Filtrar:</span>

        <select>
          <option>Categoría</option>
          <option></option>
        </select>

        <select>
          <option>Localidad</option>
          <option></option>
        </select>

        <select>
          <option>Provincia</option>
          <option></option>
        </select>
      </div>
    </>
  );
};

export default Filters;

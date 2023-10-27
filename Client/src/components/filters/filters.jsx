import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectProvince, selectLocality, selectCategory } from "../../redux/actions";
import Product from "../../assets/product.jpeg";
import style from "./Filters.module.css";

const Filters = () => {
  const selectedProvince = useSelector((state) => state.selectedProvince);
  const selectedLocality = useSelector((state) => state.selectedLocality);
  const selectedCategory = useSelector((state) => state.selectedCategory); 
  const dispatch = useDispatch();

  const handleProvinceChange = (event) => {
    dispatch(selectProvince(event.target.value));
  };

  const handleLocalityChange = (event) => {
    dispatch(selectLocality(event.target.value));
  };

  const handleCategoryChange = (event) => {
    dispatch(selectCategory(event.target.value));
  };

  return (
    <>
      <div className={style.filters}>
        <Link to="/profile">
          <img src={Product} className={style.product} alt="Product" />
        </Link>
        <span>Filtrar:</span>

        <select value={selectedProvince} onChange={handleProvinceChange}>
          <option value="">Provincia</option>
          <option value="provincia1">Provincia 1</option>
          {/* Agrega más opciones de provincia según tus datos */}
        </select>

        <select value={selectedLocality} onChange={handleLocalityChange}>
          <option value="">Localidad</option>
          <option value="localidad1">Localidad 1</option>
          {/* Agrega más opciones de localidad según tus datos */}
        </select>

        <select value={selectedCategory} onChange={handleCategoryChange}>
          <option value="">Categoría</option>
          <option value="categoria1">Categoría 1</option>
          {/* Agrega más opciones de categoría según tus datos */}
        </select>
      </div>
    </>
  );
};

export default Filters;

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCategory,
  selectLocality,
  selectProvince,
  getPostByProvince,
  getPostByLocality,
  getPostByCategory,
  getAllPosts,
  resetFilters,
} from "../../redux/actions";
import style from "./Filters.module.css";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import imgBase from "../../assets/imgBase.jpg";

const Filters = () => {
  const selectedProvince = useSelector((state) => state.selectedProvince);
  const selectedLocality = useSelector((state) => state.selectedLocality);
  const selectedCategory = useSelector((state) => state.selectedCategory);
  const dispatch = useDispatch();
  const allPostsCopy = useSelector((state) => state.allPostsCopy);
  const selectedImage = useSelector((state) => state.selectedPostImage);

  // Obtener filtros almacenados en localStorage al cargar el componente
  useEffect(() => {
    const storedProvince = localStorage.getItem("selectedProvince");
    const storedLocality = localStorage.getItem("selectedLocality");
    const storedCategory = localStorage.getItem("selectedCategory");

    if (storedProvince) dispatch(selectProvince(storedProvince));
    if (storedLocality) dispatch(selectLocality(storedLocality));
    if (storedCategory) dispatch(selectCategory(storedCategory));

    // Obtener posts según los filtros almacenados
    if (storedProvince) dispatch(getPostByProvince(storedProvince));
    if (storedLocality) dispatch(getPostByLocality(storedLocality));
    if (storedCategory) dispatch(getPostByCategory(storedCategory));

    // Obtener todos los posts al cargar el componente
    dispatch(getAllPosts());
  }, [dispatch]);

  // Actualizar localStorage cuando cambian los filtros
  useEffect(() => {
    if (selectedProvince) localStorage.setItem("selectedProvince", selectedProvince);
    if (selectedLocality) localStorage.setItem("selectedLocality", selectedLocality);
    if (selectedCategory) localStorage.setItem("selectedCategory", selectedCategory);
  }, [selectedProvince, selectedLocality, selectedCategory]);

  const handleProvinceChange = (event) => {
    const province = event.target.value;
    dispatch(selectProvince(province));
    dispatch(getPostByProvince(province));
  };

  const handleLocalityChange = (event) => {
    const locality = event.target.value;
    dispatch(selectLocality(locality));
    dispatch(getPostByLocality(locality));
  };

  const handleCategoryChange = (event) => {
    const category = event.target.value;
    dispatch(selectCategory(category));
    dispatch(getPostByCategory(category));
  };

  const locations = allPostsCopy.map((post) => post.ubication);

  // Crear un mapa de provincias y sus localidades correspondientes
  const provinceToLocalityMap = new Map();
  locations.forEach((location) => {
    const [province, locality] = location.split(", ");
    if (!provinceToLocalityMap.has(province)) {
      provinceToLocalityMap.set(province, []);
    }
    const localityArray = provinceToLocalityMap.get(province);
    if (!localityArray.includes(locality)) {
      localityArray.push(locality);
    }
  });

  // Obtener las provincias únicas
  const provinces = Array.from(provinceToLocalityMap.keys());

  const uniqueCategories = [
    ...new Set(allPostsCopy.map((post) => post.category)),
  ];

  const handleResetFilters = () => {
    // Limpiar localStorage al restablecer los filtros
    localStorage.removeItem("selectedProvince");
    localStorage.removeItem("selectedLocality");
    localStorage.removeItem("selectedCategory");

    dispatch(resetFilters());
    dispatch(getAllPosts());
  };

  return (
    <>
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.8,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        className={style.filters}
      >
        <Link to="/login">
          {selectedImage ? (
            <img src={selectedImage} className={style.product} alt="Product" />
          ) : (
            <img
              src={imgBase}
              className={style.product}
              alt="Imagen Predeterminada"
            />
          )}
        </Link>
        <span>Filtros:</span>
        <select value={selectedProvince} onChange={handleProvinceChange}>
          <option value="">Provincia</option>
          {provinces.map((province, index) => (
            <option key={index} value={province}>
              {province}
            </option>
          ))}
        </select>

        <select value={selectedLocality} onChange={handleLocalityChange}>
          <option value="">Localidad</option>
          {provinceToLocalityMap.get(selectedProvince) &&
            provinceToLocalityMap
              .get(selectedProvince)
              .map((locality, index) => (
                <option key={index} value={locality}>
                  {locality}
                </option>
              ))}
        </select>

        <select value={selectedCategory} onChange={handleCategoryChange}>
          <option value="">Categoría</option>
          {uniqueCategories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
        <button onClick={handleResetFilters}>
          <img
            width="24"
            height="24"
            src="https://img.icons8.com/color/48/broom.png"
            alt="broom"
          />
        </button>
      </motion.div>
    </>
  );
};
export default Filters;

/* eslint-disable no-unused-vars */
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Cards from "../../components/cards/cards";
import Filters from "../../components/filters/filters";
import Header from "../../components/header/Header";
import Banner from "../../assets/banner1.jpg";
import Banner2 from "../../assets/banner2.jpg";
import style from "./Home.module.css";
import Paginado from "../../components/pagination/pagination";
import { getAllPosts } from "../../redux/actions";

const Home = ({}) => {
  const dispatch = useDispatch();
  const allPosts = useSelector((state) => state.allPosts);

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);


  // Estado para la página actual
  const [currentPage, setCurrentPage] = useState(1);

  // Función de paginado
  const handlePaginado = (pageNumber) => {
    // Lógica para actualizar la página actual
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <Header banner1={Banner} banner2={Banner2}></Header>
      <Filters></Filters>
      {/* Renderizar solo las tarjetas correspondientes a la página actual */}
      <Cards allPosts={allPosts}></Cards>
      {/* Componente de paginado con las props adecuadas */}
      <Paginado
        allCard={allPosts.length}
        cardPerPage={10}
        paginado={handlePaginado}
        currentPage={currentPage}
      />
    </>
  );
};
export default Home;

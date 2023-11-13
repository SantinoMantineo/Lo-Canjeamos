/* eslint-disable no-unused-vars */
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getAllPosts } from "../../redux/actions";

import Cards from "../../components/cards/Cards";
import Filters from "../../components/filters/filters";
import Header from "../../components/header/Header";
import Banner from "../../assets/banner1.jpg";
import Banner2 from "../../assets/banner2.jpg";
import Paginado from "../../components/pagination/pagination";
import AllCards from "../../components/allCards/AllCards";

import style from "./Home.module.css";

const Home = ({}) => {
  const dispatch = useDispatch();
  const allPosts = useSelector((state) => state.allPosts);
  const Posts = useSelector((state) => state.allPostsCopy);
  const [isInstalled, setIsInstalled] = useState(false);

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

  const handleDownload = () => {
    if (!isInstalled) {
      navigator.serviceWorker.register('service-worker.js').then((reg) => {
        setIsInstalled(true);
      });
    }
  };

  handleDownload();

  return (
    <>
      <Header banner1={Banner} banner2={Banner2}></Header>
      <Cards allPosts={Posts}></Cards>
      <Filters></Filters>
      <AllCards posts={allPosts}></AllCards>
    </>
  );
};
export default Home;

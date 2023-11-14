/* eslint-disable no-unused-vars */
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getAllPosts } from "../../redux/actions";

import Cards from "../../components/cards/Cards";
import Filters from "../../components/filters/filters";
import Header from "../../components/header/Header";
import Paginado from "../../components/pagination/pagination";
import AllCards from "../../components/allCards/AllCards";
import Footer from '../../components/footer/Footer'

import style from "./Home.module.css";

const Home = ({}) => {
  const dispatch = useDispatch();
  const allPosts = useSelector((state) => state.allPosts);
  const Posts = useSelector((state) => state.allPostsCopy);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    dispatch(getAllPosts());
  }, []);

  // Estado para la página actual
  const [currentPage, setCurrentPage] = useState(1);

  // Función de paginado
  const handlePaginado = (pageNumber) => {
    // Lógica para actualizar la página actual
    setCurrentPage(pageNumber);
  };

  const handleDownload = () => {
    if (!isInstalled) {
      navigator.serviceWorker.register('sw.js').then((reg) => {
        setIsInstalled(true);
      });
    }
  };

  handleDownload();

  const Banner = "https://res.cloudinary.com/dlahgnpwp/image/upload/v1699885578/emailAssets/er00zffd102eyze13aug.jpg";
  const Banner2 = "https://res.cloudinary.com/dlahgnpwp/image/upload/v1699885578/emailAssets/cyzzxxg8vkfxaqzolq9m.jpg";

  return (
    <>
      <Header banner1={Banner} banner2={Banner2}></Header>
      <Cards allPosts={Posts}></Cards>
      <Filters></Filters>
      <AllCards posts={allPosts}></AllCards>
      <Footer></Footer>
    </>
  );
};

export default Home;

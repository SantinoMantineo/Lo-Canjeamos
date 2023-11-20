/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "../../redux/actions";
import VideoModal from "../../components/videoModal/VideoModal";
import Cards from "../../components/cards/Cards";
import Filters from "../../components/filters/filters";
import Header from "../../components/header/Header";
import AllCards from "../../components/allCards/AllCards";
import Footer from "../../components/footer/Footer";

import style from "./Home.module.css";

const Home = ({}) => {
  const dispatch = useDispatch();
  const allPosts = useSelector((state) => state.allPosts);
  const Posts = useSelector((state) => state.allPostsCopy);
  const [isInstalled, setIsInstalled] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const postPerPage = 12;

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  /* const sortedPosts = allPosts
    .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
    .slice(0, allPosts.length); */

  useEffect(() => {
    if (allPosts.length > 0) {
      const initialItems = allPosts.slice(0, postPerPage);
      setItems(initialItems);
      setCurrentPage(0);
    }
  }, [allPosts]);

  const nextHandler = () => {
    const totalElemento = allPosts.length;
    const nextPage = currentPage + 1;
    const firstIndex = nextPage * postPerPage;
    if (firstIndex >= totalElemento) return;
    setItems(allPosts.slice(firstIndex, firstIndex + postPerPage));
    setCurrentPage(nextPage);
  };

  const prevHandler = () => {
    const preventPage = currentPage - 1;
    if (preventPage < 0) return;
    const firstIndex = preventPage * postPerPage;
    setItems(allPosts.slice(firstIndex, firstIndex + postPerPage));
    setCurrentPage(preventPage);
  };

  const Banner =
    "https://res.cloudinary.com/dlahgnpwp/image/upload/v1699885578/emailAssets/er00zffd102eyze13aug.jpg";
  const Banner2 =
    "https://res.cloudinary.com/dlahgnpwp/image/upload/v1699885578/emailAssets/cyzzxxg8vkfxaqzolq9m.jpg";

  return (
    <>
      <Header banner1={Banner} banner2={Banner2}></Header>

      <div className={style.button}>
        {showModal && <VideoModal onClose={toggleModal} />}
      </div>
      <button onClick={toggleModal} className={style.open}>
        <img
          width="50"
          height="50"
          src="https://img.icons8.com/color/96/help--v1.png"
          alt="help--v1"
        />
      </button>
      <Cards allPosts={Posts}></Cards>
      <Filters></Filters>
      <AllCards
        posts={items}
        currentPage={currentPage}
        nextHandler={nextHandler}
        prevHandler={prevHandler}
      ></AllCards>
      <Footer></Footer>
    </>
  );
};

export default Home;

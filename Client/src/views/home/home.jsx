/* eslint-disable no-unused-vars */
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
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

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  useEffect(() => {
    dispatch(getAllPosts());
  }, []);

  const postporpagina = 12;
const [items,setItems] = useState ( [...allPosts].splice(0,postporpagina))
const [currentPage,setCurrentPage] = useState(0);

const nextHandler = () =>{
  const totalElemento = allPosts.length;
  const nextPage = currentPage + 1;
  const firstIndex = nextPage * postporpagina
  if (firstIndex>=totalElemento) return;
  setItems([...allPosts].splice(firstIndex,postporpagina))
  setCurrentPage(nextPage)
  console.log("ClickNext");
}
const prevHandler = () =>{
  const preventPage = currentPage - 1

  if(preventPage <0)return;
  const firstIndex =preventPage *postporpagina
  setItems([...allPosts].splice(firstIndex,postporpagina))
  setCurrentPage(preventPage)
  console.log("ClickPrevet");
}

  const handleDownload = () => {
    if (!isInstalled) {
      navigator.serviceWorker.register("sw.js").then((reg) => {
        setIsInstalled(true);
      });
    }
  };

  handleDownload();

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
      <AllCards posts={items}
      currenPage={currentPage}
      nextHandler={nextHandler}
      prevHandler={prevHandler}
      ></AllCards>
      <Footer></Footer>
    </>
  );
};

export default Home;

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import style from "./Exchanges.module.css";
import PostsLiked from "../../components/likedPosts/PostsLiked";
import Matchs from "../../components/matchs/Matchs";
import Header from "../../components/header/Header";
import Banner3 from "../../assets/banner3.jpg";
import Banner4 from "../../assets/banner4.jpg";
import RecivedLikes from "../../components/recivedLikes/recivedLikes";
import { useDispatch } from "react-redux";
import { getUserById } from "../../redux/actions";
import axios from "axios";

const Exchanges = ({ userData }) => {
  const [isPremium, setPremium] = useState(false);

  const premium = async () => {
    try {
      const token = localStorage.getItem("token");
      const usuario = await axios.get("/users/userId", {
        headers: {
          token: token,
        },
        params: { id: userData.id },
      });

      if (usuario.data.plan === "premium") {
        setPremium(true);
      }
    } catch (error) {
      console.error("Error al obtener la información del usuario:", error);
    }
  };

  useEffect(() => {
    premium();
  }, []);

  return (
    <>
      <Header banner1={Banner3} banner2={Banner4}></Header>
      <motion.div
        initial={{
          opacity: 0,
          y: 50,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className={isPremium ? style.exchangesPremium : style.exchanges }
      >
        <div className={style.matchs}>
          <h3>Mis canjes logrados</h3>
          <Matchs userData={userData}></Matchs>
        </div>
        <div className={style.likes}>
          <h3>Mis intentos de canje</h3>
          <PostsLiked userData={userData}></PostsLiked>
        </div>
        {isPremium ? (
          <div className={style.requests}>
            <h3>Pedidos de canje recibidos</h3>
            <RecivedLikes userData={userData}></RecivedLikes>
          </div>
        ) : <div className={style.requests}>
        <h3>Pedidos de canje recibidos</h3>
       <h3>Para acceder a esta funcionalidad debes ser premium...</h3>
      </div>}
      </motion.div>
    </>
  );
};

export default Exchanges;

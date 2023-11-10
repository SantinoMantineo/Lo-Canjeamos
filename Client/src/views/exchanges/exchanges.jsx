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
    setPremium(true)      // ESTA LINEA ESTA DE PRUEBA HASTA QUE SE ARREGLE EL PREMIUM
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
        className={isPremium ? style.exchanges : style.exchangesPremium}
      >
        <div className={style.matchs}>
          <h3>Canjes logrados</h3>
          <Matchs userData={userData}></Matchs>
        </div>
        <div className={style.likes}>
          <h3>Intentos de canje</h3>
          <PostsLiked userData={userData}></PostsLiked>
        </div>
        {isPremium && (
          <div className={style.likes}>
            <h3>Publicaciones que quieren canjear!</h3>
            <RecivedLikes userData={userData}></RecivedLikes>
          </div>
        )}
      </motion.div>
    </>
  );
};

export default Exchanges;

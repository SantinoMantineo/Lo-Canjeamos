import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import style from "./Exchanges.module.css";
import PostsLiked from "../../components/likedPosts/PostsLiked";
import Matchs from "../../components/matchs/Matchs";
import Header from "../../components/header/Header";
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

  const Banner3 =
    "https://res.cloudinary.com/dlahgnpwp/image/upload/v1699885578/emailAssets/itncfxbtlnpm7e6tsffu.jpg";
  const Banner4 =
    "https://res.cloudinary.com/dlahgnpwp/image/upload/v1699885577/emailAssets/pql2ueup71odoj5lm7wk.jpg";

  return (
    <>
      <Header banner1={Banner3} banner2={Banner4}></Header>

      <div className={isPremium ? style.exchangesPremium : style.exchanges}>
        <motion.div
          initial={{
            opacity: 0,
            y: 50,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.2,
          }}
          className={style.matchs}
        >
          <h3>Mis canjes logrados</h3>
          <Matchs userData={userData}></Matchs>
        </motion.div>
        <motion.div
          initial={{
            opacity: 0,
            y: 50,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.2,
          }}
          className={style.likes}
        >
          <h3>Mis intentos de canje</h3>
          <PostsLiked userData={userData}></PostsLiked>
        </motion.div>
        {isPremium ? (
          <motion.div
            initial={{
              opacity: 0,
              y: 50,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.2,
            }}
            className={style.requests}
          >
            <h3>Pedidos de canje recibidos</h3>
            <RecivedLikes userData={userData}></RecivedLikes>
          </motion.div>
        ) : (
          <motion.div
            initial={{
              opacity: 0,
              y: 50,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.2,
            }}
            className={style.requests}
          >
            <h3>Pedidos de canje recibidos</h3>
            <div className={style.alert}>
              <h3>Para acceder a esta funcionalidad debes ser premium.</h3>
            </div>
          </motion.div>
        )}
      </div>
    </>
  );
};

export default Exchanges;

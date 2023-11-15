/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
/* import OneSignal from "react-onesignal"; */
import Avatar from "../../components/avatar/Avatar";
import Publication from "../../components/publication/Publication";
import Header from "../../components/header/Header";
import style from "./MyProfile.module.css";
import axios from "axios";

const MyProfile = ({ userData, setAuth, toggleDarkMode }) => {
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
  
  const Banner3 = "https://res.cloudinary.com/dlahgnpwp/image/upload/v1699885578/emailAssets/itncfxbtlnpm7e6tsffu.jpg";
  const Banner4 = "https://res.cloudinary.com/dlahgnpwp/image/upload/v1699885577/emailAssets/pql2ueup71odoj5lm7wk.jpg";

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
        className={style.myProfile}
      >
        <div className={style.avatar}>
          <Avatar
            userData={userData}
            setAuth={setAuth}
            toggleDarkMode={toggleDarkMode}
          />
        </div>
        <div className={style.publications}>
          <h3>Publicaciones</h3>
          <Link to="/addProduct">
            <button className={style.agregar}>Agregar</button>
          </Link>
          <Publication userData={userData}></Publication>
        </div>
      </motion.div>
    </>
  );
};

export default MyProfile;

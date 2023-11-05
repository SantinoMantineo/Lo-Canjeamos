/* eslint-disable no-unused-vars */
import React from "react";
import {Link} from 'react-router-dom';
import {motion} from 'framer-motion';
import Avatar from "../../components/avatar/Avatar";
import Publication from "../../components/publication/Publication";
import Header from "../../components/header/Header";
import Banner3 from '../../assets/banner3.jpg'
import Banner4 from '../../assets/banner4.jpg'
import style from "./MyProfile.module.css";


const MyProfile = ({ userData, setAuth, toggleDarkMode }) => {

  const handleInstallPWA = () => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      window.addEventListener('beforeinstallprompt', (event) => {
        event.preventDefault();
        const installPrompt = event;

        installPrompt.userChoice.then((choiceResult) => {
          if (choiceResult.outcome === 'accepted') {
            console.log('Usuario aceptó la instalación de la PWA');
          } else {
            console.log('Usuario canceló la instalación de la PWA');
          }
        });
      });
    }
  };

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
      className={style.myProfile}>
        <div className={style.avatar}>
          <Avatar userData={userData} setAuth={setAuth} toggleDarkMode={toggleDarkMode} instalApp={handleInstallPWA}/>
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

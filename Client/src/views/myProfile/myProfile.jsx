/* eslint-disable no-unused-vars */
import React from "react";
import {motion} from 'framer-motion';
import Avatar from "../../components/avatar/Avatar";
import Publication from "../../components/publication/Publication";
import Header from "../../components/header/Header";
import Banner3 from '../../assets/banner3.jpg'
import Banner4 from '../../assets/banner4.jpg'
import style from "./MyProfile.module.css";


const MyProfile = ({ userData, setAuth, toggleDarkMode }) => {

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
          <Avatar userData={userData} setAuth={setAuth} toggleDarkMode={toggleDarkMode}/>
        </div>
        <div className={style.publications}>
          <h3>Publicaciones</h3>
          <Publication userData={userData}></Publication>
        </div>
      </motion.div>
    </>
  );
};

export default MyProfile;

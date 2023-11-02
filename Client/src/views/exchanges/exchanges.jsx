import React from "react";
import {motion} from 'framer-motion';
import Publication from "../../components/publication/Publication";
import style from "./Exchanges.module.css";
import Matchs from "../../components/matchs/Matchs";
import Header from "../../components/header/Header";
import Banner3 from '../../assets/banner3.jpg'
import Banner4 from '../../assets/banner4.jpg'

const Exchanges = ({ userData }) => {
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
      className={style.exchanges}>
        <div className={style.matchs}>
          <h3>Canjes logrados</h3>
          <Matchs userData={userData}></Matchs>
        </div>
        <div className={style.likes}>
          <h3>Intentos de canje</h3>
        </div>
      </motion.div>
    </>
  );
};

export default Exchanges;

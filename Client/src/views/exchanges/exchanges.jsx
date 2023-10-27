import React from "react";
import Publication from "../../components/publication/Publication";
import style from "./Exchanges.module.css";
import Matchs from "../../components/matchs/Matchs";
import Header from "../../components/header/Header";
import Banner3 from '../../assets/banner3.jpg'
import Banner4 from '../../assets/banner4.jpg'

const Exchanges = () => {
  return (
    <>
    <Header banner1={Banner3} banner2={Banner4}></Header>
      <div className={style.exchanges}>
        <div className={style.matchs}>
          <h3>Canjes logrados</h3>
          <Matchs></Matchs>
          <Matchs></Matchs>
        </div>
        <div className={style.likes}>
          <h3>Intentos de canje</h3>
          <Publication></Publication>
          <Publication></Publication>
          <Publication></Publication>
        </div>
      </div>
    </>
  );
};

export default Exchanges;

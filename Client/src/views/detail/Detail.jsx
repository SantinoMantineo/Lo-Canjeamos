import React from "react";
import { Link } from 'react-router-dom'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Header from '../../components/header/Header'
import Banner3 from '../../assets/banner3.jpg'
import Banner4 from '../../assets/banner4.jpg'
import Shoes from "../../assets/shoes.jpeg";
import style from "./Detail.module.css";

const Detail = ({ onClose }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
      <Header banner1={Banner3} banner2={Banner4}></Header>
      <div className={style.detail}>
        <h2>Nike Air Jordan</h2>
        <div className={style.carousel}>
          <Slider {...settings}>
            <div>
              <img src={Shoes}></img>
            </div>
            <div>
              <img src={Shoes}></img>
            </div>
            <div>
              <img src={Shoes}></img>
            </div>
          </Slider>
        </div>
        <div className={style.info}>
        <h3>Ubicación: Elisa, Santa Fe</h3>
        <h3>Rating usuario: ⭐️⭐️⭐️</h3>
        </div>
        <Link to="/home">
        <button className={style.button}>Volver</button>
        </Link>
      </div>
    </>
  );
};

export default Detail;

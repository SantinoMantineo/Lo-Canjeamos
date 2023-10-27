import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Header from "../../components/header/Header";
import Banner3 from "../../assets/banner3.jpg";
import Banner4 from "../../assets/banner4.jpg";
import Shoes from "../../assets/nike.jpeg";
import style from "./Detail.module.css";

const Detail = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          variableWidth: true,
          className: "slider variable-width",
          dots: true,
          arrows: false,
        },
      },
    ],
  };

  return (
    <>
      {/* <Header banner1={Banner3} banner2={Banner4}></Header> */}
      <div className={style.detail}>
        <h3>Nike Air</h3>
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
          <h3>Ubicación: San Cristóbal, Santa Fe</h3>
          <h3>Rating usuario: ⭐️⭐️⭐️</h3>
        </div>
        <div className={style.buttons}>
          <Link to="/home">
            <button className={style.back}>Volver</button>
          </Link>
          <button className={style.match}>Canjear</button>
        </div>
      </div>
    </>
  );
};

export default Detail;

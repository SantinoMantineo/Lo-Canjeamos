import React from "react";
import Card from "../card/card";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import style from "./Cards.module.css";

const Cards = () => {
  const settings = {
    dots: true,
    
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          variableWidth: true,
          className: "slider variable-width",
          dots: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          variableWidth: true,
          className: "slider variable-width",
          dots: false,
          arrows: false,
        },
      },
    ],
  };

  return (
    <>
      <div className={style.cards}>
        <Slider {...settings}>
          <div>
            <Card></Card>
          </div>
          <div>
            <Card></Card>
          </div>
          <div>
            <Card></Card>
          </div>
          <div>
            <Card></Card>
          </div>
          <div>
            <Card></Card>
          </div>
          <div>
            <Card></Card>
          </div>
        </Slider>
      </div>
    </>
  );
};

export default Cards;

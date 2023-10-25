import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import style from "./Header.module.css";

function Header({ banner1, banner2 }) {
  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    variableWidth: true,
  };

  return (
    <div className={style.header}>
      <Slider {...settings}>
        <div>
          <img src={banner1} />
        </div>
        <div>
          <img src={banner2} />
        </div>
      </Slider>
    </div>
  );
}

export default Header;

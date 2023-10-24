import React from "react";
import Banner from "../../assets/banner1.jpg";
import Banner2 from "../../assets/banner2.jpg";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import style from "./Header.module.css";

function Header() {
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
          <img src={Banner} />
        </div>
        <div>
          <img src={Banner2} />
        </div>
      </Slider>
    </div>
  );
}

export default Header;

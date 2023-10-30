import React from "react";
import Card from "../card/Card";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import fire from '../../assets/fire.gif'
import style from "./Cards.module.css";

const Cards = ({ allPosts }) => {
  
  const settings = {
    autoplay: true,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: Math.min(5, allPosts.length),
    variableWidth: true,
    className: "slider variable-width",
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: Math.min(3, allPosts.length),
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

  const posts = allPosts.slice(-6);

  console.log(posts)

  return (
    <>
        <div className={style.cards}>
          <div><span>Lo más destacado</span> <img src={fire} className={style.fire}></img></div>
          <Slider {...settings}>
          {posts && posts.map((post, index) => (
            <div key={index}>
              <Card key={post.id} post={post} />
            </div>
          ))}
          </Slider>
        </div>
    </>
  );
};

export default Cards;

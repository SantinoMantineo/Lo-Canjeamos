import React from "react";
import { Link } from "react-router-dom";
import Card from "../card/Card";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import style from "./Cards.module.css";

const Cards = ({ allPosts }) => {
  
  const settings = {
    dots: true,

    infinite: true,
    speed: 500,
    slidesToShow: Math.min(5, allPosts.length),
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

  const posts = allPosts

  return (
    <>
        <div className={style.cards}>
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

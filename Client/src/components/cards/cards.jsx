import React from "react";
import Card from "../card/Card";
import { motion } from "framer-motion";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import fire from "../../assets/fire.gif";
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
    arrows: false,
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

  const sortedPosts = allPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 20);

  const premiumPosts = sortedPosts.filter(post => post.User && post.User.plan === "premium");

  return (
    <>
      <motion.div
        initial={{
          opacity: 0,
          y: 50,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className={style.cards}
      >
        <div className={style.masRec}>
          <span>Lo más destacado</span>{" "}
          <img src={fire} className={style.fire}></img>
        </div>
        <Slider {...settings}>
          {premiumPosts &&
            premiumPosts.map((post, index) => (
              <div key={index}>
                <img width="32" height="32" src="https://img.icons8.com/color/48/guarantee.png" alt="guarantee" className={style.logo}/>
                <Card key={post.id} post={post} />
              </div>
            ))}
        </Slider>
      </motion.div>
    </>
  );
};

export default Cards;

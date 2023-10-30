import React from "react";
import { Link } from "react-router-dom";
import style from "./Card.module.css";

const Card = ({ post }) => {
  const { description, title, image } = post;

  console.log(image);
  return (
    <>
      <div className={style.card}>
        <img src={image[0]} className={style.img} alt={title} />
        <Link to="/detail">
          <p>{title}</p>
          <h6>{description}</h6>
        </Link>
      </div>
    </>
  );
};

export default Card;

import React from "react";
import { Link } from "react-router-dom";
import style from "./Card.module.css";

const Card = ({ post }) => {
  const { id, ubication, title, image } = post;

  return (
    <>
      <Link to={`detail/${id}`}>
        <div className={style.card}>
          {<img src={image[0]} className={style.img} alt={title} />}
          <h6>📍{ubication}</h6>
          <p>{title}</p>
        </div>
      </Link>
    </>
  );
};

export default Card;

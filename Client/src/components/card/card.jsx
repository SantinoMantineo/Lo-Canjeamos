import React from "react";
import { Link } from "react-router-dom";
import style from "./Card.module.css";

const Card = ({ post }) => {
  const { id, ubication, title, image } = post;

  return (
    <>
      <div className={style.card}>
        {<img src={image[0]} className={style.img} alt={title} />}
        <Link to={`detail/${id}`}>
          <p>{title}</p>
          <h6>{ubication}📍</h6>
        </Link>
      </div>
    </>
  );
};

export default Card;

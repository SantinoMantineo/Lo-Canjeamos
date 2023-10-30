import React from "react";
import { Link } from 'react-router-dom'
import style from "./Card.module.css";

const Card = ({ post }) => {
  const { title, image } = post

  console.log(image);
  return (
    <>
    <Link to="/detail">
    <div className={style.card}>
      <img src={image[0]} className={style.img} alt={title} />
        <p>{title}</p>
        <button>
          <img
            width="24"
            height="24"
            src="https://img.icons8.com/material-rounded/48/available-updates.png"
            alt="available-updates"
          />
        </button>
      </div>
      </Link>
    </>
  );
};

export default Card;

import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import style from "./Card.module.css";

const Card = ({ post }) => {
  const { id, ubication, title, image } = post;

  return (
    <>
      <Link to={`detail/${id}`}>
        <div className={style.card}>
          {
            <motion.img
              initial={{
                scale: 0.2,
                borderRadius: 100,
              }}
              animate={{
                scale: 1,
                borderRadius: 10,
              }}
              src={image && image.length > 0 ? image[0] : ""}
              className={style.img}
              alt={title}
            />
          }
          <h6>📍{ubication}</h6>
          <p>{title}</p>
        </div>
      </Link>
    </>
  );
};

export default Card;

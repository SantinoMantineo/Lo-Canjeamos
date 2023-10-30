import React from "react";
import Card from "../card/Card";
import style from './AllCards.module.css'

const AllCards = ({ posts }) => {
  return (
    <>
      <div className={style.allCards}>
        {posts &&
          posts.map((post, index) => (
            <div key={index} className={style.cards}>
              <Card key={post.id} post={post} />
            </div>
          ))}
      </div>
    </>
  );
};

export default AllCards;

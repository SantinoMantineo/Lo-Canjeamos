import React from "react";
import Card from "../card/Card";
import {motion} from 'framer-motion';
import style from './AllCards.module.css'

const AllCards = ({ posts,prevHandler,nextHandler,currenPage}) => {

  const sortedPosts = posts.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

  return (
    <>
      <motion.div
      
      initial={{
        opacity: 0,
        y: 100,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className={style.allCards}>
        {sortedPosts &&
          sortedPosts.map((post, index) => (
            <div key={index} className={style.cards}>
              <Card key={post.id} post={post} />
            </div>
          ))}
      </motion.div>
      <h3>Page:{currenPage} </h3>
      <button onClick={prevHandler}>Prev</button>
      <button onClick={nextHandler}>Next</button>
    </>
  );
};

export default AllCards;

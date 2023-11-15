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
      <div className={style.buttons}>
      <button onClick={prevHandler} className={style.pag}>{`<`}</button>
      <h3>{currenPage}</h3>
      <button onClick={nextHandler} className={style.pag}>{`>`}</button>
      </div>
    </>
  );
};

export default AllCards;

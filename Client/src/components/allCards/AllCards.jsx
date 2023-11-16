import React from "react";
import Card from "../card/Card";
import {motion} from 'framer-motion';
import style from './AllCards.module.css'

const AllCards = ({ posts,prevHandler,nextHandler,currentPage}) => {

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
        className={style.allCards}
      >
        {posts &&
          posts.map((post, index) => (
            <div key={index} className={style.cards}>
              <Card key={post.id} post={post} />
            </div>
          ))}
      </motion.div>
      <div className={style.buttons}>
        <button onClick={prevHandler} className={style.pag}>{`<`}</button>
        {currentPage === 0 ? (
          <h3>Home</h3>
        ) : (
          <h3>{currentPage}</h3>
        )}
        <button onClick={nextHandler} className={style.pag}>{`>`}</button>
      </div>
    </>
  );  
};

export default AllCards;

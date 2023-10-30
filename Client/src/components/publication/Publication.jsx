import React from "react";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from '../../redux/actions';
import product from "../../assets/product.jpeg";
import style from "./Publication.module.css";

const Publication = () => {

  const dispatch = useDispatch();
  const allPosts = useSelector((state) => state.allPosts);

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  const firstPost = allPosts[0];

  return (
    <>
     <div className={style.publication}>
        {firstPost && firstPost.image && (
          <img src={firstPost.image[0]} className={style.img} alt="Publication Image" />
        )}
        {firstPost && firstPost.title && <h3>{firstPost.title}</h3>}
        <button className={style.trash}>
          <img
            width="24"
            height="24"
            src="https://img.icons8.com/color/48/delete-forever.png"
            alt="delete-forever"
          />
        </button>
      </div>
    </>
  );
};

export default Publication;

import React from "react";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from '../../redux/actions';
import product from "../../assets/product.jpeg";
import style from "./Publication.module.css";

const Publication = ({userData}) => {

  const dispatch = useDispatch();
  const allPosts = useSelector((state) => state.allPosts);

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  const userPosts = allPosts.filter((post) => post.UserId === userData.id);



    return (
    <>
      {userPosts.map((post) => (
        <div key={post.id} className={style.publication}>
          {post.image && <img src={post.image[0]} className={style.img} alt="Publication Image" />}
          {post.title && <h3>{post.title}</h3>}
          <button className={style.trash}>
            <img
              width="24"
              height="24"
              src="https://img.icons8.com/color/48/delete-forever.png"
              alt="delete-forever"
            />
          </button>
        </div>
      ))}
    </>
  );
};

export default Publication;

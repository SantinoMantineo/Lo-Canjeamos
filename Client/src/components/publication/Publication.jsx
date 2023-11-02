import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts, selectedPost } from "../../redux/actions";
import style from "./Publication.module.css";
import icon from "../../assets/iconChoosed.png";

const Publication = ({ userData }) => {
  const dispatch = useDispatch();
  const allPosts = useSelector((state) => state.allPosts);

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);
  
  let userPosts = [];
  if(userData) { userPosts = allPosts.filter((post) => post.UserId === userData.id);}

  const handlePostClick = (postId, postImage) => {
    dispatch(selectedPost(postId, postImage));
  };

  return (
    <>
      {userPosts.map((post) => (
        <div key={post.id} className={style.publication}>
          {post.image && (
            <img
              src={post.image[0]}
              className={style.img}
              alt="Publication Image"
            />
          )}
          {post.title && <h3>{post.title}</h3>}

          <button
            className={style.choose}
            onClick={() => handlePostClick(post.id, post.image[0])}
          >
            <img width="24" height="24" src={icon} alt="Choose" />
          </button>
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

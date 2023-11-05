import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts, selectedPost } from "../../redux/actions";
import style from "./Publication.module.css";
import icon from "../../assets/iconChoosed.png";

const Publication = ({ userData }) => {
  const dispatch = useDispatch();
  const allPosts = useSelector((state) => state.allPosts);
  const [selectedPostId, setSelectedPostId] = useState(null);

  useEffect(() => {
    dispatch(getAllPosts());
    const storedSelectedPostId = localStorage.getItem("selectedPostId");
    if (storedSelectedPostId) {
      setSelectedPostId(Number(storedSelectedPostId));
    }

    window.addEventListener("beforeunload", () => {
      localStorage.removeItem("selectedPostId");
    });

    return () => {
      window.removeEventListener("beforeunload", () => {
        localStorage.removeItem("selectedPostId");
      });
    };
  }, [dispatch]);

  let userPosts = [];
  if (userData) {
    userPosts = allPosts.filter((post) => post.UserId === userData.id);
  }
  const sortedPosts = userPosts.sort(
    (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
  );

  const handlePostClick = (postId, postImage) => {
    if (selectedPostId === postId) {
      localStorage.removeItem("selectedPostId");
      setSelectedPostId(null);
    } else {
      localStorage.setItem("selectedPostId", postId);
      setSelectedPostId(postId);
      dispatch(selectedPost(postId, postImage));
    }
  };

  return (
    <>
      {sortedPosts.map((post) => (
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
            {selectedPostId === post.id ? (
              <img width="24" height="24" src={icon} alt="Choose" />
            ) : (
              <img
                width="24"
                height="24"
                src="https://img.icons8.com/ios-glyphs/30/circled.png"
                alt="circled"
              />
            )}
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

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts, selectedPost, deletePost } from "../../redux/actions";

import style from "./Publication.module.css";
import icon from "../../assets/iconChoosed.png";

const Publication = ({ userData }) => {
  const dispatch = useDispatch();
  const allPosts = useSelector((state) => state.allPosts);
  const matches = useSelector((state) => state.matches)
  console.log(matches);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    // Filtrar los posts del usuario cuando cambie `userData` o `allPosts`
    if (userData) {
      const filteredUserPosts = allPosts.filter((post) => post.UserId === userData.id);
      setUserPosts(filteredUserPosts); // Actualiza el estado local
    }
  }, [userData, allPosts]);

  const sortedPosts = userPosts.sort(
    (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
  );

  const handlePostClick = (postId, postImage) => {
    if (selectedPostId === postId) {
      localStorage.removeItem("selectedPostId");
      setSelectedPostId(null);
      dispatch(selectedPost(null, null));
    } else {
      localStorage.setItem("selectedPostId", postId);
      setSelectedPostId(postId);
      dispatch(selectedPost(postId, postImage));
    }
  };

  const handlePostDelete = async (postId) => {
    try {
      await dispatch(deletePost(postId)); // Espera a que se complete la eliminación en el servidor
      const updatedPosts = userPosts.filter((post) => post.id !== postId);
      setUserPosts(updatedPosts); // Actualiza el estado local
      const matchesToDelete = matches.filter((match) =>
      match.match.some((m) => m.myPostId == postId || m.likedPostId == postId)
    );
    matchesToDelete.forEach((match) => {
      match.match.forEach((m) => {
        if (m.myPostId === postId || m.likedPostId === postId) {
          dispatch(deleteMatch(match.id, m.id)); // Utiliza la acción deleteMatch con los IDs correspondientes
        }
      });
    });
    } catch (error) {
      console.error("Error al eliminar la publicación", error);
    }
  };


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
  }, [dispatch, ]);

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
                src="https://img.icons8.com/color/48/circled.png"
                alt="circled"
              />
            )}
          </button>
          <button
            className={style.trash}
            onClick={() => handlePostDelete(post.id)}
          >
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
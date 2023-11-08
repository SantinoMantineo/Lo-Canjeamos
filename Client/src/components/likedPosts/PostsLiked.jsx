import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllLikes, getAllPosts } from "../../redux/actions";
import style from './PostsLiked.module.css';

const PostsLiked = ({ userData }) => {
  const userId = userData.id;
  const dispatch = useDispatch();
  const allLikes = useSelector((state) => state.allLikes);
  const allPosts = useSelector((state) => state.allPosts);
  const [likedPostsData, setLikedPostsData] = useState([]);

  useEffect(() => {
    dispatch(getAllLikes());
    dispatch(getAllPosts());
  }, [dispatch]);

  // Filtra los likes del usuario
  const userLikes = allLikes.filter((like) => like.myUserId === userId);

  // Busca y almacena los datos de las publicaciones que le gustan al usuario
  useEffect(() => {
    const likedPosts = userLikes.map((like) => {
      const likedPostId = like.likedPostId;
      const likedPost = allPosts.find((post) => post.id === likedPostId);
      return likedPost;
    });

    setLikedPostsData(likedPosts);
  }, [dispatch]);

  console.log("userLikes: ", userLikes);
  console.log("likedPostsData: ", likedPostsData);

  return (
    <div className={style.container}>
      <ul>
        {likedPostsData.map((likedPost) => (
          <li key={likedPost.id}>
            {/* Renderiza la información de la publicación correspondiente */}
            
            <img src={likedPost.image} alt={likedPost.title} />
            <h4>{likedPost.title}</h4>
            {/* Puedes mostrar otros detalles de la publicación si es necesario */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostsLiked;

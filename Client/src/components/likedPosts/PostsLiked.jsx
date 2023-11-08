import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllLikes, getAllPosts } from "../../redux/actions";

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
    <div>
      <ul>
        {likedPostsData.map((likedPost) => (
          <li key={likedPost.id}>
            {/* Renderiza la información de la publicación correspondiente */}
            <h3>{likedPost.title}</h3>
            <img src={likedPost.image} alt={likedPost.title} />
            {/* Puedes mostrar otros detalles de la publicación si es necesario */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostsLiked;

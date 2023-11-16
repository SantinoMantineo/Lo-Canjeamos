import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { getAllLikes, getAllPosts, likedPosts } from "../../redux/actions";
import style from "./PostsLiked.module.css";

const PostsLiked = ({ userData }) => {
  const userId = userData.id;
  const dispatch = useDispatch();
  const matchedPairs = useSelector((state) => state.matchedPairs);
  const likedPostss = useSelector((state) => state.likedPosts);

  // Agrega un estado local para controlar si los datos están cargados
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getAllLikes());
      await dispatch(getAllPosts());
      await dispatch(likedPosts(userId));
      // Marca que los datos están cargados una vez que las acciones se completen
      setDataLoaded(true);
    };

    fetchData();
  }, [dispatch, userId]);

  // Si los datos aún no están cargados, muestra un mensaje de carga
  if (!dataLoaded) {
    return <div>Cargando...</div>;
  }

  const matchedPostIds = matchedPairs.map((pair) => pair.anotherUserPost?.id);

  const filteredLikedPosts = likedPostss.filter(
    (likedPost) => !matchedPostIds.includes(likedPost.id)
  );

  return (
    <div className={style.containerP}>
      {filteredLikedPosts.map((likedPost) => (
        <div className={style.likes} key={likedPost.id}>
          <div className={style.like}>
            <img src={likedPost.image[0]} alt={likedPost.title} />
            <div>
              <h4>{likedPost.title}</h4>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostsLiked;

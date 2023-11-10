import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPostById } from "../../redux/actions";
import style from "./recivedLikes.module.css";
import axios from "axios"; // Import axios

const RecivedLikes = ({ userData }) => {
  const userId = userData.id;
  const dispatch = useDispatch();
  const likedPosts = useSelector((state) => state.likedPosts);

  // Use useState to manage the array of posts
  const [arrayPost, setArrayPost] = useState([]);

  // Agrega un estado local para controlar si los datos están cargados
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      await getPosts();
      // Marca que los datos están cargados una vez que las acciones se completen
      setDataLoaded(true);
    };

    fetchData();
  }, [dispatch, userId]);

  const getPosts = async () => {
    try {
      const response = await axios.get("/likes/getLikesRecibidos", {
        params: {
          myUserId: userData.id,
        },
      });

      if (response) {
        // Utiliza Promise.all para esperar a que todas las solicitudes se completen
        const postRequests = response.data.map(async (id) => {
          const post = await axios.get("/posts/", {
            params: {
              id: id,
            },
          });
          return post.data; // Accede a la propiedad data
        });

        const posteos = await Promise.all(postRequests);

        setArrayPost(posteos[0]);
      }
    } catch (error) {
      console.error("Error al enviar los datos al servidor:", error);
    }
  };

  return (
    <div className={style.containerP}>
      {arrayPost &&
        arrayPost.length > 0 &&
        arrayPost.map((posteo, index) => (
          <div
            className={index === 0 ? style.firstLike : style.likes}
            key={posteo.id}
          >
            {index === 0 ? (
              <div className={style.like}>
                <img src={posteo.image && posteo.image[0]} alt={posteo.title} />
                <p>Tú: {posteo.title}</p>
              </div>
            ) : (
              <div className={style.like}>
                <img src={posteo.image && posteo.image[0]} alt={posteo.title} />
                <p>{posteo.title}</p>
              </div>
            )}
  
            {index === 0 ? <p className={style.label}>↑ - ↓</p> : null}
          </div>
        ))}
    </div>
  );
  
  
  
};

export default RecivedLikes;

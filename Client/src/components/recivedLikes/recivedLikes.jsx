import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./recivedLikes.module.css";
import axios from "axios"; // Import axios

const RecivedLikes = ({ userData }) => {
  const userId = userData.id;
  const dispatch = useDispatch();

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
          const post = await axios.get(`/posts/${id}`);
          return post.data; // Accede a la propiedad data
        });

        const posteos = await Promise.all(postRequests);

        setArrayPost(posteos);
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
          <React.Fragment key={`${posteo.id}_${index}`}>
            <div className={style.likes}>
              <div className={style.like}>
                <img src={posteo.image && posteo.image[0]} alt={posteo.title} />
                <p>{(index % 2 === 0) ? `Tú: ${posteo.title}` : posteo.title}</p>
              </div>
            </div>
            {index === 1 || index % 2 === 0 && (
              // Renderizar flechas entre cada par de publicaciones
              <p className={style.label}>↑ - ↓</p>
            )}
          </React.Fragment>
        ))}
    </div>
  );
};

export default RecivedLikes;

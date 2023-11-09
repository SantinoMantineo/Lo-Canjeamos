import React, { useEffect, useState } from "react";
import axios from "axios";
import style from "./recivedLikes.module.css";

const RecivedLikes = ({ userData }) => {
  const [arrayPost, setArrayPost] = useState([]);

  const getPosts = async () => {
    try {
      const response = await axios.get("/likes/getLikesRecibidos", {
        params: {
          myUserId: userData.id,
        },
      });

      if (response) {
        let posteos = [];
        // Cambiado el forEach por un map
        posteos = await Promise.all(response.data.map(async (id) => {
          const post = await axios.get(`/posts/${id}`);
          return post.data; // Devuelve directamente el objeto de datos
        }));
        return posteos;
      }
    } catch (error) {
      console.error("Error al enviar los datos al servidor:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const posteos = await getPosts();
      setArrayPost(posteos);
    };

    fetchData();
  }, [userData.id]);

  console.log("Miraaa", arrayPost);

  return (
    <div className={style.containerP}>
      {arrayPost.map((posteo) => (
        <div className={style.likes} key={posteo.id}>
          <div className={style.like}>
            <img src={posteo.image[0]} alt={posteo.title} />
            <div>
              <h4>{posteo.title}</h4>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecivedLikes;

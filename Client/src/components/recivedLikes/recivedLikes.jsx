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

      if(response){
        let posteos = [];
        response.data.forEach( async (id) => {
            const post = await axios.get("/posts/", {
              params: {
                id: id
              }
            });
            posteos.push(post)
        })

        setArrayPost(posteos)
      }
    } catch (error) {
      console.error("Error al enviar los datos al servidor:", error);
    }
  };

  if (!dataLoaded) {
    return <div>Cargando...</div>;
  }

  console.log(arrayPost)
  return (
    <div className={style.containerP}>
      {arrayPost.map((posteo) => (
        <div className={style.likes} key={posteo.id}>
          <div className={style.like}>
          <img src={posteo.image && posteo.image[0]} alt={posteo.title} />
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

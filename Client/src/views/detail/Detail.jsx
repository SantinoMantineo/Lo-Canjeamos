import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPostById, likePost } from "../../redux/actions";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import style from "./Detail.module.css";

const Detail = ({ userData }) => {
  const myUserId = userData.id
  const { id } = useParams();
  const likedPostId = id
  const dispatch = useDispatch();
  const post = useSelector((state) => state.selectedPost);
  const anotherUserId = post.User?.id
  const userName = post.User?.username
  const myPostId = useSelector((state) => state.selectedPostToInteract);
  
  
  useEffect(() => {
    dispatch(getPostById(id));
  }, [id]);
  
  const [liked, setLiked] = useState(false)
  
  
  const handleLikeClick = () => {
    // Verificar si el usuario ya dio "like" a esta publicación para evitar doble clic
    if (!liked) {
      // Llamar a la acción de Redux para dar "like" a la publicación
      dispatch(likePost(myUserId, likedPostId, myPostId, anotherUserId));

      // Actualizar el estado local para reflejar el "like"
      setLiked(true);
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          variableWidth: true,
          className: "slider variable-width",
          dots: true,
          arrows: false,
        },
      },
    ],
  };

  return (
    <>
      <div className={style.detail}>
        
        <div className={style.carousel}>
        {post && post.title && <h3>{post.title}</h3>}
          <Slider {...settings}>
            {post && post.image && post.image[0] && (
              <div>
                <img src={post.image[0]} alt="Image 1" />
              </div>
            )}
            {post && post.image && post.image[1] && (
              <div>
                <img src={post.image[1]} alt="Image 2" />
              </div>
            )}
            {post && post.image && post.image[2] && (
              <div>
                <img src={post.image[2]} alt="Image 3" />
              </div>
            )}
          </Slider>
        </div>
        
        <div className={style.info}>
          <span>Rating usuario:</span>
          <h4>⭐️⭐️⭐️</h4>
          <span>Publicacion de:</span>
          {post.User && userName && <h4>{userName}</h4> }

          <span>Ubicación:</span>
          {post && post.ubication && <h4>{post.ubication}</h4>}
          <span>Descripción:</span>
          {post && post.description && <h4>{post.description}</h4>}
          
        </div>
        <div className={style.buttons}>
          <Link to="/">
            <button className={style.back}>Volver</button>
          </Link>
          <button className={style.match} onClick={handleLikeClick} disabled={liked}>Canjear</button>
        </div>
      </div>
    </>
  );
};

export default Detail;

import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMatches, getPostById, likePost } from "../../redux/actions";
import {motion} from 'framer-motion';
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
  const [liked, setLiked] = useState(false)

  const filteredMatches = useSelector((state) => state.matches).filter((match) => {
    return match.match.some((m) => m.myPostId == myPostId && m.likedPostId == id);
  });

 console.log(filteredMatches);

  const isMatched = filteredMatches.length > 0;
  
  
  useEffect(() => {
    dispatch(getPostById(id));
  }, [id]);
  

  useEffect(() => {
    dispatch(getMatches());
  }, [dispatch]);
  
  
  const handleLikeClick = () => {
    if (myPostId) {
      if (!liked) {
        if (!isMatched) {
          dispatch(likePost(myUserId, likedPostId, myPostId, anotherUserId));
          setLiked(true);
        } else {
          alert("Ya existe un match entre estas publicaciones.");
        }
      }
    } else {
      alert("Debes seleccionar una de tus publicaciones para intercambiar.");
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
      <motion.div 
        initial={{
          opacity: 0,
          scale: 0.9,
        }}
        animate={{
          opacity: 1,
          scale: 1.1,
        }}
      className={style.detail}>
        
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
        <div></div>
        <div className={style.buttons}>
          <Link to="/">
            <button className={style.back}>Volver</button>
          </Link>
          <button className={style.match} onClick={handleLikeClick} disabled={liked || myUserId === anotherUserId || isMatched}>Canjear</button>
        </div>
      </motion.div>
    </>
  );
};

export default Detail;

import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getMatches,
  getPostById,
  likePost,
  clearDetail,
  getAllLikes,
} from "../../redux/actions";
import { motion } from "framer-motion";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Swal from "sweetalert2";
import style from "./Detail.module.css";

const Detail = ({ userData }) => {
  const myUserId = userData.id;
  const { id } = useParams();
  const likedPostId = id;
  const dispatch = useDispatch();
  const post = useSelector((state) => state.selectedPost);
  const anotherUserId = post.User?.id;
  const userName = post.User?.username;
  const myPostId = useSelector((state) => state.selectedPostToInteract);

  const allLikes = useSelector((state) => state.allLikes);
  const [liked, setLiked] = useState(false);

  const navigate = useNavigate();

  const filteredMatches = useSelector((state) => state.matches).filter(
    (match) => {
      return match.match.some(
        (m) => m.myPostId == myPostId && m.likedPostId == id
      );
    }
  );

  // Comprueba si likedPostId está en la lista de likedPosts
  const isPostLiked = allLikes.some(
    (like) => like.myPostId == myPostId && like.likedPostId == id
  );

  const isMatched = filteredMatches.length > 0;

  useEffect(() => {
    dispatch(getPostById(id));
  }, [id]);

  useEffect(() => {
    dispatch(getMatches());
    dispatch(getAllLikes());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getPostById(`${id}`));
    return () => {
      dispatch(clearDetail());
    }; //limpia el detail
  }, []);

  const handleLikeClick = () => {
    if (myPostId) {
      if (!liked) {
        if (!isMatched) {
          dispatch(likePost(myUserId, likedPostId, myPostId, anotherUserId));
          setLiked(true);
        }
      }
      setTimeout(function () {
        Swal.fire({
          title: "Solicitud de canje enviada",
          text: "Tu solicitud de canje ha sido enviada con éxito.",
          icon: "success",
          confirmButtonText: "Ok",
        });
      }, 500);
    } else {
      setTimeout(function () {
        Swal.fire({
          title: "Aviso",
          text: "Debes seleccionar una de tus publicaciones para intercambiar.",
          icon: "info",
          showCancelButton: true,
          confirmButtonText: "Aceptar",
          cancelButtonText: "Cancelar",
        }).then((result) => {
          if (result.isConfirmed) {
            const isLocalhost = window.location.hostname === "localhost";
            const redirectURL = isLocalhost
              ? "http://localhost:5173/#/login"
              : "https://locanjeamos.com.ar/#/login";
            window.location.href = redirectURL;
            Swal.close();
          }
        });
      }, 500);
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
  const allPosts = useSelector((state) => state.allPosts);

  const handlePrevClick = () => {
    const currentIndex = allPosts.findIndex((p) => p.id === parseInt(id, 10));

    if (
      Array.isArray(allPosts) &&
      allPosts.length > 0 &&
      currentIndex !== -1 &&
      currentIndex < allPosts.length - 1
    ) {
      const nextPostId = allPosts[currentIndex + 1].id;
      navigate(`/detail/${nextPostId}`);
    } else {
      console.log(
        "No hay publicaciones disponibles o ya estás en la primera publicación"
      );
    }
  };

  const handleNextClick = () => {
    const currentIndex = allPosts.findIndex((p) => p.id === parseInt(id, 10));

    if (
      Array.isArray(allPosts) &&
      allPosts.length > 0 &&
      currentIndex !== -1 &&
      currentIndex > 0
    ) {
      const prevPostId = allPosts[currentIndex - 1].id;
      navigate(`/detail/${prevPostId}`);
    } else {
      console.log(
        "No hay publicaciones disponibles o ya estás en la última publicación"
      );
    }
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
        className={style.detail}
      >
        <div className={style.carousel}>
          {post && post.title && <h3>{post.title}</h3>}
          <Slider {...settings}>
            {post && post.image && post.image[0] && (
              <div>
                <img src={post.image[0]} alt="Image 1" className={style.img} />
              </div>
            )}
            {post && post.image && post.image[1] && (
              <div>
                <img src={post.image[1]} alt="Image 2" className={style.img} />
              </div>
            )}
            {post && post.image && post.image[2] && (
              <div>
                <img src={post.image[2]} alt="Image 3" className={style.img} />
              </div>
            )}
          </Slider>
        </div>

        <div className={style.info}>
          <h5>Calificación:</h5>
          {post.User && post.User.averageRating ? (
            <div className={style.rating}>
              {Array.from({ length: post.User.averageRating }, (_, index) => (
                <p key={index}>⭐️</p>
              ))}
            </div>
          ) : (
            <h4>Todavía nadie te ha calificado.</h4>
          )}
          <span>Publicacion de:</span>
          {post.User && userName && <h4>{userName}</h4>}

          <span>Ubicación:</span>
          {post && post.ubication && <h4>{post.ubication}</h4>}
          <span>Descripción:</span>
          {post && post.description && <h4>{post.description}</h4>}
        </div>

        

        <div className={style.buttons}>
          <Link to="/">
            <button className={style.back}>Principal</button>
          </Link>
          <button
            className={style.button}
            onClick={handleLikeClick}
            disabled={
              liked || myUserId === anotherUserId || isMatched || isPostLiked
            }
          >
            Canjear
          </button>
        </div>
      </motion.div>
      <div className={style.navigationButtons}>
          <button onClick={handleNextClick}>
            <img
              width="24"
              height="24"
              src="https://img.icons8.com/ios-filled/50/back.png"
              alt="back"
              className={style.arrow}
            />
          </button>
          <button onClick={handlePrevClick}>
            <img
              width="24"
              height="24"
              src="https://img.icons8.com/ios-filled/50/forward.png"
              alt="forward"
              className={style.arrow}
            />
          </button>
        </div>
    </>
  );
};

export default Detail;

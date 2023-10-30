import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPostById } from "../../redux/actions";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import style from "./Detail.module.css";

const Detail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const post = useSelector((state) => state.selectedPost);
  const { User } = post
  console.log(User)

  useEffect(() => {
    dispatch(getPostById(id));
  }, [id]);

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
        {post && post.title && <h3>{post.title}</h3>}
        <div className={style.carousel}>
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
          <span>Publicacion de:</span>
          {User && User.username && <h4>{User.username}</h4> }
          <span>Ubicación:</span>
          {post && post.ubication && <h4>{post.ubication}</h4>}
          <span>Descripción:</span>
          {post && post.description && <h4>{post.description}</h4>}
        </div>
        <div className={style.buttons}>
          <Link to="/">
            <button className={style.back}>Volver</button>
          </Link>
          <button className={style.match}>Canjear</button>
        </div>
      </div>
    </>
  );
};

export default Detail;

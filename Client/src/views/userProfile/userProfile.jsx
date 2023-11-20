import React, { useEffect, useState } from "react";
import style from "./UserProfile.module.css";
import { useParams } from "react-router-dom";
import axios from "axios";

const UserProfile = ({ id }) => {
  const { userId } = useParams();
  const [userData, setUserData] = useState(null);
  const [rating, setRating] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("/users/anotherUserId", {
          params: { id: userId },
        });
        // Verifica si hay datos en la respuesta antes de actualizar el estado
        if (response.data) {
          setUserData(response.data);
        } else {
          console.error("No se recibieron datos del usuario");
        }
      } catch (error) {
        console.error("Error al obtener la información del usuario:", error);
      }
    };

    fetchUserData();
  }, [userId, rating]);

  const handleRating = async (value) => {
    try {
      let newReview = {
        userId: id.id,
        reviewedUserId: userId,
        rating: value,
      };

      const newRating = await axios.post("/reviews/", newReview);
      if (newRating) {
        const response = await axios.get(`/reviews/averageRating/${userId}`);
        if (response) {
          userData.averageRating = response.data.averageRating;
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      handleResetRatingClick();
    }
  };

  const handleRatingClick = () => {
    setRating(false);
  };

  const handleResetRatingClick = async () => {
    setRating(true);
  };

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <>
      {userData && rating ? (
        <div
          className={
            userData.premium === "premium" ? style.avatarPremium : style.avatar
          }
        >
          <img src={userData.image} className={style.photo} alt="User Avatar" />
          {userData.premium === "premium" && (
            <img
              width="36"
              height="36"
              src="https://img.icons8.com/color/48/guarantee.png"
              alt="Premium Guarantee"
              className={style.logo}
            />
          )}
          <h3>{userData.username}</h3>
          <p>{userData.email}</p>
          {userData.averageRating ? (
            <div>
              {Array.from({ length: userData.averageRating }, (_, index) => (
                <span key={index}>⭐️</span>
              ))}
            </div>
          ) : (
            <h4 className={style.calif}>
              ¡Todavía no hay calificaciones, sé el primero!
            </h4>
          )}
          <div>
            <button className={style.back} onClick={handleGoBack}>
              Atrás
            </button>
            <button onClick={handleRatingClick} className={style.bRating}>
              Calificar
            </button>
          </div>
        </div>
      ) : (
        <div className={style.modal}>
          <h3>Califica al usuario con estrellas</h3>
          <div className={style.ratingContainer}>
            {[1, 2, 3, 4, 5].map((value) => (
              <label key={value} className={style.starLabel}>
                <input
                  type="radio"
                  name="rating"
                  value={value}
                  onClick={() => handleRating(value)}
                  className={style.starInput}
                />
                {value}
              </label>
            ))}
          </div>
          <button onClick={handleResetRatingClick} className={style.back}>
            Atrás
          </button>
        </div>
      )}
    </>
  );
};

export default UserProfile;

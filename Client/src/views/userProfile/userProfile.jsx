import React, { useEffect, useState } from "react";
import style from "./UserProfile.module.css";
import { useParams } from "react-router-dom";
import axios from "axios";

const UserProfile = ({id}) => {
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
  }, [userId, userData]);

  const handleRating = async (value) => {
    try{
      let newReview = {
        userId: id.id,
        reviewedUserId: userId,
        rating: value
      }
      
      const newRating = await axios.post("/reviews/", newReview)
      if(newRating){
        const response = await axios.get(`/reviews/averageRating/${userId}`)
        if(response){
          setUserData(response.data)
        }
      }
    } catch (error) {
      console.log(error)
    }

    // Aquí puedes realizar una solicitud al backend para almacenar la calificación
    // axios.post("/api/rating", { userId: userId, rating: value });
  };

  const handleRatingClick = () => {
    setRating(false);
  };

  const handleResetRatingClick = async () => {
    setRating(true);
  };

  return (
    <>
      {userData && rating ? (
        <div className={userData.premium === "premium" ? style.avatarPremium : style.avatar}>
          <img
            src={userData.image}
            className={style.photo}
            alt="User Avatar"
          />
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
          {userData.averageRating ?           
          <div>
            {Array.from({ length: userData.averageRating }, (_, index) => (
              <span key={index}>⭐️</span>
            ))}
          </div>
          : 
          <h3>Todavia no hay calificaciones, se el primero!</h3>
          }
          <div>
            <button onClick={handleRatingClick}>Dar Rating</button>
          </div>
        </div>
      ) : (
        <div>
          <h1>Hola</h1>
          <div className={style.ratingContainer}>
            {[1, 2, 3, 4, 5].map((value) => (
              <span key={value} onClick={() => handleRating(value)}>⭐️</span>
            ))}
          </div>
          <button onClick={handleResetRatingClick}>Volver</button>
        </div>
      )}
    </>
  );
};

export default UserProfile;

import React, { useEffect, useState } from "react";
import style from "./UserProfile.module.css";
import { useParams } from "react-router-dom";
import axios from "axios";

const UserProfile = () => {
  const { userId } = useParams();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("/users/anotherUserId", {
          params: { id: userId },
        });
        console.log("B", response)
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
  }, [userId]);

  return (
    <>
      {userData && (
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
          <div>
            {userData.review && userData.review.map((_, index) => (
              <span key={index}>⭐️</span>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default UserProfile;

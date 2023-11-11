/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import React, { useState, useEffect } from "react";
import style from "./Avatar.module.css";
import PayModal from "../payModal/PayModal";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

const Avatar = ({ userData, setAuth, toggleDarkMode }) => {
  const { user, logout: loguotAuth0 } = useAuth0();
  const [isPremium, setPremium] = useState(false);

  const premium = async () => {
    try {
      const token = localStorage.getItem("token");
      const usuario = await axios.get("/users/userId", {
        headers: {
          token: token,
        },
        params: { id: userData.id },
      });

      if (usuario.data.plan === "premium") {
        setPremium(true);
      }
    } catch (error) {
      console.error("Error al obtener la información del usuario:", error);
    }
  };

  useEffect(() => {
    premium();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setAuth(false);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const initialDarkMode = localStorage.getItem("darkMode") === "true";
  const [isDarkMode, setIsDarkMode] = useState(initialDarkMode);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleThemeToggle = () => {
    const updatedDarkMode = !isDarkMode;
    setIsDarkMode(updatedDarkMode);
    toggleDarkMode();

    localStorage.setItem("darkMode", updatedDarkMode);
  };

  return (
    <>
      <div className={isPremium ? style.avatarPremium : style.avatar}>
        <img
          src={(user && user.picture) || (userData && userData.image)}
          className={style.photo}
        ></img>
        {isPremium && (
          <img
            width="36"
            height="36"
            src="https://img.icons8.com/color/48/guarantee.png"
            alt="guarantee"
            className={style.logo}
          />
        )}
        <h3>{userData.username || user.name}</h3>
        <p>{userData.email || user.email}</p>
        <div>⭐️⭐️⭐️⭐️⭐️</div>
        <button
          className={isDarkMode ? style.dark : style.light}
          onClick={handleThemeToggle}
        >
          {isDarkMode ? "Dark 🌘" : "Light ☀️"}
        </button>
        <br></br>
        <button className={style.premium} onClick={openModal} disabled={isPremium}>
          {isPremium ? "!Gracias!" : "Sé premium"}
        </button>
        <br />
        <br />
        <div>
          {user && (
            <button className={style.logout} onClick={loguotAuth0}>
              Salir
            </button>
          )}
          {!user && userData && (
            <button className={style.logout} onClick={logout}>
              Salir
            </button>
          )}
        </div>
        <PayModal
          isOpen={isModalOpen}
          userData={userData}
          user={user}
          onClose={closeModal}
        />
      </div>
    </>
  );
};

export default Avatar;

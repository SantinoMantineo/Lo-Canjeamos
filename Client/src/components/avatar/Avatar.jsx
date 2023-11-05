/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import React, { useState, useEffect } from "react";
import avatar from "../../assets/avatar.jpg";
import style from "./Avatar.module.css";
import PayModal from "../payModal/PayModal";
import { useAuth0 } from "@auth0/auth0-react";
const Avatar = ({ userData, setAuth, toggleDarkMode}) => {
  const { user, logout: loguotAuth0 } = useAuth0();

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
      <div className={style.avatar}>
        <img src={(user && user.picture) || (userData && userData.image)}></img>
        <h3>{userData ? userData.username : user && user.name}</h3>
        <p>{userData.email || user.email}</p>
        <div>⭐️⭐️⭐️⭐️⭐️</div>
        <button
          className={isDarkMode ? style.dark : style.light}
          onClick={handleThemeToggle}
        >
          {isDarkMode ? "Dark 🌘" : "Light ☀️"}
        </button>
        <br></br>
        <button className={style.premium} onClick={openModal}>
          Sé Premium
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

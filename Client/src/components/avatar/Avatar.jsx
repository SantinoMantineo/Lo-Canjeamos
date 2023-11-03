/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, {useState} from "react";
import { Link } from "react-router-dom";
import avatar from "../../assets/avatar.jpg";
import PayModal from "../payModal/PayModal"
import style from "./Avatar.module.css";

const Avatar = ({ userData, setAuth }) => {
  const logout = () => {
    localStorage.removeItem("token");
    setAuth(false);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className={style.avatar}>
        <img src={avatar}></img>
        <h3>{userData && userData.username}</h3>
        <p>{userData && userData.email}</p>
        <div>⭐️⭐️⭐️⭐️⭐️</div>
        <button className={style.premium} onClick={openModal}>Sé Premium</button>
        <br />
        <br />
        <button className={style.logout} onClick={logout}>
          Salir
        </button>
      </div>
      <PayModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};

export default Avatar;

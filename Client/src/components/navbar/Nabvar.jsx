import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/locan.png";
import style from "./Nabvar.module.css";

const navBar = () => {
  return (
    <>
      <Link to="/home">
      <img src={Logo} className={style.logo} />
      </Link>
      <div className={style.navbar}>
        <div className={style.div}></div>
        <Link to="/profile">
          <button className={style.iconos}>
            <img
              width="24"
              height="24"
              src="https://img.icons8.com/puffy/32/experimental-user-puffy.png"
              alt="experimental-user-puffy"
            />
            Profile
          </button>
        </Link>
        <Link to="/addProduct">
          <button className={style.iconos}>
            <img
              width="26"
              height="26"
              src="https://img.icons8.com/sf-regular/48/add.png"
              alt="add"
            />
            Add
          </button>
        </Link>
        <Link to="/home">
          <button className={style.iconos}>
            <img
              width="24"
              height="24"
              src="https://img.icons8.com/fluency-systems-regular/48/home--v1.png"
              alt="home--v1"
            />
            Home
          </button>
        </Link>
        <Link to="exchanges">
          <button className={style.iconos}>
            <img
              width="24"
              height="24"
              src="https://img.icons8.com/material-rounded/48/available-updates.png"
              alt="available-updates"
            />
            Match
          </button>
        </Link>
        <Link to="/chats">
          <button className={style.iconos}>
            <img
              width="24"
              height="24"
              src="https://img.icons8.com/fluency-systems-regular/48/chat--v1.png"
              alt="chat--v1"
            />
            Chats
          </button>
        </Link>
      </div>
    </>
  );
};

export default navBar;

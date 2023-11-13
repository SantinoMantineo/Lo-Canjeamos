/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import React, { useState, useEffect } from "react";
import style from "./Avatar.module.css";
import axios from "axios";

const UserProfile = () => {
  // userData = informnacion del back del /users/userId

  return (
    <>
      <div className={userData.premium === "premium" ? style.avatarPremium : style.avatar}>
        <img
          src={userData && userData.image}
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
        <h3>{userData.username}</h3>
        <p>{userData.email}</p>
        <div>
        {userData.review && userData.review.map((_, index) => (
          <span key={index}>⭐️</span>
        ))}
      </div>
      </div>
    </>
  );
};

export default UserProfile;

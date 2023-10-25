<<<<<<< HEAD
/* eslint-disable no-unused-vars */
import Rect from 'react'
import style from "./MyProfile.module.css"

=======
import React from "react";
import Avatar from "../../components/avatar/Avatar";
import Publication from "../../components/publication/Publication";
import style from "./MyProfile.module.css";
>>>>>>> d9e6aad399bf0b0b3fe22b350a5ece077b81d9a1

const MyProfile = () => {
  return (
    <>
      <div className={style.myProfile}>
        <div className={style.avatar}>
          <Avatar></Avatar>
        </div>
        <div className={style.publications}>
          <h3>Publicaciones</h3>
          <Publication></Publication>
          <Publication></Publication>
          <Publication></Publication>
        </div>
      </div>
    </>
  );
};

export default MyProfile;

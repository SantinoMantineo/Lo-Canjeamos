/* eslint-disable no-unused-vars */
import React from "react";
import Avatar from "../../components/avatar/Avatar";
import Publication from "../../components/publication/Publication";
import Header from "../../components/header/Header";
import Banner3 from '../../assets/banner3.jpg'
import Banner4 from '../../assets/banner4.jpg'
import style from "./MyProfile.module.css";


const MyProfile = ({ userData }) => {
  return (
    <>
      <Header banner1={Banner3} banner2={Banner4}></Header>
      <div className={style.myProfile}>
        <div className={style.avatar}>
          <Avatar userData={userData}/>
        </div>
        <div className={style.publications}>
          <h3>Publicaciones</h3>
          <Publication userData={userData}></Publication>
        </div>
      </div>
    </>
  );
};

export default MyProfile;

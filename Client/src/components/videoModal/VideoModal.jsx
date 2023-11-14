import React from "react";
import style from "./VideoModal.module.css";

const VideoModal = ({ onClose }) => {
  return (
    <>
      <div className={style.vModal}>
        <iframe
          width="640"
          height="320"
          src="https://www.youtube.com/embed/xgOYEsdFaO4?si=8XxPYS_ejzwfPbD_"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
      </div>
      <button className={style.closeButton} onClick={onClose}>
        X
      </button>
    </>
  );
};

export default VideoModal;

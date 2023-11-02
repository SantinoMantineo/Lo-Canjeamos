import React from "react";
import { motion } from "framer-motion";
import style from "./PayModal.module.css";

const payModal = ({ isOpen, onClose }) => {
  return (
    isOpen && (
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.9,
        }}
        animate={{
          opacity: 1,
          scale: 1.1,
        }}
        className={style.modaloverlay}
      >
        <div className={style.modalcontent}>
          <button onClick={onClose} className={style.close}>
            ✖️
          </button>

          <h2>¡Sé Premium!</h2>
          <p>💛 Publicá sin límites 💛</p>

          <p>👀 Mirá quien quiere canjear con vos 👀</p>

          <p>🚀 Posicioná mejor tus publicaciones 🚀</p>

          <button className={style.pay}>Sé premium</button>
          <h6>Un pago de $100</h6>
        </div>
      </motion.div>
    )
  );
};

export default payModal;

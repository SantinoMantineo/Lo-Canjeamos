import React from "react";
import { motion } from "framer-motion";
import style from "./PayModal.module.css";
import axios from "axios";

const payModal = ({ userData, user, isOpen, onClose }) => {

  let linkCompra = "";

  const handlePremium = async () =>{
    try {
      if(userData) {
        const paymentData = {
          userId: userData.id,
          title: "Premium",
          quantity: 1,
          price: 1500,
          currency_id: "ARG",
          description: "Usuario premium"
        };
  
        const response = await axios.post("/plans/create-order", paymentData);
        linkCompra = response.body.sandbox_init_point
      } else{
        const paymentData = {
          userId: user.id,
          title: "Premium",
          quantity: 1,
          price: 1500,
          currency_id: "ARG",
          description: "Usuario premium"
        };

        const response = await axios.post("/plans/create-order", paymentData);
        linkCompra = response.body.sandbox_init_point
      }
      
    } catch (error) {
      console.error("Error al realizar solicitud de compra", error);
    }
  };

  return (
    isOpen && (
      <motion.div
         initial={{
          opacity: 0,
          scale: 0.7,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        className={style.modaloverlay}
      >
        <div
          className={style.modalcontent}
        >
          <button onClick={onClose} className={style.close}>
            ✖️
          </button>

          <h2>¡Sé Premium!</h2>
          <p>💛 Publicá sin límites 💛</p>

          <p>👀 Mirá quien quiere canjear con vos 👀</p>

          <p>🚀 Posicioná mejor tus publicaciones 🚀</p>

          <button className={style.pay} onClick={handlePremium}>Sé premium</button>
          <h6>Un pago de $100</h6>
        </div>
        {linkCompra && linkCompra}
      </motion.div>
    )
  );
};

export default payModal;

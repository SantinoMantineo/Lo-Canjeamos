import { useState } from "react";
import style from "./Modal.module.css"

const Modal = () => {
  const [modal, setModal] = useState(true);

  const toggleModal = () => {
    setModal(!modal);
  };

  if(modal) {
    document.body.classList.add('activeModal')
  } else {
    document.body.classList.remove('activeModal')
  }

  return (
    <>
      {modal && (
        <div className={style.modal}>
          <div onClick={toggleModal} className={style.overlay}></div>
          <div className={style.modalContent}>
            <h2>¡Hecho!</h2>
            <p>Tu publicación ha sido creada correctamente. Puedes verla en tu perfil o visualizarla en el inicio.</p>
            <button className={style.closeModal} onClick={toggleModal}>
            ✖
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Modal;

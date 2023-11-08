import React from "react";
import "./Modal.css";

const Modal = ({ modalImgUrl, closeModal }) => {
  return (
    <div className="modal">
      <img src={modalImgUrl} alt="" className="modal-img" />
    </div>
  );
};

export default Modal;

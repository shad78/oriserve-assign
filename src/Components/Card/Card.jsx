import React from "react";
import "./Card.css";

const Card = ({ url }) => {
  return (
    <div className="card">
      <img src={url} alt="" />
    </div>
  );
};

export default Card;

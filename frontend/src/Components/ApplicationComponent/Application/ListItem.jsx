// ListItem.js
import React from "react";
import "./ListItem.css";

const ListItem = ({ name, email, score, id }) => {
  function redirect(){
    window.location.href = `/applications/${id}`
  }
  return (
    <div className="list-item" onClick={redirect}>
      <div className="list-item-info">
        <div className="name">{name}</div>
        <div className="email">{email}</div>
      </div>
      {/* <div>{score}</div>
      {score && <div className="score">{score}</div>}
      {score == null && <div>Loading</div>} */}
    </div>
  );
};

export default ListItem;

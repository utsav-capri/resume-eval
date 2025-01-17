import React from "react";
import "./application.css";
import ListItem from "./ListItem";

function Application({ name, email, rating }) {
  return (
    <div className="application-list-item">
      <ListItem
        key={index}
        name={item.name}
        email={item.email}
        score={item.score}
      />
    </div>
  );
}

export default Application;

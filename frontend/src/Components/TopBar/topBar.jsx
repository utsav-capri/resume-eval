import React from "react";

import "./topBar.css";
function TopBar() {
  const handleSubmit = function (e) {
    e.preventDefault();
    window.location.href = "/login";
    localStorage.removeItem("userInfo");
  };

  return (
    <div className="top-bar-wrapper">
      <div>Skill-Eval</div>
      <div className="user-icon">
        <button onClick={handleSubmit} className="logout-button">Logout</button>
      </div>
    </div>
  );
}

export default TopBar;

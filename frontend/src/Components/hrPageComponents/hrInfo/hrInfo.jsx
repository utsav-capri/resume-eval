import React, { useState } from "react";
import "./hrInfo.css";
import PopupForm from "../CreateJob/PopupForm";

function HrInfo() {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  if (!userInfo) {
    window.location.href = "/login";
  }
  const { name, email, organisation } = userInfo;
  // console.log(name, email, organisation, userInfo);
  const [showPopup, setShowPopup] = useState(false);
  const openPopup = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="hrinfo-wrapper">
      {/* <div className="hrimage-wrapper"> */}
      {/* <div className="img-div"> */}
      {/* <img src="profile.jpeg" /> */}
      {/* <FontAwesomeIcon icon="fa-solid fa-user" /> */}
      <img src="https://picsum.photos/200/300" />
      {/* </div> */}
      {/* </div> */}
      <div className="hrdetails-wrapper">
        <h2> {name} </h2>
        {/* <h4> {email} </h4>
			<h6> {organisation} </h6> */}
      </div>
      {/* <div className="logout"> */}
      {/* <button class="button-28" role="button">
				<a className="button-text" >Add Job</a>
			</button> */}
      {/* </div> */}
      {/* <div> */}
        <button onClick={openPopup} className="button-28">
          Add Job
        </button>
        {showPopup && <PopupForm onClose={closePopup} />}
      {/* </div> */}
    </div>
  );
}

export default HrInfo;

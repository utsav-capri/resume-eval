// SideBar.jsx
import React, {useState} from "react";
import "./applicationSideBar.css";
// import PopupForm from "../../hrPageComponents/CreateJob/PopupForm";
import AddCandidatePopup from "./AddCandidatePopup"
function ApplicationSideBar({desc}) {
  const [showPopup, setShowPopup] = useState(false);
  const openPopup = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };
  return (
    <div className="application-sidebar">
      {/* <h1>Hey, Janhavi </h1> */}
      <div className="application-job-description">
        <h2>Job Description</h2>
        <p>
          {desc}
        </p>
      </div>
      <button onClick={openPopup} className="button-28">
          Add Candidate
        </button>
      {showPopup && <AddCandidatePopup onClose={closePopup} />}
    </div>
  );
}

export default ApplicationSideBar;

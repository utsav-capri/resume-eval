import React from "react";
import "./JobCard.css"; // Create a CSS file for styling
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

function Job({ id, title, location, created_at }) {
  const convertToHumanReadable = (dateTime) => {
    // create a date time object
    const date = new Date(dateTime);
    // return date in form of day-month-year
    return `${date.getDate()} ${date.toLocaleString("default", {
      month: "short",
    })} ${date.getFullYear()}`;
  };
  return (
    <div className="job-card">
      <div className="cyan-section">
        <div className="date"> {convertToHumanReadable(created_at)}</div>
        <div className="job-name">{title}</div>
        <div className="location">
          <FontAwesomeIcon icon={faMapMarkerAlt} />
          <div style={{ marginLeft: "1%" }}>{location}</div>
        </div>
      </div>
      <div className="bottom-section">
        <div className="num-candidates">Applied: {50}</div>
        <button class="button-27" role="button">
          <a href= {`jobs/${id}`} className="button-text">View</a>
        </button>
      </div>
    </div>
  );
}

export default Job;

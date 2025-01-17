import React, { useState } from 'react';
// import './PopupForm.css'
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { createJobs } from '../../../Actions/jobActions';
// import {createJobs } from 
import { createApplications } from '../../../Actions/applicationActions';

const AddCandidatePopupForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    resume_url: '',
});
const id = useParams().id;

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({
  //     ...formData,
  //     [name]: value,
  //   });
  // };

  const dispatch = useDispatch();

	// state related to input box
	const [resumeUrl, setResumeUrl] = useState("");

  const { loading, error } = useSelector((state) => state['hrLogin']);

  const handleSubmit = function (e) {
    e.preventDefault();
    const data = {
      resume_url: resumeUrl,
    };
    dispatch(createApplications(data, id));
  };

  return (
    <div className="popup-container">
      {loading && <div> Loading </div>}
      <div className="popup-form">
        <h2>Candidate Details</h2>
        <form onSubmit={handleSubmit}>
          {/* <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="Title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="location">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div> */}
          <div className="form-group">
            <label htmlFor="resume_url">Resume URL</label>
            <textarea
              id="resumeUrl"
              name="resumeYrl"
              value={resumeUrl}
              onChange={(e) => setResumeUrl(e.target.value)}
            ></textarea>
          </div>
          <button type="submit" className= "add-job-button" 
            onClick={(e) => {
              handleSubmit(e);
            }}
          >
            Submit</button>
        </form>
        <button onClick={onClose} className= "add-job-button">Close</button>
      </div>
    </div>
  );
};

export default AddCandidatePopupForm;

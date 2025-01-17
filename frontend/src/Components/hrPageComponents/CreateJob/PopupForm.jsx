import React, { useState } from 'react';
import './PopupForm.css'
import { useDispatch, useSelector } from 'react-redux';
import { createJobs } from '../../../Actions/jobActions';
// import {createJobs } from 


const PopupForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    description: '',
});

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({
  //     ...formData,
  //     [name]: value,
  //   });
  // };

  const dispatch = useDispatch();

	// state related to input box
	const [title, setTitle] = useState('');
	const [location, setLocation] = useState('');
	const [description, setDescription] = useState('');

  const { loading, error } = useSelector((state) => state['hrLogin']);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
			title: title,
			location: location,
			description
		};
		dispatch(createJobs(data));
    // Handle form submission or data storage here
    // You can access the form data from the formData state
  };

  return (
    <div className="popup-container">
      {loading && <div> Loading </div>}
      <div className="popup-form">
        <h2>Job Details</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
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
          </div>
          <div className="form-group">
            <label htmlFor="description">Job Description</label>
            <textarea
              id="Description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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

export default PopupForm;

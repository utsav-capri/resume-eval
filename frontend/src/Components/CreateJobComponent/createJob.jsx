import React, { useState,useEffect } from 'react';
import { MDBTextArea, MDBInput } from 'mdbreact';
import { useDispatch, useSelector } from 'react-redux';

import './createJob.css';
import { createJobs } from '../../Actions/jobActions';

function CreateJob() {
	const dispatch = useDispatch();

	// state related to input box
	const [title, setTitle] = useState('');
	const [location, setLocation] = useState('');
	const [description, setDescription] = useState('');

	// state related to login of user
	const { loading, error } = useSelector((state) => state['hrLogin']);


	// take all the data and send it to backend
	const handleSubmit = function (e) {
		e.preventDefault();
		const data = {
			title: title,
			location: location,
			description
		};
		dispatch(createJobs(data));
	};
	return (
		<div className="signup-wrapper">
			{loading && <div>Loading</div>}
			{/* Input box for title location first description and last description
				text-left classdescription is used to display the icon left of the input box */}
			<div className="signup-container text-left">
				<MDBInput
					label="Title"
					size="lg"
					icon="user"
					onChange={(e) => setTitle(e.target.value)}
					value={title}
				/>
				<MDBInput
					type="location"
					label="Location"
					icon="lock"
					size="lg"
					onChange={(e) => setLocation(e.target.value)}
					value={location}
				/>
				<textarea
					label="Description"
					size="lg"
					icon="address-card"
					onChange={(e) => setDescription(e.target.value)}
					value={description}
				/>

				{/* Button to submit the information */}
				<button
					onClick={(e) => {
						handleSubmit(e);
					}}
					className="signup-btn"
				>
					Create
				</button>
			</div>
		</div>
	);
}

export default CreateJob;

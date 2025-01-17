import React, { useState,useEffect } from 'react';
import { MDBInput } from 'mdbreact';
import { useDispatch, useSelector } from 'react-redux';

import './signup.css';
import { createHrAction } from '../../../Actions/hrActions';

function SignUp() {
	const dispatch = useDispatch();

	// state related to input box
	const [userName, setUserName] = useState('');
	const [password, setPassword] = useState('');
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');

	const [org, setOrg] = useState('');

	// state related to login of user
	const { loading, error } = useSelector((state) => state['hrLogin']);


	// take all the data and send it to backend
	const handleSubmit = function (e) {
		e.preventDefault();
		const data = {
			username: userName,
			password: password,
			name,
			email,
			organisation: org
		};
		dispatch(createHrAction(data));
	};
	return (
		<div className="signup-wrapper">
			{loading && <div>Loading</div>}
			{/* Input box for username password first name and last name
				text-left classname is used to display the icon left of the input box */}
			<div className="signup-container text-left">
				<MDBInput
					label="Username"
					size="lg"
					icon="user"
					onChange={(e) => setUserName(e.target.value)}
					value={userName}
				/>
				<MDBInput
					type="password"
					label="Password"
					icon="lock"
					size="lg"
					onChange={(e) => setPassword(e.target.value)}
					value={password}
				/>
				<MDBInput
					label="Name"
					size="lg"
					icon="address-card"
					onChange={(e) => setName(e.target.value)}
					value={name}
				/>
				<MDBInput
					label="Email"
					size="lg"
					icon="address-card"
					onChange={(e) => setEmail(e.target.value)}
					value={email}
				/>
				<MDBInput
					label="Organisation"
					size="lg"
					icon="address-card"
					onChange={(e) => setOrg(e.target.value)}
					value={org}
				/>

				{/* Button to submit the information */}
				<button
					onClick={(e) => {
						handleSubmit(e);
					}}
					className="signup-btn"
				>
					Sign Up
				</button>
			</div>
		</div>
	);
}

export default SignUp;

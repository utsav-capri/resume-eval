import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { MDBInput } from 'mdbreact';

import './LoginPage.css';
import { loginAction } from '../../../Actions/hrActions';

function LoginPage() {
	const dispatch = useDispatch();
	const [userName, setUserName] = useState('');
	const [password, setPassword] = useState('');

	// // state of message box component
	// const [message, setMessage] = useState('');
	// const [classname, setClassname] = useState('danger');
	// const [reRender, setReRender] = useState(true);

	// state related to login of user
	const { loading, error } = useSelector((state) => state['hrLogin']);

	// display error message in casse of error
	// useEffect(() => {
	// 	setMessage(error);
	// 	setClassname('danger');
	// 	setReRender((prev) => !prev);
	// }, [error]);

	// send the user data to backend for authentication
	const handleSubmit = function (e) {
		e.preventDefault();
		dispatch(loginAction(userName, password));
	};
	return (
		<div className="login-page-wrapper">
			{loading && <div>Loading</div>}
			{/* <MessageComponent
				message={message}
				classname={classname}
				reRender={reRender}
			/>
			<img src={LogoGIF} alt="logo" className="login-page-img" /> */}
			<div className="login-page-container text-left">
				{/* Input box for username and password 
					text-left classname is used to display the icon left of the input box */}
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
				{/* Button to submit the data */}
				<button
					onClick={(e) => {
						handleSubmit(e);
					}}
					className="login-page-btn"
				>
					Login
				</button>
				{/* Take unregistered user to sign up page */}
				<p className="login-page-signup">
					New User? <Link to="/register"> Sign Up </Link>{' '}
				</p>
			</div>
		</div>
	);
}

export default LoginPage;

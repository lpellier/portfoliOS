import React from 'react';

import "./Login.css"

class Login extends React.Component {

	render() {
		return (
			<div>
				<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#F4615A" fill="none" strokeLinecap="round" strokeLinejoin="round" 
					id="logo">
					<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
					<circle fill="#F4615A" cx="12" cy="12" r="1.5"/>
					<path d="M 17 10 19 12 17 14"/>
					<path d="M 10 17 12 19 14 17"/>
					<path d="M 7 10 5 12 7 14"/>
					<path d="M 10 7 12 5 14 7"/>
				</svg>
				<h1 id="welcome-text">Welcome Lucas</h1>
				<svg id="loading" xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50">
					<circle strokeWidth="5" id="loading-back" fill="none" cx="25" cy="25" r="20"/>
					<path id="loading-part" strokeWidth="5" stroke="#F4615A" fill="none" d="M 25 45 A 20 20 0 0 0 25 5"/>
				</svg>
			</div>
		);
	}
}

export default Login;
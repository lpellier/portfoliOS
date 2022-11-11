import React from 'react';
import './Desktop.css';
import Login from './components/Login/Login'
import Title from './components/Title/Title'

class Desktop extends React.Component {
	state = {
		state: "login"
	}

	render() {
		return (
			<div className="Desktop">
				{this.state.state === "login" && <Title/>}
				{this.state.state === "login" && <Login/>}
			</div>
		)
	}
}

export default Desktop;

import React from 'react';
import './Portfolio.css';
import Login from './components/Login/Login'
import Title from './components/Title/Title'
import Desktop from './components/Desktop/Desktop'


class Portfolio extends React.Component {
	state = {
		state: "login"
	}

	render() {
		const website_state = this.state.state;
		return (
			<div className="Portfolio">
				{website_state === "desktop" && 
				<div>
					<Desktop/>
				</div>}
				{website_state === "login" && 
				<div>
					<Title/>
					<Login/>
				</div>}
			</div>
		)
	}
}

export default Portfolio;

import React from 'react';
import './Portfolio.css';
import Login from './components/Login/Login'
import Title from './components/Title/Title'
import Desktop from './components/Desktop/Desktop'


class Portfolio extends React.Component {
	state = {
		state: "desktop"
	}

	render() {
		const website_state = this.state.state;
		return (
			<div className="Portfolio">
				{website_state === "login"?
				<div>
					<Title/>
					<Login/>
				</div>:null}
				{website_state === "desktop"? 
				<Desktop/>
				:null}
			</div>
		)
	}
}

export default Portfolio;

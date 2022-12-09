import React from 'react';
import './Portfolio.css';
import Login from './components/Login/Login'
import Title from './components/Title/Title'
import Desktop from './components/Desktop/Desktop'
import Background from './components/Desktop/Background/Background';

function getTime(now: Date) : string {
	return now.getHours() + ":" + (now.getMinutes().toString().length == 1 ? "0" + now.getMinutes() : now.getMinutes());
}

function getDate(now: Date) : string {
	let days = now.getDate().toString().length == 1 ? "0" + now.getDate() : now.getDate();
	let months = now.getMonth().toString().length == 1 ? "0" + now.getMonth() : now.getMonth();
	let year = now.getFullYear();
	return days + "/" + months + "/" + year
}

class Portfolio extends React.Component {
	state = {
		timeout_change: 0,
		finished_logging: false,
		now: new Date(),
		interval_date: 0
	}

	componentDidMount(): void {
		this.setState({
			interval_date : setInterval(() => {
				this.setState({now: new Date()})
			}, 1000)
		})
	}
	componentWillUnmount(): void {
		clearInterval(this.state.interval_date)
	}

	render() {
		return (
			<div className="Portfolio">
				<div id="background"/>
				<div id="opacity-bg"/>
				<div id="dates">
					<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 100 100" strokeWidth="5" stroke="#FFFFFF" fill="none" strokeLinecap="round" strokeLinejoin="round" 
						id="date-logo">
						<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
						<circle fill="#000000" cx="50" cy="50" r="47"/>
						<path d="M 50,50 75,30"/>
					</svg>
					<h1 id='time'>{getTime(this.state.now)}</h1>
					<div className="break"/>
					<h1 id='date'>{getDate(this.state.now)}</h1>
				</div>
				<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 100 100" strokeWidth="5" stroke="#FFFFFF" fill="none" strokeLinecap="round" strokeLinejoin="round" 
					id="lock-logo">
					<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
					<rect fill="#000000" x="5" y="20" rx="10" ry="10" width="55" height="65"/>
					<path strokeWidth="7" d="M 15,20 V 0"/>
				</svg>
				<div style={{opacity: "0"}}>
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
				<div style={{opacity: "0"}}>
					<Desktop/>
				</div>
			</div>
		)
	}
}

export default Portfolio;

import React from 'react';
import { Box } from '@mui/material'
import './Desktop.css';

class Desktop extends React.Component {
	state = {
		page: "log-in"
	}
	
	render() {
		return (
			<div className="Desktop">
				<Box className="bg-rectangles-top-box">
					<div id="bg-top-rect-1" className="bg-rectangle-top"/>
					<div id="bg-top-rect-2" className="bg-rectangle-top"/>
					<div id="bg-top-rect-3" className="bg-rectangle-top"/>	
				</Box>
				<Box className="bg-rectangles-bot-box">
					<div id="bg-bot-rect-1" className="bg-rectangle-bot"/>
					<div id="bg-bot-rect-2" className="bg-rectangle-bot"/>
					<div id="bg-bot-rect-3" className="bg-rectangle-bot"/>	
				</Box>

				<h1 id="text-portfolio-os" className="header">Portfolio OS</h1>
				<div id="login">
					<h2 id="text-login">Log in</h2>
					<Box id="input-login">
						<input className="input"/>
						<input className="input"/>
					</Box>
				</div>
			</div>
		)
	}
}

export default Desktop;

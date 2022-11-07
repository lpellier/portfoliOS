import React from 'react';
import { Box } from '@mui/material'
import './Desktop.css';

class Desktop extends React.Component {
	render() {
		return (
			<div className="Desktop">
				<Box className="bg-rectangles-top">
					<div id="1" className="bg-rectangle-top"></div>
					<div id="2" className="bg-rectangle-top"></div>
					<div id="3" className="bg-rectangle-top"></div>	
				</Box>
				{/* <div className="background-rectangles-bot">
					<div id="1" className="bg-rectangle-bot"></div>
					<div id="2" className="bg-rectangle-bot"></div>
					<div id="3" className="bg-rectangle-bot"></div>	
				</div> */}
			</div>
		)
	}
}

export default Desktop;

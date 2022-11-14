import React from 'react';
import './Desktop.css';
import Background from './Background/Background'
import AppBar from './AppBar/AppBar'

class Desktop extends React.Component {
	componentDidMount(): void {
	}

	render() {
		return (
			<div className="Desktop">
				<Background/>
				<AppBar/>
			</div>
		)
	}
}

export default Desktop;

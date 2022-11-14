import React from 'react';
import './Background.css';
import Header from './Header/Header'

class Background extends React.Component {
	componentDidMount(): void {
	}

	render() {
		return (
			<div className="Background">
				<Header/>
			</div>
		)
	}
}

export default Background;

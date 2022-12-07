import React from 'react';
import './Background.css';

class Background extends React.Component {

	render() {
		return (
			<div className="Background">
				<div className='letter chevrong'>{"<"}</div>
				<div className='letter portfolio'>{"osPortfolio"}</div>
				<div className='letter chevrond'>{">"}</div>
			</div>
		)
	}
}

export default Background;

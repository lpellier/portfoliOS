import React from 'react';
import './Background.css';

class Background extends React.Component {
	
	clickEffect(e: any) {
		let d = document.createElement("div");
		d.className = "clickEffect";
		d.style.top = e.clientY + "px";
		d.style.left = e.clientX + "px";
		document.body.appendChild(d);
		d.addEventListener('animationend', () => {d.parentElement?.removeChild(d)})
	}

	render() {
		return (
			<div className="Background" onClick={(e: any) => this.clickEffect(e)}>
				<div className='title'>
					<div className='letter chevrong'>{"<"}</div>
					<div className='letter portfolio'>{"osPortfolio"}</div>
					<div className='letter chevrond'>{">"}</div>
				</div>
			</div>
		)
	}
}

export default Background;

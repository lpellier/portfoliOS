import React, { FunctionComponent } from 'react';
import './Background.css';

const Background: FunctionComponent = () => {
	const clickEffect = (e: any) => {
		let d = document.createElement("div");
		d.className = "clickEffect";
		d.style.top = e.clientY + "px";
		d.style.left = e.clientX + "px";
		document.body.appendChild(d);
		d.addEventListener('animationend', () => {d.parentElement?.removeChild(d)})
	}
	
	return (
		<div className="Background" onClick={(e: any) => clickEffect(e)}>
			<div className='title'>
				<div className='letter chevrong'>{"<"}</div>
				<div className='letter portfolio'>{"osPortfolio"}</div>
				<div className='letter chevrond'>{">"}</div>
			</div>
		</div>
	)
}

export default Background;

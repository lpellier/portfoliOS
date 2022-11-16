import React from 'react';
import './Title.css';

let observer;

class Title extends React.Component {
	state = {
		finished_logging: false
	}

	componentDidMount(): void {
		let pass = document.getElementById("password");
		observer = new MutationObserver((mutationList, observer) => {
			for (const mutation of mutationList) {
				if (pass && mutation.type === "attributes" && pass.getAttribute("value") === "whateverlooool") {
					this.setState({finished_logging: true})
				}
			}
		});
		if (pass) {
			observer.observe(pass, {attributes: true});
		}
	}

	render() {
		let striketrough_id : string = this.state.finished_logging ? "strikethrough-animation" : "strikethrough";
		console.log(striketrough_id)
		return (
			<div id="title">
				<div id={striketrough_id} className="strikethrough"/>
				<h1 id="text-portfolio-os" className="header">Portfolio OS</h1>
			</div>
		)
	}
}

export default Title;

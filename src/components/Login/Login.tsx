import React from 'react';
import { Box } from '@mui/material'

import "./Login.css"

let timeout_usr : any;
let timeout_pass : any;
let interval_pass : any;

class Login extends React.Component {
	state = {
		user_done: false,
		pass_done: false
	}

	simulateText(element : string, text : string) {
		let elem_dom = document.getElementById(element);
		let i = 0;
		let delay = 0;
		while (i <= text.length) {
			delay += Math.floor(Math.random() * (200 - 100 + 1) + 100);
			timeout_usr = setTimeout((counter : number, total_length : number) => {
				if (elem_dom)
					elem_dom.setAttribute("value", text.slice(0, counter));
				if (element === "username" && counter === total_length - 1)
					this.setState({user_done: true});
				else if (element === "password" && counter === total_length - 1) {
					setTimeout(() => { // wait 500ms before starting animation
						this.setState({pass_done: true});
					}, 1500)
				}
			}, delay, i, text.length);
			i++;
		}
	}
	componentDidMount(): void {
		this.simulateText("username", "lucasadmin");
		interval_pass = setInterval(() => {
			if (this.state.user_done) {
				clearInterval(interval_pass);
				this.simulateText("password", "whateverlooool");
			}
		}, 100)
	}

	componentWillUnmount() {
		clearTimeout(timeout_usr);
		clearTimeout(timeout_pass);
		clearInterval(interval_pass);
	}

	render() {
		let username_id = this.state.pass_done ? "username-animation" : "username";
		let	password_id = this.state.pass_done ? "password-animation" : "password"; 
		return (
			<div id="login">
				<h2 id="text-login">Log in</h2>
				<Box id="input-login">
					<input style={{top: "0%"}} id={username_id} className="input"/>
					<input style={{top: "50%"}} type="password" id={password_id} className="input"/>
				</Box>
			</div>
		);
	}
}

export default Login;
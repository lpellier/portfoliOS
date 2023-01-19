import React, { useEffect, useState } from 'react';
import 'styles/Portfolio.css';
import Desktop from './components/Desktop/Desktop'

// ? Returns a string containing hours and minutes
function getTime(now: Date) : string {
	return now.getHours() + ":" + (now.getMinutes().toString().length === 1 ? "0" + now.getMinutes() : now.getMinutes());
}

// ? Returns a string containing the date (dd/mm/yyyy)
function getDate(now: Date) : string {
	let days = now.getDate().toString().length === 1 ? "0" + now.getDate() : now.getDate();
	let months = now.getMonth() + "1";
	let year = now.getFullYear();
	return days + "/" + months + "/" + year
}

// ? Adds ripple effect to background whben clicked
function clickEffect(e: any) {
	let d = document.createElement("div");
	d.className = "clickEffect";
	d.style.top = e.clientY + "px";
	d.style.left = e.clientX + "px";
	document.body.appendChild(d);
	d.addEventListener('animationend', () => {d.parentElement?.removeChild(d)})
}

const	passwd_value = "sECurE_PasSWoRD"

let		time_interval : any;
let		pass_interval : any;

export default function Portfolio() {

	const [time, setTime] = useState(new Date());
	const [show_background, setBackground] = useState(true);
	const [show_screensaver, setScreenSaver] = useState(true);
	const [show_login, setLogin] = useState(false);
	const [show_loading, setLoading] = useState(false);
	const [show_desktop, setDesktop] = useState(false); // ! should be set to false
	const [pass_length, setPassLength] = useState(0);

	const advanceToLogin = () => {
		document.removeEventListener('keypress', advanceToLogin)
		document.removeEventListener('click', advanceToLogin)
		
		document.addEventListener('keypress', advanceToLoading) 

		// ? remove time interval since screensaver is not needed anymore
		clearInterval(time_interval);

		// ? display login page
		setLogin(true);

		// ? animation to fade out screensaver
		document.getElementById("screensaver")?.animate([
			{ opacity: 0 }
		], {
			duration: 300,
			fill: "forwards"
		});
		setTimeout(() => {
			// ? remove screensaver from load
			setScreenSaver(false);

			let tmp_pass_length = 0;
			pass_interval = setInterval(() => {
				tmp_pass_length++;
				setPassLength(tmp_pass_length);
				if (pass_length >= passwd_value.length) {
					clearInterval(pass_interval)
				}
			}, 100);
		}, 300)

		// ? animation to blur black background
		document.getElementById("opacity-bg")?.animate([
			{ backdropFilter: "blur(5px)" }
		], {
			duration: 500,
			fill: "forwards"
		});
	}

	const advanceToLoading = (e: any) => {
		if (e && e.key !== "Enter")
			return ;
		document.removeEventListener('keypress', advanceToLoading)

		// ? remove interval for password
		clearInterval(pass_interval);

		// ? display loading page
		setLoading(true);

		// ? animation to fade out login page
		document.getElementById("login-flex")?.animate([
			{ opacity: '0' },
		], {
			duration: 500,
			fill: "forwards"
		});
		// ? remove login from load
		setTimeout(() => setLogin(false), 500)

		setTimeout(() => {
			// ? display desktop page
			setDesktop(true);

			// ? animation to fade out loading
			document.getElementById("loading-flex")?.animate([
				{ opacity: 0 },
			], {
				duration: 500,
				fill: "forwards"
			});
			// ? animation to fade out background
			document.getElementById("background")?.animate([
				{ opacity: 0 },
			], {
				duration: 500,
				fill: "forwards"
			});

			// ? remove loading and background from load
			setTimeout(() => {
				setLoading(false);
				setBackground(false);
			}, 500);
		}, 5000)
	}

	const switchPasswdVisibility = () => {
		let passwd = document.getElementById("password-input");
		if (passwd) {
			let attr = passwd.getAttribute("type");
			if (attr === "password")
				passwd.setAttribute("type", "text");
			else if (attr === "text")
				passwd.setAttribute("type", "password");
		}
	}

	useEffect(() => {
		// ? listen for any click our key press to advance to login page
		document.addEventListener('keypress', advanceToLogin) 
		document.addEventListener('click', advanceToLogin) 
		time_interval = setInterval(() => setTime(new Date()), 1000);

		window.onkeydown=function(e) {
			if(e.key === " " || e.key === "PageDown" || e.key === "PageUp"){
				e.preventDefault();
			}
		}

		return () => {
			clearInterval(time_interval);
			clearInterval(pass_interval);
		}
	}, [])
	
	return (
		<div className="Portfolio">
		{
			show_background && 
			<div onClick={(e: any) => clickEffect(e)}>
				<div id="background"/>
				<div id="opacity-bg"/>
			</div>
		}
		{
			show_screensaver &&
			<div id="screensaver">
				<div id="dates">
					<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 100 100" strokeWidth="8" stroke="var(--red)" fill="none" strokeLinecap="round" strokeLinejoin="round" 
						id="date-logo">
						<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
						<circle fill="none" cx="50" cy="50" r="45"/>
						<path d="M 50,50 50,25"/>
						<path d="M 50,50 70,55"/>
					</svg>
					<h1 id='time'>{getTime(time)}</h1>
					<div className="break"/>
					<h1 id='date' style={{color: "var(--red)"}}>{getDate(time)}</h1>
				</div>
				<div id='lock-flex'>
					<svg xmlns="http://www.w3.org/2000/svg" id="lock-logo" width="75" height="75" viewBox="0 0 24 24" strokeWidth="1.5" stroke="var(--red)" fill="none" strokeLinecap="round" strokeLinejoin="round">
						<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
						<path d="M4 8v-2a2 2 0 0 1 2 -2h2" />
						<path d="M4 16v2a2 2 0 0 0 2 2h2" />
						<path d="M16 4h2a2 2 0 0 1 2 2v2" />
						<path d="M16 20h2a2 2 0 0 0 2 -2v-2" />
						<rect x="8" y="11" width="8" height="5" rx="1" />
						<path d="M10 11v-2a2 2 0 1 1 4 0v2" />
					</svg>
					<h1 id='login-text'>Press any key to log in</h1>
				</div>
			</div>
		}

		{
			show_login && 
			<div id='login-flex'>
				<div id="profile-pic"/>
				<div id="profile-name">Lucas Pellier</div>
				<div id="password-flex">
					<input readOnly={true} type="password" value={passwd_value.slice(0, pass_length)} placeholder='Password' id="password-input"/>
					<svg onMouseEnter={() => switchPasswdVisibility()} onMouseLeave={() => switchPasswdVisibility()} xmlns="http://www.w3.org/2000/svg" id="password-eye" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1.5" stroke="var(--red)" fill="none" strokeLinecap="round" strokeLinejoin="round">
						<ellipse id="inner-eye" cx="12" cy="12" rx="2" ry="0.5" />
						<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
						<path d="M22 12c-2.667 4.667 -6 7 -10 7s-7.333 -2.333 -10 -7c2.667 -4.667 6 -7 10 -7s7.333 2.333 10 7" />
					</svg>
				</div>
				<button id="login-button" onClick={() => advanceToLoading(null)}>Login</button>
			</div>
		}

		{
			show_loading &&
			<div>
				<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" strokeWidth="1.5" stroke="var(--red)" fill="none" strokeLinecap="round" strokeLinejoin="round" 
					id="logo">
					<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
					<circle fill="var(--red)" cx="12" cy="12" r="1.5"/>
					<path d="M 17 10 19 12 17 14"/>
					<path d="M 10 17 12 19 14 17"/>
					<path d="M 7 10 5 12 7 14"/>
					<path d="M 10 7 12 5 14 7"/>
				</svg>
				<div id="loading-flex">
					<h1 id="welcome-text">Welcome Lucas</h1>
					<svg id="loading" xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50">
						<circle strokeWidth="5" id="loading-back" fill="none" cx="25" cy="25" r="20"/>
						<path id="loading-part" strokeWidth="5" stroke="var(--red)" fill="none" d="M 25 45 A 20 20 0 0 0 25 5"/>
					</svg>
				</div>
			</div>
		}

		{
			show_desktop &&
			<div id="desktop-flex">
				<Desktop/>
			</div>
		}
		</div>

	)
}

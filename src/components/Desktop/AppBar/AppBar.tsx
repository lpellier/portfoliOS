import React from 'react';
import './AppBar.css';

class AppBar extends React.Component<{appState: any, spawnWindow: any}> {	
	render() {
		let wins = this.props.appState;
		let server_projects = wins.get("Server Projects");
		let cpp_projects = wins.get("C++ Projects");
		let tpoon = wins.get("Spoon");
		let cub3d = wins.get("Cub3D");
		let pong = wins.get("Pong");
		let about_me = wins.get("About me");
		let settings = wins.get("Settings");

		return (
			<div className="AppBar">
				<div>
					<svg xmlns="http://www.w3.org/2000/svg" className="App" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1" stroke="#F4615A" fill="none" strokeLinecap="round" strokeLinejoin="round"  onClick={() => this.props.spawnWindow("Server Projects")} 
						id="server_projects">
						<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
						<path d="M5 4h4l3 3h7a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-11a2 2 0 0 1 2 -2" />
						<rect strokeWidth="0.75px" x="7" y="9" width="10" height="4" rx="1.5"/>
						<rect strokeWidth="0.75px" x="7" y="13" width="10" height="4" rx="1.5"/>
						<path id="ServerDot1" d="M 9,11 9,11"/>
						<path id="ServerDot2" d="M 9,15 9,15"/>
					</svg>
					<h3 className='InfoText'>Server Projects</h3>
					{server_projects?.opened && <div className='OpenedState'/>}
				</div>
				<div>
					<svg xmlns="http://www.w3.org/2000/svg" className="App" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1" stroke="#F4615A" fill="none" strokeLinecap="round" strokeLinejoin="round"  onClick={() => this.props.spawnWindow("C++ Projects")} 
						id="cpp_projects">
						<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
						<path d="M5 4h4l3 3h7a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-11a2 2 0 0 1 2 -2" />
						<text strokeWidth="0.75px" x="5" y= "15" className="Icon">C++</text>
					</svg>
					<h3 className='InfoText'>C++ Projects</h3>
					{cpp_projects?.opened && <div className='OpenedState'/>}
				</div>
				<div>
					<svg xmlns="http://www.w3.org/2000/svg" className="App" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1" stroke="#F4615A" fill="none" strokeLinecap="round" strokeLinejoin="round" onClick={() => this.props.spawnWindow("Spoon")}
						id="spoon">
						<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
						<path d="M 4,4 H14 a2,2 0 0 1 2,2 V11 M 4,4 A 2,2 0 0 0 3,6 V15 A 2,2 0 0 0 4,17 H11"/>
						<circle cx="12.5" cy="7.5" r=".5" fill="currentColor" />
						<circle cx="7.5" cy="12.5" r=".5" fill="currentColor" />
						<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
						<rect x="11" y="11" width="12" height="12" rx="2" />
						<circle cx="17" cy="17" r=".5" fill="currentColor" />
					</svg>
					<h3 className='InfoText'>Spoon</h3>
					{tpoon?.opened && <div className='OpenedState'/>}
				</div>
				<div>
					<svg xmlns="http://www.w3.org/2000/svg" className="App" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1" stroke="#F4615A" fill="none" strokeLinecap="round" strokeLinejoin="round"  onClick={() => this.props.spawnWindow("Cub3D")}
						id="cub3d">
						<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
						<polyline points="12 3 20 7.5 20 16.5 12 21 4 16.5 4 7.5 12 3" />
						<line x1="12" y1="4" x2="12" y2="12.5"/>
						<line x1="4.5" y1="16" x2="12" y2="12.5" />
						<line x1="20" y1="16.5" x2="12" y2="12.5" />
						<polyline fill="#F4615A" points="12,7.5 16,9.75 16,14.25 12,16.5 8,14.25 8,9.75 12,7.5" />
						<path id="cub-line-1" stroke="#1E1F1F" d="M 7,9 12,12" />
						<path id="cub-line-2" stroke="#1E1F1F" d="M 17,9 12,12" />
						<path id="cub-line-3" stroke="#1E1F1F" d="M 12,17 12,12" />
						{/* <line id="cub-line-3" stroke="#1E1F1F" x1="12" y1="17" x2="12" y2="12"/> */}
					</svg>
					<h3 className='InfoText'>Cub3D</h3>
					{cub3d?.opened && <div className='OpenedState'/>}
				</div>
				<div>
					<svg xmlns="http://www.w3.org/2000/svg" className="App" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1" stroke="#F4615A" fill="none" strokeLinecap="round" strokeLinejoin="round" onClick={() => this.props.spawnWindow("Pong")}
						id="pong">
						<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
						<rect x="3" y="5" width="18" height="14" rx="2" />
						<path strokeWidth="1.5" id="pong-player-1" fill="#F4615A" d="M 6,8 6,12"/>
						<path strokeWidth="1.5" id="pong-player-2" fill="#F4615A" d="M 18,13 18,17"/>
						<path strokeWidth="2" id="pong-ball" fill="#F4615A" d="M 12,12 12,12"/>
					</svg>
					<h3 className='InfoText'>Pong</h3>
					{pong?.opened && <div className='OpenedState'/>}
				</div>
				<div>
					<svg xmlns="http://www.w3.org/2000/svg" className="App" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1" stroke="#F4615A" fill="none" strokeLinecap="round" strokeLinejoin="round" onClick={() => this.props.spawnWindow("About me")}
						id="about-me">
						<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
						<circle cx="12" cy="12" r="9" />
						<path id="about-me-info" strokeWidth="1.75" d="M 12,8 12,8"/>
						<polyline strokeWidth="1.5" points="11 12 12 12 12 16 13 16" />
					</svg>
					<h3 className='InfoText'>About me</h3>
					{about_me?.opened && <div className='OpenedState'/>}
				</div>
				<div>
					<svg xmlns="http://www.w3.org/2000/svg" className="App" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1" stroke="#F4615A" fill="none" strokeLinecap="round" strokeLinejoin="round" onClick={() => this.props.spawnWindow("Settings")}
						id="settings">
						<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
						<path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z" />
						<circle cx="12" cy="12" r="3" />
					</svg>
					<h3 className='InfoText'>Settings</h3>
					{settings?.opened && <div className='OpenedState'/>}
				</div>
			</div>
		)
	}
}

export default AppBar;

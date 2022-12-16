import React, { useEffect, useState } from 'react';
import './AppBar.css';

export default function AppBar(props : any) {
	const [app_info_text, setAppInfoText] = useState("Server Projects");

	const changeDiceValues = (die_nbr: number) => {
		let rand;
		let die;

		for (let i = 1; i <= 6; i++) {
			die = document.getElementById("die-" + die_nbr + "-" + i)
			if (die)
				die.style.opacity = "0";
		}

		rand = Math.floor(6 * Math.random() + 1);
		die = document.getElementById("die-" + die_nbr + "-" + rand)
		if (die)
			die.style.opacity = "1";
	}

	const changeInfoText = (app_name: string, appear: boolean) => {
		setAppInfoText(app_name);
		let app_name_text = document.getElementById("app-name-text")
		if (app_name_text && appear) {
			app_name_text.animate([
				{ opacity: 1 }
			], {
				duration: 200,
				fill: "forwards"
			});
		}
		else if (app_name_text) {
			app_name_text.animate([
				{ opacity: 0 }
			], {
				duration: 200,
				fill: "forwards"
			});	
		}
	}


	let windows = props.appState;
	let server_projects = windows.get("Server Projects");
	let cpp_projects = windows.get("C++ Projects");
	let spoon = windows.get("Spoon");
	let cub3d = windows.get("Cub3D");
	let pong = windows.get("Pong");
	let about_me = windows.get("About me");
	let settings = windows.get("Settings");

	return (
		<div id="app-bar-flex">
			<h3 id='app-name-text'>{app_info_text}</h3>
			<div className="AppBar">
				<div>
					<svg xmlns="http://www.w3.org/2000/svg" className="App" id="server_projects"
						onMouseEnter={() => changeInfoText(server_projects?.name, true)} 
						onMouseLeave={() => changeInfoText(server_projects?.name, false)} 
						onClick={() => props.spawnWindow("Server Projects")} 
						viewBox="0 0 24 24" strokeWidth="1" stroke="#F4615A" 
						fill="none" strokeLinecap="round" strokeLinejoin="round">
						<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
						<path d="M5 4h4l3 3h7a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-11a2 2 0 0 1 2 -2"/>
						<rect strokeWidth="0.75px" x="7" y="9" width="10" height="4" rx="1.5"/>
						<rect strokeWidth="0.75px" x="7" y="13" width="10" height="4" rx="1.5"/>
						<path id="ServerDot1" d="M 9,11 9,11"/>
						<path id="ServerDot2" d="M 9,15 9,15"/>
					</svg>
					<div style={{opacity: (server_projects?.opened ? 1 : 0)}} className='OpenedState'/>
				</div>
				<div>
					<svg xmlns="http://www.w3.org/2000/svg" className="App" id="cpp_projects"
						onMouseEnter={() => changeInfoText(cpp_projects?.name, true)} 
						onMouseLeave={() => changeInfoText(cpp_projects?.name, false)} 
						onClick={() => props.spawnWindow("C++ Projects")} 
						viewBox="0 0 24 24" strokeWidth="1" stroke="#F4615A" 
						fill="none" strokeLinecap="round" strokeLinejoin="round">
						<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
						<path d="M5 4h4l3 3h7a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-11a2 2 0 0 1 2 -2"/>
						<text strokeWidth="0.75" x="5" y= "15" className="Icon">C</text>
						<path strokeLinecap='square' strokeLinejoin='round' strokeWidth="1.30" id="cpp-plus-1" d="M 11.5,12.5 H14.5 M 13,14 V11"/>
						<path strokeLinecap='square' strokeLinejoin='round' strokeWidth="1.30" id="cpp-plus-2" d="M 16,12.5 H19 M 17.5,14 V11"/>
					</svg>
					<div style={{opacity: (cpp_projects?.opened ? 1 : 0)}} className='OpenedState'/>
				</div>
				<div>
					<svg xmlns="http://www.w3.org/2000/svg" className="App" id="spoon"
						onMouseEnter={() => changeInfoText(spoon?.name, true)} 
						onMouseLeave={() => changeInfoText(spoon?.name, false)} 
						viewBox="0 0 24 24" strokeWidth="1" stroke="#F4615A" 
						fill="none" strokeLinecap="round" strokeLinejoin="round" 
						onClick={() => props.spawnWindow("Spoon")}> 
						<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
						<rect id="spoon-die-1" onMouseEnter={() => changeDiceValues(1)} x="4" y="4" width="12" height="12" rx="2"/>
						
						<g opacity="0" id="die-1-1">
							<circle id="spoon-die-1-center" cx="10" cy="10" r=".5"/>
						</g>
						<g opacity="1" id="die-1-2">
							<circle id="spoon-die-1-leftdown" cx="7" cy="13" r=".5"/>
							<circle id="spoon-die-1-rightup" cx="13" cy="7" r=".5"/>
						</g>
						<g opacity="0" id="die-1-3">
							<circle id="spoon-die-1-leftdown" cx="7" cy="13" r=".5"/>
							<circle id="spoon-die-1-center" cx="10" cy="10" r=".5"/>
							<circle id="spoon-die-1-rightup" cx="13" cy="7" r=".5"/>
						</g>
						<g opacity="0" id="die-1-4">
							<circle id="spoon-die-1-leftup" cx="7" cy="7" r=".5"/>
							<circle id="spoon-die-1-leftdown" cx="7" cy="13" r=".5"/>
							<circle id="spoon-die-1-rightup" cx="13" cy="7" r=".5"/>
							<circle id="spoon-die-1-rightdown" cx="13" cy="13" r=".5"/>
						</g>
						<g opacity="0" id="die-1-5">
							<circle id="spoon-die-1-leftup" cx="7" cy="7" r=".5"/>
							<circle id="spoon-die-1-leftdown" cx="7" cy="13" r=".5"/>
							<circle id="spoon-die-1-center" cx="10" cy="10" r=".5"/>
							<circle id="spoon-die-1-rightup" cx="13" cy="7" r=".5"/>
							<circle id="spoon-die-1-rightdown" cx="13" cy="13" r=".5"/>
						</g>
						<g opacity="0" id="die-1-6">
							<circle id="spoon-die-1-leftup" cx="7" cy="7" r=".5"/>
							<circle id="spoon-die-1-leftdown" cx="7" cy="13" r=".5"/>
							<circle id="spoon-die-1-left" cx="7" cy="10" r=".5"/>
							<circle id="spoon-die-1-right" cx="13" cy="10" r=".5"/>
							<circle id="spoon-die-1-rightup" cx="13" cy="7" r=".5"/>
							<circle id="spoon-die-1-rightdown" cx="13" cy="13" r=".5"/>
						</g>

						<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
						<rect id="spoon-die-2" onMouseEnter={() => changeDiceValues(2)} x="11" y="11" width="12" height="12" rx="2"/>
						
						<g opacity="1" id="die-2-1">
							<circle id="spoon-die-2-center" cx="17" cy="17" r=".5"/>
						</g>
						<g opacity="0" id="die-2-2">
							<circle id="spoon-die-2-leftdown" cx="14" cy="20" r=".5"/>
							<circle id="spoon-die-2-rightup" cx="20" cy="14" r=".5"/>
						</g>
						<g opacity="0" id="die-2-3">
							<circle id="spoon-die-2-leftdown" cx="14" cy="20" r=".5"/>
							<circle id="spoon-die-2-center" cx="17" cy="17" r=".5"/>
							<circle id="spoon-die-2-rightup" cx="20" cy="14" r=".5"/>
						</g>
						<g opacity="0" id="die-2-4">
							<circle id="spoon-die-2-leftup" cx="14" cy="14" r=".5"/>
							<circle id="spoon-die-2-leftdown" cx="14" cy="20" r=".5"/>
							<circle id="spoon-die-2-rightup" cx="20" cy="14" r=".5"/>
							<circle id="spoon-die-2-rightdown" cx="20" cy="20" r=".5"/>
						</g>
						<g opacity="0" id="die-2-5">
							<circle id="spoon-die-2-leftup" cx="14" cy="14" r=".5"/>
							<circle id="spoon-die-2-leftdown" cx="14" cy="20" r=".5"/>
							<circle id="spoon-die-2-center" cx="17" cy="17" r=".5"/>
							<circle id="spoon-die-2-rightup" cx="20" cy="14" r=".5"/>
							<circle id="spoon-die-2-rightdown" cx="20" cy="20" r=".5"/>
						</g>
						<g opacity="0" id="die-2-6">
							<circle id="spoon-die-2-leftup" cx="14" cy="14" r=".5"/>
							<circle id="spoon-die-2-leftdown" cx="14" cy="20" r=".5"/>
							<circle id="spoon-die-2-left" cx="14" cy="17" r=".5"/>
							<circle id="spoon-die-2-right" cx="20" cy="17" r=".5"/>
							<circle id="spoon-die-2-rightup" cx="20" cy="14" r=".5"/>
							<circle id="spoon-die-2-rightdown" cx="20" cy="20" r=".5"/>
						</g>
					</svg>
					<div style={{opacity: (spoon?.opened ? 1 : 0)}} className='OpenedState'/>
				</div>
				<div>
					<div id="cub3d" className="App" 
						onMouseEnter={() => changeInfoText(cub3d?.name, true)} 
						onMouseLeave={() => changeInfoText(cub3d?.name, false)} 
						onClick={() => props.spawnWindow("Cub3D")}>
						<svg id="cub-svg" xmlns="http://www.w3.org/2000/svg" 
							viewBox="0 0 24 24" strokeWidth="1" stroke="#F4615A" 
							fill="none" strokeLinecap="round" strokeLinejoin="round">
							<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
							<polyline points="12 3 20 7.5 20 16.5 12 21 4 16.5 4 7.5 12 3"/>
						</svg>
						<div className='scene'>
							<div className="cube">
								<div className="cube__face cube__face--front"></div>
								<div className="cube__face cube__face--back"></div>
								<div className="cube__face cube__face--right"></div>
								<div className="cube__face cube__face--left"></div>
								<div className="cube__face cube__face--top"></div>
								<div className="cube__face cube__face--bottom"></div>
							</div>
						</div>
					</div>
					<div style={{opacity: (cub3d?.opened ? 1 : 0)}} className='OpenedState'/>
				</div>
				<div>
					<svg xmlns="http://www.w3.org/2000/svg" id="pong" className="App" 
						onMouseEnter={() => changeInfoText(pong?.name, true)} 
						onMouseLeave={() => changeInfoText(pong?.name, false)} 
						onClick={() => props.spawnWindow("Pong")}
						viewBox="0 0 24 24" strokeWidth="1" stroke="#F4615A" 
						fill="none" strokeLinecap="round" strokeLinejoin="round">
						<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
						<rect x="3" y="5" width="18" height="14" rx="2"/>
						<path strokeWidth="1.5" id="pong-player-1" fill="#F4615A" d="M 6,8 6,12"/>
						<path strokeWidth="1.5" id="pong-player-2" fill="#F4615A" d="M 18,13 18,17"/>
						<path strokeWidth="2" id="pong-ball" fill="#F4615A" d="M 12,12 12,12"/>
					</svg>
					<div style={{opacity: (pong?.opened ? 1 : 0)}} className='OpenedState'/>
				</div>
				<div>
					<svg xmlns="http://www.w3.org/2000/svg" className="App" id="about-me" 
						onMouseEnter={() => changeInfoText(about_me?.name, true)} 
						onMouseLeave={() => changeInfoText(about_me?.name, false)} 
						onClick={() => props.spawnWindow("About me")}
						viewBox="0 0 24 24" strokeWidth="1" stroke="#F4615A" 
						fill="none" strokeLinecap="round" strokeLinejoin="round">
						<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
						<circle cx="12" cy="12" r="9"/>
						<path id="about-me-info" strokeWidth="1.75" d="M 12,8 12,8"/>
						<path id="about-me-i" strokeWidth="1.5" d="M 11,12 H12 V16 H13"/>
					</svg>
					<div style={{opacity: (about_me?.opened ? 1 : 0)}} className='OpenedState'/>
				</div>
				<div>
					<svg xmlns="http://www.w3.org/2000/svg" className="App" id="settings"
						onMouseEnter={() => changeInfoText(settings?.name, true)} 
						onMouseLeave={() => changeInfoText(settings?.name, false)} 
						onClick={() => props.spawnWindow("Settings")}
						viewBox="0 0 24 24" strokeWidth="1" stroke="#F4615A" 
						fill="none" strokeLinecap="round" strokeLinejoin="round">
						<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
						<path id="settings-cog" d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z"/>
						<circle cx="12" cy="12" r="3"/>
					</svg>
					<div style={{opacity: (settings?.opened ? 1 : 0)}} className='OpenedState'/>
				</div>
			</div>
		</div>
	)
}

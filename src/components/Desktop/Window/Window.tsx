import React, {useEffect} from 'react';

import './Window.css';

// ! https://www.copycat.dev/blog/react-markdown/

const RED = "#F4615A";

export default function Window(props: {component: any, id: number, putWindowFront: any, spawnWindow: any, destroyWindow: any, setClasses: any, info: {name: string, classes: string, pos: {x: number, y: number}, z_index: number, opened: boolean; scrollbar: boolean}}) {

	useEffect(() => {
		props.setClasses(props.info.name, "WindowDefault WindowSpawn");
		setTimeout(() => {
			props.setClasses(props.info.name, "WindowDefault");
		}, 500) 
	}, [])

	
	const handleMouseDown = (event: any) => {
		props.putWindowFront(props.info.name, true, event);
	}
	
	let width = document.getElementById(props.info.name)?.clientWidth;
	let height = document.getElementById(props.info.name)?.clientHeight;

	return (
		<div 
		onMouseDown={handleMouseDown}
		style={{zIndex: props.info.z_index, top: props.info.pos.y, left: props.info.pos.x}} 
		id={props.info.name} 
		className={props.info.classes}>
			<div className='content'>
				{/* {props.info.scrollbar && 
					<Scrollbar className='Scrollbar' style={{ width: width ? width : 600, height: height? height : 400}}>
						<props.component spawnWindow={props.spawnWindow}
							width={width ? width : 600} height={height? height : 400}/>
					</Scrollbar>}
				{!props.info.scrollbar &&
					} */}
				{props.component}
			</div>
			<h3 className="WindowTitle">{props.info.name}</h3>
			<div className='ButtonFlex'>
				<button className="WindowButton" id='MinimizeButton' onClick={() => {
					if (props.info.classes.includes("WindowMaximized"))
						props.setClasses(props.info.name, "WindowDefault WindowMaximizedMinimized");
					else
						props.setClasses(props.info.name, "WindowDefault WindowMinimized");
				}}>
					<svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-minimize" viewBox="0 0 24 24" strokeWidth="2" stroke={RED} fill="none" strokeLinecap="round" strokeLinejoin="round">
						<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
						<path id="minimizeButtonPath1" d="M15 19v-2a2 2 0 0 1 2 -2h2" />
						<path id="minimizeButtonPath2" d="M15 5v2a2 2 0 0 0 2 2h2" />
						<path id="minimizeButtonPath3" d="M5 15h2a2 2 0 0 1 2 2v2" />
						<path id="minimizeButtonPath4" d="M5 9h2a2 2 0 0 0 2 -2v-2" />
					</svg>
				</button>
				<button className="WindowButton" id='MaximizeButton' onClick={() => {
					if (props.info.classes.includes("WindowMaximized")) {
						props.setClasses(props.info.name, "WindowDefault WindowMaximizedReverse");
						setTimeout(() => {
							props.setClasses(props.info.name, "WindowDefault");
						}, 500)
					}
					else
						props.setClasses(props.info.name, "WindowDefault WindowMaximized");
					props.putWindowFront(props.info.name);}
				}>
					<svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-maximize" viewBox="0 0 24 24" strokeWidth="2" stroke={RED} fill="none" strokeLinecap="round" strokeLinejoin="round">
						<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
						<path id="maximizeButtonPath1" d="M4 8v-2a2 2 0 0 1 2 -2h2" />
						<path id="maximizeButtonPath2" d="M4 16v2a2 2 0 0 0 2 2h2" />
						<path id="maximizeButtonPath3" d="M16 4h2a2 2 0 0 1 2 2v2" />
						<path id="maximizeButtonPath4" d="M16 20h2a2 2 0 0 0 2 -2v-2" />
					</svg>
				</button>
				<button className="WindowButton" id='QuitButton' onClick={() => {
					props.setClasses(props.info.name, "WindowDefault WindowQuit");
					setTimeout(() => {
						props.destroyWindow(props.info.name)
					}, 500)
				}}>
					<svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-square-off" viewBox="0 0 24 24" strokeWidth="2" stroke={RED} fill="none" strokeLinecap="round" strokeLinejoin="round">
						<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
						<rect x="4" y="4" width="16" height="16" rx="2" ry="2" />
						<path id="quitButtonPath1" d="M 5,5 9,9"/>
						<path id="quitButtonPath2" d="M 19,19 15,15"/>
						<path id="quitButtonPath3" d="M 19,5 15,9"/>
						<path id="quitButtonPath4" d="M 5,19 9,15"/>
					</svg>
				</button>
			</div>
		</div>
	)
}

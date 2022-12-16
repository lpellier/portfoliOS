import Background from						'./Background/Background'
import AppBar from							'./AppBar/AppBar'
import Window from							'./Window/Window';
import Pong from							'./Apps/Pong/Pong'
import Spoon from							'./Apps/Spoon/Spoon'
import FolderServer from					'./Apps/FolderServer/FolderServer';
import										'./Desktop.css';
import React, {useState, useEffect} from	'react';

// ? Bugs
	// TODO In Spoon app, pressing space after maximizing windows causes weird issue
	// TODO Shouldn't register key presses and mouse cliks for apps not in focus

// ? Functionnality
	// ! Important
	// TODO Mobile webapp
	// TODO Integrate Pong
	// TODO Files need to be implemented
		// ? html content designed like markdown to present each and every one of my projects
		// ? about-me section will have my cv designed on markdown
	// TODO Code Cub3D in javascript
	// TODO Settings -> modify appearance of website
		// ? Ability to change the background ?
		// ? Ability to change the color theme ?
		// ? Ability to change font-size, icon-size ?

	// ? Eventually
	// ? When a window is dragged to a side, snap it to that side
	// ? Some sort of tutorial message ?
	// ? Create a logo

	//   Maybe
	//   Backend for pong multiplayer
	//   Custom mouse pointer ?

export default function Desktop() {
	const [windows, setWindows] = useState(new Map<string, {name: string, classes: string, pos: {x: number, y: number}, z_index: number, opened: boolean; scrollbar: boolean}>());
	const [win_dragged, setDraggedWindow] = useState("");
	const [global, setGlobal] = useState({x: 0, y: 0})
	const [old_global, setOldGlobal] = useState({x: 0, y: 0})

	useEffect(() => {
		let wins = windows;
		wins.set("Server Projects", {name: "Server Projects", classes: "WindowDefault", pos: {x: 0, y: 0}, z_index: 0, opened: false, scrollbar: true});
		wins.set("C++ Projects", {name: "C++ Projects", classes: "WindowDefault", pos: {x: 0, y: 0}, z_index: 0, opened: false, scrollbar: true});
		wins.set("Spoon", {name: "Spoon", classes: "WindowDefault", pos: {x: 0, y: 0}, z_index: 0, opened: false, scrollbar: false});
		wins.set("Cub3D", {name: "Cub3D", classes: "WindowDefault", pos: {x: 0, y: 0}, z_index: 0, opened: false, scrollbar: false});
		wins.set("Pong", {name: "Pong", classes: "WindowDefault", pos: {x: 0, y: 0}, z_index: 0, opened: false, scrollbar: false});
		wins.set("About me", {name: "About me", classes: "WindowDefault", pos: {x: 0, y: 0}, z_index: 0, opened: false, scrollbar: true});
		wins.set("Settings", {name: "Settings", classes: "WindowDefault", pos: {x: 0, y: 0}, z_index: 0, opened: false, scrollbar: true});
		setWindows(wins);
	}, [])

	const putWindowFront = (win_name: string, dragged: boolean, event: any) => {
		let wins = windows;
		let win_info = wins.get(win_name);
		if (!win_info)
			return;
		for (let value of wins.values()) {
			if (value.z_index > win_info.z_index)
				value.z_index--;
		}
		win_info.z_index = getLastZIndex();
		wins.set(win_name, win_info);
		setWindows(wins);

		if (dragged) {
			let win = document.getElementById(win_info.name);
			let rect = win?.getBoundingClientRect();
			if (!rect)
				return ;
			
			if (!(event.clientY / rect.bottom >= 0.9 && event.clientX / rect.right >= 0.9))
				setDraggedWindow(win_name);
		}
	}

	const getLastZIndex = () => {
		let count = 1;
		for (let value of windows.values()) {
			if (value.opened === true)
				count++;
		}
		return count;
	}

	const setClasses = (win_name: string, classes: string) => {
		let wins_cpy = windows;
		let win_info = wins_cpy.get(win_name);
		if (win_info) {
			win_info.classes = classes;
			wins_cpy.set(win_name, win_info);
			setWindows(wins_cpy);
		}
	}

	const spawnWindow = (win_name : string) : void => {
		let wins_cpy = windows;
		let win_info = wins_cpy.get(win_name);
		if (document.getElementById(win_name) && win_info) {
			win_info.classes = "WindowDefault WindowSpawn"
			wins_cpy.set(win_name, win_info);
			setWindows(wins_cpy)
			putWindowFront(win_name, false, null)
		}
		else if (win_info) {
			win_info.opened = true;
			win_info.classes = "WindowDefault WindowSpawn"
			win_info.z_index = getLastZIndex();
			win_info.pos = {
				x: window.innerWidth / 2 - 300,
				y: window.innerHeight / 2 - 200
			}
			wins_cpy.set(win_name, win_info);
			setWindows(wins_cpy)
		}
	}

	const destroyWindow = (win_name: string): void => {
		if (document.getElementById(win_name)) {
			let wins_cpy = windows;
			let win_info = wins_cpy.get(win_name);
			if (win_info) {
				win_info.opened = false;
				win_info.z_index = 0;
				win_info.classes = "WindowDefault";
				wins_cpy.set(win_name, win_info);
			}
			setWindows(wins_cpy)
		}
	}

	const handleMouseUp = () => {
		setDraggedWindow("");
	}

	const handleMouseMove = (event: any) => {
		setOldGlobal({x: global.x, y: global.y});
		setGlobal({x: event.clientX, y: event.clientY});
		if (win_dragged !== "") {
			let win = document.getElementById(win_dragged);
			let rect = win?.getBoundingClientRect();

			let wins = windows;
			let win_info = wins.get(win_dragged);
			if (!win_info)
				return;
			win_info.pos = {
				x: (rect?rect.x:0) + ((global.x - old_global.x)),
				y: (rect?rect.y:0) + ((global.y - old_global.y))
			}
		}
	}

	// getWindowInFocus() {
	// 	for (let value of windows.values()) {
	// 		if (value.opened && value.z_index === 1)
	// 			return (value);
	// 	}
	// 	return (null);
	// }
	
	let server_projects = windows.get("Server Projects");
	let cpp_projects = windows.get("C++ Projects");
	let spoon = windows.get("Spoon");
	let cub3d = windows.get("Cub3D");
	let pong = windows.get("Pong");
	let about_me = windows.get("About me");
	let settings = windows.get("Settings");

	return (
		<div id="Desktop" className={"Desktop"} onMouseMove={handleMouseMove} onMouseLeave={handleMouseUp} onMouseUp={handleMouseUp}>
			<Background/>
			<AppBar appState={windows} spawnWindow={spawnWindow}/>
			<div className='windows'>
				{server_projects?.opened && 
					<Window key={1} component={FolderServer} id={1}
					putWindowFront={putWindowFront}
					destroyWindow={destroyWindow}
					setClasses={setClasses}
					info={server_projects}/>}
				{cpp_projects?.opened && 
					<Window key={2} component={FolderServer} id={2}
					putWindowFront={putWindowFront}
					destroyWindow={destroyWindow}
					setClasses={setClasses}
					info={cpp_projects}/>}
				{spoon?.opened && 
					<Window key={3} component={Spoon} id={3}
					putWindowFront={putWindowFront}
					destroyWindow={destroyWindow}
					setClasses={setClasses}
					info={spoon}/>}
				{cub3d?.opened && 
					<Window key={4} component={FolderServer} id={4}
					putWindowFront={putWindowFront}
					destroyWindow={destroyWindow}
					setClasses={setClasses}
					info={cub3d}/>}
				{pong?.opened && 
					<Window key={5} component={Pong} id={5}
					putWindowFront={putWindowFront}
					destroyWindow={destroyWindow}
					setClasses={setClasses}
					info={pong}/>}
				{about_me?.opened && 
					<Window key={6} component={FolderServer} id={6}
					putWindowFront={putWindowFront}
					destroyWindow={destroyWindow}
					setClasses={setClasses}
					info={about_me}/>}
				{settings?.opened && 
					<Window key={7} component={FolderServer} id={7}
					putWindowFront={putWindowFront}
					destroyWindow={destroyWindow}
					setClasses={setClasses}
					info={settings}/>}
			</div>
		</div>
	)
}

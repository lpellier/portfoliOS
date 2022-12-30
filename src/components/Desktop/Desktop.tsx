import Background from						'./Background/Background'
import AppBar from							'./AppBar/AppBar'
import Window from							'./Window/Window';
import Pong from							'./Apps/Pong/Pong'
import Spoon from							'./Apps/Spoon/Spoon'

import Folder from './Apps/Folder/Folder';
import File from './Apps/File/File';

import										'./Desktop.css';
import React, {useState, useEffect} from	'react';
import Cub3D from './Apps/Cub3D/Cub3D';
import AboutMe from './Apps/AboutMe/AboutMe';
import Settings from './Apps/Settings/Settings';
import PDFViewer from './Apps/PDFViewer/PDFViewer';

// ? Bugs
	// TODO Shouldn't register key presses and mouse cliks for apps not in focus

// ! Important
	// TODO Mobile webapp
	// TODO Integrate Pong
	// TODO Folder
		// ? A Folder is a flex container, displaying all files and subfolders contained in it
		// ? When a file is opened, open it in new window
		// ? Even if the folder containing the file closes, the window containing the file stays open
		// ? When a subfolder is opened, instead of opening new window, just change current window
		// ? to the new one and add reverse button

		// ? Every single window must be imported into desktop ?
		// ? Sounds like this will cause optimization issues, will look into it
		// ? When a file is double-clicked, spawn a window in desktop
		// TODO Files
		// ? A File is essentially a button with an icon representing what it contains (pdfs, markdown)
		// ? When clicked, opens a new window to a file window containing markdown
		// ? Markdown to present each and every one of my projects
		// ? On each project, the subject will be available to open on a new window 
		// ? about-me section will have my cv designed on markdown aswell as the actual pdf cv
	// TODO Code Cub3D in javascript
	// TODO Interesting background
	// TODO Settings -> modify appearance of website
		// ? Ability to change the background ?
		// ? Ability to change the color theme ?
		// ? Ability to change font-size, icon-size ?

// ? Eventually
	// ? Redo login animation
	// ? Redo c++ icon -> rename to c & c++ projects : animation is just ++ moving from top to bottom
	// ? When a window is dragged to a side, snap it to that side
	// ? Some sort of tutorial message / tool tips ?
	// ? Create a logo
	// ? Togglable funny pop-ups ? "Coders hate him", "Wanna make you code 20% shorter"

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
		wins.set("Server Projects", {name: "Server Projects", classes: "WindowDefault", pos: {x: 0, y: 0}, z_index: 0, opened: false, scrollbar: false});
		wins.set("ft_server", {name: "ft_server", classes: "WindowDefault", pos: {x: 0, y: 0}, z_index: 0, opened: false, scrollbar: true});
		wins.set("ft_services", {name: "ft_services", classes: "WindowDefault", pos: {x: 0, y: 0}, z_index: 0, opened: false, scrollbar: true});
		
		wins.set("C/C++ Projects", {name: "C/C++ Projects", classes: "WindowDefault", pos: {x: 0, y: 0}, z_index: 0, opened: false, scrollbar: true});
		wins.set("101_C", {name: "101_C", classes: "WindowDefault", pos: {x: 0, y: 0}, z_index: 0, opened: false, scrollbar: true});
		wins.set("ft_containers", {name: "ft_containers", classes: "WindowDefault", pos: {x: 0, y: 0}, z_index: 0, opened: false, scrollbar: true});
		wins.set("get_next_line", {name: "get_next_line", classes: "WindowDefault", pos: {x: 0, y: 0}, z_index: 0, opened: false, scrollbar: true});
		wins.set("minishell", {name: "minishell", classes: "WindowDefault", pos: {x: 0, y: 0}, z_index: 0, opened: false, scrollbar: true});
		wins.set("Subject minishell", {name: "Subject minishell", classes: "WindowDefault", pos: {x: 0, y: 0}, z_index: 0, opened: false, scrollbar: true});
		wins.set("matrix", {name: "matrix", classes: "WindowDefault", pos: {x: 0, y: 0}, z_index: 0, opened: false, scrollbar: true});
		wins.set("philosophers", {name: "philosophers", classes: "WindowDefault", pos: {x: 0, y: 0}, z_index: 0, opened: false, scrollbar: true});
		wins.set("push_swap", {name: "push_swap", classes: "WindowDefault", pos: {x: 0, y: 0}, z_index: 0, opened: false, scrollbar: true});
		wins.set("ft_printf", {name: "ft_printf", classes: "WindowDefault", pos: {x: 0, y: 0}, z_index: 0, opened: false, scrollbar: true});
		wins.set("ready_set_boole", {name: "ready_set_boole", classes: "WindowDefault", pos: {x: 0, y: 0}, z_index: 0, opened: false, scrollbar: true});
		
		wins.set("Spoon", {name: "Spoon", classes: "WindowDefault", pos: {x: 0, y: 0}, z_index: 0, opened: false, scrollbar: false});
		wins.set("Cub3D", {name: "Cub3D", classes: "WindowDefault", pos: {x: 0, y: 0}, z_index: 0, opened: false, scrollbar: false});
		wins.set("Pong", {name: "Pong", classes: "WindowDefault", pos: {x: 0, y: 0}, z_index: 0, opened: false, scrollbar: false});
		wins.set("About me", {name: "About me", classes: "WindowDefault", pos: {x: 0, y: 0}, z_index: 0, opened: false, scrollbar: false});
		wins.set("Settings", {name: "Settings", classes: "WindowDefault", pos: {x: 0, y: 0}, z_index: 0, opened: false, scrollbar: false});
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
	let ft_server = windows.get("ft_server");
	let ft_services = windows.get("ft_services");

	let cpp_projects = windows.get("C/C++ Projects");
	let c_101 = windows.get("101_C");
	let ft_containers = windows.get("ft_containers");
	let get_next_line = windows.get("get_next_line");
	let matrix = windows.get("matrix");
	let minishell = windows.get("minishell");
	let minishell_sub = windows.get("Subject minishell");
	let philosophers = windows.get("philosophers");
	let ft_printf = windows.get("ft_printf");
	let push_swap = windows.get("push_swap");
	let ready_set_boole = windows.get("ready_set_boole");

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
					<Window key={1} component={<Folder name="Server Projects" spawnWindow={spawnWindow}/>} id={1}
					putWindowFront={putWindowFront}
					spawnWindow={spawnWindow}
					destroyWindow={destroyWindow}
					setClasses={setClasses}
					info={server_projects}/>}
				{ft_server?.opened && 
					<Window key={1.1} component={<File name="" content_path="" spawnWindow={spawnWindow} />} id={1.1}
					putWindowFront={putWindowFront}
					spawnWindow={spawnWindow}
					destroyWindow={destroyWindow}
					setClasses={setClasses}
					info={ft_server}/>}
				{ft_services?.opened && 
					<Window key={1.2} component={<File name="" content_path="" spawnWindow={spawnWindow} />} id={1.2}
					putWindowFront={putWindowFront}
					spawnWindow={spawnWindow}
					destroyWindow={destroyWindow}
					setClasses={setClasses}
					info={ft_services}/>}

				{cpp_projects?.opened && 
					<Window key={2} component={<Folder name="C/C++ Projects" spawnWindow={spawnWindow}/>} id={2}
					putWindowFront={putWindowFront}
					spawnWindow={spawnWindow}
					destroyWindow={destroyWindow}
					setClasses={setClasses}
					info={cpp_projects}/>}
				{c_101?.opened && 
					<Window key={2.1} component={<File name="" content_path="" spawnWindow={spawnWindow} />} id={2.1}
					putWindowFront={putWindowFront}
					spawnWindow={spawnWindow}
					destroyWindow={destroyWindow}
					setClasses={setClasses}
					info={c_101}/>}
				{ft_containers?.opened && 
					<Window key={2.2} component={<File name="" content_path="" spawnWindow={spawnWindow} />} id={2.2}
					putWindowFront={putWindowFront}
					spawnWindow={spawnWindow}
					destroyWindow={destroyWindow}
					setClasses={setClasses}
					info={ft_containers}/>}
				{get_next_line?.opened && 
					<Window key={2.3} component={<File name="" content_path="" spawnWindow={spawnWindow} />} id={2.3}
					putWindowFront={putWindowFront}
					spawnWindow={spawnWindow}
					destroyWindow={destroyWindow}
					setClasses={setClasses}
					info={get_next_line}/>}
				{matrix?.opened && 
					<Window key={2.4} component={<File name="" content_path="" spawnWindow={spawnWindow} />} id={2.4}
					putWindowFront={putWindowFront}
					spawnWindow={spawnWindow}
					destroyWindow={destroyWindow}
					setClasses={setClasses}
					info={matrix}/>}
				{minishell?.opened && 
					<Window key={2.5} component={<File name="minishell" content_path="" spawnWindow={spawnWindow} />} id={2.5}
					putWindowFront={putWindowFront}
					spawnWindow={spawnWindow}
					destroyWindow={destroyWindow}
					setClasses={setClasses}
					info={minishell}/>}
				{minishell_sub?.opened && 
					<Window key={2.55} component={<PDFViewer name="Subject minishell" pdf_path="./assets/minishell.subject.pdf"/>} id={2.55}
					putWindowFront={putWindowFront}
					spawnWindow={spawnWindow}
					destroyWindow={destroyWindow}
					setClasses={setClasses}
					info={minishell_sub}/>}
				{philosophers?.opened && 
					<Window key={2.6} component={<File name="" content_path="" spawnWindow={spawnWindow} />} id={2.6}
					putWindowFront={putWindowFront}
					spawnWindow={spawnWindow}
					destroyWindow={destroyWindow}
					setClasses={setClasses}
					info={philosophers}/>}
				{ft_printf?.opened && 
					<Window key={2.7} component={<File name="" content_path="" spawnWindow={spawnWindow} />} id={2.7}
					putWindowFront={putWindowFront}
					spawnWindow={spawnWindow}
					destroyWindow={destroyWindow}
					setClasses={setClasses}
					info={ft_printf}/>}
				{push_swap?.opened && 
					<Window key={2.8} component={<File name="" content_path="" spawnWindow={spawnWindow} />} id={2.8}
					putWindowFront={putWindowFront}
					spawnWindow={spawnWindow}
					destroyWindow={destroyWindow}
					setClasses={setClasses}
					info={push_swap}/>}
				{ready_set_boole?.opened && 
					<Window key={2.9} component={<File name="" content_path="" spawnWindow={spawnWindow} />} id={2.9}
					putWindowFront={putWindowFront}
					spawnWindow={spawnWindow}
					destroyWindow={destroyWindow}
					setClasses={setClasses}
					info={ready_set_boole}/>}



				{spoon?.opened && 
					<Window key={3} component={<Spoon/>} id={3}
					putWindowFront={putWindowFront}
					spawnWindow={spawnWindow}
					destroyWindow={destroyWindow}
					setClasses={setClasses}
					info={spoon}/>}
				{cub3d?.opened && 
					<Window key={4} component={<Cub3D/>} id={4}
					putWindowFront={putWindowFront}
					spawnWindow={spawnWindow}
					destroyWindow={destroyWindow}
					setClasses={setClasses}
					info={cub3d}/>}
				{pong?.opened && 
					<Window key={5} component={<Pong/>} id={5}
					putWindowFront={putWindowFront}
					spawnWindow={spawnWindow}
					destroyWindow={destroyWindow}
					setClasses={setClasses}
					info={pong}/>}
				{about_me?.opened && 
					<Window key={6} component={<AboutMe/>} id={6}
					putWindowFront={putWindowFront}
					spawnWindow={spawnWindow}
					destroyWindow={destroyWindow}
					setClasses={setClasses}
					info={about_me}/>}
				{settings?.opened && 
					<Window key={7} component={<Settings/>} id={7}
					putWindowFront={putWindowFront}
					spawnWindow={spawnWindow}
					destroyWindow={destroyWindow}
					setClasses={setClasses}
					info={settings}/>}
			</div>
		</div>
	)
}

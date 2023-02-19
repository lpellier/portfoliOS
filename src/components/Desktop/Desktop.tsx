import Background from						'./Background/Background'
import AppBar from							'./AppBar/AppBar'
import										'styles/Desktop.css';
import React, {useState, useRef, useCallback} from	'react';
import { IPos, IWin } from '../../types';
import { default_win_height, default_win_width, window_select_margin } from '../../consts';
import Window from './Window/Window';

// ? Bugs

// ! Important
	// TODO Mobile webapp
	// TODO Presentation for each of my projects
	// TODO Interesting background
	// TODO About me -> my cv styled in markdown
		// ? Cool markdown github profile : https://github.com/abhisheknaiidu/awesome-github-profile-readme
	// TODO Settings -> modify appearance of website
		// ? Ability to change the background ?
		// ? Ability to change the color theme ?
		// ? Ability to change font-size, icon-size ?

// ? Eventually
	// ? Some sort of tutorial message / tool tips ?

const Desktop = () => {
	const [windows, setWindows] = useState<IWin[]>([]);
	const [currentKey, setKey] = useState<number>(0);
	const win_dragged = useRef<string>("");
	const win_resized = useRef<string>("");
	const resize_break = useRef<IPos>({x: 0, y: 0});
	const resizeDirection = useRef<string>("");
	// ? This exists to force a rerender
	const [forcedUpdate, setForcedUpdate] = useState<boolean>(false);

	// ? Using ref instead of state to prevent rerender on every mouse movement
	const global = useRef({x: 0, y: 0});
	const old_global = useRef({x: 0, y: 0});

	
	// ? Returns number of elements in windows list
	const getLastZIndex = useCallback((): number => {
		return windows.length + 1;
	}, [windows.length]);

	const putWindowToFront = useCallback((win_name: string): void => {
		setWindows(current => current.map(win => {
			if (win.name === win_name) return {...win, z_index: getLastZIndex()};
			else if (win.z_index > 0) return {...win, z_index: win.z_index - 1};
			else return win;
		})) 
	}, [getLastZIndex]);

	const dragWindow = useCallback((win_name: string, event: any) => {
		putWindowToFront(win_name);
		
		let win = document.getElementById(win_name);
		let rect = win?.getBoundingClientRect();
		if (!rect)
			return ;

		let check = event.clientY - rect.top;
		if (check <= 40 && document.body.style.cursor === "default") // ? Drag is only active when clicking the window header
			win_dragged.current = (win_name);
	}, [putWindowToFront]);

	// ? Adds a window to the windows list
	const spawnWindow = useCallback((win_name : string): void => {
		let window_count = getLastZIndex();
		
		// ? If window does not exist, create and spawn it
		if (!document.getElementById(win_name)) {
			setWindows((current) => [...current, {
				name: win_name,
				pos: {
					x: window.innerWidth / 2 - default_win_width / 2 + (window_count - 1) * 20,
					y: window.innerHeight / 2 - default_win_height / 2 + (window_count - 1) * 20
				},
				size: {
					x: default_win_width,
					y: default_win_height
				},
				unMinimized: false,
				z_index: window_count + 1,
				key: currentKey
			}])
			setKey(current => current + 1);
		}
		// ? If window exists but is minimized, spawn it again
		else if (document.getElementById(win_name)?.classList.contains("WindowMinimized")) {
			setWindows((current) => current.map(win => {
				if (win.name === win_name) {
					return {
						...win,
						z_index: getLastZIndex(),
						unMinimized: !win.unMinimized
					}
				}
				return win;
			}));
		}
		// ? If window exists, just put it in front
		else {
			putWindowToFront(win_name);
		}
	}, [getLastZIndex, putWindowToFront, currentKey]);

	// ? Removes a window from windows list
	const destroyWindow = useCallback((win_name: string): void => {
		setWindows((current) => current.filter((win) => win.name !== win_name, win_name))
	}, []);

	const handleMouseUp = () => {
		win_dragged.current = "";
		win_resized.current = "";
		resizeDirection.current = "";
	}

	const handleMouseDown = () => {
		if (document.body.style.cursor.includes("resize")) {	
			for (const win of windows) {
				if (win.z_index === getLastZIndex()) {	
					win_resized.current = win.name;
					resizeDirection.current = document.body.style.cursor;
					resize_break.current.x = win.pos.x + win.size.x;
					resize_break.current.y = win.pos.y + win.size.y;
				}
			}
		}
	}

	const checkForResize = () => {
		for (const win of windows) {
			// ? Only check for front window
			if (win.z_index === getLastZIndex()) {
				// ? Check for corners to set mouse cursor to resize
				if (Math.abs(win.pos.x - global.current.x) <= window_select_margin && Math.abs(win.pos.y - global.current.y - window_select_margin / 4) <= window_select_margin / 2) {
					document.body.style.cursor = "nw-resize";
				}
				else if (Math.abs(win.pos.x + win.size.x - global.current.x) <= window_select_margin && Math.abs(win.pos.y - global.current.y - window_select_margin / 4) <= window_select_margin / 2) {
					document.body.style.cursor = "ne-resize";	
				}
				else if (Math.abs(win.pos.x + win.size.x - global.current.x) <= window_select_margin && Math.abs(win.pos.y + win.size.y - global.current.y) <= window_select_margin) {
					document.body.style.cursor = "se-resize";	
				}
				else if (Math.abs(win.pos.x - global.current.x) <= window_select_margin && Math.abs(win.pos.y + win.size.y - global.current.y) <= window_select_margin) {
					document.body.style.cursor = "sw-resize";
				}
				else if (Math.abs(win.pos.y - global.current.y - window_select_margin / 4) <= window_select_margin / 2 && global.current.x >= win.pos.x && global.current.x <= win.pos.x + win.size.x) {
					document.body.style.cursor = "n-resize";
				}
				else if (Math.abs(win.pos.x - global.current.x) <= window_select_margin && global.current.y >= win.pos.y && global.current.y <= win.pos.y + win.size.y) {
					document.body.style.cursor = "w-resize";
				}
				else if (Math.abs(win.pos.x + win.size.x - global.current.x) <= window_select_margin && global.current.y >= win.pos.y && global.current.y <= win.pos.y + win.size.y) {
					document.body.style.cursor = "e-resize";
				}
				else if (Math.abs(win.pos.y + win.size.y - global.current.y) <= window_select_margin && global.current.x >= win.pos.x && global.current.x <= win.pos.x + win.size.x) {
					document.body.style.cursor = "s-resize";
				}
				else {
					document.body.style.cursor = "default";
				}
			}
		}
	}

	const handleMouseMove = (event: any) => {
		old_global.current = {
			...old_global,
			x: global.current.x,
			y: global.current.y
		}
		global.current = {
			...global,
			x: event.clientX,
			y: event.clientY
		}
		if (win_dragged.current !== "") {
			let win = document.getElementById(win_dragged.current);
			let rect = win?.getBoundingClientRect();

			// ? set pos of dragged window
			let new_windows = windows.map(win => {
				if (win.name === win_dragged.current) {
					return {...win, pos: {
						x: (rect?rect.x:0) + ((global.current.x - old_global.current.x)),
						y: (rect?rect.y:0) + ((global.current.y - old_global.current.y))
					}}
				}
				return win;
			}) 
			setWindows(new_windows)
			return ;
		}
		checkForResize();
		if (win_resized.current !== "") {
			let new_windows = windows.map(win => {
				
				if (win.z_index === getLastZIndex() && win.name === win_resized.current) {
					// ? set new width and height directly according to mouse pos
					let size = {
						x: win.size.x,
						y: win.size.y
					};
					let pos = {
						x: win.pos.x,
						y: win.pos.y
					};
					let up = ["n-resize", "nw-resize", "ne-resize"];
					let right = ["e-resize", "ne-resize", "se-resize"];
					let bottom = ["s-resize", "sw-resize", "se-resize"];
					let left = ["w-resize", "nw-resize", "sw-resize"];
					if (right.includes(resizeDirection.current))
						size.x = Math.max(global.current.x - win.pos.x, 200);
					else if (left.includes(resizeDirection.current)) {
						size.x = Math.max(window.innerWidth - (global.current.x) - (window.innerWidth - pos.x - size.x), 200);
						pos.x = Math.min(global.current.x, resize_break.current.x - size.x);
					}
					if (bottom.includes(resizeDirection.current))
						size.y = Math.max(global.current.y - win.pos.y, 100);
					else if (up.includes(resizeDirection.current)) {
						size.y = Math.max(window.innerHeight - (global.current.y) - (window.innerHeight - pos.y - size.y), 100);
						pos.y = Math.min(global.current.y, resize_break.current.y - size.y);
					}
					return {...win, size: size, pos: pos}
				}
				return win;
			})
			setWindows(new_windows);
		}
	}

	console.log(windows);

	return (
		<div id="Desktop" className="Desktop" onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseLeave={handleMouseUp} onMouseUp={handleMouseUp}>
			<Background/>
			<AppBar opened_apps={windows.map(win => win.name)} spawnWindow={spawnWindow}/>
			{ // ? array containg window components using info kept in windows array
				windows.map((win) => {
					return <Window 
						name={win.name} key={win.key}
						pos={win.pos} size={win.size}
						unMinimized={win.unMinimized}
						z_index={win.z_index}
						dragWindow={dragWindow}
						spawnWindow={spawnWindow}
						destroyWindow={destroyWindow}
					/>;
				})
			}
		</div>
	)
}

export default Desktop;

import Background from						'./Background/Background'
import AppBar from							'./AppBar/AppBar'
import										'./Desktop.css';
import React, {useState, useRef, FunctionComponent, lazy, Suspense} from	'react';
import { IWin } from '../../types';
import { default_win_height, default_win_width } from '../../globals';

// ? Bugs
	// TODO Shouldn't register key presses and mouse cliks for apps not in focus

// ! Important
	// TODO Mobile webapp
	// TODO Integrate Pong
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
	// ? Togglable funny pop-ups ? "Coders hate him", "Wanna make your code 20% shorter"

//   Maybe
	//   Backend for pong multiplayer
	//   Custom mouse pointer ?

const Window = lazy(() => import("./Window/Window"))

const Desktop: FunctionComponent = () => {
	const [windows, setWindows] = useState<IWin[]>([]);
	const [win_dragged, setDraggedWindow] = useState<string>("");
	const [currentKey, setKey] = useState<number>(0);
	// ? This exists to force a rerender
	const [forcedUpdate, setForcedUpdate] = useState<boolean>(false);

	// ? Using ref instead of state to prevent rerender on every mouse movement
	const global = useRef({x: 0, y: 0});
	const old_global = useRef({x: 0, y: 0});

	const dragWindow = (win_name: string, event: any) => {
		putWindowToFront(win_name);
		
		let win = document.getElementById(win_name);
		let rect = win?.getBoundingClientRect();
		if (!rect)
			return ;

		if (!(event.clientY / rect.bottom >= 0.9 && event.clientX / rect.right >= 0.9))
			setDraggedWindow(win_name);
	}

	// ? Returns number of elements in windows list
	const getLastZIndex = (): number => {
		return windows.length + 1;
	};

	const putWindowToFront = (win_name: string): void => {
		let cur_win = windows.filter(win => {
			return win.name === win_name;
		})
		if (cur_win.length !== 1)
			return ;
		let new_windows = windows.map(win => {
			if (win.z_index > cur_win[0].z_index)
				return {...win, z_index: win.z_index - 1};
			else if (win.name === win_name)
				return {...win, z_index: getLastZIndex()};
			return win;
		})
		setWindows(new_windows)
	};

	// ? Adds a window to the windows list
	const spawnWindow = (win_name : string): void => {
		let window_count = getLastZIndex();
		
		// ? If window does not exist, create and spawn it
		if (!document.getElementById(win_name)) {
			setWindows(current => [...current, {
				name: win_name,
				key: currentKey,
				pos: {
					x: window.innerWidth / 2 - default_win_width / 2 + (window_count - 1) * 20,
					y: window.innerHeight / 2 - default_win_height / 2 + (window_count - 1) * 20
				},
				z_index: window_count,
				unMinimized: false
			}])
			setKey(current => current + 1)
		}
		// ? If window exists but is minimized, spawn it again
		else if (document.getElementById(win_name)?.classList.contains("WindowMinimized")) {
			let new_windows = windows.map(win => {
				if (win.name === win_name) {
					return {
						...win,
						z_index: window_count,
						// ? Toggling unMinimized triggers hook in Window component, which respawns the window
						unMinimized: !win.unMinimized
					}
				}
				return win;
			})
			setWindows(new_windows);
		}
		// ? If window exists, just put it in front
		else {
			putWindowToFront(win_name);
		}
	}

	// ? Removes a window from windows list
	const destroyWindow = (win_name: string): void => {
		setWindows(current => current.filter((win) => win.name !== win_name))
	}

	const handleMouseUp = () => {
		setDraggedWindow("");
		setTimeout(() => {
			setForcedUpdate((current) => !current);
		}, 100);
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
		if (win_dragged !== "") {
			let win = document.getElementById(win_dragged);
			let rect = win?.getBoundingClientRect();

			// ? set pos of dragged window
			let new_windows = windows.map(win => {
				if (win.name === win_dragged) {
					return {...win, pos: {
						x: (rect?rect.x:0) + ((global.current.x - old_global.current.x)),
						y: (rect?rect.y:0) + ((global.current.y - old_global.current.y))
					}}
				}
				return win;
			}) 
			setWindows(new_windows)
		}
	}

	return (
		<div id="Desktop" className="Desktop" onMouseMove={handleMouseMove} onMouseLeave={handleMouseUp} onMouseUp={handleMouseUp}>
			<Background/>
			<AppBar opened_apps={windows.map(win => win.name)} spawnWindow={spawnWindow}/>
			<Suspense>
				{ // ? array containg window components using info kept in windows array
					windows.map((win) => {
						return <Window 
							name={win.name} key={win.key}
							pos={win.pos} z_index={win.z_index}
							unMinimized={win.unMinimized}
							dragWindow={dragWindow}
							spawnWindow={spawnWindow}
							destroyWindow={destroyWindow}
						/>;
					})
				}
			</Suspense>
		</div>
	)
}

export default Desktop;

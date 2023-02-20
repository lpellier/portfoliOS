import React, {lazy, Suspense, useEffect, useRef, useState} from 'react';
import 'styles/Window.css';
import { RED } from '../../../consts';
import { IWindow } from '../../../types';

const filesList: string[] = [
	'ft_server',
	'ft_services',
	'webserv',
	'101_C',
	'get_next_line',
	'matrix',
	'ready_set_boole',
	'minishell',
	'philosophers',
	'ft_containers',
	'ft_printf',
	'push_swap',
	'cub3d'
];

const Dice = lazy(() => import("./../Apps/Dice/Dice"));
const Cub3D = lazy(() => import("./../Apps/Cub3D/Cub3D"));
const Pong = lazy(() => import("./../Apps/Pong/Pong"));
const Folder = lazy(() => import("./../Apps/Folder/Folder"));
const AboutMe = lazy(() => import("./../Apps/AboutMe/AboutMe"));
const Settings = lazy(() => import("./../Apps/Settings/Settings"));
const PDFViewer = lazy(() => import("./../Apps/PDFViewer/PDFViewer"));
const File = lazy(() => import("./../Apps/File/File"));

const Window = ({name, pos, size, z_index, unMinimized, dragWindow, spawnWindow, destroyWindow}: IWindow) => {
	const [classes, setClasses] = useState<string>("WindowDefault WindowSpawn");
	const [forceUpdateChild, forceUpdate] = useState<boolean>(false);

	useEffect(() => {
		setClasses("WindowDefault WindowSpawn")
		setTimeout(() => {
			setClasses("WindowDefault");
			forceUpdate(current => !current);
		}, 500)
	}, [unMinimized]);

	const handleMouseDown = (event: any) => {
		dragWindow(name, event);
	}

	const handleMinimize = () => {
		setClasses("WindowDefault WindowMinimized");
	}
	const handleMaximize = () => {
		if (classes.includes("WindowMaximized")) {
			setClasses("WindowDefault WindowMaximizedReverse");
			setTimeout(() => {
				setClasses("WindowDefault");
				forceUpdate(current => !current);
			}, 500)
		}
		else {
			setClasses("WindowDefault WindowMaximized");
			setTimeout(() => {
				forceUpdate(current => !current);
			}, 500)
		}
	}
	const handleQuit = () => {
		setClasses("WindowDefault WindowQuit");
		setTimeout(() => {
			destroyWindow(name)
		}, 500)
	}

	return (
		<div onMouseDown={handleMouseDown} id={name} className={classes}
			style={{zIndex: z_index, top: pos.y, left: pos.x, width: size.x, height: size.y}}>
			<div className='window-header'>		
				<h3 className="WindowTitle">{name}</h3>
				<div className='ButtonFlex'>
					{!filesList.includes(name) && 
						<button className="WindowButton" onClick={() => handleMinimize()}>
							<svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-minimize" viewBox="0 0 24 24" strokeWidth="2" stroke={RED} fill="none" strokeLinecap="round" strokeLinejoin="round">
								<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
								<path className="minimizeButtonPath1" d="M15 19v-2a2 2 0 0 1 2 -2h2" />
								<path className="minimizeButtonPath2" d="M15 5v2a2 2 0 0 0 2 2h2" />
								<path className="minimizeButtonPath3" d="M5 15h2a2 2 0 0 1 2 2v2" />
								<path className="minimizeButtonPath4" d="M5 9h2a2 2 0 0 0 2 -2v-2" />
							</svg>
						</button>
					}
					<button className="WindowButton" onClick={() => handleMaximize()}>
						<svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-maximize" viewBox="0 0 24 24" strokeWidth="2" stroke={RED} fill="none" strokeLinecap="round" strokeLinejoin="round">
							<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
							<path className="maximizeButtonPath1" d="M4 8v-2a2 2 0 0 1 2 -2h2" />
							<path className="maximizeButtonPath2" d="M4 16v2a2 2 0 0 0 2 2h2" />
							<path className="maximizeButtonPath3" d="M16 4h2a2 2 0 0 1 2 2v2" />
							<path className="maximizeButtonPath4" d="M16 20h2a2 2 0 0 0 2 -2v-2" />
						</svg>
					</button>
					<button className="WindowButton" onClick={() => handleQuit()}>
						<svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-square-off" viewBox="0 0 24 24" strokeWidth="2" stroke={RED} fill="none" strokeLinecap="round" strokeLinejoin="round">
							<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
							<rect x="4" y="4" width="16" height="16" rx="2" ry="2" />
							<path className="quitButtonPath1" d="M 5,5 9,9"/>
							<path className="quitButtonPath2" d="M 19,19 15,15"/>
							<path className="quitButtonPath3" d="M 19,5 15,9"/>
							<path className="quitButtonPath4" d="M 5,19 9,15"/>
						</svg>
					</button>
				</div>
			</div>
			<div className='content'>
				<Suspense>
					{name === "Dice" && <Dice forcedUpdate={forceUpdateChild}/> }
					{name === "Cub3D" && <Cub3D forcedUpdate={forceUpdateChild}/> }
					{name === "Pong" && <Pong forcedUpdate={forceUpdateChild}/> }
					{name.includes("Projects") && <Folder name={name} spawnWindow={spawnWindow} size={size} forcedUpdate={forceUpdateChild}/> }
					{name === "About me" && <AboutMe forcedUpdate={forceUpdateChild}/> }
					{name === "Settings" && <Settings forcedUpdate={forceUpdateChild}/> }
					{name.includes("Subject") && <PDFViewer name={name} pdf_path={`./project_subjects/${name.substring(8)}.subject.pdf`} size={size} forcedUpdate={forceUpdateChild}/> }
					{filesList.includes(name) && <File name={name} content_path={`./project_presentations/${name}.md`} spawnWindow={spawnWindow} size={size} forcedUpdate={forceUpdateChild}/> }
				</Suspense>
			</div>
		</div>
	)
}

export default Window;

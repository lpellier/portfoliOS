import React, {FunctionComponent, lazy, ReactElement, Suspense, useCallback, useEffect, useState} from 'react';
import './Window.css';
import { RED } from '../../../globals';
import { IWindow } from '../../../types';

const filesList: string[] = [
	'ft_server',
	'ft_services',
	'101_C',
	'get_next_line',
	'matrix',
	'ready_set_boole',
	'minishell',
	'philosophers',
	'ft_printf',
	'push_swap'
];

const Dice = lazy(() => import("./../Apps/Dice/Dice"));
const Cub3D = lazy(() => import("./../Apps/Cub3D/Cub3D"));
const Pong = lazy(() => import("./../Apps/Pong/Pong"));
const Folder = lazy(() => import("./../Apps/Folder/Folder"));
const AboutMe = lazy(() => import("./../Apps/AboutMe/AboutMe"));
const Settings = lazy(() => import("./../Apps/Settings/Settings"));
const PDFViewer = lazy(() => import("./../Apps/PDFViewer/PDFViewer"));
const File = lazy(() => import("./../Apps/File/File"));

const Window: FunctionComponent<IWindow> = ({name, pos, z_index, unMinimized, dragWindow, spawnWindow, destroyWindow}): ReactElement => {
	const [classes, setClasses] = useState<string>("WindowDefault WindowSpawn")
	const [component, setComponent] = useState<ReactElement | undefined>(undefined)

	const getComponent = useCallback((win_name: string): ReactElement | undefined => {
		if (win_name === "Dice")
			return <Dice/>;
		else if (win_name === "Cub3D")
			return <Cub3D/>
		else if (win_name === "Pong")
			return <Pong/>
		else if (win_name === "Server Projects" || win_name === "C/C++ Projects")
			return <Folder name={win_name} spawnWindow={spawnWindow}/>
		else if (win_name === "About me")
			return <AboutMe/>
		else if (win_name === "Settings")
			return <Settings/>
		else if (win_name.includes("Subject ")) // ? Subject is the prefix for files opened 
			return <PDFViewer name={win_name} pdf_path={`./assets/${win_name.substring(8)}.subject.pdf`}/>
		else if (filesList.includes(win_name))
			return <File name={win_name} content_path={`./assets/${win_name}.md`} spawnWindow={spawnWindow}/>
		else {
			console.error('win name not recognized:', win_name);
			return undefined;
		}
	}, [spawnWindow]);

	useEffect(() => {
		setComponent(getComponent(name))
	}, [getComponent, name])

	useEffect(() => {
		setClasses("WindowDefault WindowSpawn")
		setTimeout(() => {
			setClasses("WindowDefault");
		}, 500)
	}, [unMinimized])
	
	const handleMouseDown = (event: any) => {
		dragWindow(name, event);
	}

	return (
		<div 
			onMouseDown={handleMouseDown}
			style={{zIndex: z_index, top: pos.y, left: pos.x}} 
			id={name} 
			className={classes}>
			<div className='content'>
				<Suspense>
					{component}
				</Suspense>
			</div>
			<h3 className="WindowTitle">{name}</h3>
			<div className='ButtonFlex'>
				{!name.includes("window-") && <button className="WindowButton" id='MinimizeButton' onClick={() => {
					if (classes.includes("WindowMaximized"))
						setClasses("WindowDefault WindowMaximizedMinimized");
					else
						setClasses("WindowDefault WindowMinimized");
				}}>
					<svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-minimize" viewBox="0 0 24 24" strokeWidth="2" stroke={RED} fill="none" strokeLinecap="round" strokeLinejoin="round">
						<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
						<path id="minimizeButtonPath1" d="M15 19v-2a2 2 0 0 1 2 -2h2" />
						<path id="minimizeButtonPath2" d="M15 5v2a2 2 0 0 0 2 2h2" />
						<path id="minimizeButtonPath3" d="M5 15h2a2 2 0 0 1 2 2v2" />
						<path id="minimizeButtonPath4" d="M5 9h2a2 2 0 0 0 2 -2v-2" />
					</svg>
				</button>}
				<button className="WindowButton" id='MaximizeButton' onClick={() => {
					if (classes.includes("WindowMaximized")) {
						setClasses("WindowDefault WindowMaximizedReverse");
						setTimeout(() => {
							setClasses("WindowDefault");
						}, 500)
					}
					else
						setClasses("WindowDefault WindowMaximized");
					}
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
					setClasses("WindowDefault WindowQuit");
					setTimeout(() => {
						destroyWindow(name)
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

export default Window;

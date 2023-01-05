import { FunctionComponent, ReactNode } from "react"
import { ReactElement } from "react-markdown/lib/react-markdown"

export interface IFile {
	name: string,
	content_path: string,
	spawnWindow: Function
}

export interface IPDFViewer {
	name: string,
	pdf_path: string
}

export interface IFolder {
	name: string,
	spawnWindow: Function
}

export interface ISketch {
}

export interface ISettings {

}

export interface IAboutMe {
	
}

export interface IPos {
	x: number,
	y: number
}

export interface IAppBar {
	opened_apps: string[];
	spawnWindow: Function;
}

// ? Type of the actual window component
export interface IWindow {
	name: string,
	key: number,
	pos: IPos,
	z_index: number,
	unMinimized: boolean,
	dragWindow: Function,
	spawnWindow: Function,
	destroyWindow: Function
}

// ? Type of the windows list in Desktop.tsx (just has info about a window)
export type IWin = Omit<IWindow, 'dragWindow' | 'spawnWindow' |'destroyWindow'>

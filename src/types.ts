export interface IFile {
	name: string,
	content_path: string,
	size: IPos,
	forcedUpdate: boolean,
	spawnWindow: Function
}

export type IAboutMe = Omit<IFile, 'spawnWindow'>;

export interface IPDFViewer {
	name: string,
	size: IPos,
	forcedUpdate: boolean,
	pdf_path: string
}

export interface IFolder {
	name: string,
	size: IPos,
	forcedUpdate: boolean
	spawnWindow: Function
}

export interface IPos {
	x: number,
	y: number
}

export interface IAppBar {
	opened_apps: string[];
	spawnWindow: Function;
}

export interface IGridTile {
	content:		number;
}

// ? Type of the actual window component
export interface IWindow {
	name: string,
	pos: IPos,
	size: IPos,
	z_index: number,
	unMinimized: boolean,
	key: number,
	dragWindow: Function,
	spawnWindow: Function,
	destroyWindow: Function
}

// ? Type of the windows list in Desktop.tsx (just has info about a window)
export type IWin = Omit<IWindow, 'dragWindow' | 'spawnWindow' |'destroyWindow'>

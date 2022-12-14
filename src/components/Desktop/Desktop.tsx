import Background from		'./Background/Background'
import AppBar from			'./AppBar/AppBar'
import Window from			'./Window/Window';
import Pong from			'./Apps/Pong/Pong'
import Spoon from			'./Apps/Spoon/Spoon'
import FolderServer from	'./Apps/FolderServer/FolderServer';
import						'./Desktop.css';
import React from			'react';

// ? Bugs
	// TODO Opened state disturbs apps placement in app bar
	// TODO In Spoon app, pressing space after maximizing windows causes weird issue
	// TODO Shouldn't register key presses and mouse cliks for apps not in focus

// ? Appearance
	// TODO Create a logo
	// ? Custom mouse pointer ?
	// TODO Cute animations for each of the icons :
		// ? Pong : should add another few hits in animation
		// ? not a fan of the about-me animation and the c++ one

// ? Functionnality
	// TODO When a window is dragged to a side, snap it to that side
	// TODO Mobile webapp
	// TODO Integrate Pong
	// TODO Folder needs a file structure
	// TODO Files need to be implemented (pdfs, readmes)
	// TODO Import my cv as a file
	// TODO Code Cub3D in javascript
	// ? Backend for pong multiplayer
	// TODO Some sort of tutorial message ?
	// TODO Settings -> modify appearance of website
		// ? Ability to change the background ?
		// ? Ability to change the color theme ?
		// ? Ability to change font-size, icon-size ?

type DesktopState = {
	windows: Map<string, {name: string, classes: string, pos: {x: number, y: number}, z_index: number, opened: boolean; scrollbar: boolean}>,
	win_dragged: string,
	global: {x: number, y: number},
	old_global: {x: number, y: number},
	mouseClass: string
}

class Desktop extends React.Component {
	state : DesktopState = {
		windows: new Map<string, {name: string, classes: string, pos: {x: number, y: number}, z_index: number, opened: boolean; scrollbar: boolean}>(),
		win_dragged: "",
		global: {x: 0, y: 0},
		old_global: {x: 0, y: 0},
		mouseClass: "default"
	}

	componentDidMount(): void {
		let wins = this.state.windows;
		wins.set("Server Projects", {name: "Server Projects", classes: "WindowDefault", pos: {x: 0, y: 0}, z_index: 0, opened: false, scrollbar: true});
		wins.set("C++ Projects", {name: "C++ Projects", classes: "WindowDefault", pos: {x: 0, y: 0}, z_index: 0, opened: false, scrollbar: true});
		wins.set("Spoon", {name: "Spoon", classes: "WindowDefault", pos: {x: 0, y: 0}, z_index: 0, opened: false, scrollbar: false});
		wins.set("Cub3D", {name: "Cub3D", classes: "WindowDefault", pos: {x: 0, y: 0}, z_index: 0, opened: false, scrollbar: false});
		wins.set("Pong", {name: "Pong", classes: "WindowDefault", pos: {x: 0, y: 0}, z_index: 0, opened: false, scrollbar: false});
		wins.set("About me", {name: "About me", classes: "WindowDefault", pos: {x: 0, y: 0}, z_index: 0, opened: false, scrollbar: true});
		wins.set("Settings", {name: "Settings", classes: "WindowDefault", pos: {x: 0, y: 0}, z_index: 0, opened: false, scrollbar: true});
	}

	putWindowFront(win_name: string, dragged: boolean, event: any) {
		let wins = this.state.windows;
		let win_info = wins.get(win_name);
		if (!win_info)
			return;
		for (let value of wins.values()) {
			if (value.z_index > win_info.z_index)
				value.z_index--;
		}
		win_info.z_index = this.getLastZIndex();
		wins.set(win_name, win_info);
		this.setState({windows: wins});

		if (dragged) {
			let win = document.getElementById(win_info.name);
			let rect = win?.getBoundingClientRect();
			if (!rect)
				return ;
			
			if (!(event.clientY / rect.bottom >= 0.9 && event.clientX / rect.right >= 0.9))
				this.setState({win_dragged: win_name});
		}
	}

	getLastZIndex() {
		let count = 1;
		for (let value of this.state.windows.values()) {
			if (value.opened === true)
				count++;
		}
		return count;
	}

	setClasses(win_name: string, classes: string) {
		let wins_cpy = this.state.windows;
		let win_info = wins_cpy.get(win_name);
		if (win_info) {
			win_info.classes = classes;
			wins_cpy.set(win_name, win_info);
			this.setState({windows: wins_cpy});
		}
	}

	spawnWindow(win_name : string) : void {
		let wins_cpy = this.state.windows;
		let win_info = wins_cpy.get(win_name);
		if (document.getElementById(win_name) && win_info) {
			if (win_info.classes.includes("Minimized"))
				win_info.classes = "WindowDefault WindowSpawn"
			else
				win_info.classes = "WindowDefault"
				
			wins_cpy.set(win_name, win_info);
			this.setState({
				windows: wins_cpy
			})
			this.putWindowFront(win_name, false, null)
		}
		else if (win_info) {
			win_info.opened = true;
			win_info.z_index = this.getLastZIndex();
			win_info.pos = {
				x: window.innerWidth / 2 - 300,
				y: window.innerHeight / 2 - 200
			}
			wins_cpy.set(win_name, win_info);
			this.setState({
				windows: wins_cpy
			})
		}
	}

	destroyWindow(win_name: string): void {
		if (document.getElementById(win_name)) {
			let wins_cpy = this.state.windows;
			let win_info = wins_cpy.get(win_name);
			if (win_info) {
				win_info.opened = false;
				win_info.z_index = 0;
				wins_cpy.set(win_name, win_info);
			}
			this.setState({
				windows: wins_cpy,
			})
		}
	}

	handleMouseUp() {
		this.setState({win_dragged: ""})
	}

	handleMouseMove(event: any) {
		this.setState({
			old_global: {
				x: this.state.global.x,
				y: this.state.global.y	
			},
			global: {
				x: event.clientX,
				y: event.clientY
			}
		});
		if (this.state.win_dragged !== "") {
			let win = document.getElementById(this.state.win_dragged);
			let rect = win?.getBoundingClientRect();

			let wins = this.state.windows;
			let win_info = wins.get(this.state.win_dragged);
			if (!win_info)
				return;
			win_info.pos = {
				x: (rect?rect.x:0) + ((this.state.global.x - this.state.old_global.x)),
				y: (rect?rect.y:0) + ((this.state.global.y - this.state.old_global.y))
			}
		}
	}

	render() {
		let server_projects = this.state.windows.get("Server Projects");
		let cpp_projects = this.state.windows.get("C++ Projects");
		let spoon = this.state.windows.get("Spoon");
		let cub3d = this.state.windows.get("Cub3D");
		let pong = this.state.windows.get("Pong");
		let about_me = this.state.windows.get("About me");
		let settings = this.state.windows.get("Settings");
		
		return (
			<div id="Desktop" className={"Desktop " + this.state.mouseClass} onMouseMove={this.handleMouseMove.bind(this)} onMouseLeave={this.handleMouseUp.bind(this)} onMouseUp={this.handleMouseUp.bind(this)}>
				<Background/>
				<AppBar appState={this.state.windows} spawnWindow={this.spawnWindow.bind(this)}/>
				<div className='windows'>
					{server_projects?.opened && 
						<Window key={1} component={FolderServer} id={1} // ?
						putWindowFront={this.putWindowFront.bind(this)}
						destroyWindow={this.destroyWindow.bind(this)}
						setClasses={this.setClasses.bind(this)}
						info={server_projects}/>}
					{cpp_projects?.opened && 
						<Window key={2} component={FolderServer} id={2} // ?
						putWindowFront={this.putWindowFront.bind(this)}
						destroyWindow={this.destroyWindow.bind(this)}
						setClasses={this.setClasses.bind(this)}
						info={cpp_projects}/>}
					{spoon?.opened && 
						<Window key={3} component={Spoon} id={3} // ?
						putWindowFront={this.putWindowFront.bind(this)}
						destroyWindow={this.destroyWindow.bind(this)}
						setClasses={this.setClasses.bind(this)}
						info={spoon}/>}
					{cub3d?.opened && 
						<Window key={4} component={FolderServer} id={4} // ?
						putWindowFront={this.putWindowFront.bind(this)}
						destroyWindow={this.destroyWindow.bind(this)}
						setClasses={this.setClasses.bind(this)}
						info={cub3d}/>}
					{pong?.opened && 
						<Window key={5} component={Pong} id={5} // ?
						putWindowFront={this.putWindowFront.bind(this)}
						destroyWindow={this.destroyWindow.bind(this)}
						setClasses={this.setClasses.bind(this)}
						info={pong}/>}
					{about_me?.opened && 
						<Window key={6} component={FolderServer} id={6} // ?
						putWindowFront={this.putWindowFront.bind(this)}
						destroyWindow={this.destroyWindow.bind(this)}
						setClasses={this.setClasses.bind(this)}
						info={about_me}/>}
					{settings?.opened && 
						<Window key={7} component={FolderServer} id={7} // ?
						putWindowFront={this.putWindowFront.bind(this)}
						destroyWindow={this.destroyWindow.bind(this)}
						setClasses={this.setClasses.bind(this)}
						info={settings}/>}
				</div>
			</div>
		)
	}
}

export default Desktop;

import React from 'react';
import './Desktop.css';
import Background from './Background/Background'
import AppBar from './AppBar/AppBar'
import Window from './Window/Window';
import Pong from './Apps/Pong/Pong'

function checkSpaceAroundPoint(point: {x: number, y: number}, check: {x: number, y: number}, diameter: number) : boolean {
	console.log(point, check)
	if (check.x <= point.x + diameter && check.x >= point.x - diameter &&
		check.y <= point.y + diameter && check.y >= point.y - diameter)
		return true;
	return false;
}

type DesktopState = {
	windows: Map<string, {name: string, pos: {x: number, y: number}, z_index: number, opened: boolean; scrollbar: boolean}>,
	win_dragged: string,
	global: {x: number, y: number},
	old_global: {x: number, y: number},
	mouseClass: string
}

class Desktop extends React.Component {
	state : DesktopState = {
		windows: new Map<string, {name: string, pos: {x: number, y: number}, z_index: number, opened: boolean; scrollbar: boolean}>(),
		win_dragged: "",
		global: {x: 0, y: 0},
		old_global: {x: 0, y: 0},
		mouseClass: "default"
	}

	componentDidMount(): void {
		let wins = this.state.windows;
		wins.set("Server Projects", {name: "Server Projects", pos: {x: 0, y: 0}, z_index: 0, opened: false, scrollbar: true});
		wins.set("C++ Projects", {name: "C++ Projects", pos: {x: 0, y: 0}, z_index: 0, opened: false, scrollbar: true});
		wins.set("Terminal", {name: "Terminal", pos: {x: 0, y: 0}, z_index: 0, opened: false, scrollbar: false});
		wins.set("Cub3D", {name: "Cub3D", pos: {x: 0, y: 0}, z_index: 0, opened: false, scrollbar: false});
		wins.set("Pong", {name: "Pong", pos: {x: 0, y: 0}, z_index: 0, opened: false, scrollbar: false});
		wins.set("About me", {name: "About me", pos: {x: 0, y: 0}, z_index: 0, opened: false, scrollbar: true});
		wins.set("Settings", {name: "Settings", pos: {x: 0, y: 0}, z_index: 0, opened: false, scrollbar: true});
	}

	putWindowFront(win_name: string, dragged: boolean) {
		let wins = this.state.windows;
		let win_info = wins.get(win_name);
		if (!win_info)
			return;
		// @ts-ignore: next-line
		for (let value of wins.values()) {
			if (value.z_index > win_info.z_index)
				value.z_index--;
		}
		win_info.z_index = this.getLastZIndex();
		wins.set(win_name, win_info);
		this.setState({windows: wins});
		if (dragged)
			this.setState({win_dragged: win_name});
	}

	getLastZIndex() {
		let count = 1;
		// @ts-ignore: next-line
		for (let value of this.state.windows.values()) {
			if (value.opened === true)
				count++;
		}
		return count;
	}

	spawnWindow(win_name : string) : void {
		if (document.getElementById(win_name)) {
			this.putWindowFront(win_name, false)
			return ;
		}
		let wins_cpy = this.state.windows;
		let win_info = wins_cpy.get(win_name);
		if (win_info) {
			win_info.opened = true;
			win_info.z_index = this.getLastZIndex();
			wins_cpy.set(win_name, win_info);
		}
		this.setState({
			windows: wins_cpy
		})
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
				x: event.screenX,
				y: event.screenY
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

	handleCheckResize(event: any) {
		let mouse_pos = {x: event.clientX, y: event.clientY};
		console.log("mouse over")
		for (let values of this.state.windows.values()) {
			if (values.opened) {
				let win = document.getElementById(values.name);
				let rect = win?.getBoundingClientRect();
				if (!rect)
					return ;
				if (checkSpaceAroundPoint({x: rect.x, y: rect.y}, mouse_pos, 15)) {
					this.setState({mouseClass: "nw-resize"})
				}
				else {
					this.setState({mouseClass: "default"})	
				}
			}
		}
	}

	render() {
		let server_projects = this.state.windows.get("Server Projects");
		let cpp_projects = this.state.windows.get("C++ Projects");
		let terminal = this.state.windows.get("Terminal");
		let cub3d = this.state.windows.get("Cub3D");
		let pong = this.state.windows.get("Pong");
		let about_me = this.state.windows.get("About me");
		let settings = this.state.windows.get("Settings");
	
		return (
			<div id="Desktop" className={"Desktop " + this.state.mouseClass} onMouseOver={this.handleCheckResize.bind(this)} onMouseMove={this.handleMouseMove.bind(this)} onMouseLeave={this.handleMouseUp.bind(this)} onMouseUp={this.handleMouseUp.bind(this)}>
				<Background/>
				<AppBar appState={this.state.windows} spawnWindow={this.spawnWindow.bind(this)}/>
				<div className='windows'>
					{server_projects?.opened && 
						<Window key={1} component={Pong} // ?
						putWindowFront={this.putWindowFront.bind(this)}
						destroyWindow={this.destroyWindow.bind(this)}
						info={server_projects}/>}
					{cpp_projects?.opened && 
						<Window key={2} component={Pong} // ?
						putWindowFront={this.putWindowFront.bind(this)}
						destroyWindow={this.destroyWindow.bind(this)}
						info={cpp_projects}/>}
					{terminal?.opened && 
						<Window key={3} component={Pong} // ?
						putWindowFront={this.putWindowFront.bind(this)}
						destroyWindow={this.destroyWindow.bind(this)}
						info={terminal}/>}
					{cub3d?.opened && 
						<Window key={4} component={Pong} // ?
						putWindowFront={this.putWindowFront.bind(this)}
						destroyWindow={this.destroyWindow.bind(this)}
						info={cub3d}/>}
					{pong?.opened && 
						<Window key={5} component={Pong} // ?
						putWindowFront={this.putWindowFront.bind(this)}
						destroyWindow={this.destroyWindow.bind(this)}
						info={pong}/>}
					{about_me?.opened && 
						<Window key={6} component={Pong} // ?
						putWindowFront={this.putWindowFront.bind(this)}
						destroyWindow={this.destroyWindow.bind(this)}
						info={about_me}/>}
					{settings?.opened && 
						<Window key={7} component={Pong} // ?
						putWindowFront={this.putWindowFront.bind(this)}
						destroyWindow={this.destroyWindow.bind(this)}
						info={settings}/>}
				</div>
			</div>
		)
	}
}

export default Desktop;

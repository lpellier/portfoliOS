import React from 'react';
import './AppBar.css';

class AppBar extends React.Component<{appState: any, spawnWindow: any}> {	
	componentDidMount(): void {
	}

	render() {
		let wins = this.props.appState;
		let server_projects = wins.get("Server Projects");
		let cpp_projects = wins.get("C++ Projects");
		let terminal = wins.get("Terminal");
		let cub3d = wins.get("Cub3D");
		let pong = wins.get("Pong");
		let about_me = wins.get("About me");
		let settings = wins.get("Settings");

		return (
			<div className="AppBar">
				<div>
					<img draggable={false} src={"./images/server_folder.png"} alt="" onClick={() => this.props.spawnWindow("Server Projects")} 
					className="App" id="server_projects"/>
					{server_projects?.opened && <div className='OpenedState'/>}
					<h3 className='InfoText'>Server Projects</h3>
				</div>
				<div>
					<img draggable={false} src={"./images/cpp_folder.png"} alt="" onClick={() => this.props.spawnWindow("C++ Projects")} 
					className="App" id="cpp_projects"/>
					{cpp_projects?.opened && <div className='OpenedState'/>}
					<h3 className='InfoText'>C++ Projects</h3>
				</div>
				<div>
					<img draggable={false} src={"./images/terminal-icon.png"} alt="" onClick={() => this.props.spawnWindow("Terminal")} 
					className="App" id="terminal"/>
					{terminal?.opened && <div className='OpenedState'/>}
					<h3 className='InfoText'>Terminal</h3>
				</div>
				<div>
					<img draggable={false} src={"./images/wolfenstein.png"} alt="" onClick={() => this.props.spawnWindow("Cub3D")} 
					className="App" id="cub3d"/>
					{cub3d?.opened && <div className='OpenedState'/>}
					<h3 className='InfoText'>Cub3D</h3>
				</div>
				<div>
					<img draggable={false} src={"./images/pong_icon.png"} alt="" onClick={() => this.props.spawnWindow("Pong")} 
					className="App" id="pong"/>
					{pong?.opened && <div className='OpenedState'/>}
					<h3 className='InfoText'>Pong</h3>
				</div>
				<div>
					<img draggable={false} src={"./images/info.png"} alt="" onClick={() => this.props.spawnWindow("About me")} 
					className="App" id="info"/>
					{about_me?.opened && <div className='OpenedState'/>}
					<h3 className='InfoText'>About me</h3>
				</div>
				<div>
					<img draggable={false} src={"./images/settings-icon.png"} alt="" onClick={() => this.props.spawnWindow("Settings")} 
					className="App" id="settings"/>
					{settings?.opened && <div className='OpenedState'/>}
					<h3 className='InfoText'>Settings</h3>
				</div>
			</div>
		)
	}
}

export default AppBar;

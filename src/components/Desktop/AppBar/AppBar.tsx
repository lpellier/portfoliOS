import React from 'react';
import './AppBar.css';

class AppBar extends React.Component<{appState: any, spawnWindow: any}> {	
	componentDidMount(): void {
	}

	render() {
		return (
			<div className="AppBar">
				<div>
					<img draggable={false} src={"./images/server_folder.png"} alt="" onClick={() => this.props.spawnWindow("Server Projects")} 
					className="App" id="server_projects"/>
					{this.props.appState.get("Server Projects") && <div className='OpenedState'/>}
					<h3 className='InfoText'>Server Projects</h3>
				</div>
				<div>
					<img draggable={false} src={"./images/cpp_folder.png"} alt="" onClick={() => this.props.spawnWindow("C++ Projects")} 
					className="App" id="cpp_projects"/>
					{this.props.appState.get("C++ Projects") && <div className='OpenedState'/>}
					<h3 className='InfoText'>C++ Projects</h3>
				</div>
				<div>
					<img draggable={false} src={"./images/terminal-icon.png"} alt="" onClick={() => this.props.spawnWindow("Terminal")} 
					className="App" id="terminal"/>
					{this.props.appState.get("Terminal") && <div className='OpenedState'/>}
					<h3 className='InfoText'>Terminal</h3>
				</div>
				<div>
					<img draggable={false} src={"./images/wolfenstein.png"} alt="" onClick={() => this.props.spawnWindow("Cub3D")} 
					className="App" id="cub3d"/>
					{this.props.appState.get("Cub3D") && <div className='OpenedState'/>}
					<h3 className='InfoText'>Cub3D</h3>
				</div>
				<div>
					<img draggable={false} src={"./images/pong_icon.png"} alt="" onClick={() => this.props.spawnWindow("Pong")} 
					className="App" id="pong"/>
					{this.props.appState.get("Pong") && <div className='OpenedState'/>}
					<h3 className='InfoText'>Pong</h3>
				</div>
				<div>
					<img draggable={false} src={"./images/info.png"} alt="" onClick={() => this.props.spawnWindow("About me")} 
					className="App" id="info"/>
					{this.props.appState.get("About me") && <div className='OpenedState'/>}
					<h3 className='InfoText'>About me</h3>
				</div>
				<div>
					<img draggable={false} src={"./images/settings-icon.png"} alt="" onClick={() => this.props.spawnWindow("Settings")} 
					className="App" id="settings"/>
					{this.props.appState.get("Settings") && <div className='OpenedState'/>}
					<h3 className='InfoText'>Settings</h3>
				</div>
			</div>
		)
	}
}

export default AppBar;

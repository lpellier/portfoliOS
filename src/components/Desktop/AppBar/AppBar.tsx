import React from 'react';
import './AppBar.css';

class AppBar extends React.Component<{appState: any, spawnWindow: any}> {	
	componentDidMount(): void {
	}

	render() {
		return (
			<div className="AppBar">
				<div>
					<img src={"./images/server_folder.png"} alt="" onClick={() => this.props.spawnWindow("Server Projects")} 
					className="App" id="server_projects"/>
					{this.props.appState.get("Server Projects") && <div className='OpenedState'/>}
					<h3 className='InfoText'>Server Projects</h3>
				</div>
				<div>
					<img src={"./images/pong_icon.png"} alt="" onClick={() => this.props.spawnWindow("Pong")} 
					className="App" id="pong"/>
					{this.props.appState.get("Pong") && <div className='OpenedState'/>}
					<h3 className='InfoText'>Pong</h3>
				</div>
				<div>
					<img src={"./images/cpp_folder.png"} alt="" onClick={() => this.props.spawnWindow("C++ Projects")} 
					className="App" id="cpp_projects"/>
					{this.props.appState.get("C++ Projects") && <div className='OpenedState'/>}
					<h3 className='InfoText'>C++ Projects</h3>
				</div>
				{/* <img alt="" className="App" id="cpp_projects"/>
				<img alt="" className="App" id="cub3d"/>
				<img alt="" className="App" id="terminal"/>
				<img alt="" className="App" id="about_me"/>
				<img alt="" className="App" id="settings"/> */}
			</div>
		)
	}
}

export default AppBar;

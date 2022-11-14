import React from 'react';
import './AppBar.css';

class AppBar extends React.Component {
	componentDidMount(): void {
	}

	render() {
		return (
			<div className="AppBar">
				<img src={"./images/server_folder.png"} alt="" className="App" id="server_projects"/>
				{/* <img alt="" className="App" id="cpp_projects"/>
				<img alt="" className="App" id="pong"/>
				<img alt="" className="App" id="cub3d"/>
				<img alt="" className="App" id="terminal"/>
				<img alt="" className="App" id="about_me"/>
				<img alt="" className="App" id="settings"/> */}
			</div>
		)
	}
}

export default AppBar;

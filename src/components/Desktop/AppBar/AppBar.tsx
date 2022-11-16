import React from 'react';
import './AppBar.css';

class AppBar extends React.Component<{spawnWindow: any}> {

	state = {
		opened_server_folder: false
	}
	
	componentDidMount(): void {
	}

	render() {
		return (
			<div className="AppBar">
				<div>
					<img src={"./images/server_folder.png"} alt="" onClick={() => {
						this.props.spawnWindow("server_folder"); 
						this.setState({opened_server_folder : true})}
					} className="App" id="server_projects"/>
					<h3 className='InfoText'>Server Projects</h3>
					{this.state.opened_server_folder && <div className='OpenedState'/>}
				</div>
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

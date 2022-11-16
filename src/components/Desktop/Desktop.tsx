import React from 'react';
import './Desktop.css';
import Background from './Background/Background'
import AppBar from './AppBar/AppBar'
import Window from './Window/Window';

type DesktopState = {
	window_count: number;
	windows: any[];
}

class Desktop extends React.Component {
	state : DesktopState = {
		window_count: 0,
		windows: []
	}

	componentDidMount(): void {
	}

	spawnWindow(win_name : string) : void {
		if (document.getElementById(win_name))
			return ;
		this.setState({
			windows: [...this.state.windows, (<Window key={this.state.window_count} win_name={win_name} z_index={this.state.window_count + 2}/>)],
			window_count: this.state.window_count + 1
		})
	}

	render() {
		return (
			<div id="Desktop" className="Desktop">
				<Background/>
				<AppBar spawnWindow={this.spawnWindow.bind(this)}/>
				<div className='windows'>
					{this.state.windows}
				</div>
			</div>
		)
	}
}

export default Desktop;

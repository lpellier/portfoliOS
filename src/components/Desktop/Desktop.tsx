import React from 'react';
import './Desktop.css';
import Background from './Background/Background'
import AppBar from './AppBar/AppBar'
import Window from './Window/Window';

// TODO
// ? Folder structure
// ? Other apps
// ? When window is selected, puts every window down to their original z-index

type DesktopState = {
	window_count: number;
	windows: any[];
	open_apps: Map<string, boolean>
}

class Desktop extends React.Component {
	state : DesktopState = {
		window_count: 0,
		windows: [],
		open_apps: new Map<string, boolean>([["Server Projects", false]])
	}

	componentDidMount(): void {
	}

	getLastZIndex(): number {
		
		return this.state.window_count + 1;
	}

	spawnWindow(win_name : string) : void {
		if (document.getElementById(win_name))
			return ;
		let open_apps_cpy = this.state.open_apps;
		open_apps_cpy.set(win_name, true);
		this.setState({
			windows: [...this.state.windows, (<Window key={this.state.window_count} getLastZIndex={this.getLastZIndex.bind(this)} win_name={win_name} z_index={this.state.window_count + 2} destroyWindow={this.destroyWindow.bind(this)}/>)],
			window_count: this.state.window_count + 1,
			open_apps: open_apps_cpy
		})
	}

	destroyWindow(win_name: string): void {
		if (document.getElementById(win_name)) {
			for (let win of this.state.windows) {
				if (win.props.win_name === win_name) {
					let open_apps_cpy = this.state.open_apps;
					open_apps_cpy.set(win_name, false);
					let cpy = this.state.windows;
					cpy.splice(cpy.indexOf(win), 1);
					this.setState({windows: cpy, open_apps: open_apps_cpy, window_count: this.state.window_count - 1});
				}
			}
		}
	}

	render() {
		return (
			<div id="Desktop" className="Desktop">
				<Background/>
				<AppBar appState={this.state.open_apps} spawnWindow={this.spawnWindow.bind(this)}/>
				<div className='windows'>
					{this.state.windows}
				</div>
			</div>
		)
	}
}

export default Desktop;

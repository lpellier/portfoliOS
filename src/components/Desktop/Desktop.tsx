import React from 'react';
import './Desktop.css';
import Background from './Background/Background'
import AppBar from './AppBar/AppBar'
import Window from './Window/Window';

type DesktopState = {
	window_count: number;
	key: number,
	windows: any[],
	refs: any[],
	z_indexes: string[],
	open_apps: Map<string, boolean>
}

class Desktop extends React.Component {
	state : DesktopState = {
		window_count: 0,
		key: 0,
		windows: [],
		refs: [],
		z_indexes: [],
		open_apps: new Map<string, boolean>([["Server Projects", false]]),
	}

	getLastZIndex(win_name: string) {
		let z_indexes_cpy = this.state.z_indexes;
		for (let index of z_indexes_cpy) {
			if (index === win_name) {
				z_indexes_cpy.splice(z_indexes_cpy.indexOf(index), 1);
				z_indexes_cpy.push(win_name);
			}
		}
		this.setState({z_indexes: z_indexes_cpy})
		for (let ref of this.state.refs) {
			ref.ref.current?.resetZIndex(z_indexes_cpy.indexOf(ref.name) + 1);
		}
	}

	spawnWindow(win_name : string) : void {
		if (document.getElementById(win_name)) {
			this.getLastZIndex(win_name)
			return ;
		}
		let open_apps_cpy = this.state.open_apps;
		open_apps_cpy.set(win_name, true);
		let refs_cpy = this.state.refs;
		refs_cpy.push({name: win_name, ref: React.createRef()});
		let z_indexes_cpy = this.state.z_indexes;
		z_indexes_cpy.push(win_name);
		this.setState({
			refs: refs_cpy,
			z_indexes: z_indexes_cpy
		})
		this.setState({
			windows: [...this.state.windows, (<Window ref={this.state.refs[this.state.window_count].ref} key={this.state.key} getLastZIndex={this.getLastZIndex.bind(this)} win_name={win_name} z_index={this.state.window_count} destroyWindow={this.destroyWindow.bind(this)}/>)],
			window_count: this.state.window_count + 1,
			open_apps: open_apps_cpy,
			key: this.state.key + 1
		})
	}

	destroyWindow(win_name: string): void {
		if (document.getElementById(win_name)) {
			for (let win of this.state.windows) {
				if (win.props.win_name === win_name) {
					let open_apps_cpy = this.state.open_apps;
					open_apps_cpy.set(win_name, false);
					let win_cpy = this.state.windows;
					win_cpy.splice(win_cpy.indexOf(win), 1);
					let refs_cpy = this.state.refs;
					refs_cpy.splice(win_cpy.indexOf(win), 1);
					let z_indexes_cpy = this.state.z_indexes;
					z_indexes_cpy.splice(win_cpy.indexOf(win), 1);
					this.setState({z_indexes: z_indexes_cpy, refs: refs_cpy, windows: win_cpy, open_apps: open_apps_cpy, window_count: this.state.window_count - 1});
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

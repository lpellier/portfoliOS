import React from 'react';
import './Window.css';

// TODO 
// ? Quit animation
// ? Spawn Window next to App location on app bar
// ? Selected window comes on top

class Window extends React.Component<{getLastZIndex: any, win_name : string, z_index: number, destroyWindow: any}> {
	state = {
		pos: {
			x: 35 * this.props.z_index,
			y: 35 * this.props.z_index
		},
		global: {
			x: 0,
			y: 0
		},
		old_global: {
			x: 0,
			y: 0
		},
		dragging: false,
		maximized: false,
		maximized_once: false,
		width: "70vw",
		height: "50vh",
		z_index: this.props.z_index
	}

	handleMouseDown() {
		this.setState({
			dragging: true, 
			old_global: {
				x: 0,
				y: 0
			},
			global: {
				x: 0,
				y: 0
			},
			z_index: this.props.getLastZIndex()
		})
	}

	handleMouseUp() {
		this.setState({dragging: false})
	}

	handleWinMove(event : any) {
		if (this.state.dragging) {
			let win = document.getElementById(this.props.win_name);
			let rect = win?.getBoundingClientRect();
			this.setState({
				old_global: {
					x: this.state.global.x,
					y: this.state.global.y	
				},
				global: {
					x: event.screenX,
					y: event.screenY
				}, 
				pos: {
					x: (rect?rect.x:0) + ((this.state.global.x - this.state.old_global.x) > 100 ? 0 : (this.state.global.x - this.state.old_global.x)),
					y: (rect?rect.y:0) + ((this.state.global.y - this.state.old_global.y) > 100 ? 0 : (this.state.global.y - this.state.old_global.y))
				}
			})
		}
	}
		
		render() {
			// this.setState({z_index: this.props.z_index})
			let window_classes = "WindowDefault";
			if (!this.state.maximized_once)
				window_classes += " WindowSpawn";
			else if (this.state.maximized)
				window_classes += " WindowMaximized";
			else if (!this.state.maximized)
				window_classes += " WindowMaximizedReverse";
			return (
			<div onMouseLeave={this.handleMouseUp.bind(this)} 
				onMouseDown={this.handleMouseDown.bind(this)} 
				onMouseUp={this.handleMouseUp.bind(this)} 
				onMouseMove={this.handleWinMove.bind(this)} 
				style={{zIndex: this.state.z_index, top: this.state.pos.y, left: this.state.pos.x, width: this.state.width, height: this.state.height}} 
				id={this.props.win_name} 
				className={window_classes}>
				<h3 className="WindowTitle">{this.props.win_name}</h3>
				<div className='ButtonFlex'>
					<button className="WindowButton" id='MinimizeButton'/>
					<button className="WindowButton" id='MaximizeButton' onClick={() => this.setState({maximized_once: true, maximized: !this.state.maximized})}/>
					<button className="WindowButton" id='QuitButton' onClick={() => this.props.destroyWindow(this.props.win_name)}/>
				</div>
			</div>
		)
	}
}

export default Window;

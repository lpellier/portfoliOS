import React from 'react';
import { Scrollbar } from 'react-scrollbars-custom';
// import README from "./README.md"
import './Window.css';

// ! https://www.copycat.dev/blog/react-markdown/

class Window extends React.Component<{component: any, putWindowFront: any, destroyWindow: any, info: {name: string, pos: {x: number, y: number}, width: number, height: number, z_index: number, opened: boolean; scrollbar: boolean}}> {
	state = {
		maximized: false,
		maximized_once: false,
		minimized: false,
		quit: false,
		width: 0,
		height: 0,
		info: ""
	}

	componentDidMount(): void {
		// window.addEventListener('resize', this.updateWindowDimensions)
		// fetch(README).then((response) => response.text()).then((text) => {
		// 	this.setState({info: text});
		// })
		let win = document.getElementById(this.props.info.name);
		let rect = win?.getBoundingClientRect();
		this.setState({
			width: rect?.width,
			height: rect?.height
		})
	}

	componentWillUnmount(): void {
		// window.removeEventListener('resize', this.updateWindowDimensions)
	}

	resetZIndex(new_index: number): void {
		this.setState({z_index: new_index, minimized: false})
	}

	handleMouseDown(event: any) {
		this.props.putWindowFront(this.props.info.name, true, event);
	}

	render() {
		let window_classes = "WindowDefault";
		if (this.state.quit)
			window_classes += " WindowQuit";
		else if (this.state.minimized)
			window_classes += " WindowMinimized";
		else if (!this.state.maximized_once)
			window_classes += " WindowSpawn";
		else if (this.state.maximized)
			window_classes += " WindowMaximized";
		else if (!this.state.maximized)
			window_classes += " WindowMaximizedReverse";

		return (
			<div 
				onMouseDown={this.handleMouseDown.bind(this)}
				style={{zIndex: this.props.info.z_index, top: this.props.info.pos.y, left: this.props.info.pos.x}} 
				id={this.props.info.name} 
				className={window_classes}>
				<h3 className="WindowTitle">{this.props.info.name}</h3>
				<div className='ButtonFlex'>
					<button className="WindowButton" id='MinimizeButton' onClick={() => {
						this.setState({minimized: true})
					}}/>
					<button className="WindowButton" id='MaximizeButton' onClick={() => {
						this.setState({maximized_once: true, maximized: !this.state.maximized}); 
						this.props.putWindowFront(this.props.info.name);}
					}/>
					<button className="WindowButton" id='QuitButton' onClick={() => {
						this.setState({quit: true})
						setTimeout(() => {
							this.props.destroyWindow(this.props.info.name)
						}, 200)
					}}/>
				</div>
				<div className='content'>
					{this.props.info.scrollbar && 
						<Scrollbar className='Scrollbar' style={{ width: this.state.width * 0.9, height: this.state.height * 0.8 }}>
							<this.props.component width={this.state.width * 0.9} height={this.state.height * 0.8}/>
						</Scrollbar>}
					{!this.props.info.scrollbar &&
						<this.props.component width={this.state.width * 0.9} height={this.state.height * 0.8}/>
					}
					
				</div>
			</div>
		)
	}
}

export default Window;

import React from 'react';
import { Scrollbar } from 'react-scrollbars-custom';
// import README from "./README.md"
import './Window.css';

// ! https://www.copycat.dev/blog/react-markdown/

class Window extends React.Component<{component: any, id: number, putWindowFront: any, destroyWindow: any, info: {name: string, pos: {x: number, y: number}, z_index: number, opened: boolean; scrollbar: boolean}}> {
	state = {
		maximized: false,
		maximized_once: false,
		minimized: false,
		quit: false
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

		let width = document.getElementById(this.props.info.name)?.clientWidth;
		let height = document.getElementById(this.props.info.name)?.clientHeight;

		return (
			<div 
				onMouseDown={this.handleMouseDown.bind(this)}
				style={{zIndex: this.props.info.z_index, top: this.props.info.pos.y, left: this.props.info.pos.x}} 
				id={this.props.info.name} 
				className={window_classes}>
				<div className='content'>
					{this.props.info.scrollbar && 
						<Scrollbar className='Scrollbar' style={{ width: width ? width : 600, height: height? height - 40 : 400}}>
							<this.props.component width={width ? width : 600} height={height? height - 40 : 400}/>
						</Scrollbar>}
					{!this.props.info.scrollbar &&
						<this.props.component id={this.props.id} width={width ? width : 600} height={height? height : 400}/>
					}
				</div>
				<h3 className="WindowTitle">{this.props.info.name}</h3>
				<div className='ButtonFlex'>
					<button className="WindowButton" id='MinimizeButton' onClick={() => {this.setState({minimized: true})}}>
						<svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-minimize" viewBox="0 0 24 24" strokeWidth="2" stroke="#F4615A" fill="none" strokeLinecap="round" strokeLinejoin="round">
							<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
							<path id="minimizeButtonPath1" d="M15 19v-2a2 2 0 0 1 2 -2h2" />
							<path id="minimizeButtonPath2" d="M15 5v2a2 2 0 0 0 2 2h2" />
							<path id="minimizeButtonPath3" d="M5 15h2a2 2 0 0 1 2 2v2" />
							<path id="minimizeButtonPath4" d="M5 9h2a2 2 0 0 0 2 -2v-2" />
						</svg>
					</button>
					<button className="WindowButton" id='MaximizeButton' onClick={() => {
						this.setState({maximized_once: true, maximized: !this.state.maximized}); 
						this.props.putWindowFront(this.props.info.name);}
					}>
						<svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-maximize" viewBox="0 0 24 24" strokeWidth="2" stroke="#F4615A" fill="none" strokeLinecap="round" strokeLinejoin="round">
							<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
							<path id="maximizeButtonPath1" d="M4 8v-2a2 2 0 0 1 2 -2h2" />
							<path id="maximizeButtonPath2" d="M4 16v2a2 2 0 0 0 2 2h2" />
							<path id="maximizeButtonPath3" d="M16 4h2a2 2 0 0 1 2 2v2" />
							<path id="maximizeButtonPath4" d="M16 20h2a2 2 0 0 0 2 -2v-2" />
						</svg>
					</button>
					<button className="WindowButton" id='QuitButton' onClick={() => {
						this.setState({quit: true})
						setTimeout(() => {
							this.props.destroyWindow(this.props.info.name)
						}, 200)
					}}>
						<svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-square-off" viewBox="0 0 24 24" strokeWidth="2" stroke="#F4615A" fill="none" strokeLinecap="round" strokeLinejoin="round">
							<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
							<rect x="4" y="4" width="16" height="16" rx="2" ry="2" />
							{/* <path id="quitButtonPath1" d="M4,4 H16 A4,4 0 0 1 20,8 V20" />
							<path id="quitButtonPath2" d="M4,4 V16 A4,4 0 0 0 8,20 H20" /> */}
							<path id="quitButtonPath1" d="M 5,5 9,9"/>
							<path id="quitButtonPath2" d="M 19,19 15,15"/>
							<path id="quitButtonPath3" d="M 19,5 15,9"/>
							<path id="quitButtonPath4" d="M 5,19 9,15"/>
						</svg>
					</button>
				</div>
			</div>
		)
	}
}

export default Window;

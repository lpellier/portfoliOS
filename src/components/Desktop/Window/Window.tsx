import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import { Scrollbar } from 'react-scrollbars-custom';
import README from "./README.md"
import './Window.css';


// ! https://www.copycat.dev/blog/react-markdown/

// TODO 
// ? Quit animation
// ? Minimize

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
		width: 700,
		height: 500,
		oldWinX: window.innerWidth,
		oldWinY: window.innerHeight,
		z_index: this.props.z_index,
		info: ""
	}
	constructor(props: any) {
		super(props)
		this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
	}

	updateWindowDimensions() {
		this.setState({
			pos: {
				x: this.state.pos.x * (window.innerWidth / this.state.oldWinX),
				y: this.state.pos.y * (window.innerHeight / this.state.oldWinY)
			},
			oldWinX: window.innerWidth,
			oldWinY: window.innerHeight
		})
		let win = document.getElementById(this.props.win_name);
		let rect = win?.getBoundingClientRect();
		if (this.state.pos.x + (rect?rect.width:0) > window.innerWidth) {
			this.setState({
				pos: {
					x: 35 * this.props.z_index,
				}
			})
		}
		if (this.state.pos.y + (rect?rect.height:0) > window.innerHeight) {
			this.setState({
				pos: {
					y: 35 * this.props.z_index
				}
			})
		}
	}

	componentDidMount(): void {
		window.addEventListener('resize', this.updateWindowDimensions)
		fetch(README).then((response) => response.text()).then((text) => {
			this.setState({info: text});
		})
	}
	componentWillUnmount(): void {
		window.removeEventListener('resize', this.updateWindowDimensions)
	}

	resetZIndex(new_index: number): void {
		this.setState({z_index: new_index})
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
			}
		})
		this.props.getLastZIndex(this.props.win_name);
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
				}
			});
			if (
				(rect?rect.x:0) + (this.state.global.x - this.state.old_global.x) + (rect?rect.width:0) > window.innerWidth ||
				(rect?rect.x:0) + (this.state.global.x - this.state.old_global.x) < 0 ||
				(rect?rect.y:0) + (this.state.global.y - this.state.old_global.y) + (rect?rect.height:0) > window.innerHeight ||
				(rect?rect.y:0) + (this.state.global.y - this.state.old_global.y) < 0
				)
				return ;
			this.setState({ 
				pos: {
					x: (rect?rect.x:0) + ((this.state.global.x - this.state.old_global.x) > 100 ? 0 : (this.state.global.x - this.state.old_global.x)),
					y: (rect?rect.y:0) + ((this.state.global.y - this.state.old_global.y) > 100 ? 0 : (this.state.global.y - this.state.old_global.y))
				}
			})
		}
	}
		
		render() {
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
					<button className="WindowButton" id='MaximizeButton' onClick={() => {
						this.setState({maximized_once: true, maximized: !this.state.maximized}); 
						this.props.getLastZIndex(this.props.win_name);}
					}/>
					<button className="WindowButton" id='QuitButton' onClick={() => this.props.destroyWindow(this.props.win_name)}/>
				</div>
				<div className='content'>
					<Scrollbar className='Scrollbar' style={{ width: this.state.width * 0.9, height: this.state.height * 0.8 }}>
						<ReactMarkdown remarkPlugins={[remarkGfm]} children={this.state.info}/>
					</Scrollbar>
				</div>
			</div>
		)
	}
}

export default Window;

import React from 'react';
import './Window.css';

class Window extends React.Component<{win_name : string, z_index: number}> {

	componentDidMount(): void {
	}

	render() {
		return (
			<div style={{zIndex: this.props.z_index}} id={this.props.win_name} className="Window">
				<div className='WindowBar'>
					<button className='minimize_button'/>
					<button className='maximize_button'/>
					<button className='quit_button'/>
				</div>
			</div>
		)
	}
}

export default Window;

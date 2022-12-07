import React from 'react';
import './Header.css';

class Header extends React.Component {
	state = {
		header_value: "Code",
		next_header_value : "",
		header_index: 0,
		writing_text: false,
		interval_header: 0,
		old_header_tab_index: 0,
		countdown: 20,
	}

	randomHeaderValue() : string {
		let value_tab = [
			"Code",
			"Design",
			"Game",
			"Think",
			"Tinker",
			"Experiment"
		]
		let value_tab_before = value_tab.slice(0, (this.state.old_header_tab_index - 1 < 0 ? 0 : this.state.old_header_tab_index));
		let value_tab_after = value_tab.slice(this.state.old_header_tab_index + 1);
		let value_tab_concat = value_tab_before.concat(value_tab_after);
		let index = Math.floor(Math.random() * value_tab_concat.length);
		this.setState({old_header_tab_index: value_tab.indexOf(value_tab_concat[index])});
		return value_tab_concat[index];
	}

	componentDidMount(): void {
		this.setState({header_value : this.randomHeaderValue()});
		this.setState({interval_header : setInterval(() => {
			if (!this.state.writing_text && this.state.header_value.length > 0) {
				this.setState({countdown: 20, header_value : this.state.header_value.slice(0, -1)});
			}
			else if (!this.state.writing_text && this.state.header_value.length === 0) {
				this.setState({writing_text : true, next_header_value : this.randomHeaderValue(), header_index : 0});
			}
			else if (this.state.writing_text && this.state.header_value !== this.state.next_header_value) {
				this.setState({header_value: this.state.next_header_value.slice(0, this.state.header_index), header_index: this.state.header_index + 1});
			}
			else if (this.state.writing_text && this.state.header_value === this.state.next_header_value) {
				if (this.state.countdown <= 0)
					this.setState({writing_text: false});
				else
					this.setState({countdown: this.state.countdown - 1});
			}
		}, 150)});
	}

	componentWillUnmount(): void {
		clearInterval(this.state.interval_header);
	}

	render() {
		return (
			<div className='osPortfolio'>
				<div className="row">
					<div className='cell size-2'></div>
					<div className='cell size-2'></div>
					<div className='cell size-2'></div>
					<div className='cell size-2'></div>
					<div className='cell size-2'></div>
					<div className='cell size-2'></div>
					<div className='cell size-2'></div>
					<div className='cell size-2'></div>
					<div className='cell size-2'></div>
				</div>
			</div>
		)
	}
}

export default Header;

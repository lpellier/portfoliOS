import React from 'react';
import './App.css';
import Login from './components/Login/Login'
import Title from './components/Title/Title'
import Desktop from './components/Desktop/Desktop'

// 

class App extends React.Component {
	state = {
		state: "desktop"
	}

	render() {
		return (
			<div className="Canvas">
				{this.state.state === "login" && <Title/>}
				{this.state.state === "login" && <Login/>}
				{this.state.state === "desktop" && <Desktop/>}
			</div>
		)
	}
}

export default App;

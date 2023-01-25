import { tileClicked } from './../tiles'

const Player = ({selectTile}: {selectTile: Function}) => {
	const clickTile = (parent: string, node: string, n: number) => {
		selectTile(n);
		tileClicked(parent, node);
	}

	return (
		<div id='player-tiles' className="menu-tiles">
			<button className="menu-tile" onClick={() => clickTile('player-tiles', 'player-tile-0', 0)}>
				<div className="menu-item item-empty" id='player-tile-0'/>
				<h3 className="menu-item-text">Empty</h3>
			</button>
			<button className="menu-tile" onClick={() => clickTile('player-tiles', 'player-tile-1', 1.1)}>
				<div className="menu-item spawn-north" id="player-tile-1"/>
				<h3 className="menu-item-text">Spawn</h3>
			</button>
			<button className="menu-tile" onClick={() => clickTile('player-tiles', 'player-tile-2', 1.2)}>
				<div className="menu-item spawn-south" id="player-tile-2"/>
				<h3 className="menu-item-text">Spawn</h3>
			</button>
			<button className="menu-tile" onClick={() => clickTile('player-tiles', 'player-tile-3', 1.3)}>
				<div className="menu-item spawn-west" id="player-tile-3"/>
				<h3 className="menu-item-text">Spawn</h3>
			</button>
			<button className="menu-tile" onClick={() => clickTile('player-tiles', 'player-tile-4', 1.4)}>
				<div className="menu-item spawn-east" id="player-tile-4"/>
				<h3 className="menu-item-text">Spawn</h3>
			</button>
		</div>
	)
}

export default Player;
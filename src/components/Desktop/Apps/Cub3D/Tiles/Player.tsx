import { tileClicked } from './../tiles'

const Player = ({selectTile}: {selectTile: Function}) => {
	const clickTile = (parent: string, node: string, n: number) => {
		selectTile(n);
		tileClicked(parent, node);
	}

	return (
		<div id='player-tiles' className="menu-tiles">
			<button className="menu-tile" onClick={() => clickTile('player-tiles', 'player-tile-1', 1)}>
				<div className="menu-item item-spawn" id="player-tile-1"/>
				<h3 className="menu-item-text">Spawn</h3>
			</button>
		</div>
	)
}

export default Player;
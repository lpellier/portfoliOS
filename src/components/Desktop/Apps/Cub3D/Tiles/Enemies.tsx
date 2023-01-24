import { tileClicked } from './../tiles'

const Enemies = ({selectTile}: {selectTile: Function}) => {
	const clickTile = (parent: string, node: string, n: number) => {
		selectTile(n);
		tileClicked(parent, node);
	}

	return (
		<div id='enemy-tiles' className="menu-tiles">
			<button className="menu-tile" onClick={() => clickTile('enemy-tiles', 'enemy-tile-1', -1)}>
				<div className="menu-item guard" id="enemy-tile-1"/>
				<h3 className="menu-item-text">Guard</h3>
			</button>
			<button className="menu-tile" onClick={() => clickTile('enemy-tiles', 'enemy-tile-2', -2)}>
				<div className="menu-item officer" id="enemy-tile-2"/>
				<h3 className="menu-item-text">Officer</h3>
			</button>
		</div>
	)
}

export default Enemies;
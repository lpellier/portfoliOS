import { tileClicked } from './../tiles'

const Walls = ({selectTile}: {selectTile: Function}) => {
	const clickTile = (parent: string, node: string, n: number) => {
		selectTile(n);
		tileClicked(parent, node);
	}

	return (
	<div id='wall-tiles' className="menu-tiles">
		<button className="menu-tile" onClick={() => clickTile('wall-tiles', 'wall-tile-0', 0)}>
			<div className="menu-item item-empty" id='wall-tile-0'/>
			<h3 className="menu-item-text">Empty</h3>
		</button>
		<button className="menu-tile" onClick={() => clickTile('wall-tiles', 'wall-tile-1', 2)}>
			<div className="menu-item cobblestone-1" id='wall-tile-1'><h3 className="variant-text">1</h3></div>
			<h3 className="menu-item-text">CBStone1</h3>
		</button>
		<button className="menu-tile" onClick={() => clickTile('wall-tiles', 'wall-tile-2', 3)}>
			<div className="menu-item cobblestone-2" id='wall-tile-2'><h3 className="variant-text">2</h3></div>
			<h3 className="menu-item-text">CBStone2</h3>
		</button>
		<button className="menu-tile" onClick={() => clickTile('wall-tiles', 'wall-tile-3', 4)}>
			<div className="menu-item cobblestone-3" id='wall-tile-3'><h3 className="variant-text">3</h3></div>
			<h3 className="menu-item-text">CBStone3</h3>
		</button>

		<button className="menu-tile" onClick={() => clickTile('wall-tiles', 'wall-tile-4', 5)}>
			<div className="menu-item stone" id='wall-tile-4'/>
			<h3 className="menu-item-text">Stone</h3>
		</button>

		<button className="menu-tile" onClick={() => clickTile('wall-tiles', 'wall-tile-5', 6)}>
			<div className="menu-item blue-stone" id='wall-tile-5'/>
			<h3 className="menu-item-text">BStone</h3>
		</button>

		<button className="menu-tile" onClick={() => clickTile('wall-tiles', 'wall-tile-6', 7)}>
			<div className="menu-item blue-stone-cell-1" id='wall-tile-6'>
				<div className="menu-item-rect"/>
				<h3 className="variant-text">1</h3>
			</div>
			<h3 className="menu-item-text">BStone w/ Cell1</h3>
		</button>
		<button className="menu-tile" onClick={() => clickTile('wall-tiles', 'wall-tile-7', 8)}>
			<div className="menu-item blue-stone-cell-2" id='wall-tile-7'>
				<div className="menu-item-rect"/>
				<h3 className="variant-text">2</h3>
			</div>
			<h3 className="menu-item-text">BStone w/ Cell2</h3>
		</button>
		<button className="menu-tile" onClick={() => clickTile('wall-tiles', 'wall-tile-8', 9)}>
			<div className="menu-item wood" id='wall-tile-8'/>
			<h3 className="menu-item-text">Wood</h3>
		</button>

		<button className="menu-tile" onClick={() => clickTile('wall-tiles', 'wall-tile-9', 10)}>
			<div className="menu-item brick" id='wall-tile-9'/>
			<h3 className="menu-item-text">Brick</h3>
		</button>

		<button className="menu-tile" onClick={() => clickTile('wall-tiles', 'wall-tile-10', 11)}>
			<div className="menu-item blue-metal" id='wall-tile-10'/>
			<h3 className="menu-item-text">BMetal</h3>
		</button>
		<button className="menu-tile" onClick={() => clickTile('wall-tiles', 'wall-tile-11', 12)}>
			<div className="menu-item blue-metal-door" id='wall-tile-11'>
				<div className="menu-item-rect"/>
			</div>
			<h3 className="menu-item-text">BMetal w/ door</h3>
		</button>
		<button className="menu-tile" onClick={() => clickTile('wall-tiles', 'wall-tile-12', 14)}>
			<div className="menu-item stone-world-map" id='wall-tile-12'>
				<div className="menu-item-rect"/>
			</div>
			<h3 className="menu-item-text">Stone w/ map</h3>
		</button>
	</div>
	);
}

export default Walls;
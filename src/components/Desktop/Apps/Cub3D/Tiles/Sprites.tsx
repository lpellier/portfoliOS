import { tileClicked } from './../tiles'

const Sprites = ({selectTile}: {selectTile: Function}) => {	
	const clickTile = (parent: string, node: string, n: number) => {
		selectTile(n);
		tileClicked(parent, node);
	}

	return (
		<div id='sprite-tiles' className="menu-tiles">
			<button className="menu-tile" onClick={() => clickTile('sprite-tiles', 'sprite-tile-1', -3)}>
				<div className="menu-item table-1" id='sprite-tile-1'/>
				<h3 className="menu-item-text">Table</h3>
			</button>
			<button className="menu-tile" onClick={() => clickTile('sprite-tiles', 'sprite-tile-2', -4)}>
				<div className="menu-item table-2" id='sprite-tile-2'/>
				<h3 className="menu-item-text">Table2</h3>
			</button>
			<button className="menu-tile" onClick={() => clickTile('sprite-tiles', 'sprite-tile-3', -5)}>
				<div className="menu-item hanging-skeleton" id='sprite-tile-3'/>
				<h3 className="menu-item-text">Hanging Skeleton</h3>
			</button>
			<button className="menu-tile" onClick={() => clickTile('sprite-tiles', 'sprite-tile-4', -6)}>
				<div className="menu-item pillar" id='sprite-tile-4'/>
				<h3 className="menu-item-text">Pillar</h3>
			</button>
			<button className="menu-tile" onClick={() => clickTile('sprite-tiles', 'sprite-tile-5', -7)}>
				<div className="menu-item plant-1" id='sprite-tile-5'/>
				<h3 className="menu-item-text">Plant</h3>
			</button>
			<button className="menu-tile" onClick={() => clickTile('sprite-tiles', 'sprite-tile-6', -8)}>
				<div className="menu-item plant-2" id='sprite-tile-6'/>
				<h3 className="menu-item-text">Plant2</h3>
			</button>
			<button className="menu-tile" onClick={() => clickTile('sprite-tiles', 'sprite-tile-7', -9)}>
				<div className="menu-item well-1" id='sprite-tile-7'/>
				<h3 className="menu-item-text">Well1</h3>
			</button>
			<button className="menu-tile" onClick={() => clickTile('sprite-tiles', 'sprite-tile-8', -10)}>
				<div className="menu-item well-2" id='sprite-tile-8'/>
				<h3 className="menu-item-text">Well2</h3>
			</button>
			<button className="menu-tile" onClick={() => clickTile('sprite-tiles', 'sprite-tile-9', -11)}>
				<div className="menu-item skeleton" id='sprite-tile-9'/>
				<h3 className="menu-item-text">Skeleton</h3>
			</button>
			<button className="menu-tile" onClick={() => clickTile('sprite-tiles', 'sprite-tile-10', -12)}>
				<div className="menu-item knight-armour" id='sprite-tile-10'/>
				<h3 className="menu-item-text">Knight Armour</h3>
			</button>
			<button className="menu-tile" onClick={() => clickTile('sprite-tiles', 'sprite-tile-11', -13)}>
				<div className="menu-item blood-puddle" id='sprite-tile-11'/>
				<h3 className="menu-item-text">Blood Puddle</h3>
			</button>
			<button className="menu-tile" onClick={() => clickTile('sprite-tiles', 'sprite-tile-12', -14)}>
				<div className="menu-item cage-1" id='sprite-tile-12'/>
				<h3 className="menu-item-text">Cage1</h3>
			</button>
			<button className="menu-tile" onClick={() => clickTile('sprite-tiles', 'sprite-tile-13', -15)}>
				<div className="menu-item cage-2" id='sprite-tile-13'/>
				<h3 className="menu-item-text">Cage2</h3>
			</button>
			<button className="menu-tile" onClick={() => clickTile('sprite-tiles', 'sprite-tile-14', -16)}>
				<div className="menu-item skeleton-remains" id='sprite-tile-14'/>
				<h3 className="menu-item-text">Skeleton Remains</h3>
			</button>
			<button className="menu-tile" onClick={() => clickTile('sprite-tiles', 'sprite-tile-15', -17)}>
				<div className="menu-item key-1" id='sprite-tile-15'/>
				<h3 className="menu-item-text">Key1</h3>
			</button>
			<button className="menu-tile" onClick={() => clickTile('sprite-tiles', 'sprite-tile-16', -18)}>
				<div className="menu-item key-2" id='sprite-tile-16'/>
				<h3 className="menu-item-text">Key2</h3>
			</button>
			<button className="menu-tile" onClick={() => clickTile('sprite-tiles', 'sprite-tile-17', -19)}>
				<div className="menu-item bed" id='sprite-tile-17'/>
				<h3 className="menu-item-text">Bed</h3>
			</button>
			<button className="menu-tile" onClick={() => clickTile('sprite-tiles', 'sprite-tile-18', -20)}>
				<div className="menu-item barrel" id='sprite-tile-18'/>
				<h3 className="menu-item-text">Barrel</h3>
			</button>
			<button className="menu-tile" onClick={() => clickTile('sprite-tiles', 'sprite-tile-19', -21)}>
				<div className="menu-item weapons-rack" id='sprite-tile-19'/>
				<h3 className="menu-item-text">Weapons Rack</h3>
			</button>
		</div>
	)
}

export default Sprites;

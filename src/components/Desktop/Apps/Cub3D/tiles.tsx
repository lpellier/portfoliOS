
export const CBStone1 = 
<div className="menu-tile">
	<div className="menu-item" id='cobblestone-1'><h3 className="variant-text">1</h3></div>
	<h3 className="menu-item-text">CBStone1</h3>
</div>
export const CBStone2 = 
<div className="menu-tile">
	<div className="menu-item" id='cobblestone-2'><h3 className="variant-text">2</h3></div>
	<h3 className="menu-item-text">CBStone2</h3>
</div>
export const CBStone3 = 
<div className="menu-tile">
	<div className="menu-item" id='cobblestone-3'><h3 className="variant-text">3</h3></div>
	<h3 className="menu-item-text">CBStone3</h3>
</div>

export const Stone = 
<div className="menu-tile">
	<div className="menu-item" id='stone'/>
	<h3 className="menu-item-text">Stone</h3>
</div>

export const StoneMap =
<div className="menu-tile">
	<div className="menu-item" id='stone-world-map'>
		<div className="menu-item-rect"/>
	</div>
	<h3 className="menu-item-text">Stone w/ map</h3>
</div>

export const BStone = 
<div className="menu-tile">
	<div className="menu-item" id='blue-stone'/>
	<h3 className="menu-item-text">BStone</h3>
</div>

export const BStoneCell1 = 
<div className="menu-tile">
	<div className="menu-item" id='blue-stone-cell-1'>
		<div className="menu-item-rect"/>
		<h3 className="variant-text">1</h3>
	</div>
	<h3 className="menu-item-text">BStone w/ Cell1</h3>
</div>
export const BStoneCell2 = 
<div className="menu-tile">
	<div className="menu-item" id='blue-stone-cell-2'>
		<div className="menu-item-rect"/>
		<h3 className="variant-text">2</h3>
	</div>
	<h3 className="menu-item-text">BStone w/ Cell2</h3>
</div>

export const BMetal = 
<div className="menu-tile">
	<div className="menu-item" id='blue-metal'/>
	<h3 className="menu-item-text">BMetal</h3>
</div>
export const BMetalDoor = 
<div className="menu-tile">
	<div className="menu-item" id='blue-metal-door'>
		<div className="menu-item-rect"/>
	</div>
	<h3 className="menu-item-text">BMetal w/ door</h3>
</div>

export const Wood = 
<div className="menu-tile">
	<div className="menu-item" id='wood'/>
	<h3 className="menu-item-text">Wood</h3>
</div>

export const Brick = 
<div className="menu-tile">
	<div className="menu-item" id='brick'/>
	<h3 className="menu-item-text">Brick</h3>
</div>

export const GridTile = ({content}: {content: number}) => {
	let typeId: string = "";
	if (content === 0)
		typeId = "item-empty";
	else if (content === 1)
		typeId = "item-spawn";
	else if (content === 2)
		typeId = "cobblestone-1";
	else if (content === 3)
		typeId = "cobblestone-2";
	else if (content === 4)
		typeId = "blue-stone-1";
	else if (content === 5)
		typeId = "blue-stone-cell-1";
	else if (content === 6)
		typeId = "wood-1";
	else if (content === 7)
		typeId = "brick-1";
	else if (content === 8)
		typeId = "item-wall";


	return (
		<div className='grid-tile' id={typeId}>
			<h3 className="variant-text-map"></h3>
		</div>
	)
}

export const player_tiles =
	<div id='player-tiles' className="menu-tiles">
		<div className="menu-tile">
			<div className="menu-item" id="item-spawn"/>
			<h3 className="menu-item-text">Spawn</h3>
		</div>
	</div>

export const wall_tiles = 
	<div id='wall-tiles' className="menu-tiles">
		{CBStone1}
		{CBStone2}
		{CBStone3}
		{Stone}
		{StoneMap}
		{BStone}
		{BStoneCell1}
		{BStoneCell2}
		{BMetal}
		{BMetalDoor}
		{Wood}
		{Brick}
	</div>

export const sprites_tiles =
	<div id='sprite-tiles' className="menu-tiles">
		<div className="menu-tile">
			<div className="menu-item" id='table'/>
			<h3 className="menu-item-text">Table</h3>
		</div>
		<div className="menu-tile">
			<div className="menu-item" id='table-2'/>
			<h3 className="menu-item-text">Table2</h3>
		</div>
		<div className="menu-tile">
			<div className="menu-item" id='hanging-skeleton'/>
			<h3 className="menu-item-text">Hanging Skeleton</h3>
		</div>
		<div className="menu-tile">
			<div className="menu-item" id='pillar'/>
			<h3 className="menu-item-text">Pillar</h3>
		</div>
		<div className="menu-tile">
			<div className="menu-item" id='plant'/>
			<h3 className="menu-item-text">Plant</h3>
		</div>
		<div className="menu-tile">
			<div className="menu-item" id='plant-2'/>
			<h3 className="menu-item-text">Plant2</h3>
		</div>
		<div className="menu-tile">
			<div className="menu-item" id='well-1'/>
			<h3 className="menu-item-text">Well1</h3>
		</div>
		<div className="menu-tile">
			<div className="menu-item" id='well-2'/>
			<h3 className="menu-item-text">Well2</h3>
		</div>
		<div className="menu-tile">
			<div className="menu-item" id='skeleton'/>
			<h3 className="menu-item-text">Skeleton</h3>
		</div>
		<div className="menu-tile">
			<div className="menu-item" id='knight-armour'/>
			<h3 className="menu-item-text">Knight Armour</h3>
		</div>
		<div className="menu-tile">
			<div className="menu-item" id='blood-puddle'/>
			<h3 className="menu-item-text">Blood Puddle</h3>
		</div>
		<div className="menu-tile">
			<div className="menu-item" id='cage-1'/>
			<h3 className="menu-item-text">Cage1</h3>
		</div>
		<div className="menu-tile">
			<div className="menu-item" id='cage-2'/>
			<h3 className="menu-item-text">Cage2</h3>
		</div>
		<div className="menu-tile">
			<div className="menu-item" id='skeleton-remains'/>
			<h3 className="menu-item-text">Skeleton Remains</h3>
		</div>
		<div className="menu-tile">
			<div className="menu-item" id='key-1'/>
			<h3 className="menu-item-text">Key1</h3>
		</div>
		<div className="menu-tile">
			<div className="menu-item" id='key-2'/>
			<h3 className="menu-item-text">Key2</h3>
		</div>
		<div className="menu-tile">
			<div className="menu-item" id='bed'/>
			<h3 className="menu-item-text">Bed</h3>
		</div>
		<div className="menu-tile">
			<div className="menu-item" id='barrel'/>
			<h3 className="menu-item-text">Barrel</h3>
		</div>
		<div className="menu-tile">
			<div className="menu-item" id='weapons-rack'/>
			<h3 className="menu-item-text">Weapons Rack</h3>
		</div>
	</div>

export const enemy_tiles =
	<div id='ennemy-tiles' className="menu-tiles">
		<div className="menu-tile">
			<div className="menu-item" id="guard"/>
			<h3 className="menu-item-text">Guard</h3>
		</div>
		<div className="menu-tile">
			<div className="menu-item" id="officer"/>
			<h3 className="menu-item-text">Officer</h3>
		</div>
	</div>
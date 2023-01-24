export const tileClicked = (parent_name: string, tilename: string): void => {
	// ? Remove any existing outlines
	
	const parent = document.getElementById(parent_name);
	if (parent?.querySelectorAll('.menu-tiles .tile-clicked') !== undefined){
		for (let elem of parent?.querySelectorAll('.menu-tiles .tile-clicked')) {
			elem.remove();
		}
	}
	
	// ? Add outline to selected tile
	const div = document.createElement("div");
	div?.classList.add("tile-clicked");
	const tile = document.getElementById(tilename);
	console.log(tile)
	if (tile && tile.querySelector('.tile-clicked') === null) {
		tile.prepend(div);
	}
}

export const GridTile = ({content}: {content: number}) => {
	let typeId: string = "";
	if (content === 0) typeId = "item-empty";
	else if (content === 1) typeId = "item-spawn";
	else if (content === 2) typeId = "cobblestone-1";
	else if (content === 3) typeId = "cobblestone-2";
	else if (content === 4) typeId = "cobblestone-3";
	else if (content === 5) typeId = "stone";
	else if (content === 6) typeId = "stone-world-map";
	else if (content === 7) typeId = "blue-stone";
	else if (content === 8) typeId = "blue-stone-cell-1";
	else if (content === 9) typeId = "blue-stone-cell-2";
	else if (content === 10) typeId = "blue-metal";
	else if (content === 11) typeId = "blue-metal-door";
	else if (content === 12) typeId = "wood";
	else if (content === 13) typeId = "brick";
	else if (content === -1) typeId = "guard";
	else if (content === -2) typeId = "officer";
	else if (content === -3) typeId = "table-1";
	else if (content === -4) typeId = "table-2";
	else if (content === -5) typeId = "hanging-skeleton";
	else if (content === -6) typeId = "pillar";
	else if (content === -7) typeId = "plant-1";
	else if (content === -8) typeId = "plant-2";
	else if (content === -9) typeId = "well-1";
	else if (content === -10) typeId = "well-2";
	else if (content === -11) typeId = "skeleton";
	else if (content === -12) typeId = "knight-armour";
	else if (content === -13) typeId = "blood-puddle";
	else if (content === -14) typeId = "cage-1";
	else if (content === -15) typeId = "cage-2";
	else if (content === -16) typeId = "skeleton-remains";
	else if (content === -17) typeId = "key-1";
	else if (content === -18) typeId = "key-2";
	else if (content === -19) typeId = "bed";
	else if (content === -20) typeId = "barrel";
	else if (content === -21) typeId = "weapons-rack";

	return (
		<div className={`grid-tile ${typeId}`}>
			<h3 className="variant-text-map">.</h3>
		</div>
	)
}

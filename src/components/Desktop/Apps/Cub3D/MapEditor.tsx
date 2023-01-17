import { FunctionComponent, useEffect, useRef, useState } from "react";
import "styles/MapEditor.css"
import { default_win_width, default_win_height, RED } from "../../../../consts";
import { Scrollbar } from "react-scrollbars-custom";
import { IGridTile, IPos } from "../../../../types";
import { useCookies } from "react-cookie";

const GridTile: FunctionComponent<IGridTile> = ({content}) => {
	let typeClass: string = "";
	if (content === 0)
		typeClass = "item-empty";
	else if (content === 1)
		typeClass = "item-wall";
	else if (content === 2)
		typeClass = "item-spawn";
	else if (content === 3)
		typeClass = "item-enemy";
	else if (content === 4)
		typeClass = "item-pickup";

	return (
		<div className={`grid-tile ${typeClass}`}></div>
	)
}

const MapEditor: FunctionComponent = () => {
	const [menu_toggled, setToggledMenu] = useState<boolean>(false);
	const [grid, setGrid] = useState<number[][]>([
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
		[1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 1, 0, 3, 0, 3, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 2, 0, 0, 1],
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	]);

	const [shift_down, setShift] = useState<boolean>(false);
	const [scrollbar_size, setScrollBar] = useState<IPos>({x: 0, y: 0})
	const [tile_selected, setTile] = useState<number>(0)

	useEffect(() => {
		document.addEventListener('keydown', keyDownHandler)
		document.addEventListener('keyup', keyUpHandler)

		let saved_map = localStorage.getItem('cub3d-map');
		if (saved_map)
			setGrid(JSON.parse(saved_map))

		updateScrollBar();
		return (() => {
			document.removeEventListener('keydown', keyDownHandler);
			document.removeEventListener('keyup', keyUpHandler)
		})
	}, [])

	const keyDownHandler = (e: KeyboardEvent) => {
		if (e.key === 'Shift')
			setShift(true);
	}
	const keyUpHandler = (e: KeyboardEvent) => {
		if (e.key === 'Shift')
			setShift(false)
	}

	const updateScrollBar = () => {
		let width = document.getElementById("cub3d")?.clientWidth;
		let height = document.getElementById("cub3d")?.clientHeight;
	
		let grid_width = document.getElementById("map-editor-grid")?.clientWidth;
		let grid_height = document.getElementById("map-editor-grid")?.clientHeight;
	
		let scrollbar_width: number;
		let scrollbar_height: number;
		if (width && grid_width && height && grid_height) {
			scrollbar_width = (grid_width + 50 > width * 0.8 ? width * 0.8 : grid_width + 50);
			scrollbar_height = (grid_height + 50 > height * 0.75 ? height * 0.75 : grid_height + 50);
		}
		else {
			scrollbar_width = default_win_width * 0.8;
			scrollbar_height = default_win_height * 0.75;
		}
		setScrollBar({x: scrollbar_width, y: scrollbar_height})
	}

	const removeRow = () => {
		if (grid.length <= 3)
			return ;
		setGrid((current) => {
			let newGrid = current;
			let gridLength = newGrid.length;
			for (let j = 0; j < (shift_down ? (gridLength < 8 ? gridLength - 3 : 5) : 1); j++) {
				newGrid.splice(newGrid.length - 2, 1);
			}
			return newGrid;
		})
		updateScrollBar();
	}
	const addRow = () => {
		if (grid.length >= 50)
			return ;
		setGrid((current) => {
			let newGrid = current;
			let gridLength = newGrid.length;
			for (let j = 0; j < (shift_down ? (gridLength > 45 ? 50 - gridLength : 5) : 1); j++) {
				let newRow = [1];
				let i: number;
				for (i = 1; i < newGrid[0].length - 1; i++) {
					newRow.push(0);
				}
				newRow.push(1);
				newGrid.splice(newGrid.length - 1, 0, newRow);
			}
			return newGrid;
		})
		updateScrollBar();
	}
	const removeColumn = () => {
		if (grid.length > 0 && grid[0].length <= 3)
			return ;
		setGrid((current) => {
			let newGrid = current;
			for (let row of newGrid) {
				let rowLength = row.length;
				for (let j = 0; j < (shift_down ? (rowLength < 8 ? rowLength - 3 : 5) : 1); j++) {
					row.splice(row.length - 2, 1);
				}
			}
			return newGrid;
		})
		updateScrollBar();
	}
	const addColumn = () => {
		if (grid.length > 0 && grid[0].length >= 50)
			return ;
		setGrid((current) => {
			let newGrid = current;
			for (let row of newGrid) {
				let rowLength = row.length;
				for (let j = 0; j < (shift_down ? (rowLength > 45 ? 50 - rowLength : 5) : 1); j++) {
					if (newGrid.indexOf(row) === 0 || newGrid.indexOf(row) === newGrid.length - 1)
						row.splice(row.length - 1, 0, 1);
					else
						row.splice(row.length - 1, 0, 0);
				}
			}
			return newGrid;
		})
		updateScrollBar();
	}

	const animateTogglableMenu = () => {
		if (menu_toggled)
			animateTogglableMenuGrow();
		else
			animateTogglableMenuShrink();
		setToggledMenu((current) => !current);
	}

	const animateTogglableMenuShrink = () => {
		let div = document.getElementById("map-editor-togglable-menu");
		div?.animate([
			{ transform: "translateX(-95%)" }
		], {
			duration: 300,
			easing: "ease",
			fill: "forwards"
		})
		div = document.getElementById("icon-toggle-menu");
		div?.animate([{ 
			transform: "scaleX(-1)"
		}
		], {
			duration: 300,
			easing: "ease",
			fill: "forwards"
		})
	}
	const animateTogglableMenuGrow = () => {
		let div = document.getElementById("map-editor-togglable-menu");
		div?.animate([
			{ transform: "translateX(-13%)" }
		], {
			duration: 300,
			easing: "ease",
			fill: "forwards"
		})
		div = document.getElementById("icon-toggle-menu");
		div?.animate([{ 
			transform: "scaleX(1) translateX(0)"
		}
		], {
			duration: 300,
			easing: "ease",
			fill: "forwards"
		})
	}

	const calculateGridIndexes = (e: any) => {
		let rect = document.getElementById("map-editor-grid")?.getBoundingClientRect();
		if (!rect)
			return ;
		let x = Math.floor((e.clientX - rect.left - 25) / 21); // ? 25px padding
		let y = Math.floor((e.clientY - rect.top - 25) / 21);
		
		if ((grid.length > 0 && x >= 0 && x < grid[0].length) && (y >= 0 && y < grid.length)) {
			setGrid((current) => {
				let newGrid = current;
				newGrid[y][x] = tile_selected;
				return newGrid;
			})
		}
	}

	const saveMap = () => {
		localStorage.setItem('cub3d-map', JSON.stringify(grid));
	}

	let row_key = 0;
	let tile_key = 0;

	return (
		<div>
			<Scrollbar id='map-editor-scrollbar' style={{ width: scrollbar_size.x, height: scrollbar_size.y}} className='Scrollbar'>
				<div id="map-editor-grid" onClick={calculateGridIndexes}>
					{
						grid.map((row) => {
							row_key++;
							return <div className="map-editor-row" key={row_key}>
								{
									row.map((tile_content) => {
										tile_key++;
										return <GridTile content={tile_content} key={tile_key}/>
									})
								}
							</div> 
						})
					}
				</div>
			</Scrollbar>
			<div id="map-editor-togglable-menu">
				<button id="button-toggle-menu" onClick={animateTogglableMenu}>
					<svg xmlns="http://www.w3.org/2000/svg" id="icon-toggle-menu" width="100%" height="100%" 
						viewBox="0 0 25 50" strokeWidth="4" stroke="white" fill="none" 
						strokeLinecap="round" strokeLinejoin="round">
						<path id="button-toggle-arrow-1" d="M 17,15 10,25 17,35"/>
						<path id="button-toggle-arrow-2" d="M 17,15 10,25 17,35"/>
					</svg>
				</button>
				<div id="toggle-menu-flex">
					<div id="menu-size-flex">
						<div className="menu-size-item" id="menu-size-width">
							<h3 className="menu-size-text">width&nbsp;</h3>
							<button onClick={removeColumn} className="menu-size-button">
								<svg xmlns="http://www.w3.org/2000/svg" className="menu-size-icon"
									viewBox="0 0 50 50" strokeWidth="6" stroke={RED} 
									fill="none" strokeLinecap="round" strokeLinejoin="round">
									<path strokeLinecap='square' strokeLinejoin='round' d="M 10,25 40,25"/>
								</svg>
							</button>
							<h3>{grid.length > 0 ? grid[0].length : 0}</h3>
							<button onClick={addColumn} className="menu-size-button">
								<svg xmlns="http://www.w3.org/2000/svg" className="menu-size-icon"
									viewBox="0 0 50 50" strokeWidth="6" stroke={RED} 
									strokeLinecap="round" strokeLinejoin="round">
									<path strokeLinecap='square' strokeLinejoin='round' d="M 10,25 40,25 M 25,10 25,40"/>
								</svg>
							</button>
						</div>
						<div className="menu-size-item" id="menu-size-height">
							<h3 className="menu-size-text">height</h3>
							<button onClick={removeRow} className="menu-size-button">
								<svg xmlns="http://www.w3.org/2000/svg" className="menu-size-icon"
									viewBox="0 0 50 50" strokeWidth="6" stroke={RED} 
									strokeLinecap="round" strokeLinejoin="round">
									<path strokeLinecap='square' strokeLinejoin='round' d="M 10,25 40,25"/>
								</svg>
							</button>
							<h3>{grid.length}</h3>
							<button onClick={addRow} className="menu-size-button">
								<svg xmlns="http://www.w3.org/2000/svg" className="menu-size-icon"
									viewBox="0 0 50 50" strokeWidth="6" stroke={RED} 
									strokeLinecap="round" strokeLinejoin="round">
									<path strokeLinecap='square' strokeLinejoin='round' d="M 10,25 40,25 M 25,10 25,40"/>
								</svg>
							</button>
						</div>
					</div>
					<div className='menu-separator'/>
					<div id='menu-items-flex'>
						<div className="menu-item-flex" onClick={() => setTile(0)}>
							<div className="menu-item item-empty"/>
							<h3 style={{color: (tile_selected === 0 ? "var(--red)" : "white")}}>Empty</h3>
						</div>
						<div className="menu-item-flex" onClick={() => setTile(1)}>
							<div className="menu-item item-wall"/>
							<h3 style={{color: (tile_selected === 1 ? "var(--red)" : "white")}}>Wall</h3>
						</div>
						<div className="menu-item-flex" onClick={() => setTile(2)}>
							<div className="menu-item item-spawn"/>
							<h3 style={{color: (tile_selected === 2 ? "var(--red)" : "white")}}>Spawn</h3>
						</div>
						<div className="menu-item-flex" onClick={() => setTile(3)}>
							<div className="menu-item item-enemy"/>
							<h3 style={{color: (tile_selected === 3 ? "var(--red)" : "white")}}>Enemy</h3>
						</div>
						<div className="menu-item-flex" onClick={() => setTile(4)}>
							<div className="menu-item item-pickup"/>
							<h3 style={{color: (tile_selected === 4 ? "var(--red)" : "white")}}>Pickup</h3>
						</div>
					</div>
				</div>
			</div>
			<button className="button-save" onClick={saveMap}><h3>SAVE</h3></button>
		</div>
	)
}

export default MapEditor;
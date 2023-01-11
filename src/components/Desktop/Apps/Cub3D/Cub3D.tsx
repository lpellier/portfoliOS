import { FunctionComponent, useEffect, useState } from "react";
import "styles/Cub3D.css"
import { ISketch, IGridTile } from "../../../../types";
import { defineSketch } from "./Sketch";
import p5 from "p5";
import { default_win_width, default_win_height } from "../../../../globals";
import { Scrollbar } from "react-scrollbars-custom";

// eslint-disable-next-line
let p: p5 | null = null;

const GridTile: FunctionComponent<IGridTile> = ({content, win_width, win_height}) => {
	return (
		<div className={`grid-tile ${(content === 1 ? "tile-wall" : "")}`}></div>
	)
}

const Cub3D: FunctionComponent<ISketch> = () => {
	const [selected_app, setApp] = useState<number>(0);
	const [grid, setGrid] = useState<number[][]>([
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	]);

	const goToMapEditor = () => {
		animateMenuShrink();
		setTimeout(() => setApp(-1), 250);
	}
	const goToMenu = () => {
		setApp(0);
	}
	const goToSketch = () => {
		if (p === null) {
			animateMenuShrink();
			setTimeout(() => {
				setApp(1);
				let cub3dSketch = defineSketch(default_win_width, default_win_height)
				p = new p5(cub3dSketch)
			}, 200)
		}
	}
	const removeSketch = () => {
		if (p !== null) {
			p.remove();
			p = null;
			goToMenu();
		}
	}

	const animateMenuShrink = () => {
		let div = document.getElementById("cub3d-button-1");
		div?.animate([
			{
				backgroundPosition: "0 0",
				color: "var(--black)"
			}
		], {
			duration: 100,
			fill: "forwards"
		})
		div = document.getElementById("cub3d-button-2");
		div?.animate([
			{
				backgroundPosition: "100% 0%",
				color: "var(--black)"
			}
		], {
			duration: 100,
			fill: "forwards"
		})
		div = document.getElementById("cub3d-button-separator");
		setTimeout(() => {
			div?.animate([
				{
					height: 0
				}
			], {
				duration: 150,
				fill: "forwards"
			});
		}, 100)
	}

	console.log('render cub3d menu')

	let row_key = 0;
	let tile_key = 0;

	let width = document.getElementById("cub3d")?.clientWidth;
	let height = document.getElementById("cub3d")?.clientHeight;

	return (
		<div id="cub3d">
			{ selected_app === 0 &&
				<div id="cub3d-button-flex">
					<button className="cub3d-button" id="cub3d-button-1"
						onClick={goToMapEditor}>
						Edit<br/>map
					</button>
					<div id="cub3d-button-separator"/>
					<button className="cub3d-button" id="cub3d-button-2"
						onClick={goToSketch}>
						Play
					</button>
				</div>
			}
			{ selected_app === -1 &&
				<div className="Canvas" id="cub3d-map-editor">
					<button className="cub3d-button-return"
					onClick={goToMenu}>
						<svg xmlns="http://www.w3.org/2000/svg" className="icon-arrow-back" width="50" height="50" 
							viewBox="0 0 24 24" strokeWidth="1.5" stroke="#F4615A" fill="none" 
							strokeLinecap="round" strokeLinejoin="round">
							<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
							<path d="M9 11l-4 4l4 4m-4 -4h11a4 4 0 0 0 0 -8h-1" />
						</svg>
					</button>
					<Scrollbar style={{ width: width ? width : default_win_width, height: height? height : default_win_height}} className='Scrollbar'>
						<div id="map-editor-flex">
							<div id="map-editor-grid">
								{
									grid.map((row) => {
										row_key++;
										return <div className="map-editor-row" key={row_key}>
											{
												row.map((tile_content) => {
													tile_key++;
													return <GridTile content={tile_content} win_width={width} win_height={height} key={tile_key}/>
												})
											}
										</div> 
									})
								}
							</div>
						</div>
					</Scrollbar>
				</div>
			}
			{ selected_app === 1 &&
				<div className="Canvas" id={"canvas-cub3d-parent"}>
					<button className="cub3d-button-return"
						onClick={removeSketch}>
						<svg xmlns="http://www.w3.org/2000/svg" className="icon-arrow-back" width="50" height="50" 
							viewBox="0 0 24 24" strokeWidth="1.5" stroke="#F4615A" fill="none" 
							strokeLinecap="round" strokeLinejoin="round">
							<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
							<path d="M9 11l-4 4l4 4m-4 -4h11a4 4 0 0 0 0 -8h-1" />
						</svg>
					</button>
				</div>
			}
		</div>
	)
}

export default Cub3D;
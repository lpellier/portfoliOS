import { memo, useEffect, useState } from "react";
import "styles/Cub3D.css"
import MapEditor from "./MapEditor";
import Canvas from "./Sketch/Canvas";

const Cub3D = ({forcedUpdate}: {forcedUpdate: boolean}) => {
	const [selected_app, setApp] = useState<number>(0);

	const goToMapEditor = () => {
		animateMenuShrink();
		setTimeout(() => setApp(-1), 250);
	}
	const goToMenu = () => {
		setApp(0);
	}
	const goToSketch = () => {
		animateMenuShrink();
		setTimeout(() => {
			setApp(1);
		}, 200)
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
							<path d="M9 11l-4 4l4 4m-4 -4h11a4 4 0 0 0 0 -8h-1" />
						</svg>
					</button>
					<MapEditor/>
				</div>
			}
			{ selected_app === 1 &&
				<div>
					<button className="cub3d-button-return"
						onClick={goToMenu}>
						<svg xmlns="http://www.w3.org/2000/svg" className="icon-arrow-back" width="50" height="50" 
							viewBox="0 0 24 24" strokeWidth="1.5" stroke="#F4615A" 
							strokeLinecap="round" strokeLinejoin="round">
							<path d="M9 11l-4 4l4 4m-4 -4h11a4 4 0 0 0 0 -8h-1" />
						</svg>
					</button>
					<Canvas/>
				</div>
			}
		</div>
	)
}

export default memo(Cub3D);
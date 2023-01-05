import { FunctionComponent, useEffect } from "react";
import "./Cub3D.css"
import { ISketch } from "../../../../types";

const Cub3D: FunctionComponent<ISketch> = () => {
	useEffect(() => {
	}, []);

	return (
		<div id="Cub3D" className="file">
		</div>
	)
}

export default Cub3D;
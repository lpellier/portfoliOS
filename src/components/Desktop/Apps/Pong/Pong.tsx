import p5 from "p5";
import { FunctionComponent, useEffect } from "react";
import { defineSketch } from "./Sketch";
import "./Pong.css"
import { ISketch } from "../../../../types";
import { default_win_height, default_win_width } from "../../../../globals";

let p: any = null;

const Pong: FunctionComponent<ISketch> = () => {
	useEffect(() => {
		let pongSketch = defineSketch(default_win_width, default_win_height)
		p = new p5(pongSketch)
		// ? useless while loop to remove warning about unused variables
		while (p)
			break;
	}, []);

	return (
		<div className="Canvas" id={"canvas-pong-parent"}>

		</div>
	)
}

export default Pong;
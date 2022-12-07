import p5 from "p5";
import { useEffect } from "react";
import { defineSketch } from "./Sketch";
import "./Pong.css"


let p: any = null;

export default function Game(props: any) {
	useEffect(() => {
		let pongSketch = defineSketch(props.id, props.width, props.height)
		p = new p5(pongSketch)
		// ? useless while loop to remove warning about unused variables
		while (p)
			break;
	}, []);

	return (
		<div className="Canvas" id={"canvas-parent" + props.id}>

		</div>
	)
}
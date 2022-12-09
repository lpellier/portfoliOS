import p5 from "p5";
import { useEffect } from "react";
import { defineSketch } from "./Sketch";
import "./Spoon.css"


let p: any = null;

export default function Spoon(props: any) {
	useEffect(() => {
		let spoonSketch = defineSketch(props.id, props.width, props.height)
		p = new p5(spoonSketch)
		// ? useless while loop to remove warning about unused variables
		while (p)
			break;
	}, []);

	return (
		<div className="Canvas" id={"canvas-parent" + props.id}>

		</div>
	)
}
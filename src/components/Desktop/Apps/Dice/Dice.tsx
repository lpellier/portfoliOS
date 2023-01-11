import p5 from "p5";
import { FunctionComponent, useEffect } from "react";
import { defineSketch } from "./Sketch";
import "styles/Dice.css"
import { ISketch } from "../../../../types";
import { default_win_height, default_win_width } from "../../../../globals";

let p: any = null;

const Dice: FunctionComponent<ISketch> = () => {
	useEffect(() => {
		let spoonSketch = defineSketch(default_win_width, default_win_height)
		p = new p5(spoonSketch)
		// ? useless while loop to remove warning about unused variables
		while (p)
			break;
	}, []);

	return (
		<div className="Canvas" id={"canvas-dice-parent"}>

		</div>
	)
}

export default Dice;
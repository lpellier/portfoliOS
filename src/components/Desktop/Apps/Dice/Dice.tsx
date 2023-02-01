import p5 from "p5";
import { useEffect } from "react";
import { defineSketch } from "./Sketch";
import "styles/Dice.css"
import { default_win_height, default_win_width } from "../../../../consts";

let p: any = null;

const Dice = () => {
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
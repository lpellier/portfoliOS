import p5 from "p5";
import { BLUE, RED, YELLOW } from "../../../../../consts";
import { RAY_COUNT } from "./constants";
import { Player } from "./Player";

export function LightenDarkenColor(color: string, amount: number) {
    var usePound = false;
    if ( color[0] === "#" ) {
        color = color.slice(1);
        usePound = true;
    }

    var num = parseInt(color,16);

    var r = (num >> 16) + amount;

    if ( r > 255 ) r = 255;
    else if  (r < 0) r = 0;

    var b = ((num >> 8) & 0x00FF) + amount;

    if ( b > 255 ) b = 255;
    else if  (b < 0) b = 0;
    
    var g = (num & 0x0000FF) + amount;

    if ( g > 255 ) g = 255;
    else if  ( g < 0 ) g = 0;

    return (usePound?"#":"") + (g | (b << 8) | (r << 16)).toString(16);
}

export function drawSketch(p: p5, grid: number[][], player: Player, w: number, h: number) {
	let rayWidth = w / RAY_COUNT;

	p.push();
	p.noStroke();
	for (let i = 0; i < player.rays.length; i++) {
		let ray = player.rays[i];
		let d: number;
		if (ray.side === true) {
			p.fill(LightenDarkenColor(BLUE, -20));
			d = ray.rayLength1D.y - ray.unitStepSize.y;	
		} else {
			p.fill(BLUE)
			d = ray.rayLength1D.x - ray.unitStepSize.x;
		}

		d = Math.floor(h / d);
		p.rect(i * rayWidth, h / 2 - d / 2, rayWidth, d)
	}
}

export function drawBorder(p: p5, w: number, h: number) {
	p.stroke(RED);
	p.strokeWeight(3)
	p.fill('rgba(0,0,0,0)')
	p.rect(3, 3, w - 6, h - 6);
	p.pop();
}

export const drawFPS = (p: p5, player: Player, frameRate: number, frameTime: number, width: number) => {
	p.push();
	p.fill(YELLOW)
	p.textSize(20)
	p.text(frameRate.toString().substring(0, 4), width - 50, 25);
	p.pop();
}
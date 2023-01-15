import p5 from "p5";
import { BLUE, RED, YELLOW } from "../../../../../consts";
import { RAY_COUNT, TEX_HEIGHT, TEX_WIDTH } from "./constants";
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

export const drawFPS = (p: p5, frameRate: number) => {
	p.push();
	p.fill(YELLOW)
	p.textSize(20)
	p.text(frameRate.toString().substring(0, 4), p.width - 50, 25);
	p.pop();
}
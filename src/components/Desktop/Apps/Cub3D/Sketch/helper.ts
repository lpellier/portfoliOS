import { Vector } from "p5";
import { PREVIEW_BLOCK_HEIGHT, PREVIEW_BLOCK_WIDTH } from "./Sketch";

export function getCanvasPos(pos: Vector, w: number, h: number) {
	return new Vector(pos.x * PREVIEW_BLOCK_WIDTH + w / 2, pos.y * PREVIEW_BLOCK_HEIGHT + h / 2);
}

export function perpendicularClockWise(v: Vector) {
	return new Vector(v.y, -v.x);
}
export function perpendicularCounterClockWise(v: Vector) {
	return new Vector(-v.y, v.x);
}
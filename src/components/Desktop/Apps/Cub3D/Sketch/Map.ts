import p5, { Vector } from "p5";
import { BLUE, RED, YELLOW } from "../../../../../consts";
import { DEFAULT_MAP_HEIGHT, DEFAULT_MAP_WIDTH } from "./constants";
import { PREVIEW_BLOCK_HEIGHT, PREVIEW_BLOCK_WIDTH } from "./constants";

export class Map {
	grid:	number[][];
	width:	number;
	height:	number;

	constructor() {
		this.width = DEFAULT_MAP_WIDTH;
		this.height = DEFAULT_MAP_HEIGHT;
		this.grid = [];
	}

	draw(p: p5) {
		for (let y = 0; y < this.grid.length; y++) {
			for (let x = 0; x < this.grid[0].length; x++) {
				p.push();
				p.noStroke();
				if (this.grid[y][x] === 0) {
					p.fill("white");
				} else if (this.grid[y][x] === 1) {
					p.fill(BLUE);
				} else if (this.grid[y][x] === 3) {
					p.fill(RED);
				} else if (this.grid[y][x] === 4) {
					p.fill(YELLOW);
				}
				p.rect(x * PREVIEW_BLOCK_WIDTH, y * PREVIEW_BLOCK_HEIGHT, PREVIEW_BLOCK_WIDTH, PREVIEW_BLOCK_HEIGHT);
				p.pop();
			}
		}
	}

	defaultMap() {
		this.grid = [
			[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
			[1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
			[1, 0, 0, 0, 0, 0, 0, 1, 0, 3, 0, 3, 0, 1],
			[1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
			[1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1],
			[1, 0, -10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
			[1, 0, 0, -7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
			[1, 0, 0, 0, -9, 0, 0, 0, 0, 0, 0, 0, 0, 1],
			[1, 0, 0, 0, 0, -8, 0, 0, 0, 0, 0, 0, 0, 1],
			[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
			[1, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 1],
			[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
		];
	}

	getPlayerPos(): {pos: Vector, dir: Vector} {
		for (let y = 0; y < this.grid.length; y++) {
			for (let x = 0; x < this.grid[0].length; x++) {
				if (this.grid[y][x] === 1.1) {
					return {
						pos: new Vector(x, y),
						dir: new Vector(0, -1)
					};
				}
				else if (this.grid[y][x] === 1.2) {
					return {
						pos: new Vector(x, y),
						dir: new Vector(0, 1)
					};
				}
				else if (this.grid[y][x] === 1.3) {
					return {
						pos: new Vector(x, y),
						dir: new Vector(-1, 0)
					};
				}
				else if (this.grid[y][x] === 1.4) {
					return {
						pos: new Vector(x, y),
						dir: new Vector(1, 0)
					};
				}
			}
		}
		return {
			pos: new Vector(0, 0),
			dir: new Vector(0, -1)
		};
	}
}
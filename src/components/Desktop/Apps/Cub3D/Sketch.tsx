import p5, { Vector } from "p5";
import "./Cub3D.css"

const RED = "#F4615A";
const BLACK = "#1E1F1F";
const FOV = 66;

const WALL_WIDTH = 20;
const WALL_HEIGHT = 20;

const DEFAULT_MAP_WIDTH = 20;
const DEFAULT_MAP_HEIGHT = 20;

let PREVIEW_BLOCK_WIDTH: number;
let PREVIEW_BLOCK_HEIGHT: number;

let map: Map;

// ? How to : Cub3D
	// ? Map editor
		// ? Select width and height of map
		// ? Able to place items on the grid
			// ? empty space
			// ? wall
			// ? different sprites (tbd)
	// ? Initialize map and draw it on screen
		// ? Every "block" on the map should have the same width and height (including sprites)
	// ? Initialize player
	// ? Send rays from player position facing player direction
	// ? Check ray collision
		// ? First loop to check wall collsion
			// ? Calculate ray distance and draw vertical stripe accordingly
			// ? Stop the ray from going further
		// ? Second loop for sprite detection (only look for sprites before walls)
			// ? Calculate ray distance and draw sprite with size depending on distance
	// ? Movement system
		// ? ZQSD to move
		// ? AE to rotate (or mouse ? tbd)
	

class Wall {
	width:	number;
	height:	number;

	pos:	Vector;

	constructor(pos: Vector) {
		this.width = WALL_WIDTH;
		this.height = WALL_HEIGHT;
		this.pos = pos;
	}

	leftUp(): Vector {
		return new p5.Vector(this.pos.x, this.pos.y);
	}
	leftDown(): Vector {
		return new p5.Vector(this.pos.x, this.pos.y + this.height);
	}
	rightUp(): Vector {
		return new p5.Vector(this.pos.x + this.width, this.pos.y);
	}
	rightDown(): Vector {
		return new p5.Vector(this.pos.x + this.width, this.pos.y + this.height);
	}
}

// class Player {
// 	pos:	Vector;
// 	dir:	Vector;

// 	constructor() {
// 		this.pos = new p5.Vector(3, 3);
// 		this.dir = new p5.Vector(-1, 0);
// 	}
// }

// class Ray {

// 	constructor() {
// 	}
// }

class Map {
	grid:	number[][];
	width:	number;
	height:	number;

	constructor() {
		this.width = DEFAULT_MAP_WIDTH;
		this.height = DEFAULT_MAP_HEIGHT;

		this.grid = [];
		for (let i = 0; i < this.height; i++) {
			let row = [1]; // left wall
			for (let j = 1; j < this.width - 1; j++) {
				// ? if first or last row, fill with walls
				if (i === 0 || i === this.height - 1)
					row.push(1);
				else // ? fill with empty spaces
					row.push(0);
			}
			row.push(1); // right wall
			this.grid.push(row);
		}
	}
}

// ? need to wrap p5 sketch in another function to pass arguments
export const defineSketch = (initialWidth: number, initialHeight: number) : any => {
	return (p: p5) => {
		// ? Global variables
		let canvas: any;
		let parent: any;

		let width: number;
		let height: number;

		let font: any;
		
		p.preload = () => {
			font = p.loadFont("/assets/Outfit-Regular.ttf")
		}

		// ? called once upon load
		p.setup = () => {
			parent = document.getElementById("canvas-cub3d-parent");
			canvas = p.createCanvas(initialWidth, initialHeight).parent(parent);

			p.textFont(font);
			p.frameRate(60);

			map = new Map();
		}
	
		// ? called once every frame
		p.draw = () => {
			p.clear(0, 0, 0, 0);
			p.background(0);
			
			// ? if window is quit, delete p5 sketch
			if (p.frameCount % 60 === 0 && !document.getElementById("canvas-cub3d-parent")) {
				p.remove();
				return ;
			}
			width = parent.clientWidth;
			height = parent.clientHeight;
			// ? resize canvas when window is resized
			if (width !== canvas.width || height !== canvas.height) {
				p.noLoop();
				p.resizeCanvas(width, height);
				p.loop();
			}


		}
	}
}



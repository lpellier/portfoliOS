import p5, { Vector } from "p5";
import { RED } from "../../../../../consts";
import { getCanvasPos } from "./helper";
import { PREVIEW_BLOCK_HEIGHT, PREVIEW_BLOCK_WIDTH } from "./Sketch";

export class Ray {
	pos: Vector;
	dir: Vector;
	unitStepSize: Vector;
	mapCheck: Vector;
	rayLength1D: Vector;
	step: Vector;
	dist: number;
	side: boolean;

	intersection: Vector;

	constructor(pos: Vector, dir: Vector, grid: number[][]) {
		this.pos = pos;
		this.dir = dir;
		
		this.unitStepSize = new Vector(
			Math.sqrt(1 + (this.dir.y / this.dir.x) * (this.dir.y / this.dir.x)),
			Math.sqrt(1 + (this.dir.x / this.dir.y) * (this.dir.x / this.dir.y)));
	
		this.mapCheck = new Vector(Math.floor(this.pos.x), Math.floor(this.pos.y));
		this.rayLength1D = new Vector(0, 0);
		
		this.step = new Vector(0, 0);
		this.intersection = new Vector(0, 0);

		this.dist = 0;
		this.side = false;
		this.rayCast(grid);
	}

	reset(pos: Vector, dir: Vector) {
		this.pos = pos;
		this.dir = dir;
		
		this.unitStepSize = new Vector(
			Math.sqrt(1 + (this.dir.y / this.dir.x) * (this.dir.y / this.dir.x)),
			Math.sqrt(1 + (this.dir.x / this.dir.y) * (this.dir.x / this.dir.y)));
	
		this.mapCheck = new Vector(Math.floor(this.pos.x), Math.floor(this.pos.y));
		this.rayLength1D = new Vector(0, 0);
		
		this.step = new Vector(0, 0);
		this.intersection = new Vector(0, 0);

		this.dist = 0;
		this.side = false;
	}

	rayCast(grid: number[][]) {
		this.unitStepSize = new Vector(
			Math.sqrt(1 + (this.dir.y / this.dir.x) * (this.dir.y / this.dir.x)),
			Math.sqrt(1 + (this.dir.x / this.dir.y) * (this.dir.x / this.dir.y)));
	
		this.mapCheck = new Vector(Math.floor(this.pos.x), Math.floor(this.pos.y));
		this.rayLength1D = new Vector(0, 0);
		
		this.step = new Vector(0, 0);
		this.intersection = new Vector(0, 0);

		this.dist = 0;

		if (this.dir.x < 0) {
			this.step.x = -1;
			this.rayLength1D.x = (this.pos.x - this.mapCheck.x) * this.unitStepSize.x;
		}	
		else {
			this.step.x = 1;
			this.rayLength1D.x = ((this.mapCheck.x + 1) - this.pos.x) * this.unitStepSize.x;
		}
		if (this.dir.y < 0) {
			this.step.y = -1;
			this.rayLength1D.y = (this.pos.y - this.mapCheck.y) * this.unitStepSize.y;
		}	
		else {
			this.step.y = 1;
			this.rayLength1D.y = ((this.mapCheck.y + 1) - this.pos.y) * this.unitStepSize.y;
		}

		let wallFound = false;
		let maxDistance = 100;

		while (!wallFound && this.dist < maxDistance) {
			if (this.rayLength1D.x < this.rayLength1D.y) {
				this.mapCheck.x += this.step.x;
				this.dist = this.rayLength1D.x;
				this.rayLength1D.x += this.unitStepSize.x;
				this.side = false;
			}
			else {
				this.mapCheck.y += this.step.y;
				this.dist = this.rayLength1D.y;
				this.rayLength1D.y += this.unitStepSize.y;
				this.side = true;
			}

			if (this.mapCheck.x >= 0 && this.mapCheck.x < grid[0].length &&
				this.mapCheck.y >= 0 && this.mapCheck.y < grid.length) {
				let check = grid[this.mapCheck.y][this.mapCheck.x];
				if (check >= 2) {
					wallFound = true;
				}
			}
		}

		if (wallFound)
			this.intersection = p5.Vector.add(this.pos, p5.Vector.mult(this.dir, this.dist))
		else
			console.log('dist exceeded')	
	}

	draw(p: p5) {
		let dir = getCanvasPos(this.intersection, 0, 0);
		
		p.push();
		p.stroke(RED);
		p.strokeWeight(1);
		p.line(this.pos.x * PREVIEW_BLOCK_WIDTH, this.pos.y * PREVIEW_BLOCK_HEIGHT, dir.x, dir.y);
		p.pop();
	}
}
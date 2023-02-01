import p5, { Vector } from "p5";
import { GREEN, RED } from "../../../../../consts";
import { FOV, RAY_COUNT } from "./constants";
import { degreesToRadians, perpendicularClockWise, perpendicularCounterClockWise } from "./helper";
import { Ray } from "./Ray";
import { PLAYER_RADIUS, PREVIEW_BLOCK_HEIGHT, PREVIEW_BLOCK_WIDTH } from "./constants";

export class Player {
	pos: Vector;
	dir: Vector;
	plane: Vector;

	walk_speed: number;
	rotate_speed: number;
	mouse_sensitivity: number;

	rays: Ray[];

	constructor(info: {pos: Vector, dir: Vector}, grid: number[][]) {
		this.pos = new Vector(info.pos.x + 0.5, info.pos.y + 0.5);
		this.dir = info.dir;
		this.plane = new Vector(this.dir.y * -(FOV / 100), this.dir.x * (FOV / 100));

		this.rays = [];
		this.walk_speed = 0;
		this.rotate_speed = 0;
		this.mouse_sensitivity = 0;

		for (let i = 0; i < RAY_COUNT; i++) {
			this.rays.push(new Ray(this.pos, p5.Vector.rotate(this.dir, degreesToRadians((-FOV / 2) + i * (FOV / RAY_COUNT))), grid))
		}
	}

	resetRays(grid: number[][]) {
		for (let i = 0; i < this.rays.length; i++) {
			this.rays[i].reset(this.pos, p5.Vector.rotate(this.dir, degreesToRadians((-FOV / 2) + i * (FOV / RAY_COUNT))))
		}
		this.castRays(grid);
	}

	castRays(grid: number[][]) {
		for (let i = 0; i < this.rays.length; i++) {
			this.rays[i].rayCast(grid)
		}
	}

	draw(p: p5) {
		p.push();
		p.fill(GREEN);
		p.ellipse(	this.pos.x * PREVIEW_BLOCK_WIDTH, 
					this.pos.y * PREVIEW_BLOCK_HEIGHT, 
					PLAYER_RADIUS);
		p.fill(RED);
		p.ellipse(	this.pos.x * PREVIEW_BLOCK_WIDTH, 
					this.pos.y * PREVIEW_BLOCK_HEIGHT, 
					PLAYER_RADIUS / 5);
		p.pop();
		
		for (let ray of this.rays) {
			ray.draw(p);
		}
	}

	addPos(velocity: Vector, grid: number[][]) {
		velocity.normalize();
		velocity.mult(this.walk_speed);
		let x = this.pos.x + velocity.x;
		let y = this.pos.y + velocity.y;
		if (x >= 0 && x < grid[0].length && (grid[Math.floor(this.pos.y)][Math.floor(x)] === 0 || (grid[Math.floor(this.pos.y)][Math.floor(x)] > 1 && grid[Math.floor(this.pos.y)][Math.floor(x)] < 2))) {
			this.pos.x = x;
		}
		if (y >= 0 && y < grid.length && (grid[Math.floor(y)][Math.floor(this.pos.x)] === 0 || (grid[Math.floor(y)][Math.floor(this.pos.x)] > 1 && grid[Math.floor(y)][Math.floor(this.pos.x)] < 2))) {
			this.pos.y = y;
		}
		this.castRays(grid);
	}
	rotateDir(grid: number[][], amount: number) {
		if (amount > 10)
			amount = 10;
		else if (amount < -10)
			amount = -10;
		this.dir.rotate(degreesToRadians(amount));
		this.plane.rotate(degreesToRadians(amount));
		this.resetRays(grid);
	}

	move(p: p5, grid: number[][]) {
		if (p.keyIsDown(90)) { // ? z
			this.addPos(new Vector(this.dir.x, this.dir.y), grid);
		} 
		if (p.keyIsDown(83)) { // ? s
			this.addPos(p5.Vector.mult(this.dir, -1), grid);
		}
		if (p.keyIsDown(81)) { // ? q
			this.addPos(perpendicularClockWise(this.dir), grid);
		}
		if (p.keyIsDown(68)) { // ? d
			this.addPos(perpendicularCounterClockWise(this.dir), grid);
		}
		if (p.keyIsDown(65)) { // ? a
			this.rotateDir(grid, -this.rotate_speed);
		}
		if (p.keyIsDown(69)) { // ? e
			this.rotateDir(grid, this.rotate_speed);
		}
	}
}
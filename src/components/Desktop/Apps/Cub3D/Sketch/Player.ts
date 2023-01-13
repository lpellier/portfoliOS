import p5, { Vector } from "p5";
import { GREEN, RED } from "../../../../../consts";
import { FOV, RAY_COUNT } from "./constants";
import { perpendicularClockWise, perpendicularCounterClockWise } from "./helper";
import { Ray } from "./Ray";
import { PLAYER_RADIUS, PREVIEW_BLOCK_HEIGHT, PREVIEW_BLOCK_WIDTH } from "./Sketch";

export class Player {
	pos: Vector;
	dir: Vector;

	walk_speed: number;
	rotate_speed: number;
	mouse_sensitivity: number;

	rays: Ray[];
	// rays

	constructor(pos: Vector, p: p5, grid: number[][]) {
		this.pos = p.createVector(pos.x + 0.5, pos.y + 0.5);
		this.dir = new Vector(0, -1);

		this.rays = [];
		this.walk_speed = 10;
		this.rotate_speed = 5;
		this.mouse_sensitivity = 5;

		this.resetRays(p, grid);
	}

	resetRays(p: p5, grid: number[][]) {
		this.rays = [];
		console.log(p5.Vector.rotate(this.dir, p.radians((-FOV / 2) + 0 * (FOV / RAY_COUNT))))
		console.log(p5.Vector.rotate(this.dir, p.radians((-FOV / 2) + (RAY_COUNT - 1) * (FOV / RAY_COUNT))))
		for (let i = 0; i < RAY_COUNT; i++) {
			this.rays.push(new Ray(this.pos, p5.Vector.rotate(this.dir, p.radians((-FOV / 2) + i * (FOV / RAY_COUNT))), grid))
		}
	}

	draw(p: p5, w: number, h: number) {
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

	addPos(velocity: Vector, grid: number[][]): boolean {
		let x = Math.floor(this.pos.x + velocity.x);
		let y = Math.floor(this.pos.y + velocity.y); 
		if (x >= 0 && x < grid[0].length && y > 0 && y < grid.length && grid[y][x] !== 1) {
			let vel = velocity;
			vel.normalize();
			vel.mult(this.walk_speed);
			this.pos.add(vel);
			return true;
		}
		return false;
	}
	rotateDir(p: p5, grid: number[][], amount: number): boolean {
		if (amount > 10)
			amount = 10;
		else if (amount < -10)
			amount = -10;
		this.dir.rotate(p.radians(amount));
		this.resetRays(p, grid);
		return true;
	}

	move(p: p5, grid: number[][]) { // ! collisions
		let move = false;
		if (p.keyIsDown(90)) { // ? z! +speed
			move = this.addPos(this.dir, grid);
		} 
		if (p.keyIsDown(83)) { // ? s ! -speed // both forward and backward seem to occur
			move = this.addPos(p5.Vector.mult(this.dir, -1), grid);
		}
		if (p.keyIsDown(81)) { // ? q // ! -speed
			move = this.addPos(perpendicularClockWise(this.dir), grid);
		}
		if (p.keyIsDown(68)) { // ? d ! -speed
			move = this.addPos(perpendicularCounterClockWise(this.dir), grid);
		}
		if (p.keyIsDown(65)) { // ? a
			move = this.rotateDir(p, grid, -this.rotate_speed);
		}
		if (p.keyIsDown(69)) { // ? e
			move = this.rotateDir(p, grid, this.rotate_speed);
		}
		if (move) { // ? recalculate rays
			for (let ray of this.rays) {
				ray.rayCast(grid);
			}
		}
	}
}
import p5 from "p5";
import "styles/Cub3D.css"
import { BLACK } from "../../../../../consts";
import { drawBorder, drawFPS, drawSketch } from "./draw";
import { Map } from "./Map";
import { Player } from "./Player";

export let PREVIEW_BLOCK_WIDTH = 10;
export let PREVIEW_BLOCK_HEIGHT = 10;
export let PLAYER_RADIUS = PREVIEW_BLOCK_WIDTH;

const WALK_SPEED = 0.0015;
const ROTATE_SPEED = 0.075;

const MOUSE_SENSITIVITY = 0.0025;

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

// ? need to wrap p5 sketch in another function to pass arguments
export const defineSketch = (initialWidth: number, initialHeight: number) : any => {
	return (p: p5) => {
		// ? Global variables
		let canvas: any;
		let parent: any;

		let width: number;
		let height: number;

		let font: any;

		let oldTime: number;
		let time: number;

		let frameTime: number;
		let frameRate: number;
		
		// ? Game variables
		let map: Map;
		let player: Player;

		
		p.preload = () => {
			font = p.loadFont("/assets/Outfit-Regular.ttf")
		}

		// ? called once upon load
		p.setup = () => {
			initializeVariables();
		}

		// ? called once every frame
		p.draw = () => {
			p.clear(0, 0, 0, 0);
			p.background(BLACK);

			calculateFrameTime();
			// ? if window is quit, delete p5 sketch
			if (!document.getElementById("canvas-cub3d-parent")) {
				p.remove();
				return ;
			}
			width = parent.clientWidth;
			height = parent.clientHeight;
			// ? resize canvas when window is resized
			if (width !== canvas.width || height !== canvas.height) {
				updateVariables();
			}
			
			player.move(p, map.grid);
			drawSketch(p, map.grid, player, width, height); 
			map.draw(p);
			player.draw(p, width, height);
			if (p.frameCount % 15 === 0) {
				frameRate = (1 / frameTime);
				player.walk_speed = WALK_SPEED * frameRate;
				player.rotate_speed = ROTATE_SPEED * frameRate;
				player.mouse_sensitivity = MOUSE_SENSITIVITY * frameRate;
			}
			drawFPS(p, player, frameRate, frameTime, width);
			drawBorder(p, width, height);
		}

		p.mouseMoved = () => {
			player.rotateDir(p, map.grid, p.movedX * player.mouse_sensitivity);	
		}
		
		const initializeVariables = () => {
			parent = document.getElementById("canvas-cub3d-parent");
			canvas = p.createCanvas(initialWidth, initialHeight).parent(parent);

			// ? Locks the mouse to be able to move the camera freely
			p.requestPointerLock();

			p.textFont(font);
			p.frameRate(60);
			
			frameTime = 0;
			frameRate = 0;

			map = new Map();

			let saved_map = localStorage.getItem("cub3d-map");
			if (saved_map) {
				map.grid = JSON.parse(saved_map);
			}
			else {
				// ? set default map
			}

			player = new Player(map.getPlayerPos(), p, map.grid);

			updateVariables();
		}
		
		const updateVariables = () => {
			p.noLoop();
			width = parent.clientWidth;
			height = parent.clientHeight;
			p.resizeCanvas(width, height);
			PREVIEW_BLOCK_WIDTH = width * 0.015;
			PREVIEW_BLOCK_HEIGHT = PREVIEW_BLOCK_WIDTH;
			PLAYER_RADIUS = PREVIEW_BLOCK_WIDTH;	
			p.loop();
		} 
		
		const calculateFrameTime = () => {
			oldTime = time;
			time = p.millis();
			frameTime = (time- oldTime) / 1000;
		}

	}
}



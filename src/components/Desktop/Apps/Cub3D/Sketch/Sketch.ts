import p5 from "p5";
import "styles/Cub3D.css"
import { BLACK } from "../../../../../consts";
import { RAY_COUNT, TEX_HEIGHT, TEX_WIDTH } from "./constants";
import { drawFPS } from "./draw";
import { Map } from "./Map";
import { Player } from "./Player";

export let PREVIEW_BLOCK_WIDTH = 10;
export let PREVIEW_BLOCK_HEIGHT = 10;
export let PLAYER_RADIUS = PREVIEW_BLOCK_WIDTH;

const WALK_SPEED = 0.0015;
const ROTATE_SPEED = 0.075;

const RAYCASTER_WIDTH = 300;
const RAYCASTER_HEIGHT = 182;

const MOUSE_SENSITIVITY = 0.0025;

// ? On map editor, select a wall tile and preview it in 3d with textures on walls
// ? Player should have a width on map for collisions with wall

// ? need to wrap p5 sketch in another function to pass arguments
export const defineSketch = (initialWidth: number, initialHeight: number) : any => {
	return (p: p5) => {
		// ? Global variables
		let canvas: any;
		let raycaster: any;
		let parent: any;

		let font: any;

		let oldTime: number;
		let time: number;

		let frameTime: number;
		let frameRate: number;

		let sprites: p5.Image[];
		let textures: p5.Image[];
		let spritedata : any;
		let spritesheet : p5.Image;
		let texturedata : any;
		let texturesheet : p5.Image;
		
		// ? Game variables
		let map: Map;
		let player: Player;

		p.preload = () => {
			font = p.loadFont("/assets/Outfit-Regular.ttf");
			spritedata = p.loadJSON("/assets/sprites/wolf-objects.json");
			spritesheet = p.loadImage("/assets/sprites/wolf-objects.png");
			texturedata = p.loadJSON("/assets/textures/wolf-walls.json");
			texturesheet = p.loadImage("/assets/textures/wolf-walls.png");
		}

		// ? called once upon load
		p.setup = () => {
			initializeVariables();
		}

		// ? called once every frame
		p.draw = () => {
			p.clear(0, 0, 0, 0);

			calculateFrameTime();
			// ? if window is quit, delete p5 sketch
			if (!document.getElementById("canvas-cub3d-parent")) {
				p.remove();
				return ;
			}
			// ? resize canvas when window is resized
			if (parent.clientWidth !== canvas.width || parent.clientHeight !== canvas.height) {
				updateVariables(parent.clientWidth, parent.clientHeight);
			}
			
			if (p.frameCount % 15 === 0) {
				frameRate = (1 / frameTime);
				player.walk_speed = WALK_SPEED * frameRate;
				player.rotate_speed = ROTATE_SPEED * frameRate;
				player.mouse_sensitivity = MOUSE_SENSITIVITY * frameRate;
			}
			player.move(p, map.grid);

			raycaster.loadPixels();
			drawSketch(); 
			raycaster.updatePixels();

			p.image(raycaster, 0, 0, canvas.width, canvas.height, 0, 0)
			

			map.draw(p);
			player.draw(p);
			drawFPS(p, frameRate);
		}

		p.mouseMoved = () => {
			if (player)
				player.rotateDir(map.grid, p.movedX * player.mouse_sensitivity);	
		}

		const drawSketch = () => {
			let texture: p5.Image;
			let rayWidth = Math.floor(raycaster.width / RAY_COUNT);

			clearPixels();
			for (let i = 0; i < player.rays.length; i += 1) {
				let ray = player.rays[i];
				let perpWallDist: number;
				let textureNum = (map.grid[ray.mapCheck.y][ray.mapCheck.x] * 2) - 2;
				if (ray.side === true) {
					perpWallDist = ray.rayLength1D.y - ray.unitStepSize.y;
					textureNum++;
				} else {
					perpWallDist = ray.rayLength1D.x - ray.unitStepSize.x;
				}
				let lineHeight = Math.floor(raycaster.height / perpWallDist);
				let drawStart = Math.floor(-lineHeight / 2 + raycaster.height / 2);
				let drawEnd = Math.floor(lineHeight / 2 + raycaster.height / 2);
				if (drawStart < 0) drawStart = 0;
				if (drawEnd >= raycaster.height) drawEnd = raycaster.height - 1;
		
				// ? working untextured raycaster
				// p.push();
				// p.stroke(BLUE);
				// p.strokeWeight(rayWidth);
				// p.fill(BLUE)
				// p.line(i * rayWidth, drawStart, i * rayWidth, drawEnd)
				// p.pop();
		
				texture = textures[textureNum];
				let wallX: number;
				if (ray.side === false) {
					wallX = ray.pos.y + perpWallDist * ray.dir.y;
				} else {
					wallX = ray.pos.x + perpWallDist * ray.dir.x;	
				}
				wallX -= Math.floor(wallX);
				let textureX = Math.floor(wallX * TEX_WIDTH);
				if ((ray.side === false && ray.dir.x > 0) || (ray.side === true && ray.dir.y < 0)) 
					textureX = TEX_WIDTH - textureX - 1;
		
				let step = TEX_HEIGHT / lineHeight;
				let texturePos = (drawStart - raycaster.height / 2 + lineHeight / 2) * step;
				for (let y = drawStart; y < drawEnd; y++) {
					let textureY = Math.floor(texturePos);
					texturePos += step;
					let textureColor = getPixelColor(texture, {x: textureX, y: textureY});
					for (let j = 0; j < rayWidth; j++) {
						let x = Math.floor(i * rayWidth + j);
						setPixel({x: x, y: y}, textureColor)
					}
				}
			}
		}

		const getPixelColor = (texture: p5.Image, pos: {x: number, y: number}) => {
			let index = 4 * (pos.y * texture.width + pos.x);
			let pixels = texture.pixels;
			return {
				r: pixels[index + 0],
				g: pixels[index + 1],
				b: pixels[index + 2],
				a: pixels[index + 3]
			}
		}

		const clearPixels = () => {
			for (let x = 0; x < raycaster.width; x++) {
				for (let y = 0; y < raycaster.height; y++) {
					setPixel({x: x, y: y}, {r: 0, g: 0, b: 0, a: 0});
				}
			}
		}

		const setPixel = (pos: {x: number, y: number}, color: {r: number, g: number, b: number, a: number}) => {
			const index = 4 * (pos.y * raycaster.width + pos.x);
			raycaster.pixels[index]		= color.r;
			raycaster.pixels[index + 1]	= color.g;
			raycaster.pixels[index + 2]	= color.b;
			raycaster.pixels[index + 3]	= color.a;
		}

		const getSprites = () => {
			let spr = spritedata.sprites;

			sprites = [];
			for (let i = 0; i < spr.length; i++) {
				let pos = spr[i].position;
				let img = spritesheet.get(pos.x, pos.y, pos.w, pos.h);
				sprites.push(img);	
				sprites[i].loadPixels();
			}
		}

		const getTextures = () => {
			let tex = texturedata.textures;

			textures = [];
			for (let i = 0; i < tex.length; i++) {
				let pos = tex[i].position;
				let img = texturesheet.get(pos.x, pos.y, pos.w, pos.h);
				textures.push(img);	
				textures[i].loadPixels();
			}
		}

		// ? create a canvas just for raycasting (createGraphics), then upscale it with image 

		const initializeVariables = () => {
			parent = document.getElementById("canvas-cub3d-parent");
			canvas = p.createCanvas(initialWidth, initialHeight).parent(parent);

			raycaster = p.createGraphics(RAYCASTER_WIDTH, RAYCASTER_HEIGHT)
			
			// ? Set pixel density to 1 to reduce computation
			raycaster.pixelDensity(1);
			
			// ? disabling friendly errors enhances performance
			// p.disableFriendlyErrors = true;

			getSprites();
			getTextures();
	
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

			updateVariables(initialWidth, initialHeight);
		}
		
		const updateVariables = (width: number, height: number) => {
			p.noLoop();
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



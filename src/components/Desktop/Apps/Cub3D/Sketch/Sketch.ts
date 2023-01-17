import p5, { Vector } from "p5";
import "styles/Cub3D.css"
import { BLACK } from "../../../../../consts";
import { FOV, MOUSE_SENSITIVITY, RAYCASTER_HEIGHT, RAYCASTER_WIDTH, RAY_COUNT, ROTATE_SPEED, TEX_HEIGHT, TEX_WIDTH, WALK_SPEED } from "./constants";
import { drawFPS } from "./draw";
import { degreesToRadians, perpendicularClockWise, perpendicularCounterClockWise } from "./helper";
import { Map } from "./Map";
import { Player } from "./Player";

export let PREVIEW_BLOCK_WIDTH = 10;
export let PREVIEW_BLOCK_HEIGHT = 10;
export let PLAYER_RADIUS = PREVIEW_BLOCK_WIDTH;

interface Sprite {
	x:			number,
	y:			number,
	texture:	number
}

// ? On map editor, select a wall tile and preview it in 3d with textures on walls
// ? Player should have a width on map for collisions with wall

// ? need to wrap p5 sketch in another function to pass arguments
export const defineSketch = (initialWidth: number, initialHeight: number) : any => {
	return (p: p5) => {
		// ? Global variables
		let canvas:		any;
		let raycaster:	any;
		let parent:		any;

		let font:		any;

		let oldTime:	number;
		let time:		number;

		let frameTime: number;
		let frameRate: number;

		let sprites:	p5.Image[];
		let textures:	p5.Image[];
		
		let floor_texture:		p5.Image; // ? wood
		let ceiling_texture:	p5.Image; // ? stone

		let spritedata :	any;
		let texturedata :	any;
		let spritesheet :	p5.Image;
		let texturesheet :	p5.Image;
		
		// ? Game variables
		let map:	Map;
		let player:	Player;

		let ZBuffer: number[];
		let visibleSprites: Sprite[];
		let spriteOrder: number[];
		let spriteDistance: number[];

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
			}
			// ? resize canvas when window is resized
			if (parent.clientWidth !== canvas.width || parent.clientHeight !== canvas.height) {
				updateVariables(parent.clientWidth, parent.clientHeight);
			}
			
			player.move(p, map.grid);

			raycaster.loadPixels();
			clearPixels();
			floorAndCeilCasting();
			rayCasting(); 
			spriteCasting();
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

		const spriteCasting = () => {
			for (let i = 0; i < visibleSprites.length; i++) {
				spriteOrder[i] = i;
				spriteDistance[i] = ((player.pos.x - visibleSprites[i].x) * (player.pos.x - visibleSprites[i].x) + (player.pos.y - visibleSprites[i].y) * (player.pos.y - visibleSprites[i].y))
			}
			sortSprites();
		
			for (let i = 0; i < visibleSprites.length; i++) {
				let sprite = new Vector(
					visibleSprites[spriteOrder[i]].x - player.pos.x,
					visibleSprites[spriteOrder[i]].y - player.pos.y
					);
				
				let invDet = 1.0 / (player.plane.x * player.dir.y - player.dir.x * player.plane.y)

				let transform = new Vector(
					invDet * (player.dir.y * sprite.x - player.dir.x * sprite.y),
					invDet * (-player.plane.y * sprite.x + player.plane.x * sprite.y)
				)

				let spriteScreenX = Math.floor((raycaster.width / 2) * (1 + transform.x / transform.y))
				
				let spriteHeight = Math.abs(Math.floor(raycaster.height / transform.y))
				let drawStartY = -spriteHeight / 2 + raycaster.height / 2;
				if (drawStartY < 0) drawStartY = 0;
				let drawEndY = spriteHeight / 2 + raycaster.height / 2;
				if (drawEndY >= raycaster.height) drawEndY = raycaster.height - 1;

				let spriteWidth = Math.abs(Math.floor(raycaster.height / transform.y))
				let drawStartX = -spriteWidth / 2 + spriteScreenX;
				if (drawStartX < 0) drawStartX = 0;
				let drawEndX = spriteWidth / 2 + spriteScreenX;
				if (drawEndX >= raycaster.width) drawEndX = raycaster.width - 1;

				for (let stripe = drawStartX; stripe < drawEndX; stripe++) {
					let textureX = Math.floor(256 * (stripe - (-spriteWidth / 2 + spriteScreenX)) * TEX_WIDTH / spriteWidth) / 256;

					if (transform.y > 0 && stripe > 0 && stripe < raycaster.width && transform.y < ZBuffer[stripe]) {
						for (let y = drawStartY; y < drawEndY; y++) {
							let d = y * 256 - raycaster.height * 128 + spriteHeight * 128;
							let textureY = ((d * TEX_HEIGHT) / spriteHeight) / 256;
							let color = getPixelColor(sprites[visibleSprites[spriteOrder[i]].texture], {x: textureX, y: textureY});
							setPixelInRaycaster({x: stripe, y: y}, color);
						}
					}
				}
			}
		}

		const sortSprites = () => {
			for (let i = 0; i < visibleSprites.length; i++) {
				for (let j = i + 1; j < visibleSprites.length; j++) {
					if (spriteDistance[i] < spriteDistance[j]) {
						let tmpDist = spriteDistance[i];
						let tmpOrder = spriteOrder[i];
						spriteDistance[i] = spriteDistance[j];
						spriteOrder[i] = spriteOrder[j];
						spriteDistance[j] = tmpDist;
						spriteOrder[j] = tmpOrder;
					}
				}
			}
		}

		const floorAndCeilCasting = () => {
			for (let y = 0; y < raycaster.height; y++) {
				let left_ray_dir = p5.Vector.sub(player.dir, player.plane);
				let right_ray_dir = p5.Vector.add(player.dir, player.plane);

				let posY = y - raycaster.height / 2;

				let posZ = 0.5 * raycaster.height;

				let row_distance = posZ / posY;

				let floor_step = new Vector(
					row_distance * (right_ray_dir.x - left_ray_dir.x) / raycaster.width,
					row_distance * (right_ray_dir.y - left_ray_dir.y) / raycaster.width
				);

				let floor = new Vector(
					player.pos.x + row_distance * left_ray_dir.x,
					player.pos.y + row_distance * left_ray_dir.y
				);

				for (let x = 0; x < raycaster.width; x++) {
					let cell = new Vector(
						Math.floor(floor.x),
						Math.floor(floor.y)
					);

					let t = new Vector(
						Math.floor(TEX_WIDTH * (floor.x - cell.x)) & (TEX_WIDTH - 1),
						Math.floor(TEX_HEIGHT * (floor.y - cell.y)) & (TEX_HEIGHT - 1)
					);

					floor.add(floor_step);

					let color: {r: number, g: number, b: number, a: number};

					color = getPixelColor(floor_texture, {x: t.x, y: t.y});
					setPixelInRaycaster({x: x, y: y}, color);

					color = getPixelColor(ceiling_texture, {x: t.x, y: t.y});
					setPixelInRaycaster({x: x, y: raycaster.height - y - 1}, color);
				}
			}
		}

		const rayCasting = () => {
			let texture: p5.Image;
			let rayWidth = raycaster.width / RAY_COUNT;

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
						setPixelInRaycaster({x: x, y: y}, textureColor)
					}
				}
				ZBuffer[i] = perpWallDist;
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
					setPixelInRaycaster({x: x, y: y}, {r: 0, g: 0, b: 0, a: 0});
				}
			}
		}

		const setPixelInRaycaster = (pos: {x: number, y: number}, color: {r: number, g: number, b: number, a: number}) => {
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
				img.resize(TEX_WIDTH, TEX_HEIGHT);
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
			p.frameRate(30);

			frameTime = 0.02;
			frameRate = 30;
			
			map = new Map();

			// let saved_map = localStorage.getItem("cub3d-map");
			let saved_map = null;
			if (saved_map) {
				map.grid = JSON.parse(saved_map);
			}
			else {
				map.defaultMap();
			}

			player = new Player(map.getPlayerPos(), map.grid);

			player.walk_speed = WALK_SPEED * frameTime;
			player.rotate_speed = ROTATE_SPEED * frameTime;
			player.mouse_sensitivity = MOUSE_SENSITIVITY * frameTime;

			floor_texture = textures[69];
			ceiling_texture = textures[23];

			initializeSprites();

			updateVariables(initialWidth, initialHeight);
		}

		const initializeSprites = () => {
			visibleSprites = [];

			for (let y = 0; y < map.grid.length; y++) {
				for (let x = 0; x < map.grid[y].length; x++) {
					let check = map.grid[y][x];
					if (check < 0) {
						visibleSprites.push({x: x + 0.5, y: y + 0.5, texture: check * -1});
					}
				}
			}

			ZBuffer = [];
			for (let i = 0; i < raycaster.width; i++) {
				ZBuffer.push(0);
			}

			spriteOrder = [];
			for (let i = 0; i < visibleSprites.length; i++) {
				spriteOrder.push(0);
			}
			
			spriteDistance = [];
			for (let i = 0; i < visibleSprites.length; i++) {
				spriteDistance.push(0);
			}
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
			frameTime = (time - oldTime) / 1000;
			frameRate = (1 / frameTime);
		}

	}
}



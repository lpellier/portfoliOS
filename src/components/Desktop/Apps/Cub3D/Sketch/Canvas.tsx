import p5, { Vector } from "p5";
import { useEffect, useRef, useState } from "react";
import "styles/Canvas.css"
import { RAYCASTER_WIDTH, RAYCASTER_HEIGHT, RAY_COUNT, TEX_WIDTH, TEX_HEIGHT, WALK_SPEED, ROTATE_SPEED, MOUSE_SENSITIVITY, SPRITE_WIDTH, SPRITE_HEIGHT } from "./constants";
import { perpendicularClockWise, perpendicularCounterClockWise } from "./helper";
import { Map } from "./Map";
import { Player } from "./Player";
import texturesData from "../walls.json"
import spritesData from "../objects.json"

const TEX_SHEET_WIDTH = 384;
const TEX_SHEET_HEIGHT = 1216;

const SPR_SHEET_WIDTH = 324;
const SPR_SHEET_HEIGHT = 665;

interface Sprite {
	x:			number,
	y:			number,
	texture:	number
}

let canvas : HTMLCanvasElement | null;
let context: CanvasRenderingContext2D | null;
let frameCount : number;
let frameTime : number;
let frameRate : number;
let time: number;
let oldTime: number;
let animationFrameId: number;
let map: Map;
let player: Player;
let canvasData: ImageData;
let textures: Uint8ClampedArray[];
let sprites: Uint8ClampedArray[];
let floor_texture: Uint8ClampedArray;
let ceil_texture: Uint8ClampedArray;

let walking: string;

// ? sprites
let ZBuffer: number[];
let visibleSprites: Sprite[];
let spriteOrder: number[];
let spriteDistance: number[];

// const printMap = () => {
// 	let str = "";
// 	str += "grid = [\n"
// 	for (let y of map.grid) {
// 		str += "[ "
// 		for (let x of y) {
// 			str += x + ", ";
// 		}
// 		str += "],\n";
// 	}
// 	str += "];";
// 	console.log(str)
// } 

const setPixelInCanvas = (pos: {x: number, y: number}, color: {r: number, g: number, b: number, a: number}) => {
    if (!context)
        return;
    let index = 4 * (pos.y * context.canvas.width + pos.x);
    canvasData.data[index] = color.r;
    canvasData.data[index + 1] = color.g;
    canvasData.data[index + 2] = color.b;
    canvasData.data[index + 3] = color.a;  
}

const getPixelColor = (texture: Uint8ClampedArray, pos: {x: number, y: number}) => {
    let index = 4 * (pos.y * TEX_WIDTH + pos.x);
    return {
        r: texture[index],
        g: texture[index + 1],
        b: texture[index + 2],
        a: texture[index + 3]
    }
}

const getTextures = () => {
    textures = [];
    let texData = texturesData.textures;
    
    let cv = document.createElement('canvas');
    cv.width = TEX_SHEET_WIDTH;
    cv.height = TEX_SHEET_HEIGHT;
    let ctx = cv.getContext('2d');
    if (!ctx)
        return ;
    let texturesSheet = new Image();
    texturesSheet.src = `${process.env.PUBLIC_URL}/assets/textures/walls.png`;
    texturesSheet.crossOrigin = 'anonymous';
    texturesSheet.onload = () => {
        if (!ctx)
            return;
        ctx.drawImage(texturesSheet, 0, 0);
        for (let i = 0; i < texData.length; i++) {
            let frame = texData[i].frame;
            let img = ctx.getImageData(frame.x, frame.y, frame.w, frame.h).data;
            textures.push(img);
        }
        cv.remove();
    }
}
const getSprites = () => {
    sprites = [];
    let spriteData = spritesData.sprites;
    
    let cv = document.createElement('canvas');
    cv.width = SPR_SHEET_WIDTH;
    cv.height = SPR_SHEET_HEIGHT;
    let ctx = cv.getContext('2d');
    if (!ctx)
        return ;
    let spritesSheet = new Image();
    spritesSheet.src = `${process.env.PUBLIC_URL}/assets/sprites/objects.png`;
    spritesSheet.crossOrigin = 'anonymous';
    spritesSheet.onload = () => {
        if (!ctx)
            return;
        ctx.drawImage(spritesSheet, 0, 0);
        for (let i = 0; i < spriteData.length; i++) {
            let frame = spriteData[i].frame;
            let img = ctx.getImageData(frame.x, frame.y, frame.w, frame.h).data;
            sprites.push(img);
        }
        cv.remove();
    }
}

const floorAndCeilCasting = () => {
    for (let y = 0; y < RAYCASTER_HEIGHT; y++) {
        let left_ray_dir = {
            x: player.dir.x - player.plane.x,
            y: player.dir.y - player.plane.y
        }
        let right_ray_dir = {
            x: player.dir.x + player.plane.x,
            y: player.dir.y + player.plane.y
        }
        let posY = y - RAYCASTER_HEIGHT / 2;

        let posZ = 0.5 * RAYCASTER_HEIGHT;

        let row_distance = posZ / posY;

        let floor_step = {
            x: row_distance * (right_ray_dir.x - left_ray_dir.x) / RAYCASTER_WIDTH,
            y: row_distance * (right_ray_dir.y - left_ray_dir.y) / RAYCASTER_WIDTH
        }

        let floor = {
            x: player.pos.x + row_distance * left_ray_dir.x,
            y: player.pos.y + row_distance * left_ray_dir.y
        }

        for (let x = 0; x < RAYCASTER_WIDTH; x++) {
            let cell = {
                x: Math.floor(floor.x),
                y: Math.floor(floor.y)
            }

            let t = {
                x: Math.floor(TEX_WIDTH * (floor.x - cell.x)) & (TEX_WIDTH - 1),
                y: Math.floor(TEX_HEIGHT * (floor.y - cell.y)) & (TEX_HEIGHT - 1)
            }

            floor.x += floor_step.x;
            floor.y += floor_step.y;

            let color: {r: number, g: number, b: number, a: number};

            color = getPixelColor(floor_texture, {x: t.x, y: t.y});
            setPixelInCanvas({x: x, y: y}, color);

            color = getPixelColor(ceil_texture, {x: t.x, y: t.y});
            setPixelInCanvas({x: x, y: RAYCASTER_HEIGHT - y - 1}, color);
        }
    }
}

const rayCasting = () => {
    let texture: Uint8ClampedArray;
    let rayWidth = RAYCASTER_WIDTH / RAY_COUNT;

    for (let i = 0; i < player.rays.length; i += 1) {
        let ray = player.rays[i];
        let perpWallDist: number;
        let textureNum = ((map.grid[ray.mapCheck.y][ray.mapCheck.x] - 2) * 2);
        if (ray.side === true) {
            perpWallDist = ray.rayLength1D.y - ray.unitStepSize.y;
            if (textureNum + 1 < textures.length) {
				textureNum++;
			}
				
        } else {
            perpWallDist = ray.rayLength1D.x - ray.unitStepSize.x;
        }
        let lineHeight = Math.floor(RAYCASTER_HEIGHT / perpWallDist);
        let drawStart = Math.floor(-lineHeight / 2 + RAYCASTER_HEIGHT / 2) + 1;
        let drawEnd = Math.floor(lineHeight / 2 + RAYCASTER_HEIGHT / 2);
        if (drawStart < 0) drawStart = 0;
        if (drawEnd >= RAYCASTER_HEIGHT) drawEnd = RAYCASTER_HEIGHT - 1;

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
        let texturePos = (drawStart - RAYCASTER_HEIGHT / 2 + lineHeight / 2) * step;
        for (let y = drawStart; y < drawEnd; y++) {
            let textureY = Math.floor(texturePos);
            texturePos += step;
            let textureColor = getPixelColor(texture, {x: textureX, y: textureY});
            for (let j = 0; j < rayWidth; j++) {
                let x = Math.floor(i * rayWidth + j);
                setPixelInCanvas({x: x, y: y}, textureColor)
            }
        }
        ZBuffer[i] = perpWallDist;
    }
}

const spriteCasting = () => {
	for(let i = 0; i < visibleSprites.length; i++)
	{
		spriteOrder[i] = i;
		spriteDistance[i] = ((player.pos.x - visibleSprites[i].x) * (player.pos.x - visibleSprites[i].x) + (player.pos.y - visibleSprites[i].y) * (player.pos.y - visibleSprites[i].y)); //sqrt not taken, unneeded
	}
	sortSprites();

	//after sorting the sprites, do the projection and draw them
	for(let i = 0; i < visibleSprites.length; i++) {
		//translate visibleSprites position to relative to camera
		let spriteX = visibleSprites[spriteOrder[i]].x - player.pos.x;
		let spriteY = visibleSprites[spriteOrder[i]].y - player.pos.y;

		//transform sprite with the inverse camera matrix
		// [ planeX	 dirX ] -1										 [ dirY		-dirX ]
		// [				 ]		 =	1/(planeX*dirY-dirX*planeY) *	 [				 ]
		// [ planeY	 dirY ]											[ -planeY	planeX ]

		let invDet = 1.0 / (player.plane.x * player.dir.y - player.dir.x * player.plane.y); //required for correct matrix multiplication

		let transformX = invDet * (player.dir.y * spriteX - player.dir.x * spriteY);
		let transformY = invDet * (-player.plane.y * spriteX + player.plane.x * spriteY); //this is actually the depth inside the screen, that what Z is in 3D

		let spriteScreenX = Math.floor((RAYCASTER_WIDTH / 2) * (1 + transformX / transformY));

		//calculate height of the sprite on screen
		let spriteHeight = Math.abs(Math.floor(RAYCASTER_HEIGHT / (transformY))); //using 'transformY' instead of the real distance prevents fisheye
		//calculate lowest and highest pixel to fill in current stripe
		let drawStartY = Math.floor(-spriteHeight / 2 + RAYCASTER_HEIGHT / 2);
		if(drawStartY < 0) drawStartY = 0;
		let drawEndY = Math.floor(spriteHeight / 2 + RAYCASTER_HEIGHT / 2);
		if(drawEndY >= RAYCASTER_HEIGHT) drawEndY = RAYCASTER_HEIGHT - 1;

		//calculate width of the sprite
		let spriteWidth = Math.abs(Math.floor (RAYCASTER_HEIGHT / (transformY)));
		let drawStartX = Math.floor(-spriteWidth / 2 + spriteScreenX);
		if(drawStartX < 0) drawStartX = 0;
		let drawEndX = Math.floor(spriteWidth / 2 + spriteScreenX);
		if(drawEndX >= RAYCASTER_WIDTH) drawEndX = RAYCASTER_WIDTH;

		//loop through every vertical stripe of the sprite on screen
		for(let stripe = drawStartX; stripe < drawEndX; stripe++)
		{
			let texX = Math.floor((stripe - (-spriteWidth / 2 + spriteScreenX)) * SPRITE_WIDTH / spriteWidth);
			if (texX < 0) texX = 0;
			if (texX >= SPRITE_WIDTH) texX = SPRITE_WIDTH - 1;
			if(transformY > 0 && transformY < ZBuffer[Math.floor(stripe / (RAYCASTER_WIDTH / RAY_COUNT))]) {
				for(let y = drawStartY; y < drawEndY; y++) //for every pixel of the current stripe
				{
					let d = Math.floor(y * 256 - RAYCASTER_HEIGHT * 128 + spriteHeight * 128); //256 and 128 factors to avoid floats
					let texY = Math.floor(((d * SPRITE_HEIGHT) / spriteHeight) / 256);
					if (texY < 0) texY = 0;
					if (texY >= SPRITE_HEIGHT) texY = SPRITE_HEIGHT - 1;
					let color = getPixelColor(sprites[visibleSprites[spriteOrder[i]].texture], {x: texX, y: texY})
                    if (!((color.r === 149 && color.g === 20 && color.b === 129) || (color.r === 151 && color.g === 12 && color.b === 133))) {
						setPixelInCanvas({x: stripe, y: y}, color);
					}
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

const preload = () => {
    getTextures();
    getSprites();
}

const keyDownHandler = (e: KeyboardEvent) => {
    
    if (walking.indexOf(e.key) === -1 && (e.key === 'w' || e.key === 'z' || e.key === 's' || e.key === 'q' || e.key === 'a' || e.key === 'd' || e.key === 'e')) {
        walking += e.key;
    }
}

const keyUpHandler = (e: KeyboardEvent) => {
    if (walking.indexOf(e.key) !== -1) {
        walking = walking.replaceAll(e.key, '');
    }
}

const setup = () => {
    if (!context || !canvas)
        return;
    frameCount = 0;
    floor_texture = textures[6];
    ceil_texture = textures[15];
    map = new Map();
	let saved_map = localStorage.getItem("cub3d-map");
	if (saved_map) {
		map.grid = JSON.parse(saved_map);
	}
	else {
		map.defaultMap();
	}
    initializeSprites();
    canvasData = context.getImageData(0, 0, context.canvas.width, context.canvas.height);
    player = new Player(map.getPlayerPos(), map.grid);
    player.walk_speed = WALK_SPEED;
    player.rotate_speed = ROTATE_SPEED;
    player.mouse_sensitivity = MOUSE_SENSITIVITY;
    walking = "";
}


const initializeSprites = () => {
    visibleSprites = [];

    for (let y = 0; y < map.grid.length; y++) {
        for (let x = 0; x < map.grid[y].length; x++) {
            let check = map.grid[y][x];
            if (check < 0) {
                visibleSprites.push({x: x + 0.5, y: y + 0.5, texture: (check + 3) * -1});
            }
        }
    }

    ZBuffer = [];
    for (let i = 0; i < RAY_COUNT; i++) {
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

const draw = () => {
    if (!context)
        return;

    if (walking.length > 0) {
        let walking_direction = new Vector(0, 0);
        if (walking.includes('z')) walking_direction.add(new Vector(player.dir.x, player.dir.y))
        if (walking.includes('s')) walking_direction.add(p5.Vector.mult(player.dir, -1))
        if (walking.includes('q')) walking_direction.add(perpendicularClockWise(player.dir))
        if (walking.includes('d')) walking_direction.add(perpendicularCounterClockWise(player.dir))
		if (walking.includes('a')) player.rotateDir(map.grid, -player.rotate_speed)
		if (walking.includes('e')) player.rotateDir(map.grid, player.rotate_speed);	
        player.addPos(walking_direction, map.grid)
    } 

    context.clearRect(0, 0, context.canvas.width, context.canvas.height)
    floorAndCeilCasting();
    rayCasting();
    spriteCasting();
    context.putImageData(canvasData, 0, 0)
}

const Canvas = () => {
	const [frameRate, setFrameRate] = useState<number>(0);
    const canvasRef = useRef<(HTMLCanvasElement | null)>(null);

	useEffect(() => {
        canvas = canvasRef.current;
        if (canvas) {
            canvas.width = RAYCASTER_WIDTH;
            canvas.height = RAYCASTER_HEIGHT;
            context = canvas.getContext('2d');
            if (context) {
                preload();
                let inter = setInterval(() => {
                    if (textures.length > 0 && sprites.length > 0) {
                        clearInterval(inter);
                        setup();
                        document.addEventListener('keydown', keyDownHandler);
                        document.addEventListener('keyup', keyUpHandler);
        
                        const render = () => {
                            frameCount++;
                            oldTime = time;
                            draw()
                            time = Date.now();
                            frameTime = (time - oldTime) / 1000;
                            setFrameRate(Math.floor(1 / frameTime));
                            player.walk_speed = WALK_SPEED * frameTime;
                            player.rotate_speed = ROTATE_SPEED * frameTime;
                            player.mouse_sensitivity = MOUSE_SENSITIVITY * frameTime;			
                            animationFrameId = window.requestAnimationFrame(render)
                        }
                        render();
                    }
                }, 50)
            }
        }
        return () => {
            document.removeEventListener('keydown', keyDownHandler);
            document.removeEventListener('keyup', keyUpHandler);
            window.cancelAnimationFrame(animationFrameId);
        }
    }, [])

    return (
		<div>
			<h3 style={{position: "absolute", zIndex: 10, color: "var(--yellow)", top: "15px"}}>{frameRate.toString()}</h3>
			<canvas id='cub3d-canvas' ref={canvasRef}/>
		</div>
    )
}

export default Canvas;
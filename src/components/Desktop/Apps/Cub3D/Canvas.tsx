import p5, { Vector } from "p5";
import { useEffect, useRef } from "react";
import "styles/Canvas.css"
import { RAYCASTER_WIDTH, RAYCASTER_HEIGHT, RAY_COUNT, TEX_WIDTH, TEX_HEIGHT, WALK_SPEED, ROTATE_SPEED, MOUSE_SENSITIVITY } from "./Sketch/constants";
import { perpendicularClockWise, perpendicularCounterClockWise } from "./Sketch/helper";
import { Map } from "./Sketch/Map";
import { Player } from "./Sketch/Player";
import texturesData from "./textures/wolf-walls.json"

const TEX_SHEET_WIDTH = 384;
const TEX_SHEET_HEIGHT = 1216;

let canvas : HTMLCanvasElement | null;
let context: CanvasRenderingContext2D | null;
let frameCount : number;
let animationFrameId: number;
let map: Map;
let player: Player;
let canvasData: ImageData;
let textures: Uint8ClampedArray[];
let floor_texture: Uint8ClampedArray;
let ceil_texture: Uint8ClampedArray;

let walking: string;

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
    texturesSheet.src = './assets/textures/wolf-walls.png';
    texturesSheet.crossOrigin = 'anonymous';
    texturesSheet.onload = () => {
        if (!ctx)
            return;
        ctx.drawImage(texturesSheet, 0, 0);
        for (let i = 0; i < texData.length; i++) {
            let pos = texData[i].position;
            let img = ctx.getImageData(pos.x, pos.y, pos.w, pos.h).data;
            textures.push(img);
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
        let textureNum = (map.grid[ray.mapCheck.y][ray.mapCheck.x] * 2) - 2;
        if (ray.side === true) {
            perpWallDist = ray.rayLength1D.y - ray.unitStepSize.y;
            textureNum++;
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
        // ZBuffer[i] = perpWallDist;
    }
}

const preload = () => {
    getTextures();
}

const keyDownHandler = (e: KeyboardEvent) => {
    if (walking.indexOf('z') === -1 && (e.key === 'w' || e.key === 'z')) {
        walking += "z";
    }
    if (walking.indexOf('s') === -1 && e.key === 's') {
        walking += "s";   
    }
    if (walking.indexOf('q') === -1 && (e.key === 'q' || e.key === 'a')) {
        walking += "q";
    }
    if (walking.indexOf('d') === -1 && e.key === 'd') {
        walking += "d"; 
    }
}

const mouseHandler = (e: MouseEvent) => {
    if (player)
        player.rotateDir(map.grid, e.movementX * player.mouse_sensitivity);	
}

const keyUpHandler = (e: KeyboardEvent) => {
    if (e.key === 'w' || e.key === 'z') {
        walking = walking.replaceAll('z', '');
    } else if (e.key === 's') {
        walking = walking.replaceAll('s', '');
    } else if (e.key === 'q' || e.key === 'a') {
        walking = walking.replaceAll('q', '');
    } else if (e.key === 'd') {
        walking = walking.replaceAll('d', '');
    }
}

const setup = () => {
    if (!context || !canvas)
        return;
    frameCount = 0;
    floor_texture = textures[69];
    ceil_texture = textures[23];
    map = new Map();
    map.defaultMap();
    canvasData = context.getImageData(0, 0, context.canvas.width, context.canvas.height);
    player = new Player(map.getPlayerPos(), map.grid);
    player.walk_speed = WALK_SPEED;
    player.rotate_speed = ROTATE_SPEED;
    player.mouse_sensitivity = MOUSE_SENSITIVITY;
    walking = "";
    canvas.requestPointerLock();
}

const draw = () => {
    if (!context)
        return;

    if (walking.length > 0) {
        if (walking.indexOf('z') >= 0) {
            player.addPos(new Vector(player.dir.x, player.dir.y), map.grid)
        }
        if (walking.indexOf('s') >= 0) {
            player.addPos(p5.Vector.mult(player.dir, -1), map.grid)
        }
        if (walking.indexOf('q') >= 0) {
            player.addPos(perpendicularClockWise(player.dir), map.grid)
        }
        if (walking.indexOf('d') >= 0) {
            player.addPos(perpendicularCounterClockWise(player.dir), map.grid)
        }
    } 

    context.clearRect(0, 0, context.canvas.width, context.canvas.height)
    floorAndCeilCasting();
    rayCasting();
    context.putImageData(canvasData, 0, 0)
}

const Canvas = () => {
    const canvasRef = useRef<(HTMLCanvasElement | null)>(null);

    useEffect(() => {
        canvas = canvasRef.current;
        if (canvas) {
            canvas.width = RAYCASTER_WIDTH;
            canvas.height = RAYCASTER_HEIGHT;
            context = canvas.getContext('2d');
            if (context) {
                preload();
                setTimeout(() => {
                    setup();
                    document.addEventListener('keydown', keyDownHandler);
                    document.addEventListener('keyup', keyUpHandler);
                    document.addEventListener('mousemove', mouseHandler);
    
                    const render = () => {
                        frameCount++;
                        draw()
                        animationFrameId = window.requestAnimationFrame(render)
                    }
                    render();
                }, 1000)
            }
        }
        return () => {
            document.removeEventListener('keydown', keyDownHandler);
            document.removeEventListener('keyup', keyUpHandler);
            document.removeEventListener('mousemove', mouseHandler);
            window.cancelAnimationFrame(animationFrameId);
        }
    }, [])

    return (
        <canvas id='cub3d-canvas' ref={canvasRef}/>
    )
}

export default Canvas;
import "styles/Dice.css"

const DIAGONAL = (w: number, h: number) => Math.floor(Math.sqrt(Math.pow(w, 2) + Math.pow(h, 2)));

const DIE_SIZE_DIV = 5;
const DIE_POS_DIV = 6;
const DIE_STROKE_DIV = 10;
const DIE_RADIUS_DIV = 50;
const POINT_RADIUS_DIV = 30;

const RED = "#F4615A";
const BLACK = "#1E1F1F";

// ? need to wrap p5 sketch in another function to pass arguments
export const defineSketch = (initialWidth: number, initialHeight: number) : any => {
	return (p: any) => {
		class Die {
			size: number = 0;
			radius: number = 0;
			stroke: number = 0;
			point_radius: number = 0;
			cur_angle: {x: number, y: number} = {x: 0, y: 0};
			set_angle: {x: number, y: number} = {x: 0, y: 0};
			pos: {x: number, y: number} = {x: 0, y: 0};

			constructor(w: number, h: number, pos: {x: number, y: number}) {
				this.resize(w, h, pos);
				this.randomDirection();
			}

			randomDirection() {
				let rand = Math.floor(Math.random() * 4 + 1)
				if (rand === 1)
					this.set_angle = {x: this.cur_angle.x - 90, y: this.cur_angle.y + 0};
				else if (rand === 2)
					this.set_angle = {x: this.cur_angle.x + 0, y: this.cur_angle.y - 90};
				else if (rand === 3)
					this.set_angle = {x: this.cur_angle.x + 90, y: this.cur_angle.y + 0};
				else
					this.set_angle = {x: this.cur_angle.x + 0, y: this.cur_angle.y + 90};
			}

			draw() {
				p.push();

				p.translate(this.pos.x, this.pos.y);
				
				p.fill("#1E1F24")
				p.stroke(RED)
				p.strokeWeight(5)

				if (!game_paused && this.cur_angle.x === this.set_angle.x && this.cur_angle.y === this.set_angle.y) {
					this.randomDirection();
					SPEED = slider_speed.value();
					while (90 % SPEED !== 0)
						SPEED += 1;
				}

				if (this.cur_angle.x < this.set_angle.x)
					this.cur_angle.x += SPEED;
				else if (this.cur_angle.x > this.set_angle.x)
					this.cur_angle.x -= SPEED;
				if (this.cur_angle.y < this.set_angle.y)
					this.cur_angle.y += SPEED;
				else if (this.cur_angle.y > this.set_angle.y)
					this.cur_angle.y -= SPEED;
				
				p.rotateX(p.radians(this.cur_angle.x))
				p.rotateY(p.radians(this.cur_angle.y))

				this.drawFaces();

				//walls
				p.box(this.size, this.size - this.radius, this.size - this.radius);
				p.box(this.size - this.radius, this.size, this.size - this.radius);
				p.box(this.size - this.radius, this.size - this.radius, this.size);

				//corners
				p.translate((this.size - this.radius) / 2, (this.size - this.radius) / 2, (this.size - this.radius) / 2);
				p.sphere(this.radius / 2, 10, 10);
				p.translate(-1 * (this.size - this.radius), 0, 0);
				p.sphere(this.radius / 2, 10, 10);
				p.translate(0, -1 * (this.size - this.radius), 0);
				p.sphere(this.radius / 2, 10, 10);
				p.translate((this.size - this.radius), 0, 0);
				p.sphere(this.radius / 2, 10, 10);
				p.translate(0, 0, -1 * (this.size - this.radius));
				p.sphere(this.radius / 2, 10, 10);
				p.translate(-1 * (this.size - this.radius), 0, 0);
				p.sphere(this.radius / 2, 10, 10);
				p.translate(0, (this.size - this.radius), 0);
				p.sphere(this.radius / 2, 10, 10);
				p.translate((this.size - this.radius), 0, 0);
				p.sphere(this.radius / 2, 10, 10);

				//edges
				p.translate(0, -1 * ((this.size - this.radius) / 2), 0);
				p.cylinder(this.radius / 2, this.size - this.radius, 24, 1, false, false);
				p.translate(-1 * (this.size - this.radius), 0, 0);
				p.cylinder(this.radius / 2, this.size - this.radius, 24, 1, false, false);
				p.translate(0, 0, this.size - this.radius);
				p.cylinder(this.radius / 2, this.size - this.radius, 24, 1, false, false);
				p.translate(this.size - this.radius, 0, 0);
				p.cylinder(this.radius / 2, this.size - this.radius, 24, 1, false, false);

				p.rotateZ(p.PI / 2);
				p.translate((this.size - this.radius) / 2, (this.size - this.radius) / 2, -1 * (this.size - this.radius));
				p.cylinder(this.radius / 2, this.size - this.radius, 24, 1, false, false);
				p.translate(-1 * (this.size - this.radius), 0, 0);
				p.cylinder(this.radius / 2, this.size - this.radius, 24, 1, false, false);
				p.translate(0, 0, this.size - this.radius);
				p.cylinder(this.radius / 2, this.size - this.radius, 24, 1, false, false);
				p.translate(this.size - this.radius, 0, 0);
				p.cylinder(this.radius / 2, this.size - this.radius, 24, 1, false, false);

				p.rotateX(p.PI / 2);
				p.translate(0, -1 * ((this.size - this.radius) / 2), -1 * ((this.size - this.radius) / 2));
				p.cylinder(this.radius / 2, this.size - this.radius, 24, 1, false, false);
				p.translate(-1 * (this.size - this.radius), 0, 0);
				p.cylinder(this.radius / 2, this.size - this.radius, 24, 1, false, false);
				p.translate(0, 0, this.size - this.radius);
				p.cylinder(this.radius / 2, this.size - this.radius, 24, 1, false, false);
				p.translate(this.size - this.radius, 0, 0);
				p.cylinder(this.radius / 2, this.size - this.radius, 24, 1, false, false);
				
				p.pop();
			}

			drawFaces() {
				p.push();
				p.noStroke();
				p.fill(RED)
				
				// ? Face 1
				p.push();
				p.translate(0, 0, this.size / 2 + 1);
				p.circle(0, 0, this.point_radius)
				p.pop();
				
				// ? Face 6
				p.push();
				p.translate(0, 0, -this.size / 2 - 1);
				p.circle(-this.size / 4, 0, this.point_radius)
				p.circle(this.size / 4, 0, this.point_radius)
				p.circle(-this.size / 4, -this.size / 4, this.point_radius)
				p.circle(this.size / 4, this.size / 4, this.point_radius)
				p.circle(-this.size / 4, this.size / 4, this.point_radius)
				p.circle(this.size / 4, -this.size / 4, this.point_radius)
				p.pop();

				// ? Face 2
				p.push();
				p.translate(this.size / 2 + 1, 0, 0);
				p.rotateY(p.radians(90));
				p.circle(-this.size / 4, this.size / 4, this.point_radius)
				p.circle(this.size / 4, -this.size / 4, this.point_radius)
				p.pop();

				// ? Face 5
				p.push();
				p.translate(-this.size / 2 - 1, 0, 0);
				p.rotateY(p.radians(-90));
				p.circle(0, 0, this.point_radius)
				p.circle(-this.size / 4, -this.size / 4, this.point_radius)
				p.circle(this.size / 4, this.size / 4, this.point_radius)
				p.circle(-this.size / 4, this.size / 4, this.point_radius)
				p.circle(this.size / 4, -this.size / 4, this.point_radius)
				p.pop();
				
				// ? Face 3
				p.push();
				p.translate(0, this.size / 2 + 1, 0);
				p.rotateX(p.radians(90));
				p.circle(-this.size / 4, -this.size / 4, this.point_radius)
				p.circle(0, 0, this.point_radius)
				p.circle(this.size / 4, this.size / 4, this.point_radius)
				p.pop();
				
				// ? Face 4
				p.push();
				p.translate(0, -this.size / 2 - 1, 0);
				p.rotateX(p.radians(-90));
				p.circle(-this.size / 4, -this.size / 4, this.point_radius)
				p.circle(-this.size / 4, this.size / 4, this.point_radius)
				p.circle(this.size / 4, this.size / 4, this.point_radius)
				p.circle(this.size / 4, -this.size / 4, this.point_radius)
				p.pop();
				
				p.pop();
			}

			resize(w: number, h: number, pos: {x: number, y: number}) {
				diagonal = DIAGONAL(w, h);

				this.size = diagonal / DIE_SIZE_DIV;
				this.radius = diagonal / DIE_RADIUS_DIV;
				this.stroke = diagonal / DIE_STROKE_DIV;
				this.point_radius = diagonal / POINT_RADIUS_DIV;
				this.pos = pos;
			}

		}

		// ? Global variables
		let canvas: any;
		let parent: any;

		let width : number;
		let height : number;

		let dice: Die[] = [];
		let game_paused: boolean = false;
		let slider_speed : any;
		let SPEED = 6;
		let diagonal : number;

		let font : any;

		p.preload = () => {
			font = p.loadFont("/assets/Outfit-Regular.ttf")
		}

		// ? called once upon load
		p.setup = () => {
			parent = document.getElementById("canvas-dice-parent");
			canvas = p.createCanvas(initialWidth, initialHeight, p.WEBGL).parent(parent);

			slider_speed = p.createSlider(1, 15, 6, 1);
			slider_speed.parent(parent)
			slider_speed.addClass("dice-slider");
			slider_speed.position(20, 30);
			slider_speed.style("width", initialWidth / 10 + 20 + "px");

			p.textFont(font);

			diagonal = DIAGONAL(initialWidth, initialHeight);
			dice.push(new Die(initialWidth, initialHeight, {x: -diagonal / DIE_POS_DIV, y: 0}))
			dice.push(new Die(initialWidth, initialHeight, {x:  diagonal / DIE_POS_DIV, y: 0}))
		}
	
		// ? called once every frame
		p.draw = () => {
			// ? if window is quit, delete p5 sketch
			if (p.frameCount % 60 === 0 && !document.getElementById("canvas-dice-parent")) {
				p.remove();
				return ;
			}
			width = parent.clientWidth;
			height = parent.clientHeight;
			// ? resize canvas when window is resized
			if (width !== canvas.width || height !== canvas.height) {
				p.resizeCanvas(width, height)
				
				diagonal = DIAGONAL(width, height);
				dice[0].resize(width, height, {x: -diagonal / DIE_POS_DIV, y: 0});
				dice[1].resize(width, height, {x:  diagonal / DIE_POS_DIV, y: 0});
			
				// slider_speed.style("width", width / 10 + 20 + "px");
			}

			p.clear();
			p.background(BLACK);

			for (let die of dice) {
				die.draw();
			}

			p.push();
			p.textSize(24);
			p.fill(RED)
			let info_text = "Press space to stop the dice";
			p.push();
			p.textAlign(p.CENTER)
			p.text(info_text, 0, height / 2 * 0.85)
			p.pop();
			let slide_speed_text = "speed";
			p.text(slide_speed_text, -width / 2 + 120, -height / 2 + 48)
			p.pop();
		}

		p.keyPressed = () => {
			if (p.keyCode === 32)
				game_paused = !game_paused;
		}
	}
}



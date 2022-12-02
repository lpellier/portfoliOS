import "./Pong.css"

// ? need to wrap p5 sketch in another function to pass arguments
export const defineSketch = (id: number, initialWidth: number, initialHeight: number) : any => {
	return (p: any) => {
		class MovingCircle {
			pos: {x: number, y: number}
			direction: {x: number, y: number}
			size: number
			color: string
	
			constructor(pos: {x: number, y: number}, size: number) {
				this.pos = pos;
				this.direction = {x: Math.random() * 2 - 1, y: Math.random() * 2 - 1}
				this.size = size;
				this.color = "rgb(" + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + ")"
			}
	
			move(width: number, height: number) {
				this.pos.x += this.direction.x;
				this.pos.y += this.direction.y;
				if (this.pos.x > width)
					this.pos.x = Math.floor(Math.random() * width);
				if (this.pos.y > height)
					this.pos.y = Math.floor(Math.random() * height);
			}
	
			draw(p5: any) {
				p5.push();
				p5.noStroke();
				p5.fill(this.color)
				p5.ellipse(this.pos.x, this.pos.y, this.size);
				p5.pop();
			}
		}
		
		// ? Global variables
		let canvas: any;
		let parent: any;

		let circles : MovingCircle[] = []
		let width: number;
		let height: number;

		// ? called once upon load
		p.setup = () => {
			parent = document.getElementById("canvas-parent" + id);
			canvas = p.createCanvas(initialWidth, initialHeight).parent(parent);
			console.log(canvas.width, canvas.height)
			for (let i = 0; i < 150; i++) {
				circles.push(new MovingCircle({x: Math.random() * initialWidth, y: Math.random() * initialHeight}, Math.random() * 30 + 20))
			}
		}
	
		// ? called once every frame
		p.draw = () => {
			// ? if window is quit, delete p5 sketch
			if (p.frameCount % 60 === 0 && !document.getElementById("canvas-parent" + id)) {
				p.remove();
				return ;
			}

			width = parent.clientWidth;
			height = parent.clientHeight;
			// ? resize canvas when window is resized
			if (width !== canvas.width || height !== canvas.height) {
				p.resizeCanvas(width, height)
			}

			p.clear(0, 0, 0, 0);
			p.background(0)
			for (let circle of circles) {
				circle.move(width, height)
				circle.draw(p);
			}
		}
	}
}



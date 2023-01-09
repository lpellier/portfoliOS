import "./Pong.css"
import { audio_files } from "./Pong";

// ? need to wrap p5 sketch in another function to pass arguments
export const defineSketch = (initialWidth: number, initialHeight: number) : any => {
	return (p: any) => {
		
		p.disableFriendlyErrors = true;

		let spritesheet: any;
		let spritedata: any;

		let animation: any[] = [];
		let bumpers: any[] = [];

		let consts: Consts;
		let game: Game;
		let errors: Errors;
		let buttons: Buttons;
		let inputs: Inputs;
		let keys: Keys;

		let canvas: any;

		class Bumper {
		animation: any;
		pos: Vector;
		center: Vector;
		speed: number;
		len: number;
		index: number;
		diameter: number;

		index_bumper: number;

		hit: boolean;
		collision: Vector;
		bounce_vec: Vector;

		frame_count_shake: number;

		constructor(
			animation: any,
			x: number,
			y: number,
			diameter: number,
			index: number
		) {
			this.speed = 0;
			this.pos = new Vector([x, y]);
			this.center = new Vector([x + diameter / 2, y + diameter / 2]);
			this.collision = new Vector([0, 0]);
			this.bounce_vec = new Vector([0, 0]);
			this.animation = animation;
			this.len = this.animation.length;
			this.index = 0;
			this.hit = false;
			this.diameter = diameter;
			this.index_bumper = index;
			this.frame_count_shake = 0;
		}

		resize() {
			let diameter = consts.DIAGONAL * 0.1;

			this.diameter = diameter;

			this.pos.x = consts.WIDTH / 2 - diameter / 2;
			if (this.index_bumper === 1)
			this.pos.y = (consts.HEIGHT * 1) / 4 - diameter / 2;
			else if (this.index_bumper === 2)
			this.pos.y = (consts.HEIGHT * 3) / 4 - diameter / 2;
			this.center.x = this.pos.x + diameter / 2;
			this.center.y = this.pos.y + diameter / 2;
		}

		show(ratio: number) {
			let index = this.index % this.len;
			p.push();
			if (this.hit && this.frame_count_shake < 30)
			p.translate(Math.floor(p.random(-5, 6)), Math.floor(p.random(-5, 6)));
			p.image(
			this.animation[index],
			this.pos.x * ratio,
			this.pos.y * ratio,
			this.diameter * ratio,
			this.diameter * ratio
			);
			p.pop();
		}

		animate() {
			this.index += 1;
			this.frame_count_shake++;
			if (this.index >= this.len) {
			this.index = 0;
			this.hit = false;
			}
		}

		resetAnimation() {
			this.index = 0;
			this.frame_count_shake = 0;
		}

		render(ratio: number) {
			this.show(ratio);
			if (this.hit) this.animate();
		}

		checkCollision(pong: Pong) {
			let e = new Vector(pong.center());
			let l = new Vector(pong.centerNextFrame());

			let cp = this.center;
			let r = (this.diameter * 0.85) / 2;

			let d = sub_vec(l, e);
			let f = sub_vec(e, cp);

			let a = d.dot(d);
			let b = 2 * f.dot(d);
			let c = f.dot(f) - r * r;

			let discriminant = b * b - 4 * a * c;
			if (discriminant >= 0) {
			discriminant = Math.sqrt(discriminant);

			let t1 = (-b - discriminant) / (2 * a);

			if (t1 >= 0 && t1 <= 1) {
				// t1 is the intersection, and it's closer than t2
				// (since t1 uses -b - discriminant)
				// Impale, Poke
				this.collision.x = e.x + t1;
				this.collision.y = e.y;
				this.hit = true;

				this.bounce_vec = sub_vec(this.collision, this.center);
				this.bounce_vec.normalize();
				let vec_pong = new Vector(pong.velocity);
				this.bounce_vec.mult(vec_pong.mag());
				pong.velocity[0] = this.bounce_vec.x;
				pong.velocity[1] = this.bounce_vec.y;
				return true;
			}
			}
			return false;
		}
		}

		class Buttons {
		create_game: any;
		join: any;
		return: any;
		matchmaking: any;

		anyone_can_join: any;
		invitation_only: any;
		local: any;
		ai: any;
		validate: any;

		plus: any;
		minus: any;

		opponent_left_ok: any;

		map_original: any;
		map_city: any;
		map_casino: any;
		map_secret : any;

		spectate: any;

		sound: any;

		constructor() {
			this.reset();
		}

		createButtons() {
			this.create_game = createCustomButton(
			"Create game",
			createGameMenu,
			highlightButton,
			resetButton,
			consts.std_width,
			consts.std_height
			);
			this.create_game.style(
			"border",
			(consts.DIAGONAL / 250).toString() + "px solid white"
			);

			this.join = createCustomButton(
			"Join game",
			readRoomID,
			highlightButton,
			resetButton,
			consts.std_width,
			consts.std_height
			);
			this.join.style(
			"border",
			(consts.DIAGONAL / 250).toString() + "px solid white"
			);

			this.matchmaking = createCustomButton(
			"Match making",
			matchmaking,
			highlightButton,
			resetButton,
			consts.std_width,
			consts.std_height
			);
			this.matchmaking.style(
			"border",
			(consts.DIAGONAL / 250).toString() + "px solid white"
			);

			this.return = createCustomButton(
			"",
			goToMainMenu,
			highlightButton,
			resetButton,
			consts.medium_square_diameter,
			consts.medium_square_diameter
			);
			this.return.style("border", "none");
			this.return.style("background-color", "rgba(0, 0, 0, 0)");
			this.return.position(consts.WIDTH * 0.9, consts.HEIGHT * 0.01);

			this.sound = createCustomButton(
			"",
			clickSound,
			highlightSoundButton,
			resetSoundButton,
			consts.medium_square_diameter,
			consts.medium_square_diameter
			);
			this.sound.style("border", "none");
			this.sound.style("background-color", "rgba(0, 0, 0, 0)");
			this.sound.size(
			consts.small_square_diameter * 1.65,
			consts.small_square_diameter * 1.65
			);
			this.sound.position(consts.WIDTH * 0.8, consts.HEIGHT * 0.02);

			this.anyone_can_join = createCustomButton(
			"Anyone can join",
			clickAnyone,
			highlightButton,
			resetButton,
			consts.medium_width,
			consts.medium_height
			);
			this.anyone_can_join.style("background-color", "rgba(0, 0, 0, 0)");
			this.anyone_can_join.style(
			"font-size",
			consts.medium_font_size.toString() + "px"
			);
			this.anyone_can_join.style(
			"border",
			(consts.DIAGONAL / 250).toString() + "px solid white"
			);
			this.anyone_can_join.style("outline", "none");
			this.invitation_only = createCustomButton(
			"Invitation only",
			clickInvitation,
			highlightButton,
			resetButton,
			consts.medium_width,
			consts.medium_height
			);
			this.invitation_only.style("background-color", "rgba(0, 0, 0, 0)");
			this.invitation_only.style("border", "none");
			this.invitation_only.style(
			"font-size",
			consts.medium_font_size.toString() + "px"
			);
			this.local = createCustomButton(
			"Play local",
			clickLocal,
			highlightButton,
			resetButton,
			consts.medium_width,
			consts.medium_height
			);
			this.local.style("background-color", "rgba(0, 0, 0, 0)");
			this.local.style("font-size", consts.medium_font_size.toString() + "px");
			this.local.style("border", "none");
			this.ai = createCustomButton(
			"vs AI",
			clickAi,
			highlightButton,
			resetButton,
			consts.medium_width,
			consts.medium_height
			);
			this.ai.style("background-color", "rgba(0, 0, 0, 0)");
			this.ai.style("font-size", consts.medium_font_size.toString() + "px");
			this.ai.style("border", "none");
			this.validate = createCustomButton(
			"Create",
			createGame,
			highlightButton,
			resetButton,
			consts.medium_width,
			consts.medium_height
			);
			this.validate.style("background-color", "rgba(0, 0, 0, 0)");
			this.validate.style(
			"font-size",
			consts.medium_font_size.toString() + "px"
			);

			this.plus = createCustomButton(
			"+",
			plusScoreLimit,
			highlightButton,
			resetButton,
			consts.small_square_diameter,
			consts.small_square_diameter
			);
			this.plus.style("border", "none");
			this.plus.style("font-size", consts.small_font_size.toString() + "px");
			this.minus = createCustomButton(
			"-",
			minusScoreLimit,
			highlightButton,
			resetButton,
			consts.small_square_diameter,
			consts.small_square_diameter
			);
			this.minus.style("border", "none");
			this.minus.style("font-size", consts.small_font_size.toString() + "px");

			this.opponent_left_ok = createCustomButton(
			"OK",
			goToMainMenu,
			highlightButton,
			resetButton,
			consts.std_width,
			consts.std_height
			);
			this.opponent_left_ok.style("border", "none");

			this.map_original = createCustomButton(
			"Original",
			clickMapOriginal,
			highlightButton,
			resetButton,
			consts.WIDTH * 0.2 + consts.WIDTH / 48,
			consts.HEIGHT * 0.2 + consts.WIDTH / 48
			);
			this.map_original.style("background", "none");
			this.map_original.style("outline", "none");
			this.map_original.style(
			"border",
			(consts.DIAGONAL / 250).toString() + "px solid white"
			);

			this.map_city = createCustomButton(
			"City",
			clickMapCity,
			highlightButton,
			resetButton,
			consts.WIDTH * 0.2 + consts.WIDTH / 48,
			consts.HEIGHT * 0.2 + consts.WIDTH / 48
			);
			this.map_city.style("background", "none");
			this.map_city.style("border", "none");
			this.map_city.style("outline", "none");
			this.map_casino = createCustomButton(
			"Casino",
			clickMapCasino,
			highlightButton,
			resetButton,
			consts.WIDTH * 0.2 + consts.WIDTH / 48,
			consts.HEIGHT * 0.2 + consts.WIDTH / 48
			);
			this.map_casino.style("background", "none");
			this.map_casino.style("border", "none");
			this.map_casino.style("outline", "none");

			this.map_original.style(
			"font-size",
			consts.medium_font_size.toString() + "px"
			);
			this.map_city.style(
			"font-size",
			consts.medium_font_size.toString() + "px"
			);
			this.map_casino.style(
			"font-size",
			consts.medium_font_size.toString() + "px"
			);

			this.map_original.position(consts.WIDTH * 0.0855, consts.HEIGHT * 0.56);
			this.map_city.position(consts.WIDTH * 0.3855, consts.HEIGHT * 0.56);
			this.map_casino.position(consts.WIDTH * 0.6855, consts.HEIGHT * 0.56);

			this.map_secret = createCustomButton("*", clickMapSecret, highlightButton, resetButton, consts.small_square_diameter, consts.small_square_diameter);
			this.map_secret.style("border", "none");
			this.map_secret.style("background", "none");

			this.spectate = createCustomButton(
			"",
			clickSpectate,
			highlightSpectateButton,
			resetSpectateButton,
			consts.WIDTH * 0.1,
			consts.HEIGHT * 0.15
			);
			this.spectate.style("background-color", "rgba(0, 0, 0, 0)");
			this.spectate.style(
			"border",
			(consts.DIAGONAL / 250).toString() + "px solid white"
			);
			this.spectate.style("position", "absolute");
			this.spectate.position(consts.WIDTH * 0.04, consts.HEIGHT * 0.03 + 35);

			this.hide();
			this.addParent();

			this.matchmaking.show();
			this.create_game.show();
			this.join.show();

			this.map_secret.show();
		}

		resize() {
			this.create_game.size(consts.std_width, consts.std_height);
			this.create_game.style(
			"font-size",
			consts.std_font_size.toString() + "px"
			);
			this.create_game.style(
			"border",
			(consts.DIAGONAL / 250).toString() + "px solid white"
			);

			this.join.size(consts.std_width, consts.std_height);
			this.join.style("font-size", consts.std_font_size.toString() + "px");
			this.join.style(
			"border",
			(consts.DIAGONAL / 250).toString() + "px solid white"
			);

			this.matchmaking.size(consts.std_width, consts.std_height);
			this.matchmaking.style(
			"font-size",
			consts.std_font_size.toString() + "px"
			);
			this.matchmaking.style(
			"border",
			(consts.DIAGONAL / 250).toString() + "px solid white"
			);

			this.opponent_left_ok.size(consts.std_width, consts.std_height);
			this.opponent_left_ok.style(
			"font-size",
			consts.std_font_size.toString() + "px"
			);

			this.anyone_can_join.size(consts.medium_width, consts.medium_height);
			this.anyone_can_join.style(
			"font-size",
			consts.medium_font_size.toString() + "px"
			);
			this.anyone_can_join.style(
			"border-width",
			(consts.DIAGONAL / 250).toString() + "px"
			);
			this.invitation_only.size(consts.medium_width, consts.medium_height);
			this.invitation_only.style(
			"font-size",
			consts.medium_font_size.toString() + "px"
			);
			this.invitation_only.style(
			"border-width",
			(consts.DIAGONAL / 250).toString() + "px"
			);
			this.local.size(consts.medium_width, consts.medium_height);
			this.local.style("font-size", consts.medium_font_size.toString() + "px");
			this.local.style(
			"border-width",
			(consts.DIAGONAL / 250).toString() + "px"
			);
			this.ai.size(consts.medium_width, consts.medium_height);
			this.ai.style("font-size", consts.medium_font_size.toString() + "px");
			this.ai.style("border-width", (consts.DIAGONAL / 250).toString() + "px");
			this.validate.size(consts.medium_width, consts.medium_height);
			this.validate.style(
			"font-size",
			consts.medium_font_size.toString() + "px"
			);
			this.validate.style(
			"border-width",
			(consts.DIAGONAL / 250).toString() + "px"
			);

			this.plus.size(
			consts.small_square_diameter,
			consts.small_square_diameter
			);
			this.plus.style("font-size", consts.small_font_size.toString() + "px");
			this.minus.size(
			consts.small_square_diameter,
			consts.small_square_diameter
			);
			this.minus.style("font-size", consts.small_font_size.toString() + "px");

			this.return.size(
			consts.medium_square_diameter,
			consts.medium_square_diameter
			);
			this.return.style("font-size", consts.medium_font_size.toString() + "px");
			this.return.position(consts.WIDTH * 0.9, consts.HEIGHT * 0.01);

			this.sound.size(
			consts.small_square_diameter * 1.65,
			consts.small_square_diameter * 1.65
			);
			this.sound.position(consts.WIDTH * 0.8, consts.HEIGHT * 0.02);

			this.map_original.size(
			consts.WIDTH * 0.2 + consts.DIAGONAL * 0.025,
			consts.HEIGHT * 0.2 + consts.DIAGONAL * 0.025
			);
			this.map_original.style(
			"font-size",
			consts.medium_font_size.toString() + "px"
			);
			this.map_city.size(
			consts.WIDTH * 0.2 + consts.DIAGONAL * 0.025,
			consts.HEIGHT * 0.2 + consts.DIAGONAL * 0.025
			);
			this.map_city.style(
			"font-size",
			consts.medium_font_size.toString() + "px"
			);
			this.map_casino.size(
			consts.WIDTH * 0.2 + consts.DIAGONAL * 0.025,
			consts.HEIGHT * 0.2 + consts.DIAGONAL * 0.025
			);
			this.map_casino.style(
			"font-size",
			consts.medium_font_size.toString() + "px"
			);
			this.map_secret.position(consts.WIDTH * 0.01, consts.HEIGHT * 0.93);
			this.map_secret.size(
			consts.small_square_diameter,
			consts.small_square_diameter
			);
			this.map_secret.style(
			"font-size",
			consts.small_font_size.toString() + "px"
			);

			this.map_original.position(consts.WIDTH * 0.0855, consts.HEIGHT * 0.56);
			this.map_original.style(
			"border-width",
			(consts.DIAGONAL / 250).toString() + "px"
			);
			this.map_city.position(consts.WIDTH * 0.3855, consts.HEIGHT * 0.56);
			this.map_city.style(
			"border-width",
			(consts.DIAGONAL / 250).toString() + "px"
			);
			this.map_casino.position(consts.WIDTH * 0.6855, consts.HEIGHT * 0.56);
			this.map_casino.style(
			"border-width",
			(consts.DIAGONAL / 250).toString() + "px"
			);

			this.spectate.size(consts.WIDTH * 0.1, consts.HEIGHT * 0.1);
			this.spectate.style(
			"border-width",
			(consts.DIAGONAL / 250).toString() + "px"
			);
			this.spectate.position(consts.WIDTH * 0.04, consts.HEIGHT * 0.03 + 35);
		}

		delete() {
			if (this.create_game)
				this.create_game.remove();
			this.create_game = null;
			if (this.join) this.join.remove();
			this.join = null;
			if (this.matchmaking) this.matchmaking.remove();
			this.matchmaking = null;
			if (this.return) this.return.remove();
			this.return = null;

			if (this.sound)
				this.sound.remove();
			this.sound = null;

			if (this.anyone_can_join) this.anyone_can_join.remove();
			this.anyone_can_join = null;
			if (this.invitation_only) this.invitation_only.remove();
			this.invitation_only = null;
			if (this.local) this.local.remove();
			this.local = null;
			if (this.ai) this.ai.remove();
			this.ai = null;
			if (this.validate) this.validate.remove();
			this.validate = null;

			if (this.plus) this.plus.remove();
			this.plus = null;
			if (this.minus) this.minus.remove();
			this.minus = null;
			if (this.opponent_left_ok) this.opponent_left_ok.remove();
			this.opponent_left_ok = null;

			if (this.map_original) this.map_original.remove();
			this.map_original = null;
			if (this.map_city) this.map_city.remove();
			this.map_city = null;
			if (this.map_casino) this.map_casino.remove();
			this.map_casino = null;
			if (this.map_secret) this.map_secret.remove();
			this.map_secret = null;

			if (this.spectate) this.spectate.remove();
			this.spectate = null;

			removeChildren("button-create");
			removeChildren("button-join");
			removeChildren("button-matchmaking");
			removeChildren("button-anyone");
			removeChildren("button-invitation");
			removeChildren("button-local");
			removeChildren("button-ai");
			removeChildren("button-validate");
			removeChildren("button-return");
			removeChildren("button-sound");
			removeChildren("button-map-original");
			removeChildren("button-map-city");
			removeChildren("button-map-casino");
			removeChildren("button-map-secret");
			removeChildren("button-spectate");
			removeChildren("button-plus");
			removeChildren("button-minus");
			removeChildren("button-opp-left-ok");
		}

		reset() {
			this.delete();
			this.createButtons();
			this.resize();
		}

		hide() {
			this.create_game.hide();
			this.join.hide();
			this.return.hide();
			this.matchmaking.hide();
			this.sound.hide();

			this.anyone_can_join.hide();
			this.invitation_only.hide();
			this.local.hide();
			this.ai.hide();
			this.validate.hide();

			this.plus.hide();
			this.minus.hide();

			this.opponent_left_ok.hide();

			this.map_original.hide();
			this.map_city.hide();
			this.map_casino.hide();
			this.map_secret.hide();

			this.spectate.hide();
		}

		clickAnyone() {
			this.anyone_can_join.style(
			"border",
			(consts.DIAGONAL / 250).toString() + "px solid white"
			);
			this.local.style("border", "none");
			this.invitation_only.style("border", "none");

			this.ai.hide();
			this.ai.style("border", "none");
			game.ai = false;

			return "public";
		}

		clickLocal() {
			this.anyone_can_join.style("border", "none");
			this.local.style(
			"border",
			(consts.DIAGONAL / 250).toString() + "px solid white"
			);
			this.invitation_only.style("border", "none");

			this.ai.show();

			return "local";
		}

		clickInvitation() {
			this.anyone_can_join.style("border", "none");
			this.local.style("border", "none");
			this.invitation_only.style(
			"border",
			(consts.DIAGONAL / 250).toString() + "px solid white"
			);

			this.ai.hide();
			this.ai.style("border", "none");
			game.ai = false;

			return "private";
		}

		addParent() {
			if (!parent)
				return ;
			this.create_game.parent(document.getElementById("button-create"));
			this.join.parent(document.getElementById("button-join"));
			this.matchmaking.parent(document.getElementById("button-matchmaking"));
			this.return.parent(document.getElementById("button-return"));
			this.sound.parent(document.getElementById("button-sound"));
			this.anyone_can_join.parent(document.getElementById("button-anyone"));
			this.local.parent(document.getElementById("button-local"));
			this.invitation_only.parent(document.getElementById("button-invitation"));
			this.ai.parent(document.getElementById("button-ai"));
			this.validate.parent(document.getElementById("button-validate"));
			this.plus.parent(document.getElementById("button-plus"));
			this.minus.parent(document.getElementById("button-minus"));
			this.opponent_left_ok.parent(
			document.getElementById("button-opp-left-ok")
			);

			this.map_original.parent(document.getElementById("button-map-original"));
			this.map_city.parent(document.getElementById("button-map-city"));
			this.map_casino.parent(document.getElementById("button-map-casino"));
			this.map_secret.parent(document.getElementById("button-map-secret"));

			this.spectate.parent(document.getElementById("button-spectate"));
		}
		}

		class Consts {
		WIDTH: number;
		HEIGHT: number;
		DIAGONAL: number;

		OLD_WIDTH: number;
		OLD_HEIGHT: number;

		PLAYER_WIDTH: number;
		PLAYER_HEIGHT: number;
		PLAYER_SPEED: number;
		AI_SPEED: number;

		BREAKOUT_WIDTH: number;
		BREAKOUT_HEIGHT: number;

		PONG_DIAMETER: number;
		PONG_BASE_SPEED: number;
		PONG_MAX_SPEED: number;
		PONG_ACCELERATION: number;
		PONG_ACCELERATION_ACUTE_ANGLE: number;
		PONG_COLOR: string;

		TOP_BOUND: number;
		BOT_BOUND: number;
		LEFT_BOUND: number;
		RIGHT_BOUND: number;

		std_font_size: number;
		medium_font_size: number;
		small_font_size: number;

		std_width: number;
		std_height: number;
		medium_width: number;
		medium_height: number;

		medium_square_diameter: number;
		small_square_diameter: number;

		original_map: GameMap;
		city_map: GameMap;
		casino_map: GameMap;
		secret_map : GameMap;

		FONT: any;
		RETURN_ICON: any;
		CROSS_ICON: any;
		CROSS_ICON2: any;
		MARK_ICON: any;
		EYE_ICON: any;
		SOUND_ICON: any;
		CITY_BACKGROUND: any;
		TOKYO_BACKGROUND: any;

		constructor() {
			this.WIDTH = initialWidth;
			this.HEIGHT = initialHeight;

			this.original_map = new GameMap(1, this.WIDTH, this.HEIGHT);
			this.city_map = new GameMap(2, this.WIDTH, this.HEIGHT); 
			this.casino_map = new GameMap(3, this.WIDTH, this.HEIGHT);
			this.secret_map = new GameMap(4, this.WIDTH, this.HEIGHT);

			this.OLD_WIDTH = this.WIDTH;
			this.OLD_HEIGHT = this.HEIGHT;

			this.WIDTH = parent.clientWidth;
			this.HEIGHT = parent.clientHeight;

			this.DIAGONAL = Math.sqrt(
			Math.pow(this.WIDTH, 2) + Math.pow(this.HEIGHT, 2)
			);

			this.PLAYER_WIDTH = this.WIDTH / 80;
			this.PLAYER_HEIGHT = this.HEIGHT / 9;
			this.PLAYER_SPEED = this.DIAGONAL / 125;
			this.AI_SPEED = this.DIAGONAL / 175;

			this.BREAKOUT_WIDTH = this.PLAYER_WIDTH * 0.8;
			this.BREAKOUT_HEIGHT = this.PLAYER_HEIGHT * 0.8;

			this.PONG_DIAMETER = this.DIAGONAL / 120;
			this.PONG_BASE_SPEED = this.DIAGONAL / 150;
			this.PONG_MAX_SPEED = this.PONG_BASE_SPEED * 2;
			this.PONG_ACCELERATION = this.PONG_BASE_SPEED / 2800;
			this.PONG_ACCELERATION_ACUTE_ANGLE = this.PONG_BASE_SPEED / 28;
			this.PONG_COLOR = "white";

			this.std_width = this.WIDTH / 4;
			this.std_height = this.HEIGHT / 4;
			this.medium_width = this.WIDTH / 3.5;
			this.medium_height = this.HEIGHT / 10;

			this.medium_square_diameter = this.DIAGONAL / 14;
			this.small_square_diameter = this.DIAGONAL / 28;

			this.std_font_size =
			Math.sqrt(Math.pow(this.std_width, 2) + Math.pow(this.std_height, 2)) /
			8;
			this.medium_font_size =
			Math.sqrt(
				Math.pow(this.medium_width, 2) + Math.pow(this.medium_height, 2)
			) / 14;
			this.small_font_size =
			Math.sqrt(
				Math.pow(this.small_square_diameter, 2) +
				Math.pow(this.small_square_diameter, 2)
			) / 1.7;

			this.original_map.resize(this.WIDTH, this.HEIGHT);
			this.city_map.resize(this.WIDTH, this.HEIGHT);
			this.casino_map.resize(this.WIDTH, this.HEIGHT);
			this.secret_map.resize(this.WIDTH, this.HEIGHT);

			this.TOP_BOUND = this.original_map.wall_width * 2;
			this.BOT_BOUND = this.HEIGHT - this.original_map.wall_width * 2;
			this.LEFT_BOUND = 0;
			this.RIGHT_BOUND = this.WIDTH;

			this.FONT = p.loadFont("/assets/fonts/PressStart2P-Regular.ttf");

			this.RETURN_ICON = p.loadImage("/assets/icons/return-button2.png");

			this.CROSS_ICON = p.loadImage("/assets/icons/red-cross.png");
			this.CROSS_ICON2 = p.loadImage("/assets/icons/red-cross.png");
			this.MARK_ICON = p.loadImage("/assets/icons/green-mark.png");

			this.EYE_ICON = p.loadImage("/assets/icons/eye-icon.png");
			this.SOUND_ICON = p.loadImage("/assets/icons/sfx_icon.png");

			this.CITY_BACKGROUND = p.loadImage("/assets/backgrounds/city.jpg");
			this.TOKYO_BACKGROUND = p.loadImage("/assets/backgrounds/tokyo.png");
		}


		setWindowSize() {
			this.OLD_WIDTH = this.WIDTH;
			this.OLD_HEIGHT = this.HEIGHT;

			this.WIDTH = parent.clientWidth;
			this.HEIGHT = parent.clientHeight;
			this.DIAGONAL = Math.sqrt(
			Math.pow(this.WIDTH, 2) + Math.pow(this.HEIGHT, 2)
			);
		}

		resize() {
			this.setWindowSize();

			this.PLAYER_WIDTH = this.WIDTH / 80;
			this.PLAYER_HEIGHT = this.HEIGHT / 9;
			this.PLAYER_SPEED = this.DIAGONAL / 125;
			this.AI_SPEED = this.DIAGONAL / 175;

			this.BREAKOUT_WIDTH = this.PLAYER_WIDTH * 0.8;
			this.BREAKOUT_HEIGHT = this.PLAYER_HEIGHT * 0.8;

			this.PONG_DIAMETER = this.DIAGONAL / 120;
			this.PONG_BASE_SPEED = this.DIAGONAL / 150;
			this.PONG_MAX_SPEED = this.PONG_BASE_SPEED * 2;
			this.PONG_ACCELERATION = this.PONG_BASE_SPEED / 2800;
			this.PONG_ACCELERATION_ACUTE_ANGLE = this.PONG_BASE_SPEED / 28;
			this.PONG_COLOR = "white";

			this.std_width = this.WIDTH / 4;
			this.std_height = this.HEIGHT / 4;
			this.medium_width = this.WIDTH / 3.5;
			this.medium_height = this.HEIGHT / 10;

			this.std_font_size =
			Math.sqrt(Math.pow(this.std_width, 2) + Math.pow(this.std_height, 2)) /
			8;
			this.medium_font_size =
			Math.sqrt(
				Math.pow(this.medium_width, 2) + Math.pow(this.medium_height, 2)
			) / 14;
			this.small_font_size =
			Math.sqrt(
				Math.pow(this.small_square_diameter, 2) +
				Math.pow(this.small_square_diameter, 2)
			) / 1.7;

			this.medium_square_diameter = this.DIAGONAL / 14;
			this.small_square_diameter = this.DIAGONAL / 28;

			this.original_map.resize(this.WIDTH, this.HEIGHT);
			this.city_map.resize(this.WIDTH, this.HEIGHT);
			this.casino_map.resize(this.WIDTH, this.HEIGHT);
			this.secret_map.resize(this.WIDTH, this.HEIGHT);

			this.TOP_BOUND = this.original_map.wall_width * 2;
			this.BOT_BOUND = this.HEIGHT - this.original_map.wall_width * 2;
			this.LEFT_BOUND = 0;
			this.RIGHT_BOUND = this.WIDTH;
		}
		}

		class Errors {
		game_full: boolean = false;
		game_not_found: boolean = false;
		game_not_public: boolean = false;
		already_in_game: boolean = false;

		constructor() {
			this.set_false();
		}

		set_false() {
			this.game_full = false;
			this.game_not_found = false;
			this.game_not_public = false;
			this.already_in_game = false;
		}
		}

		class Game {
		players: Player[];
		breakouts : BreakOut[];
		score: [number, number];
		score_limit: number;
		pong: any;
		timer: number;
		state: string;
		room_id: string;
		publicity: string;
		local: boolean;
		ai: boolean;
		frames_since_point: number;
		map: GameMap;

		timeout : any;

		spectator: boolean;
		hover_spectator: boolean;

		frame_count_shake: number;

		constructor() {
			this.players = [];
			this.breakouts = [];
			this.pong = null;
			this.score = [0, 0];
			this.score_limit = 10;
			this.timer = 3;
			this.state = "in-menu";
			this.room_id = "null";
			this.publicity = "public";
			this.local = false;
			this.ai = false;
			this.frames_since_point = 0;
			this.map = consts.original_map;
			this.spectator = false;
			this.hover_spectator = false;
			this.frame_count_shake = 0;
		}

		reset() {
			this.players = [];
			this.breakouts = [];
			this.score = [0, 0];
			this.score_limit = 10;
			this.timer = 3;
			this.state = "in-menu";
			this.room_id = "null";
			this.publicity = "public";
			this.local = false;
			this.ai = false;
			this.frames_since_point = 0;
			this.map = consts.original_map;
			this.spectator = false;
			this.hover_spectator = false;
			this.frame_count_shake = 0;
		}

		over(): boolean {
			if (
			this.score[0] >= this.score_limit ||
			this.score[1] >= this.score_limit
			)
			return true;
			return false;
		}

		scorePoint(invert: boolean) {
			reset_ai_pos = true;
			this.frame_count_shake = 0;
			audio_files.playScore();
			this.pong.velocity = [0, 0];
			this.pong.pos = [
			consts.WIDTH / 2 - consts.PONG_DIAMETER / 2,
			consts.HEIGHT / 2 - consts.PONG_DIAMETER / 2,
			];
			if (!invert) {
			if (this.pong.value === -1 && this.score[0] > 0) this.score[0]--;
			else if (this.pong.value !== -1) this.score[1] += this.pong.value;
			} else {
			if (this.pong.value === -1 && this.score[1] > 0) this.score[1]--;
			else if (this.pong.value !== -1) this.score[0] += this.pong.value;
			}
			setTimeout(() => {
			if (!parent) return;
			if (this.over()) {
				this.setState("game-over");
				return;
			}
			this.setState("relaunch-countdown");
			this.timer = 2;
			for (let i = 0; i < 3; i++) {
				setTimeout(() => {
				if (!parent) return;
				this.timer--;
				if (this.timer === 0) audio_files.playBip(audio_files.BIP_FINAL);
				else if (this.timer > 0) audio_files.playBip(audio_files.BIP);
				if (this.timer === -1 && this.state === "relaunch-countdown")
					this.setState("in-game");
				}, i * 1000);
			}
			if (invert) this.pong.relaunchPong("right");
			else this.pong.relaunchPong("left");
			this.frames_since_point = 0;
			}, 500);
		}

		setState(state: string) {
			this.state = state;
			audio_files.playAppropriateMusic(this.state, this.map.name);
		}
		}

		class GameMap {
		walls: [
			[number, number],
			[number, number]
		][]; // [pos_x, pos_y], [width, height]
		index: number;
		width: number;
		height: number;

		wall_width: number;
		background: any;
		object_color: string;
		name: string;

		constructor(index: number, w: number, h: number) {
			this.index = index;
			this.name = "original";
			this.width = 0;
			this.height = 0;
			this.wall_width = 0;
			this.object_color = ""
			this.walls = [[[0,0],[0,0]]]
			this.resize(w, h);
		}

		originalMap() {
			this.object_color = "white";
			this.background = null;
		}

		cityMap() {
			this.object_color = "#ffffff";
			if (consts) this.background = consts.CITY_BACKGROUND;
		}

		casinoMap() {
			this.object_color = "#ffffff";
			if (consts) this.background = consts.TOKYO_BACKGROUND;
		}
		secretMap() {
			this.object_color = "#ffffff";
			this.background = null;
		}

		render(ratio: number) {
			let map_width = this.width * ratio;
			let map_height = this.height * ratio;
			let top_bound = map_height / 75;
			let bot_bound = map_height - map_height / 75;

			p.push();
			p.noStroke();
			if (this.background)
			p.image(this.background, 0, 0, map_width, map_height);

			p.push();
			p.fill("rgba(0, 0, 0, 0.60)");
			p.rect(0, 0, map_width, map_height);
			p.pop();
			p.fill(this.object_color);
			if (ratio === 1) {
			p.push();
			p.fill("rgba(255, 255, 255, 0.6)");
			p.textSize(consts.small_font_size / 2);
			p.text(
				"Room #" + game.room_id,
				consts.WIDTH * 0.02,
				consts.HEIGHT * 0.03 + consts.small_font_size / 2
			); // room id
			outputScore(map_width, map_height);
			p.pop();
			}

			p.push();
			p.stroke(this.object_color);
			for (
			let i: number = top_bound;
			i < bot_bound;
			i += this.wall_width * 8 * ratio
			)
			p.rect(
				map_width / 2,
				i,
				this.wall_width * ratio,
				this.wall_width * 2 * ratio
			); // line in the middle
			for (const wall of this.walls) // bounds
			p.rect(
				wall[0][0] * ratio,
				wall[0][1] * ratio,
				wall[1][0] * ratio,
				wall[1][1] * ratio
			);
			p.pop();
			p.pop();
			if (this.name === "city")
			for (let bumper of bumpers) bumper.render(ratio);
			if (this.name === "secret")
			for (let breakout of game.breakouts) breakout.render();
		}

		resize(w: number, h: number) {
			this.width = w;
			this.height = h;
			this.wall_width = this.width / 240;
			this.walls = [
			[
				[this.wall_width, this.wall_width],
				[this.width - this.wall_width * 2, this.wall_width]
			],
			[
				[this.wall_width, this.height - this.wall_width * 2],
				[this.width - this.wall_width * 2, this.wall_width]
			]
			];
			if (this.index === 1) this.originalMap();
			else if (this.index === 2) {
			this.name = "city";
			this.cityMap();
			} else if (this.index === 3) {
			this.name = "casino";
			this.casinoMap();
			}
			else if (this.index === 4) {
				this.walls = [
					[
						[this.wall_width, this.wall_width],
						[this.width - this.wall_width * 2, this.wall_width]
					],
					[
						[this.wall_width, this.height - this.wall_width * 2],
						[this.width - this.wall_width * 2, this.wall_width]
					],
					[
						[this.width - this.wall_width * 2, this.wall_width],
						[this.wall_width, this.height - this.wall_width * 2]
					]
				];
				this.name = "secret";
				this.secretMap();
			}
		}
		}

	class Inputs {
		join: any;
		score_limit: any;

		constructor() {
			this.reset();
			this.create_inputs();
		}

		reset() {
			if (this.join) this.join.remove();
			this.join = null;
			if (this.score_limit) this.score_limit.remove();
			this.score_limit = null;
		}

		create_inputs() {
			this.join = createCustomInput("");
			this.join.size(consts.WIDTH / 1.75, consts.HEIGHT / 8);

			this.score_limit = createCustomInput("");
			this.score_limit.attribute("disabled", "true");
			this.score_limit.style("text-align", "center");
			this.score_limit.size(consts.WIDTH / 12, consts.HEIGHT / 10);
			this.hide();
			this.addParent();
		}

		resize() {
			this.join.size(consts.WIDTH / 1.75, consts.HEIGHT / 8);
			this.join.style("font-size", consts.std_font_size.toString() + "px");
			this.join.style(
			"border",
			(consts.DIAGONAL / 250).toString() + "px solid white"
			);
			this.score_limit.size(consts.WIDTH / 12, consts.HEIGHT / 10);
			this.score_limit.style(
			"font-size",
			consts.std_font_size.toString() + "px"
			);
			this.score_limit.style(
			"border",
			(consts.DIAGONAL / 250).toString() + "px solid white"
			);
		}

		hide() {
			this.join.hide();
			this.score_limit.hide();
		}

		addParent() {
			if (!parent)
				return ;
			this.join.parent(document.getElementById("input-join"));
			this.score_limit.parent(document.getElementById("input-score_limit"));
		}
	}

	class Keys {
		w: any;
		a: any;
		s: any;
		d: any;

		up: any;
		left: any;
		down: any;
		right: any;

		constructor() {
			this.w = p.loadImage("/assets/keys/w-key.gif");
			this.a = p.loadImage("/assets/keys/tile-a.png");
			this.s = p.loadImage("/assets/keys/s-key.gif");
			this.d = p.loadImage("/assets/keys/tile-d.png");
			this.up = p.loadImage("/assets/keys/up-key.gif");
			this.left = p.loadImage("/assets/keys/tile-left.png");
			this.down = p.loadImage("/assets/keys/down-key.gif");
			this.right = p.loadImage("/assets/keys/tile-right.png");
		}
	}

	class MovingText {
		pos: Vector;
		vel: Vector;

		moving: boolean;

		left: boolean;

		text: string;
		initial_speed: number;
		slow_speed: number;

		transition_speed: number;

		constructor(x: number, y: number, left: boolean, text: string) {
			this.initial_speed = left
			? consts.DIAGONAL * 0.03
			: -consts.DIAGONAL * 0.03;
			this.slow_speed = left
			? consts.DIAGONAL * 0.001
			: -consts.DIAGONAL * 0.001;

			this.left = left;

			this.pos = new Vector([x, y]);
			this.vel = new Vector([this.initial_speed, 0]);

			this.text = text;
			this.moving = false;

			this.transition_speed = consts.DIAGONAL / 400;
		}

		calculatePos() {
			if (this.left) {
			if (this.pos.x > consts.WIDTH * 0.2 && this.pos.x < consts.WIDTH * 0.6)
				this.vel.lerp(
				new Vector([this.slow_speed, 0]),
				this.transition_speed
				);
			else if (this.pos.x > consts.WIDTH * 0.6)
				this.vel.lerp(
				new Vector([this.initial_speed * 4, 0]),
				this.transition_speed * 2
				);
			if (this.pos.x > consts.WIDTH + this.text.length * consts.std_font_size)
				this.moving = false;
			} else {
			if (this.pos.x > consts.WIDTH * 0.4 && this.pos.x < consts.WIDTH * 0.8)
				this.vel.lerp(
				new Vector([this.slow_speed, 0]),
				this.transition_speed
				);
			else if (this.pos.x < consts.WIDTH * 0.4)
				this.vel.lerp(
				new Vector([this.initial_speed * 4, 0]),
				this.transition_speed * 2
				);
			if (this.pos.x + this.text.length * consts.std_font_size < 0)
				this.moving = false;
			}
			this.pos.x += this.vel.x;
			this.pos.y += this.vel.y;
		}

		render() {
			p.push();
			p.fill("white");
			p.textAlign(p.CENTER);
			p.textSize(consts.std_font_size);
			p.text(this.text, this.pos.x, this.pos.y);
			p.pop();
		}
	}

	class BreakOut {
		pos: [number, number] = [0, 0];
		width: number = consts.BREAKOUT_WIDTH;
		height : number = consts.BREAKOUT_HEIGHT;
		color: string = "white";

		constructor(pos : [number, number], color : string) {
			this.pos = pos;
			this.color = color;
		}

		render() {
			p.push();
			p.fill(this.color);
			p.strokeWeight(0);
			p.rect(this.pos[0], this.pos[1], this.width, this.height);
			p.pop();
		}

		resize() {
			let proportionnal_pos_x: number = this.pos[0] / consts.OLD_WIDTH;
			let proportionnal_pos_y: number = this.pos[1] / consts.OLD_HEIGHT;
			this.width = consts.BREAKOUT_WIDTH;
			this.height = consts.BREAKOUT_HEIGHT;
			this.pos = [
			consts.WIDTH * proportionnal_pos_x,
			consts.HEIGHT * proportionnal_pos_y,
			];
		}

		checkCollisions() : boolean {
			let ball_points: [
				[number, number],
				[number, number],
				[number, number],
				[number, number]
			] = [
				game.pong.up(),
				game.pong.right(),
				game.pong.down(),
				game.pong.left(),
			];
			for (let i = 0 ; i < 4 ; i++) {
				let intersection_point: [number, number, string][] = [[-1, -1, "side"]]; // array of one element so that the variable is referenced in functions
				collisionBreakOut(this, intersection_point, ball_points[i]);
				if (intersection_point[0][0] !== -1) {
					audio_files.playRandomPaddleSound();
					game.pong.velocity[0] *= -1;
					game.breakouts.splice(game.breakouts.indexOf(this), 1);
					if (game.breakouts.length === 0)
						game.setState("game-over");
					return true;
				}
			}
			return false;
		}

		leftDown(): [number, number] {
			return [this.pos[0], this.pos[1] + this.height];
		}
		leftUp() : [number, number]{
			return [this.pos[0], this.pos[1]];
		}
		rightDown() : [number, number]{
			return [this.pos[0] + this.width, this.pos[1] + this.height];
		}
		rightUp() : [number, number]{
			return [this.pos[0] + this.width, this.pos[1] + this.height];
		}
	}

	class Player {
		pos: [number, number] = [0, 0];
		velocity: [number, number] = [0, 0];
		width: number = consts.PLAYER_WIDTH;
		height: number = consts.PLAYER_HEIGHT;
		color: string = "white";
		index: number = 0;
		id: string = "0";
		ready: boolean = false;

		username: string;
		real_id: number;
		moving_name: MovingText;

		timestep: number;

		constructor(index: number, id: any, username: string, real_id: number) {
			if (index === 1)
				this.pos = [
					consts.WIDTH / 12,
					consts.HEIGHT / 2 - consts.PLAYER_HEIGHT / 2,
				];
			else
				this.pos = [
					(consts.WIDTH * 11) / 12,
					consts.HEIGHT / 2 - consts.PLAYER_HEIGHT / 2,
				];

			this.timestep = 0;
			this.velocity = [0, 0];
			this.width = consts.PLAYER_WIDTH;
			this.height = consts.PLAYER_HEIGHT;
			this.color = game.map.object_color;
			this.index = index;
			this.id = id;
			this.real_id = real_id;
			this.ready = false;
			this.username = username;

			if (index === 1) {
				this.moving_name = new MovingText(
					-consts.WIDTH * 2 + username.length * consts.std_font_size,
					consts.HEIGHT * 0.35,
					true,
					username
				);
			} else {
				this.moving_name = new MovingText(
					consts.WIDTH * 2 - username.length * consts.std_font_size,
					consts.HEIGHT * 0.65 + consts.std_font_size,
					false,
					username
				);
			}
		}

		moveName() {
			this.moving_name.moving = true;
		}

		render() {
			p.push();
			p.noStroke();
			p.fill(this.color);
			p.rect(this.pos[0], this.pos[1], this.width, this.height);
			p.pop();
		}

		resize() {
			let proportionnal_y = this.pos[1] / consts.OLD_HEIGHT;
			this.width = consts.PLAYER_WIDTH;
			this.height = consts.PLAYER_HEIGHT;
			if (this.index === 1)
			this.pos = [consts.WIDTH / 12, consts.HEIGHT * proportionnal_y];
			else
			this.pos = [(consts.WIDTH * 11) / 12, consts.HEIGHT * proportionnal_y];
		}

		calculateNewPos() {
			this.pos[1] += this.velocity[1];
			if (this.pos[1] < consts.TOP_BOUND)
			// 10 for boundaries
			this.pos[1] = consts.TOP_BOUND;
			if (this.pos[1] + this.height > consts.BOT_BOUND)
			// -10 for boundaries
			this.pos[1] = consts.BOT_BOUND - this.height;
		}

		distanceTo(point: [number, number]): number {
			let dist: number = Math.sqrt(
			Math.pow(point[0] - (this.pos[0] + this.width / 2), 2) +
				Math.pow(point[1] - (this.pos[1] + this.height / 2), 2)
			);

			return dist;
		}

		moveUp(pos_diff : number) {
			this.velocity[1] = -consts.PLAYER_SPEED;
			if (game.local && game.ai && this.index === 2) {
				this.velocity[1] = -pos_diff;
				if (this.velocity[1] < -consts.AI_SPEED)
					this.velocity[1] = -consts.AI_SPEED;
			}
			this.calculateNewPos();
		}

		moveDown(pos_diff : number) {
			this.velocity[1] = consts.PLAYER_SPEED;
			if (game.local && game.ai && this.index === 2) {
				this.velocity[1] = -pos_diff;
				if (this.velocity[1] > consts.AI_SPEED)
					this.velocity[1] = consts.AI_SPEED;
			}
			this.calculateNewPos();
		}

		leftUp(): [number, number] {
			return [this.pos[0], this.pos[1]];
		}

		leftDown(): [number, number] {
			return [this.pos[0], this.pos[1] + this.height];
		}

		rightUp(): [number, number] {
			return [this.pos[0] + this.width, this.pos[1]];
		}

		rightDown(): [number, number] {
			return [this.pos[0] + this.width, this.pos[1] + this.height];
		}
	}

	class Pong {
		pos: [number, number];
		velocity: [number, number];
		diameter: number;
		speed: number;
		color: string;
		value: number;

		constructor() {
			this.pos = [
			consts.WIDTH / 2 - consts.PONG_DIAMETER / 2,
			consts.HEIGHT / 2 - consts.PONG_DIAMETER / 2,
			];
			this.diameter = consts.PONG_DIAMETER;
			this.color = game.map.object_color;
			this.value = 1;
			
			this.velocity = [0, 0];
			this.speed = 0;

			let side = Math.random() < 0.5 ? "left" : "right";
			this.relaunchPong(side);
		}

		calculateNewPos() {
			this.pos[0] += this.velocity[0];
			this.pos[1] += this.velocity[1];
			checkCollisions();
		}

		resize() {
			let proportionnal_pos_x: number = this.pos[0] / consts.OLD_WIDTH;
			let proportionnal_pos_y: number = this.pos[1] / consts.OLD_HEIGHT;
			let proportionnal_vel_x: number = this.velocity[0] / consts.OLD_WIDTH;
			let proportionnal_vel_y: number = this.velocity[1] / consts.OLD_HEIGHT;
			this.diameter = consts.PONG_DIAMETER;
			this.pos = [
			consts.WIDTH * proportionnal_pos_x,
			consts.HEIGHT * proportionnal_pos_y,
			];
			this.velocity = [
			consts.WIDTH * proportionnal_vel_x,
			consts.HEIGHT * proportionnal_vel_y,
			];
		}

		relaunchPong(loser_side: string) {
			if (game.map.name === "secret")
				loser_side = "left";
			this.pos = [
			consts.WIDTH / 2 - consts.PONG_DIAMETER / 2,
			consts.HEIGHT / 2 - consts.PONG_DIAMETER / 2,
			];
			this.speed = consts.PONG_BASE_SPEED;
			let random_y = Math.random() < 0.5 ? -1 : 1;

			if (loser_side === "left") this.velocity = [-this.speed, random_y];
			else if (loser_side === "right") this.velocity = [this.speed, random_y];
			this.setNewValue();
		}

		setNewValue() {
			// values (0 -> -1) (1 - 4 -> 1) (5 - 7 -> 2) (8 - 9 -> 3) (10 -> 4)
			if (game.map.name !== "casino") return;
			let rand: number = Math.floor(Math.random() * 11);
			if (rand === 0) this.value = -1;
			else if (rand <= 4) this.value = 1;
			else if (rand <= 7) this.value = 2;
			else if (rand <= 9) this.value = 3;
			else if (rand === 10) this.value = 4;
		}

		leftUp(): [number, number] {
			return [this.pos[0], this.pos[1]];
		}

		leftDown(): [number, number] {
			return [this.pos[0], this.pos[1] + this.diameter];
		}

		rightUp(): [number, number] {
			return [this.pos[0] + this.diameter, this.pos[1]];
		}

		rightDown(): [number, number] {
			return [this.pos[0] + this.diameter, this.pos[1] + this.diameter];
		}

		left(): [number, number] {
			return [this.pos[0], this.cY()];
		}

		right(): [number, number] {
			return [this.pos[0] + this.diameter, this.cY()];
		}

		up(): [number, number] {
			return [this.cX(), this.pos[1]];
		}

		down(): [number, number] {
			return [this.cX(), this.pos[1] + this.diameter];
		}

		ballMoves(pos: [number, number]): [number, number] {
			return [pos[0] + this.velocity[0], pos[1] + this.velocity[1]];
		}

		cX(): number {
			return this.pos[0] + this.diameter / 2;
		}

		cY(): number {
			return this.pos[1] + this.diameter / 2;
		}

		center(): [number, number] {
			return [this.cX(), this.cY()];
		}

		centerNextFrame(): [number, number] {
			return [this.cX() + this.velocity[0], this.cY() + this.velocity[1]];
		}

		render() {
			if (this.value === -1) this.color = "#80ff80"; // green
			if (this.value === 1) this.color = "white";
			else if (this.value === 2) this.color = "#ffff4d"; // yellow
			else if (this.value === 3) this.color = "#ffa64d"; // orange
			else if (this.value === 4) this.color = "#ff4d4d"; // red
			p.push();
			p.noStroke();
			p.fill(this.color);
			p.rect(this.pos[0], this.pos[1], this.diameter, this.diameter);
			p.pop();
		}
	}

	function removeChildren(id : string) {
		const parent = document.getElementById(id);
		if (!parent)
			return ;
		while (parent.lastChild)  {
			parent.removeChild(parent.lastChild);
		}
	}

	function sub_vec(v1: Vector, v2: Vector): Vector {
		let ret: Vector = new Vector([v1.x, v1.y]);
		ret.x -= v2.x;
		ret.y -= v2.y;
		return ret;
	}

	class Vector {
		x: number;
		y: number;

		constructor(pos: [number, number]) {
			this.x = pos[0];
			this.y = pos[1];
		}

		add(other: Vector) {
			this.x += other.x;
			this.y += other.y;
		}

		mult(nbr: number) {
			this.x *= nbr;
			this.y *= nbr;
		}

		mag() {
			return Math.sqrt(this.x * this.x + this.y * this.y);
		}

		normalize() {
			this.x /= this.mag();
			this.y /= this.mag();
		}

		dot(other: Vector): number {
			let ret: number = 0;

			ret += this.x * other.x;
			ret += this.y * other.y;
			return ret;
		}

		lerp(other: Vector, amount: number) {
			if (this.x > other.x) this.x -= amount;
			else if (this.x < other.x) this.x += amount;
			if (this.y > other.y) this.y -= amount;
			else if (this.y < other.y) this.y += amount;
		}
	}

	function deleteEverything() {
		removeChildren("button-create");
		removeChildren("button-join");
		removeChildren("button-matchmaking");
		
		removeChildren("button-anyone");
		removeChildren("button-invitation");
		removeChildren("button-local");
		
		removeChildren("button-ai");
		removeChildren("button-validate");
		removeChildren("button-return");
		removeChildren("button-sound");
		removeChildren("button-map-original");
		removeChildren("button-map-city");
		removeChildren("button-map-casino");
		removeChildren("button-map-secret");
		removeChildren("button-spectate");
		removeChildren("button-plus");
		removeChildren("button-minus");
		
		removeChildren("input-join");
		removeChildren("input-score_limit");
		removeChildren("button-opp-left-ok");
	}

	function resizeEverything() {
		if (consts) consts.resize();
		if (game) {
			for (let player of game.players) if (player) player.resize();
			if (game.pong) game.pong.resize();
			if (game.map) game.map.resize(consts.WIDTH, consts.HEIGHT);
			if (game.breakouts) for (let breakout of game.breakouts) breakout.resize();
		}
		if (buttons) buttons.resize();
		if (inputs) inputs.resize();
		if (bumpers) for (let bumper of bumpers) bumper.resize();
	}

	p.preload = () => {
		parent = document.getElementById("canvas-pong-parent");
		consts = new Consts();
		keys = new Keys();

		spritedata = p.loadJSON("/assets/sprites/bumper.json");
		spritesheet = p.loadImage("/assets/sprites/bumper.png");
	};

	let parent: any;

	p.setup = () => {
		canvas = p.createCanvas(consts.WIDTH, consts.HEIGHT);
		canvas.parent(parent);

		let frames = spritedata.frames;
		for (let i = 0; i < frames.length; i++) {
			let pos = frames[i].position;
			let img = spritesheet.get(pos.x, pos.y, pos.w, pos.h);
			for (let j = 0; j < frames[i].time; j++) animation.push(img);
		}
		let diameter = consts.DIAGONAL * 0.1;

		bumpers.push(
			new Bumper(
			animation,
			consts.WIDTH / 2 - diameter / 2,
			(consts.HEIGHT * 1) / 4 - diameter / 2,
			diameter,
			1
			)
		);
		bumpers.push(
			new Bumper(
			animation,
			consts.WIDTH / 2 - diameter / 2,
			(consts.HEIGHT * 3) / 4 - diameter / 2,
			diameter,
			2
			)
		);
		if (!game)
			game = new Game();
		inputs = new Inputs();
		errors = new Errors();
		buttons = new Buttons();
			
		if (!parent) {
			deleteEverything();
			p.remove();
			return ;
		}
		p.background(0);
		p.textFont(consts.FONT);
		p.frameRate(60);


		resizeEverything();
		// ? server keeps a boolean for each client to tell if they've loaded fully or not
		// ? so that when they are, it can send them to matches for invitation
	};

	p.keyPressed = () => {
		if (game === null) return;
		if (game.local && p.key === "p") {
			if (game.timeout)
				clearTimeout(game.timeout);
			inMainMenu();
		}
		if (game.state === "in-menu-input" && p.keyCode === p.ENTER) {
			if (inputs.join.value()[0] === "#")
				inputs.join.value(inputs.join.value().slice(1));
		}
	}

	let width: number;
	let height: number;
		
	p.draw = () => {
		parent = document.getElementById("canvas-pong-parent");
		if (!parent) {
			deleteEverything();
			p.remove();
			return ;
		}

		width = parent.clientWidth;
		height = parent.clientHeight;
		
		if (width !== canvas.width || height !== canvas.height) {
			p.noLoop();
			resizeEverything();

			p.resizeCanvas(consts.WIDTH, consts.HEIGHT);
			p.loop();
		}

		audio_files.playAppropriateMusic(game.state, game.map.name);
		p.push();
		if (
			(game.score[0] !== 0 || game.score[1] !== 0) &&
			(game.state === "in-game" || game.state === "relaunch-countdown") &&
			game.frame_count_shake < 30
		) {
			game.frame_count_shake++;
			p.translate(Math.floor(p.random(-5, 6)), Math.floor(p.random(-5, 6)));
		}
		p.clear(0, 0, 0, 0);
		p.background(0);
		if (
			game.state === "waiting-player" ||
			game.state === "waiting-readiness" ||
			game.state === "countdown" ||
			game.state === "relaunch-countdown" ||
			game.state === "in-game"
		)
			game.map.render(1);
		if (
			game.state === "in-menu-input" ||
			game.state === "waiting-player" ||
			game.state === "in-menu-create"
		)
		p.image(
			consts.RETURN_ICON,
			consts.WIDTH * 0.9,
			consts.HEIGHT * 0.01,
			consts.medium_square_diameter,
			consts.medium_square_diameter
			);
		if (game.state === "in-menu-create") {
			drawMinimaps();
			outputAnnouncement(
			"Game Creation",
			consts.std_font_size,
			consts.WIDTH / 2,
			consts.HEIGHT / 7,
			"white"
			);
			outputAnnouncement(
			"score limit   ",
			consts.medium_font_size,
			(consts.WIDTH * 1.2) / 5,
			consts.HEIGHT * 0.48,
			"white"
			);
		}
		if (game.state === "opponent-left-menu" && game.spectator === true)
			outputAnnouncement(
			"A player left",
			consts.std_font_size,
			consts.WIDTH / 2,
			consts.HEIGHT / 2,
			"white"
			);
		else if (game.state === "opponent-left-menu")
			outputAnnouncement(
			"Your opponent left",
			consts.std_font_size,
			consts.WIDTH / 2,
			consts.HEIGHT / 2,
			"white"
			);
		if (game.state === "in-menu") {
			outputAnnouncement("You can press P during a game to quit it", consts.small_font_size * 0.35, consts.WIDTH * 0.25, consts.HEIGHT * 0.05, "rgba(255, 255, 255, 0.6)");
			outputAnnouncement(
			"The Ponger's Guide",
			consts.std_font_size * 1.25,
			consts.WIDTH / 2,
			consts.HEIGHT / 4,
			"white"
			);
			outputAnnouncement(
				"to the Galaxy",
				consts.std_font_size * 1.25,
				consts.WIDTH / 2,
				consts.HEIGHT * 0.35,
				"white"
				);
		}
		else if (game.state === "in-menu-input") {
			drawSpectate();
			outputAnnouncement(
			"Enter Room ID",
			consts.std_font_size,
			consts.WIDTH / 2,
			(consts.HEIGHT * 2) / 5,
			"white"
			);
			if (errors.game_full)
			outputAnnouncement(
				"This game is already full",
				consts.small_font_size,
				consts.WIDTH / 2,
				consts.HEIGHT / 2,
				"white"
			);
			else if (errors.game_not_found)
			outputAnnouncement(
				"This game doesn't exist",
				consts.small_font_size,
				consts.WIDTH / 2,
				consts.HEIGHT / 2,
				"white"
			);
			else if (errors.already_in_game)
			outputAnnouncement(
				"You are already in this game",
				consts.small_font_size,
				consts.WIDTH / 2,
				consts.HEIGHT / 2,
				"white"
			);
		} else if (game.state === "waiting-player") {
			if (game.spectator) drawSpectate();
			buttons.return.show();
			p.image(
			consts.RETURN_ICON,
			consts.WIDTH * 0.9,
			consts.HEIGHT * 0.01,
			consts.medium_square_diameter,
			consts.medium_square_diameter
			);
			outputAnnouncement(
			"WAITING FOR ANOTHER PLAYER",
			consts.medium_font_size,
			consts.WIDTH / 2,
			consts.HEIGHT / 2,
			"white"
			);
		} else if (game.state === "waiting-readiness") {
			if (game.spectator) drawSpectate();
			drawPlayerReadiness();
			outputAnnouncement(
			"PLEASE PRESS SPACE TO START THE GAME",
			consts.medium_font_size,
			consts.WIDTH / 2,
			consts.HEIGHT / 2,
			"white"
			);
		} else if (game.state === "countdown") {
			if (game.spectator) drawSpectate();
			outputCountdown();
			drawBallIntent();
			if (!game.local && !game.spectator) drawHelp();
			if (!game.spectator) drawInput();
			for (let i: number = 0; i < game.players.length; i++) {
			game.players[i].render();
			game.players[i].moveName();
			}
			for (let player of game.players) {
			if (player.moving_name.moving) {
				player.moving_name.render();
				player.moving_name.calculatePos();
			}
			}
		} else if (game.state === "relaunch-countdown") {
			if (game.spectator) drawSpectate();
			outputCountdown();
			movePlayers();
			for (let player of game.players) player.render();
			game.pong.render();
			drawBallIntent();
			outputPlayerNames();
		} else if (game.state === "in-game") {
			if (game.spectator) drawSpectate();
			movePlayers();
			if (game.state === "in-game") {
			for (let i: number = 0; i < game.players.length; i++)
				game.players[i].render();
			game.pong.render();
			if (game.map.name === "city")
				for (let bumper of bumpers) bumper.render();
			}
			if (game.frames_since_point < 180 && game.map.name === "casino")
			outputAnnouncement(
				game.pong.value +
				(game.pong.value === 1 || game.pong.value === -1
					? " point"
					: " points"),
				consts.std_font_size,
				consts.WIDTH * 0.5,
				consts.HEIGHT * 0.95,
				game.pong.color
			);
			outputPlayerNames();
		} else if (game.state === "game-over") {
			buttons.opponent_left_ok.show();
			if (game.players.length === 2)
			outputAnnouncement(
				(game.score[0] > game.score[1]
				? game.players[0].username
				: game.players[1].username) + " won the game!",
				consts.std_font_size,
				p.width / 2,
				p.height / 2,
				"white"
			);
			else if (game.map.name === "secret") {
				if (game.score[1] < game.score_limit)
					outputAnnouncement("You won!", consts.std_font_size, p.width / 2, p.height / 2, "white");
				else 
					outputAnnouncement("You lost.", consts.std_font_size, p.width / 2, p.height / 2, "white");
			}
			outputScore(consts.WIDTH, consts.HEIGHT);
		}
		if (
			game.state === "in-menu" ||
			game.state === "waiting-player" ||
			game.state === "waiting-readiness"
		) {
			drawSound();
			buttons.sound.show();
		}
		p.pop();
	};

	function addBreakouts() {
		let length = 10;
		let space = (consts.HEIGHT - consts.secret_map.wall_width * 2 - (consts.BREAKOUT_HEIGHT * length)) / (length + 2);
		for (let i = 0; i < length; i++)
			game.breakouts.push(new BreakOut([consts.WIDTH * 0.8, consts.secret_map.wall_width + space + (i) * (space + consts.BREAKOUT_HEIGHT)], "#6699ff"));
		for (let i = 0; i < length; i++)
			game.breakouts.push(new BreakOut([consts.WIDTH * 0.8 + consts.BREAKOUT_WIDTH * 1.5, consts.secret_map.wall_width + space + (i) * (space + consts.BREAKOUT_HEIGHT)], "#6699ff"));
		for (let i = 0; i < length; i++)
			game.breakouts.push(new BreakOut([consts.WIDTH * 0.8 + consts.BREAKOUT_WIDTH * 3, consts.secret_map.wall_width + space + (i) * (space + consts.BREAKOUT_HEIGHT)], "#00cc66"));
		for (let i = 0; i < length; i++)
			game.breakouts.push(new BreakOut([consts.WIDTH * 0.8 + consts.BREAKOUT_WIDTH * 4.5, consts.secret_map.wall_width + space + (i) * (space + consts.BREAKOUT_HEIGHT)], "#00cc66"));
		for (let i = 0; i < length; i++)
			game.breakouts.push(new BreakOut([consts.WIDTH * 0.8 + consts.BREAKOUT_WIDTH * 6, consts.secret_map.wall_width + space + (i) * (space + consts.BREAKOUT_HEIGHT)], "#ffff00"));
		for (let i = 0; i < length; i++)
			game.breakouts.push(new BreakOut([consts.WIDTH * 0.8 + consts.BREAKOUT_WIDTH * 7.5, consts.secret_map.wall_width + space + (i) * (space + consts.BREAKOUT_HEIGHT)], "#ffff00"));
		for (let i = 0; i < length; i++)
			game.breakouts.push(new BreakOut([consts.WIDTH * 0.8 + consts.BREAKOUT_WIDTH * 9, consts.secret_map.wall_width + space + (i) * (space + consts.BREAKOUT_HEIGHT)], "#ff9933"));
		for (let i = 0; i < length; i++)
			game.breakouts.push(new BreakOut([consts.WIDTH * 0.8 + consts.BREAKOUT_WIDTH * 10.5, consts.secret_map.wall_width + space + (i) * (space + consts.BREAKOUT_HEIGHT)], "#ff9933"));
		for (let i = 0; i < length; i++)
			game.breakouts.push(new BreakOut([consts.WIDTH * 0.8 + consts.BREAKOUT_WIDTH * 12, consts.secret_map.wall_width + space + (i) * (space + consts.BREAKOUT_HEIGHT)], "#ff0000"));
		for (let i = 0; i < length; i++)
			game.breakouts.push(new BreakOut([consts.WIDTH * 0.8 + consts.BREAKOUT_WIDTH * 13.5, consts.secret_map.wall_width + space + (i) * (space + consts.BREAKOUT_HEIGHT)], "#ff0000"));
	}

	function createCustomButton(
	title: string,
	mPressed: any,
	mOver: any,
	mOut: any,
	size_x: number,
	size_y: number
	) {
		let button = p.createButton(title);
		button.style("color", "white");
		button.style(
			"font-size",
			(Math.sqrt(Math.pow(size_x, 2) + Math.pow(size_y, 2)) / 8).toString() +
			"px"
		);
		button.style("font-family", "PressStart2P-Regular");
		button.style("background-color", "black");
		button.style("border-radius", "1em");
		button.size(size_x, size_y); // 280, 175 default

		button.mousePressed(mPressed);
		button.mouseOver(mOver);
		button.mouseOut(mOut);

		return button;
	}

		function createCustomInput(title: string) {
		let input = p.createInput(title);
		input.style("height", (consts.HEIGHT / 10).toString() + "px");
		input.style("font-size", consts.std_font_size.toString() + "px");
		input.style("font-family", "PressStart2P-Regular");
		input.style("background-color", "black");
		input.style("color", "white");
		input.style(
			"border",
			(consts.DIAGONAL / 250).toString() + "px solid white"
		);
		input.style("border-radius", "0.5em");
		input.style("outline", "none");

		input.attribute("maxlength", "16");

		return input;
		}

		function outputAnnouncement(
		msg: string,
		text_size: number,
		pos_x: number,
		pos_y: number,
		color: string
		) {
		p.push();
		p.fill(color);
		p.noStroke();
		p.textSize(text_size);
		p.textAlign(p.CENTER);
		p.text(msg, pos_x, pos_y);
		p.pop();
		}

		function drawPlayerReadiness() {
		let icon_p1, icon_p2;

		for (const player of game.players) {
			p.push();
			p.textAlign(p.CENTER);
			p.fill("white");
			p.push();
			p.textSize(consts.std_font_size);
			p.text(
			"P" + player.index,
			player.index === 1 ? consts.WIDTH / 4 : (consts.WIDTH * 3) / 4,
			(consts.HEIGHT * 2) / 3
			);
			p.pop();
			if (player.ready === true)
			player.index === 1
				? (icon_p1 = consts.MARK_ICON)
				: (icon_p2 = consts.MARK_ICON);
			else
			player.index === 1
				? (icon_p1 = consts.CROSS_ICON)
				: (icon_p2 = consts.CROSS_ICON2);
			p.pop();
		}
		p.image(icon_p1, consts.WIDTH * 0.3, consts.HEIGHT * 0.58, consts.small_square_diameter * 1.5, consts.small_square_diameter * 1.5);
		p.image(icon_p2, consts.WIDTH * 0.80, consts.HEIGHT * 0.58, consts.small_square_diameter * 1.5, consts.small_square_diameter * 1.5);
		}

		function outputCountdown() {
		outputAnnouncement(
			"" + game.timer,
			consts.std_font_size,
			consts.WIDTH * 0.505,
			consts.HEIGHT * 0.535,
			"white"
		);
		}

		function outputScore(map_width: number, map_height: number) {
		if (game.map.name === "secret" && (game.score_limit - game.score[1]) > 1)
			outputAnnouncement((game.score_limit - game.score[1]).toString() + " lives left", consts.std_font_size, consts.WIDTH / 2, consts.HEIGHT / 9, "white");
		else if (game.map.name === "secret" && (game.score_limit - game.score[1]) === 1)
			outputAnnouncement("1 life left", consts.std_font_size, consts.WIDTH / 2, consts.HEIGHT / 9, "white");
			else if (game.map.name === "secret" && (game.score_limit - game.score[1]) === 0)
			outputAnnouncement("DEAD", consts.std_font_size, consts.WIDTH / 2, consts.HEIGHT / 9, "white");
		if (game.players.length !== 2) return;
		if (game.players[0].index === 1) {
			p.push();
			p.textSize(consts.std_font_size);
			p.push();
			p.fill(game.score[0] > game.score[1] ? "white" : "grey"); // highlight better score
			if (game.score[0].toString().length > 1)
			p.text(game.score[0], map_width / 2 - map_width / 10, map_height / 9);
			// score
			else p.text(game.score[0], map_width / 2 - map_width / 16, map_height / 9); // score
			p.pop();
			p.push();
			p.fill(game.score[1] > game.score[0] ? "white" : "grey");
			p.text(game.score[1], map_width / 2 + map_width / 30, map_height / 9); // score
			p.pop();
			p.pop();
		} else {
			p.push();
			p.textSize(consts.std_font_size);
			p.push();
			p.fill(game.score[1] > game.score[0] ? "white" : "grey"); // highlight better score
			if (game.score[1].toString().length > 1)
			p.text(game.score[1], map_width / 2 - map_width / 10, map_height / 9);
			// score
			else p.text(game.score[1], map_width / 2 - map_width / 16, map_height / 9); // score
			p.pop();
			p.push();
			p.fill(game.score[0] > game.score[1] ? "white" : "grey");
			p.text(game.score[0], map_width / 2 + map_width / 30, map_height / 9); // score
			p.pop();
			p.pop();
		}
		}

		function outputPlayerNames() {
		p.push();
		p.textSize(consts.small_font_size / 2);
		p.fill("rgba(255, 255, 255, 0.6)");
		p.textAlign(p.CENTER);
		if (game.players[0].index === 1) {
			p.text(game.players[0].username, consts.WIDTH * 0.1, consts.HEIGHT * 0.95);
			if (game.players.length > 1)
				p.text(game.players[1].username, consts.WIDTH * 0.9, consts.HEIGHT * 0.95);
		} else {
			if (game.players.length > 1)
				p.text(game.players[1].username, consts.WIDTH * 0.1, consts.HEIGHT * 0.95);
			p.text(game.players[0].username, consts.WIDTH * 0.9, consts.HEIGHT * 0.95);
		}
		p.pop();
		}

		function inMainMenu() {
			game.reset();
			errors.set_false();
			buttons.reset();
			inputs.reset();
			inputs.create_inputs();
			game.setState("in-menu");
		}

		function opponentLeftMenu() {
		game.setState("opponent-left-menu");
		buttons.hide();
		if (buttons.opponent_left_ok.parent())
			buttons.opponent_left_ok.parent().style["z-index"] = 2; // deal with buttons overlapping
		buttons.opponent_left_ok.show();
		}

		let ai_diff : number = 0;
		let new_ai_diff : number = 0;
		let ai_pos : number = 0; // ? random pos on the paddle of the ai
		let reset_ai_pos : boolean = true; // ? when true, recalculate ai pos

		function movePlayers() {
		if (!game.spectator) {
			if (p.keyIsDown(87)) game.players[0].moveUp(0);
			else if (p.keyIsDown(83)) game.players[0].moveDown(0);
			else game.players[0].velocity[1] = 0;

			if (game.ai) {
			// ? chaser ai code
			if (reset_ai_pos) {
				new_ai_diff = (Math.random() * consts.PLAYER_HEIGHT);
				reset_ai_pos = false;
			}
			if (ai_diff > new_ai_diff)
				ai_diff -= consts.PLAYER_HEIGHT * 0.05;
			if (ai_diff < new_ai_diff)
				ai_diff += consts.PLAYER_HEIGHT * 0.05;

			ai_pos = game.players[1].pos[1] + ai_diff;
			if (game.pong.velocity[0] > 0) {
				let pos_diff = ai_pos - game.pong.cY();
	
				if (pos_diff > 0) game.players[1].moveUp(pos_diff);
				else if (pos_diff < 0) game.players[1].moveDown(pos_diff);
				else game.players[1].velocity[1] = 0;
			}
			else {
				let dist = consts.HEIGHT / 2 - (game.players[1].pos[1] + game.players[1].height / 2);
				if (dist < 0) {
					game.players[1].moveUp(-dist);
				} 
				else {
					game.players[1].moveDown(-dist);	
				}
			}
			} else if (game.map.name !== "secret") {
			if (p.keyIsDown(p.UP_ARROW)) game.players[1].moveUp(0);
			else if (p.keyIsDown(p.DOWN_ARROW)) game.players[1].moveDown(0);
			else game.players[1].velocity[1] = 0;
			}

			if (game.state !== "relaunch-countdown" && game.local)
			game.pong.calculateNewPos();
		}
		}

		let arrow_anim: number = 0;
		let arrow_anim2: number = 0;
		let grow: boolean = true;
		let grow2: boolean = true;

		let tint_sound: boolean = false;

		function highlightSoundButton() {
		tint_sound = true;
		}
		function resetSoundButton() {
		tint_sound = false;
		}

		function drawSound() {
		p.push();
		if (tint_sound) p.tint(200, 200, 200);
		p.image(
			consts.SOUND_ICON,
			consts.WIDTH * 0.8,
			consts.HEIGHT * 0.02,
			consts.small_square_diameter * 1.65,
			consts.small_square_diameter * 1.65
		);
		p.pop();
		let rect_size = (consts.small_square_diameter * 1.65) / 6;
		p.push();
		p.fill("white");
		p.noStroke();
		for (let i = 0; i < audio_files.max_volume * 4; i++)
		p.rect(
			consts.WIDTH * 0.88,
			consts.HEIGHT * 0.03 + rect_size * i + (rect_size / 3) * i,
			rect_size,
			rect_size
			);
		p.pop();
		}

		function drawBallIntent() {
		let arrow_width = consts.DIAGONAL * 0.01 + arrow_anim2;
		if (grow2) arrow_anim2 += consts.DIAGONAL * 0.0005;
		else arrow_anim2 -= consts.DIAGONAL * 0.0005;
		if (arrow_anim2 >= consts.DIAGONAL * 0.005) grow2 = false;
		else if (arrow_anim2 <= 0) grow2 = true;
		p.push();
		p.fill("white");
		p.noStroke();
		if (game.pong.velocity[0] < 0)
		p.triangle(
			consts.WIDTH / 2.5,
			consts.HEIGHT * 0.49 + arrow_width / 2,
			consts.WIDTH / 2.5 + arrow_width,
			consts.HEIGHT * 0.49 + arrow_width + arrow_width / 2,
			consts.WIDTH / 2.5 + arrow_width,
			consts.HEIGHT * 0.49 - arrow_width + arrow_width / 2
			);
		else if (game.pong.velocity[0] > 0)
			p.triangle(
			(consts.WIDTH * 1.5) / 2.5,
			consts.HEIGHT * 0.49 + arrow_width / 2,
			(consts.WIDTH * 1.5) / 2.5 - arrow_width,
			consts.HEIGHT * 0.49 + arrow_width + arrow_width / 2,
			(consts.WIDTH * 1.5) / 2.5 - arrow_width,
			consts.HEIGHT * 0.49 - arrow_width + arrow_width / 2
			);
		p.pop();
		}

		function drawHelp() {
		let index = game.players[0].index;
		let arrow_width = consts.DIAGONAL * 0.025 + arrow_anim;
		if (grow) arrow_anim += consts.DIAGONAL * 0.0005;
		else arrow_anim -= consts.DIAGONAL * 0.0005;
		if (arrow_anim >= consts.DIAGONAL * 0.01) grow = false;
		else if (arrow_anim <= 0) grow = true;
		p.push();
		p.fill("white");
		p.noStroke();
		if (index === 1)
		p.triangle(
			consts.WIDTH / 6,
			consts.HEIGHT / 2,
			consts.WIDTH / 6 + arrow_width,
			consts.HEIGHT / 2 + arrow_width,
			consts.WIDTH / 6 + arrow_width,
			consts.HEIGHT / 2 - arrow_width
			);
		else
		p.triangle(
			(consts.WIDTH * 5) / 6,
			consts.HEIGHT / 2,
			(consts.WIDTH * 5) / 6 - arrow_width,
			consts.HEIGHT / 2 + arrow_width,
			(consts.WIDTH * 5) / 6 - arrow_width,
			consts.HEIGHT / 2 - arrow_width
			);
		p.pop();
		}

		function drawMinimaps() {
		consts.original_map.originalMap();
		p.push();
		p.translate(consts.WIDTH * 0.1, consts.HEIGHT * 0.58);
		consts.original_map.render(0.2);
		p.pop();
		// outputAnnouncement("Original", 25, consts.WIDTH * 0.2, consts.HEIGHT * 0.70, "white");

		consts.city_map.cityMap();
		p.push();
		p.translate(consts.WIDTH * 0.4, consts.HEIGHT * 0.58);
		consts.city_map.render(0.2);
		p.pop();
		// outputAnnouncement("City", 25, consts.WIDTH * 0.5, consts.HEIGHT * 0.70, "#ffffff");

		consts.casino_map.casinoMap();
		p.push();
		p.translate(consts.WIDTH * 0.7, consts.HEIGHT * 0.58);
		consts.casino_map.render(0.2);
		p.pop();
		// outputAnnouncement("Casino", 25, consts.WIDTH * 0.8, consts.HEIGHT * 0.70, "#ffffff");
		}

		function drawInput() {
		if (game.local && !game.ai) {
			if (game.map.name !== "secret") {
				p.image(keys.up, consts.WIDTH * 0.78 + consts.small_square_diameter * 1.5 / 2, consts.HEIGHT * 0.66 + consts.small_square_diameter * 1.5 / 2, consts.small_square_diameter * 1.5, consts.small_square_diameter * 1.5);
				p.image(keys.left, consts.WIDTH * 0.71 + consts.small_square_diameter * 1.5 / 2, consts.HEIGHT * 0.75 + consts.small_square_diameter * 1.5 / 2, consts.small_square_diameter * 1.5, consts.small_square_diameter * 1.5);
				p.image(keys.down, consts.WIDTH * 0.78 + consts.small_square_diameter * 1.5 / 2, consts.HEIGHT * 0.75 + consts.small_square_diameter * 1.5 / 2, consts.small_square_diameter * 1.5, consts.small_square_diameter * 1.5);
				p.image(keys.right, consts.WIDTH * 0.85 + consts.small_square_diameter * 1.5 / 2, consts.HEIGHT * 0.75 + consts.small_square_diameter * 1.5 / 2, consts.small_square_diameter * 1.5, consts.small_square_diameter * 1.5);
			}
			p.image(keys.w, consts.WIDTH * 0.21 - consts.small_square_diameter * 1.5 / 2, consts.HEIGHT * 0.16 - consts.small_square_diameter * 1.5 / 2, consts.small_square_diameter * 1.5, consts.small_square_diameter * 1.5);
			p.image(keys.a, consts.WIDTH * 0.15 - consts.small_square_diameter * 1.5 / 2, consts.HEIGHT * 0.25 - consts.small_square_diameter * 1.5 / 2, consts.small_square_diameter * 1.5, consts.small_square_diameter * 1.5);
			p.image(keys.s, consts.WIDTH * 0.22 - consts.small_square_diameter * 1.5 / 2, consts.HEIGHT * 0.25 - consts.small_square_diameter * 1.5 / 2, consts.small_square_diameter * 1.5, consts.small_square_diameter * 1.5);
			p.image(keys.d, consts.WIDTH * 0.29 - consts.small_square_diameter * 1.5 / 2, consts.HEIGHT * 0.25 - consts.small_square_diameter * 1.5 / 2, consts.small_square_diameter * 1.5, consts.small_square_diameter * 1.5);
		}
		else {
			if (game.players[0].index === 2) {
				p.image(keys.up, consts.WIDTH * 0.78 + consts.small_square_diameter * 1.5 / 2, consts.HEIGHT * 0.66 + consts.small_square_diameter * 1.5 / 2, consts.small_square_diameter * 1.5, consts.small_square_diameter * 1.5);
				p.image(keys.left, consts.WIDTH * 0.71 + consts.small_square_diameter * 1.5 / 2, consts.HEIGHT * 0.75 + consts.small_square_diameter * 1.5 / 2, consts.small_square_diameter * 1.5, consts.small_square_diameter * 1.5);
				p.image(keys.down, consts.WIDTH * 0.78 + consts.small_square_diameter * 1.5 / 2, consts.HEIGHT * 0.75 + consts.small_square_diameter * 1.5 / 2, consts.small_square_diameter * 1.5, consts.small_square_diameter * 1.5);
				p.image(keys.right, consts.WIDTH * 0.85 + consts.small_square_diameter * 1.5 / 2, consts.HEIGHT * 0.75 + consts.small_square_diameter * 1.5 / 2, consts.small_square_diameter * 1.5, consts.small_square_diameter * 1.5);	
			} else {
				p.image(keys.w, consts.WIDTH * 0.21 - consts.small_square_diameter * 1.5 / 2, consts.HEIGHT * 0.16 - consts.small_square_diameter * 1.5 / 2, consts.small_square_diameter * 1.5, consts.small_square_diameter * 1.5);
				p.image(keys.a, consts.WIDTH * 0.15 - consts.small_square_diameter * 1.5 / 2, consts.HEIGHT * 0.25 - consts.small_square_diameter * 1.5 / 2, consts.small_square_diameter * 1.5, consts.small_square_diameter * 1.5);
				p.image(keys.s, consts.WIDTH * 0.22 - consts.small_square_diameter * 1.5 / 2, consts.HEIGHT * 0.25 - consts.small_square_diameter * 1.5 / 2, consts.small_square_diameter * 1.5, consts.small_square_diameter * 1.5);
				p.image(keys.d, consts.WIDTH * 0.29 - consts.small_square_diameter * 1.5 / 2, consts.HEIGHT * 0.25 - consts.small_square_diameter * 1.5 / 2, consts.small_square_diameter * 1.5, consts.small_square_diameter * 1.5);
			}
		}
		}

		function drawSpectate() {
		if (game.state === "in-menu-input")
			p.image(
			consts.EYE_ICON,
			consts.WIDTH * 0.04,
			consts.HEIGHT * 0.01,
			consts.WIDTH * 0.1,
			consts.HEIGHT * 0.15
			);
		else
			p.image(
			consts.EYE_ICON,
			consts.WIDTH * 0.04,
			consts.HEIGHT * 0.05,
			consts.WIDTH * 0.1,
			consts.HEIGHT * 0.15
			);
		if (game.hover_spectator === true) {
			p.push();
			p.fill("rgba(0, 0, 0, 0.2)");
			p.rect(
			consts.WIDTH * 0.04,
			consts.HEIGHT * 0.01,
			consts.WIDTH * 0.1,
			consts.HEIGHT * 0.15
			);
			p.pop();
		}
		if (game.spectator === true && game.state === "in-menu-input") {
			outputAnnouncement(
			"Spectate",
			consts.std_font_size,
			consts.WIDTH * 0.32,
			consts.HEIGHT * 0.11,
			"white"
			);
		} else if (game.spectator === false && game.state === "in-menu-input") {
			outputAnnouncement(
			"Play",
			consts.std_font_size,
			consts.WIDTH * 0.25,
			consts.HEIGHT * 0.11,
			"white"
			);
		}
		}
		// Returns 1 if the lines intersect, otherwise 0. In addition, if the lines
		// intersect the intersection point may be stored in the floats i[0] and i[1].

		function getLineIntersection(
		p0: [number, number],
		p1: [number, number],
		p2: [number, number],
		p3: [number, number]
		): [number, number, string] {
		let s1: [number, number] = [p1[0] - p0[0], p1[1] - p0[1]];
		let s2: [number, number] = [p3[0] - p2[0], p3[1] - p2[1]];

		let s: number =
			(-s1[1] * (p0[0] - p2[0]) + s1[0] * (p0[1] - p2[1])) /
			(-s2[0] * s1[1] + s1[0] * s2[1]);
		let t: number =
			(s2[0] * (p0[1] - p2[1]) - s2[1] * (p0[0] - p2[0])) /
			(-s2[0] * s1[1] + s1[0] * s2[1]);

		let i: [number, number, string] = [-1, -1, "side"];
		if (s >= 0 && s <= 1 && t >= 0 && t <= 1) {
			// Collision detected
			i[0] = p0[0] + t * s1[0];
			i[1] = p0[1] + t * s1[1];
			return i;
		}

		return i; // No collision
		}

		function relativeIntersection(
		intersection_point: [number, number, string],
		p1: [number, number],
		p2: [number, number]
		): number {
		let middle: [number, number] = [
			p1[0] + (p2[0] - p1[0]) / 2 - intersection_point[0],
			p1[1] + (p2[1] - p1[1]) / 2 - intersection_point[1],
		];

		if (intersection_point[2] === "side" || intersection_point[2] === "left" || intersection_point[2] === "right")
			return (middle[1] / ((p2[1] - p1[1]) / 2)) * ((3 * Math.PI) / 12);
		else return (middle[0] / ((p2[0] - p1[0]) / 2)) * ((3 * Math.PI) / 12);
		}

		// ? MAP BOUNDS :
		// ? top bound : 10
		// ? bottom bound : HEIGHT - 10
		// ? left bound : 0
		// ? right bound : consts.WIDTH

		function checkCollisions() {
		if (game.frames_since_point === 0) game.pong.speed = consts.PONG_BASE_SPEED;
		else if (game.pong.speed < consts.PONG_MAX_SPEED) {
			if (game.pong.velocity[0] > 0)
			game.pong.velocity[0] += consts.PONG_ACCELERATION;
			else game.pong.velocity[0] -= consts.PONG_ACCELERATION;
			if (game.pong.velocity[1] > 0)
			game.pong.velocity[1] += consts.PONG_ACCELERATION;
			else game.pong.velocity[1] -= consts.PONG_ACCELERATION;
			game.pong.speed += consts.PONG_ACCELERATION * 2;
		}

		game.frames_since_point++;

		// ? collision with bounds
		if (
			game.pong.pos[1] < consts.TOP_BOUND ||
			game.pong.pos[1] + game.pong.diameter > consts.BOT_BOUND
		) {
			game.pong.velocity[1] *= -1;
			if (game.pong.pos[1] < consts.TOP_BOUND)
			game.pong.pos[1] = consts.TOP_BOUND + consts.HEIGHT * 0.005;
			else if (game.pong.pos[1] + game.pong.diameter > consts.BOT_BOUND)
			game.pong.pos[1] =
				consts.BOT_BOUND - game.pong.diameter - consts.HEIGHT * 0.005;
			audio_files.playRandomWallSound();
			return;
		}
		if (
			game.pong.velocity[0] > 0 &&
			game.pong.pos[0] + game.pong.diameter > consts.RIGHT_BOUND
		) {
			if (game.map.name !== "secret")
				return game.scorePoint(true);
			else {
				if (game.pong.pos[0] + game.pong.diameter > consts.RIGHT_BOUND - game.map.wall_width * 2)
					game.pong.pos[0] = consts.RIGHT_BOUND - game.map.wall_width * 2 - game.pong.diameter - consts.WIDTH * 0.002;
				game.pong.velocity[0] *= -1;
				audio_files.playRandomWallSound();
				return;
			}
		}
		else if (game.pong.velocity[0] < 0 && game.pong.pos[0] < consts.LEFT_BOUND)
			return game.scorePoint(false);

		if (game.map.name === "city") {
			for (let bumper of bumpers) {
			if (bumper.checkCollision(game.pong)) {
				bumper.resetAnimation();
				audio_files.playRandomBumperSound();
				reset_ai_pos = true;
				return;
			}
			}
		}

		if (game.map.name === "secret")
			for (let breakout of game.breakouts) if (breakout.checkCollisions()) return;

		let player;
		if (game.map.name === "secret")
			player = game.players[0];
		else
			player = game.pong.pos[0] < consts.WIDTH / 2 ? game.players[0] : game.players[1];
		let ball_points: [
			[number, number],
			[number, number],
			[number, number],
			[number, number]
		] = [
			game.pong.up(),
			game.pong.right(),
			game.pong.down(),
			game.pong.left(),
		];
		// debugCollisions(player);


		// ? collision with paddles
		for (let i = 0; i < 4; i++) {
			let angle: number = 0;
			let intersection_point: [number, number, string][] = [[-1, -1, "side"]]; // array of one element so that the variable is referenced in functions
			angle = collisionPaddle(player, intersection_point, ball_points[i]);

			if (intersection_point[0][0] !== -1) {
			audio_files.playRandomPaddleSound();
			let max_angle_percentage: number =
				Math.abs(angle) / ((Math.PI * 3) / 12); // ? number that lets me add speed to acute angled shots
			// ? for bot / top collisions
			if (
				intersection_point[0][2] === "top" ||
				intersection_point[0][2] === "bot"
			) {
				if (intersection_point[0][2] === "top")
				game.pong.velocity[1] =
					(1 +
					consts.PONG_ACCELERATION_ACUTE_ANGLE * max_angle_percentage) *
					game.pong.speed *
					-Math.cos(angle);
				else if (intersection_point[0][2] === "bot")
				game.pong.velocity[1] =
					(1 +
					consts.PONG_ACCELERATION_ACUTE_ANGLE * max_angle_percentage) *
					game.pong.speed *
					Math.cos(angle);
				game.pong.velocity[0] =
				(1 + consts.PONG_ACCELERATION_ACUTE_ANGLE * max_angle_percentage) *
				game.pong.speed *
				-Math.sin(angle);
			}
			// ? invert velocity indexes for left / right collisions
			else if (intersection_point[0][2] === "side") {
				if (game.pong.pos[0] < consts.WIDTH / 2)
				game.pong.velocity[0] =
					(1 +
					consts.PONG_ACCELERATION_ACUTE_ANGLE * max_angle_percentage) *
					game.pong.speed *
					Math.cos(angle);
				else
				game.pong.velocity[0] =
					(1 +
					consts.PONG_ACCELERATION_ACUTE_ANGLE * max_angle_percentage) *
					game.pong.speed *
					-Math.cos(angle);
				game.pong.velocity[1] =
				(1 + consts.PONG_ACCELERATION_ACUTE_ANGLE * max_angle_percentage) *
				game.pong.speed *
				-Math.sin(angle);
			}
			if (player.index === 1)
				reset_ai_pos = true;
			return;
			}
		}
		}

		function collisionBreakOut(	
			breakout: BreakOut,
			intersection_point: [number, number, string][],
			ball_point: [number, number]) {
			
			let breakout_left_hit: [[number, number], [number, number]] = [breakout.leftUp(), breakout.leftDown()];
			let breakout_right_hit: [[number, number], [number, number]] = [breakout.rightUp(), breakout.rightDown()];
			let breakout_bot_hit: [[number, number], [number, number]] = [
				breakout.leftDown(),
				breakout.rightDown(),
			];
			let breakout_top_hit: [[number, number], [number, number]] = [
				breakout.leftUp(),
				breakout.rightUp(),
			];

			intersection_point[0] = getLineIntersection(
				ball_point,
				game.pong.ballMoves(ball_point),
				breakout_left_hit[0],
				breakout_left_hit[1]
			);
			if (intersection_point[0][0] !== -1)
				return ;
			
			intersection_point[0] = getLineIntersection(
				ball_point,
				game.pong.ballMoves(ball_point),
				breakout_right_hit[0],
				breakout_right_hit[1]
			);
			if (intersection_point[0][0] !== -1)
				return ;
		
			intersection_point[0] = getLineIntersection(
				ball_point,
				game.pong.ballMoves(ball_point),
				breakout_bot_hit[0],
				breakout_bot_hit[1]
			);
			if (intersection_point[0][0] !== -1)
				return ;
		
			intersection_point[0] = getLineIntersection(
				ball_point,
				game.pong.ballMoves(ball_point),
				breakout_top_hit[0],
				breakout_top_hit[1]
			);
			if (intersection_point[0][0] !== -1)
				return ;
		
			return ;
		}

		function collisionPaddle(
		player: Player,
		intersection_point: [number, number, string][],
		ball_point: [number, number]
		): number {
		let paddle_side_hit: [[number, number], [number, number]] =
			player.index === 1
			? [player.rightUp(), player.rightDown()]
			: [player.leftUp(), player.leftDown()];
		let paddle_bot_hit: [[number, number], [number, number]] = [
			player.leftDown(),
			player.rightDown(),
		];
		let paddle_top_hit: [[number, number], [number, number]] = [
			player.leftUp(),
			player.rightUp(),
		];

		intersection_point[0] = getLineIntersection(
			ball_point,
			game.pong.ballMoves(ball_point),
			paddle_side_hit[0],
			paddle_side_hit[1]
		);
		intersection_point[0][2] = "side";
		if (intersection_point[0][0] !== -1)
			return relativeIntersection(
			intersection_point[0],
			paddle_side_hit[0],
			paddle_side_hit[1]
			);

		intersection_point[0] = getLineIntersection(
			ball_point,
			game.pong.ballMoves(ball_point),
			paddle_bot_hit[0],
			paddle_bot_hit[1]
		);
		intersection_point[0][2] = "bot";
		if (intersection_point[0][0] !== -1)
			return relativeIntersection(
			intersection_point[0],
			paddle_bot_hit[0],
			paddle_bot_hit[1]
			);

		intersection_point[0] = getLineIntersection(
			ball_point,
			game.pong.ballMoves(ball_point),
			paddle_top_hit[0],
			paddle_top_hit[1]
		);
		intersection_point[0][2] = "top";
		if (intersection_point[0][0] !== -1)
			return relativeIntersection(
			intersection_point[0],
			paddle_top_hit[0],
			paddle_top_hit[1]
			);

		return 0;
		}

		function goToMainMenu() {
		if (p.mouseButton === p.LEFT) inMainMenu();
		}

		function clickMapSecret() {
			if (p.mouseButton === p.LEFT) {
				game.map = consts.secret_map;
				game.score_limit = 10;
				startLocal();
			}
		}

		function clickSound() {
		if (p.mouseButton === p.LEFT) {
			audio_files.max_volume += 0.25;
			if (audio_files.max_volume === 0.25 && game.state === "in-menu")
			audio_files.switchMusic("menu");
			else if (
			audio_files.max_volume === 0.25 &&
			(game.state === "waiting-player" || game.state === "waiting-readiness")
			)
			audio_files.switchMusic(game.map.name);
		} else if (p.mouseButton === p.RIGHT) audio_files.max_volume -= 0.25;

		if (audio_files.max_volume > 1) audio_files.max_volume = 0;
		else if (audio_files.max_volume < 0) audio_files.max_volume = 1;
		audio_files.musicPlaying().volume = audio_files.max_volume;
		}

		function createGameMenu() {
		if (p.mouseButton === p.LEFT) {
			buttons.hide();
			inputs.hide();

			buttons.return.show();
			buttons.anyone_can_join.show();
			buttons.local.show();
			buttons.invitation_only.show();
			buttons.validate.show();
			buttons.plus.show();
			buttons.minus.show();
			inputs.score_limit.show();
			inputs.score_limit.attribute("value", game.score_limit);
			buttons.opponent_left_ok.parent().style["z-index"] = 0; // deal with buttons overlapping

			buttons.map_original.show();
			buttons.map_city.show();
			buttons.map_casino.show();
			game.setState("in-menu-create");
		}
		}

	function createGame() {
		if (p.mouseButton === p.LEFT) {
			if (game.publicity === "local") startLocal();
		}
	}
	function matchmaking() {
	}

		function highlightSpectateButton() {
		// @ts-ignore: next-line
		this.style("color", "#d4d4d4");
		game.hover_spectator = true;
		}
		function resetSpectateButton() {
		// @ts-ignore: next-line
		this.style("color", "white");
		game.hover_spectator = false;
		}

		function highlightButton() {
		// @ts-ignore: next-line
		this.style("color", "#d4d4d4");
		}
		function resetButton() {
		// @ts-ignore: next-line
		this.style("color", "white");
		}

		function plusScoreLimit() {
		if (p.mouseButton === p.LEFT && game.score_limit < 15) {
			game.score_limit++;
			inputs.score_limit.attribute("value", game.score_limit);
		}
		}
		function minusScoreLimit() {
		if (p.mouseButton === p.LEFT && game.score_limit > 1) {
			game.score_limit--;
			inputs.score_limit.attribute("value", game.score_limit);
		}
		}

		function readRoomID() {
		if (p.mouseButton === p.LEFT) {
			game.setState("in-menu-input");
			buttons.hide();
			inputs.hide();
			inputs.join.show();
			buttons.return.show();
			buttons.spectate.show();
		}
		}

		function clickSpectate() {
		if (p.mouseButton === p.LEFT) {
			game.spectator = !game.spectator;
			if (!game.spectator) {
			// @ts-ignore : next-line
			this.style("border-color", "white");
			} else if (game.spectator) {
			// @ts-ignore : next-line
			this.style("border-color", "#177bad");
			}
		}
		}

		function clickAnyone() {
		if (p.mouseButton === p.LEFT) game.publicity = buttons.clickAnyone();
		}
		function clickInvitation() {
		if (p.mouseButton === p.LEFT) game.publicity = buttons.clickInvitation();
		}
		function clickLocal() {
		if (p.mouseButton === p.LEFT) game.publicity = buttons.clickLocal();
		}

		function clickAi() {
		if (p.mouseButton === p.LEFT) {
			if (game.ai) {
			// @ts-ignore : next-line
			this.style("border", "none");
			} else {
			// @ts-ignore : next-line
			this.style(
				"border",
				(consts.DIAGONAL / 250).toString() + "px solid white"
			);
			}
			game.ai = !game.ai;
		}
		}

		function clickMapOriginal() {
		if (p.mouseButton === p.LEFT) {
			// @ts-ignore : next-line
			this.style(
			"border",
			(consts.DIAGONAL / 250).toString() + "px solid white"
			);
			buttons.map_city.style("border", "none");
			buttons.map_casino.style("border", "none");
			game.map = consts.original_map;
		}
		}
		function clickMapCity() {
		if (p.mouseButton === p.LEFT) {
			// @ts-ignore : next-line
			this.style(
			"border",
			(consts.DIAGONAL / 250).toString() + "px solid white"
			);
			buttons.map_original.style("border", "none");
			buttons.map_casino.style("border", "none");
			game.map = consts.city_map;
		}
		}
		function clickMapCasino() {
		if (p.mouseButton === p.LEFT) {
			// @ts-ignore : next-line
			this.style(
			"border",
			(consts.DIAGONAL / 250).toString() + "px solid white"
			);
			buttons.map_city.style("border", "none");
			buttons.map_original.style("border", "none");
			game.map = consts.casino_map;
		}
		}

		function startLocal() {
			game.local = true;
			buttons.hide();
			inputs.hide();
			game.timer = 4;
			let game_ref = game;
			for (let i = 0; i < 5; i++) {
			game.timeout = setTimeout(() => {
				game_ref.timer--;
				if (game_ref.timer === 0) audio_files.playBip(audio_files.BIP_FINAL);
				else if (game_ref.timer >= 0) audio_files.playBip(audio_files.BIP);
				if (game_ref.timer === -1 && game_ref.state === "countdown") {
				game_ref.setState("in-game");
				}
			}, i * 1000);
			}
			game.setState("countdown");
			game.players.push(new Player(1, "first", "P1", 0));
			if (game.map.name !== "secret")
				game.players.push(new Player(2, "second", "P2", 0));
			else {
				addBreakouts();
			}
			game.pong = new Pong();
			game.room_id = "Local";
		}
		};

	}

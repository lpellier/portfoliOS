import p5 from "p5";
import { FunctionComponent, useEffect } from "react";
import { defineSketch } from "./Sketch";
import "./Pong.css"
import "./buttons.css"
import "./inputs.css"
import { ISketch } from "../../../../types";
import { default_win_height, default_win_width } from "../../../../globals";

class AudioFiles {
	PADDLE_HIT_1: any;
	PADDLE_HIT_2: any;

	BUMPER_HIT_1: any;
	BUMPER_HIT_2: any;

	WALL_HIT_1: any;
	WALL_HIT_2: any;

	BIP: any;
	BIP_FINAL: any;

	SCORE: any;

	CASINO_MUSIC: any;
	CITY_MUSIC: any;
	ORIGINAL_MUSIC: any;
	MENU_MUSIC: any;

	music_playing: string;
	max_volume: number;

	constructor() {
		this.PADDLE_HIT_1 = new Audio("/assets/sfx/paddle_hit_1.mp3");
		this.PADDLE_HIT_2 = new Audio("/assets/sfx/paddle_hit_2.mp3");

		this.BUMPER_HIT_1 = new Audio("/assets/sfx/bumper_hit_1.mp3");
		this.BUMPER_HIT_2 = new Audio("/assets/sfx/bumper_hit_2.mp3");

		this.WALL_HIT_1 = new Audio("/assets/sfx/paddle_hit_1.mp3");
		this.WALL_HIT_2 = new Audio("/assets/sfx/paddle_hit_2.mp3");

		this.BIP = new Audio("/assets/sfx/bip.mp3");
		this.BIP_FINAL = new Audio("/assets/sfx/bip-final.mp3");

		this.SCORE = new Audio("/assets/sfx/score.mp3");

		this.max_volume = 0;

		this.CASINO_MUSIC = new Audio("/assets/music/casino.mp3");
		this.CASINO_MUSIC.loop = true;
		this.CASINO_MUSIC.volume = this.max_volume;

		this.CITY_MUSIC = new Audio("/assets/music/city.mp3");
		this.CITY_MUSIC.loop = true;
		this.CITY_MUSIC.volume = this.max_volume;

		this.ORIGINAL_MUSIC = new Audio("/assets/music/original.mp3");
		this.ORIGINAL_MUSIC.loop = true;
		this.ORIGINAL_MUSIC.volume = this.max_volume;

		this.MENU_MUSIC = new Audio("/assets/music/menu.mp3");
		this.MENU_MUSIC.loop = true;
		this.MENU_MUSIC.volume = this.max_volume;

		this.music_playing = "none";
		this.PADDLE_HIT_1.autoplay = false;
		this.PADDLE_HIT_2.autoplay = false;
		this.BUMPER_HIT_1.autoplay = false;
		this.BUMPER_HIT_2.autoplay = false;
		this.WALL_HIT_1.autoplay = false;
		this.WALL_HIT_2.autoplay = false;
		this.BIP.autoplay = false;
		this.BIP_FINAL.autoplay = false;
		this.SCORE.autoplay = false;
		this.MENU_MUSIC.autoplay = false;
		this.ORIGINAL_MUSIC.autoplay = false;
		this.CITY_MUSIC.autoplay = false;
		this.CASINO_MUSIC.autoplay = false;
	}

	deleteAudio() {
		this.fadeMusicDown(this.PADDLE_HIT_1);
		this.fadeMusicDown(this.PADDLE_HIT_2);
		this.fadeMusicDown(this.BUMPER_HIT_1);
		this.fadeMusicDown(this.BUMPER_HIT_2);
		this.fadeMusicDown(this.WALL_HIT_1);
		this.fadeMusicDown(this.WALL_HIT_2);
		this.fadeMusicDown(this.BIP);
		this.fadeMusicDown(this.BIP_FINAL);
		this.fadeMusicDown(this.SCORE);
		this.fadeMusicDown(this.CASINO_MUSIC);
		this.fadeMusicDown(this.CITY_MUSIC);
		this.fadeMusicDown(this.MENU_MUSIC);
		this.fadeMusicDown(this.ORIGINAL_MUSIC);
	}

	playBip(bip: any) {
		bip.currentTime = 0;
		bip.volume = this.max_volume;
		bip.play();
	}

	playScore() {
		this.SCORE.currentTime = 0;
		this.SCORE.volume = this.max_volume;
		this.SCORE.play();
	}

	playRandomPaddleSound() {
		this.PADDLE_HIT_1.volume = this.max_volume;
		this.PADDLE_HIT_2.volume = this.max_volume;

		let rand: number = Math.floor(Math.random() * 2);
		if (rand === 0) this.PADDLE_HIT_1.play();
		else if (rand === 1) this.PADDLE_HIT_2.play();
	}

	playRandomWallSound() {
		this.WALL_HIT_1.volume = this.max_volume;
		this.WALL_HIT_2.volume = this.max_volume;

		let rand: number = Math.floor(Math.random() * 2);
		if (rand === 0) this.WALL_HIT_1.play();
		else if (rand === 1) this.WALL_HIT_2.play();
	}

	playRandomBumperSound() {
		this.BUMPER_HIT_1.volume = this.max_volume;
		this.BUMPER_HIT_2.volume = this.max_volume;

		let rand: number = Math.floor(Math.random() * 2);
		if (rand === 0) this.BUMPER_HIT_1.play();
		else if (rand === 1) this.BUMPER_HIT_2.play();
	}

	musicPlaying(): any {
		if (this.music_playing === "menu") return this.MENU_MUSIC;
		else if (this.music_playing === "casino") return this.CASINO_MUSIC;
		else if (this.music_playing === "city") return this.CITY_MUSIC;
		else if (this.music_playing === "original") return this.ORIGINAL_MUSIC;
		else return "none";
	}

	fadeMusicDown(music: any) {
		music.pause();
	}

	fadeMusicUp(music: any) {
		if (this.max_volume === 0) return;
		music.currentTime = 0;
		music.volume = this.max_volume;
		music.play();
	}

	switchMusic(music: string) {
		let tmp_music = this.musicPlaying();
		if (tmp_music !== "none") {
		if (music === "menu") {
			this.fadeMusicDown(tmp_music);
			this.fadeMusicUp(this.MENU_MUSIC);
		} else if (music === "original") {
			this.fadeMusicDown(tmp_music);
			this.fadeMusicUp(this.ORIGINAL_MUSIC);
		} else if (music === "city") {
			this.fadeMusicDown(tmp_music);
			this.fadeMusicUp(this.CITY_MUSIC);
		} else if (music === "casino") {
			this.fadeMusicDown(tmp_music);
			this.fadeMusicUp(this.CASINO_MUSIC);
		}
		if (music === "none") this.fadeMusicDown(tmp_music);
		this.music_playing = music;
		} else {
		if (music === "menu") this.fadeMusicUp(this.MENU_MUSIC);
		else if (music === "original") this.fadeMusicUp(this.ORIGINAL_MUSIC);
		else if (music === "city") this.fadeMusicUp(this.CITY_MUSIC);
		else if (music === "casino") this.fadeMusicUp(this.CASINO_MUSIC);
		this.music_playing = music;
		}
	}

	playAppropriateMusic(state : string, map_name : string) {
		if (
		(state === "countdown" ||
			state === "spectate" ||
			state === "in-game" ||
			state === "waiting-readiness" ||
			state === "waiting-player") &&
		this.music_playing === "menu"
		)
		this.switchMusic(map_name);
		else if (
		(state === "in-menu" ||
			state === "in-menu-create" ||
			state === "in-menu-input") &&
		this.music_playing !== "menu"
		)
		this.switchMusic("menu");
	}
}

export let audio_files : AudioFiles;
let p: any = null;

const Pong: FunctionComponent<ISketch> = () => {
	useEffect(() => {
		audio_files = new AudioFiles();
		let pongSketch = defineSketch(default_win_width, default_win_height)
		p = new p5(pongSketch)
		// ? useless while loop to remove warning about unused variables
		while (p)
			break;

		return () => {
			audio_files.deleteAudio();
		  };
	}, []);

	return (
		<div className="Canvas" id={"canvas-pong-parent"}>
			<div id="main-menu-button-grid">
				<div id="button-create" className="large-button"/>
				<div id="button-join" className="large-button"/>
				<div id="button-matchmaking" className="large-button"/>
			</div>
			<div id="create-menu-button-grid">
				<div id="button-anyone"/>
				<div id="button-invitation"/>
				<div id="button-local"/>
			</div>
			<div id="button-ai"/>
			<div id="button-validate"/>
			<div id="button-return"/>
			<div id="button-sound"/>
			<div id="button-map-original"/>
			<div id="button-map-city"/>
			<div id="button-map-casino"/>
			<div id="button-map-secret"/>
			<div id="button-spectate"/>
			<div id="buttons-plus-minus">	
				<div id="button-plus"/>
				<div id="button-minus"/>
			</div>
			<div id="input-join"/>
			<div id="input-score_limit"/>
			<div id="button-opp-left-ok"/>
		</div>
	)
}

export default Pong;
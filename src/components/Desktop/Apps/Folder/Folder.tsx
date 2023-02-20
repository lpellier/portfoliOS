import React, { memo, useEffect, useRef } from "react";
import "styles/Folder.css"
import { IFolder } from "../../../../types";

let file_icon = <svg xmlns="http://www.w3.org/2000/svg" className="icon-file" viewBox="0 0 24 24" strokeWidth="1.5" stroke="var(--red)" fill="none" strokeLinecap="round" strokeLinejoin="round">
				<path d="M14 3v4a1 1 0 0 0 1 1h4" />
				<path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
				<path d="M10 13l-1 2l1 2" />
				<path d="M14 13l1 2l-1 2" />
			</svg>

const Folder = ({name, spawnWindow, forcedUpdate}: IFolder) => {
	const clicked = useRef<string>("");

	useEffect(() => {}, [forcedUpdate]);

	const fileClicked = (filename: string): void => {
		// ? Remove any existing outlines
		const folder = document.getElementById(name);
		if (folder?.querySelectorAll('.file-div .file-clicked') !== undefined) {
			for (let elem of folder?.querySelectorAll('.file-div .file-clicked')) {
				elem.remove();
			}
		}
		
		// ? Add outline to selected file
		const div = document.createElement("div");
		div?.classList.add("file-clicked");
		const file = document.getElementById(filename);
		if (file && file.querySelector('.file-clicked') === null) {
			file.prepend(div);
		}

		// ? If file was clicked in previous 500ms, open the window (double click)
		if (clicked.current === filename.slice(5, filename.length)) {
			spawnWindow(clicked.current);
		}

		// ? set clicked to file name (minus the "file-")
		clicked.current = filename.slice(5, filename.length);
		setTimeout(() => {
			clicked.current = "";
		}, 500)

	}

	return (
		<div>
			{name === "Server Projects" &&
				<div id={name} className="folder">
					<div id="file-ft_server" className="file-div" onClick={() => fileClicked("file-ft_server")}>
						{ file_icon }
						<h1 className="file-name">ft_server</h1>
					</div>
					<div id="file-ft_services" className="file-div" onClick={() => fileClicked("file-ft_services")}>
						{ file_icon }
						<h1 className="file-name">ft_services</h1>
					</div>
					<div id="file-webserv" className="file-div" onClick={() => fileClicked("file-webserv")}>
						{ file_icon }
						<h1 className="file-name">webserv</h1>
					</div>
				</div>
			}
			{name === "C/C++ Projects" && 
				<div id={name} className="folder">
					<div id="file-101_C" className="file-div" onClick={() => fileClicked("file-101_C")}>
						{ file_icon }
						<h1 className="file-name">101_C</h1>
					</div>
					<div id="file-ft_printf" className="file-div" onClick={() => fileClicked("file-ft_printf")}>
						{ file_icon }
						<h1 className="file-name">ft_printf</h1>
					</div>
					<div id="file-get_next_line" className="file-div" onClick={() => fileClicked("file-get_next_line")}>
						{ file_icon }
						<h1 className="file-name">get_next_line</h1>
					</div>
					<div id="file-cub3d" className="file-div" onClick={() => fileClicked("file-cub3d")}>
						{ file_icon }
						<h1 className="file-name">cub3d</h1>
					</div>
					<div id="file-push_swap" className="file-div" onClick={() => fileClicked("file-push_swap")}>
						{ file_icon }
						<h1 className="file-name">push_swap</h1>
					</div>
					<div id="file-philosophers" className="file-div" onClick={() => fileClicked("file-philosophers")}>
						{ file_icon }
						<h1 className="file-name">philosophers</h1>
					</div>
					<div id="file-minishell" className="file-div" onClick={() => fileClicked("file-minishell")}>
						{ file_icon }
						<h1 className="file-name">minishell</h1>
					</div>
					<div id="file-ft_containers" className="file-div" onClick={() => fileClicked("file-ft_containers")}>
						{ file_icon }
						<h1 className="file-name">ft_containers</h1>
					</div>
					<div id="file-ready_set_boole" className="file-div" onClick={() => fileClicked("file-ready_set_boole")}>
						{ file_icon }
						<h1 className="file-name">ready_set_boole</h1>
					</div>
					<div id="file-matrix" className="file-div" onClick={() => fileClicked("file-matrix")}>
						{ file_icon }
						<h1 className="file-name">matrix</h1>
					</div>
				</div>
			}
		</div>
	)
}

export default memo(Folder);

import { useEffect } from "react";
import "./Folder.css"

// ? Folder component takes a name as prop and spawnWindow to be able to actually spawn files
export default function Folder(props: {name: string, spawnWindow: Function}) {
	useEffect(() => {
	}, []);

	const fileClicked = (filename: string): void => {
		// ? Remove any existing outlines
		const folder = document.getElementById(props.name);
		if (folder?.querySelectorAll('.file-div .file-clicked') !== undefined){
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
	}

	return (
		<div>
			{props.name === "Server Projects" &&
				<div id={props.name} className="folder">
					<div id="file-ft_server" className="file-div" onClick={() => fileClicked("file-ft_server")} onDoubleClick={() => props.spawnWindow("ft_server")}>
						<button className="file-button"/>
						<h1 className="file-name">ft_server</h1>
					</div>
					<div id="file-ft_services" className="file-div" onClick={() => fileClicked("file-ft_services")} onDoubleClick={() => props.spawnWindow("ft_services")}>
						<button className="file-button"/>
						<h1 className="file-name">ft_services</h1>
					</div>
				</div>
			}
			{props.name === "C/C++ Projects" && 
				<div id={props.name} className="folder">
					<div id="file-101_C" className="file-div" onClick={() => fileClicked("file-101_C")} onDoubleClick={() => props.spawnWindow("101_C")}>
						<button className="file-button"/>
						<h1 className="file-name">101_C</h1>
					</div>
					<div id="file-get_next_line" className="file-div" onClick={() => fileClicked("file-get_next_line")} onDoubleClick={() => props.spawnWindow("get_next_line")}>
						<button className="file-button"/>
						<h1 className="file-name">get_next_line</h1>
					</div>
					<div id="file-matrix" className="file-div" onClick={() => fileClicked("file-matrix")} onDoubleClick={() => props.spawnWindow("matrix")}>
						<button className="file-button"/>
						<h1 className="file-name">matrix</h1>
					</div>
					<div id="file-ready_set_boole" className="file-div" onClick={() => fileClicked("file-ready_set_boole")} onDoubleClick={() => props.spawnWindow("ready_set_boole")}>
						<button className="file-button"/>
						<h1 className="file-name">ready_set_boole</h1>
					</div>
					<div id="file-minishell" className="file-div" onClick={() => fileClicked("file-minishell")} onDoubleClick={() => props.spawnWindow("minishell")}>
						<button className="file-button"/>
						<h1 className="file-name">minishell</h1>
					</div>
					<div id="file-philosophers" className="file-div" onClick={() => fileClicked("file-philosophers")} onDoubleClick={() => props.spawnWindow("philosophers")}>
						<button className="file-button"/>
						<h1 className="file-name">philosophers</h1>
					</div>
					<div id="file-ft_printf" className="file-div" onClick={() => fileClicked("file-ft_printf")} onDoubleClick={() => props.spawnWindow("ft_printf")}>
						<button className="file-button"/>
						<h1 className="file-name">ft_printf</h1>
					</div>
					<div id="file-push_swap" className="file-div" onClick={() => fileClicked("file-push_swap")} onDoubleClick={() => props.spawnWindow("push_swap")}>
						<button className="file-button"/>
						<h1 className="file-name">push_swap</h1>
					</div>
				</div>
			}
		</div>
	)
}
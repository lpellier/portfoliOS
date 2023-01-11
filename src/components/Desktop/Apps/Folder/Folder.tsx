import { FunctionComponent, useEffect } from "react";
import "styles/Folder.css"
import { IFolder } from "../../../../types";

const Folder: FunctionComponent<IFolder> = ({name, spawnWindow}) => {
	useEffect(() => {
	}, []);

	const fileClicked = (filename: string): void => {
		// ? Remove any existing outlines
		const folder = document.getElementById(name);
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
			{name === "Server Projects" &&
				<div id={name} className="folder">
					<div id="file-ft_server" className="file-div" onClick={() => fileClicked("file-ft_server")} onDoubleClick={() => spawnWindow("ft_server")}>
						<button className="file-button"/>
						<h1 className="file-name">ft_server</h1>
					</div>
					<div id="file-ft_services" className="file-div" onClick={() => fileClicked("file-ft_services")} onDoubleClick={() => spawnWindow("ft_services")}>
						<button className="file-button"/>
						<h1 className="file-name">ft_services</h1>
					</div>
				</div>
			}
			{name === "C/C++ Projects" && 
				<div id={name} className="folder">
					<div id="file-101_C" className="file-div" onClick={() => fileClicked("file-101_C")} onDoubleClick={() => spawnWindow("101_C")}>
						<button className="file-button"/>
						<h1 className="file-name">101_C</h1>
					</div>
					<div id="file-get_next_line" className="file-div" onClick={() => fileClicked("file-get_next_line")} onDoubleClick={() => spawnWindow("get_next_line")}>
						<button className="file-button"/>
						<h1 className="file-name">get_next_line</h1>
					</div>
					<div id="file-matrix" className="file-div" onClick={() => fileClicked("file-matrix")} onDoubleClick={() => spawnWindow("matrix")}>
						<button className="file-button"/>
						<h1 className="file-name">matrix</h1>
					</div>
					<div id="file-ready_set_boole" className="file-div" onClick={() => fileClicked("file-ready_set_boole")} onDoubleClick={() => spawnWindow("ready_set_boole")}>
						<button className="file-button"/>
						<h1 className="file-name">ready_set_boole</h1>
					</div>
					<div id="file-minishell" className="file-div" onClick={() => fileClicked("file-minishell")} onDoubleClick={() => spawnWindow("minishell")}>
						<button className="file-button"/>
						<h1 className="file-name">minishell</h1>
					</div>
					<div id="file-philosophers" className="file-div" onClick={() => fileClicked("file-philosophers")} onDoubleClick={() => spawnWindow("philosophers")}>
						<button className="file-button"/>
						<h1 className="file-name">philosophers</h1>
					</div>
					<div id="file-ft_printf" className="file-div" onClick={() => fileClicked("file-ft_printf")} onDoubleClick={() => spawnWindow("ft_printf")}>
						<button className="file-button"/>
						<h1 className="file-name">ft_printf</h1>
					</div>
					<div id="file-push_swap" className="file-div" onClick={() => fileClicked("file-push_swap")} onDoubleClick={() => spawnWindow("push_swap")}>
						<button className="file-button"/>
						<h1 className="file-name">push_swap</h1>
					</div>
				</div>
			}
		</div>
	)
}

export default Folder;
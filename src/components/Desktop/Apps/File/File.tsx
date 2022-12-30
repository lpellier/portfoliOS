import { useEffect } from "react";
import "./File.css"

// ? Generic File component, takes a path for the file contents
export default function File(props: {name: string, content_path: string, spawnWindow: Function}) {
	useEffect(() => {
	}, []);

	return (
		<div id="File" className="file">
			<button onClick={() => props.spawnWindow(`Subject ${props.name}`)}>
				
				<h1>Subject</h1>
			</button>
		</div>
	)
}
import { useEffect } from "react";
import "./FolderServer.css"

export default function FolderServer(props: any) {
	useEffect(() => {
	}, []);

	return (
		<div className="folder">
			<div className="file-div">
				<button className="file-button"/>
				<h1 className="file-name">ft_server</h1>
			</div>
			<div className="file-div">
				<button className="file-button"/>
				<h1 className="file-name">ft_services</h1>
			</div>
		</div>
	)
}
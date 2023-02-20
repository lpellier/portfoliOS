import { memo, useEffect } from "react";
import "styles/Settings.css"

const Settings = ({forcedUpdate}: {forcedUpdate: boolean}) => {
	useEffect(() => {}, [forcedUpdate]);

	return (
		<div id="Settings" className="file">
		</div>
	)
}

export default memo(Settings);
import { memo, useEffect } from "react";
import "styles/AboutMe.css"

const AboutMe = ({forcedUpdate}: {forcedUpdate: boolean}) => {
	useEffect(() => {}, [forcedUpdate]);

	return (
		<div id="AboutMe" className="file">
		</div>
	)
}

export default memo(AboutMe);
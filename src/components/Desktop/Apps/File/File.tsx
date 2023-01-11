import { FunctionComponent, useEffect, useState } from "react";
import "styles/File.css"
import ReactMarkdown from 'react-markdown'
import remarkGfm from "remark-gfm";
import { Scrollbar } from "react-scrollbars-custom";
import { IFile } from "../../../../types";
import { default_win_height, default_win_width } from "../../../../globals";

const File: FunctionComponent<IFile> = ({name, content_path, spawnWindow}) => {
	const [markdown, setMarkdown] = useState('');

	useEffect(() => {
		fetch(content_path)
			.then((response: any) => response.text())
			.then((text) => {
				setMarkdown(text);
			})
	}, [content_path]);

	let width = document.getElementById(name)?.clientWidth;
	let height = document.getElementById(name)?.clientHeight;

	return (
		<div id="File" className="file">
			<button className="subject-button" onClick={() => spawnWindow(`Subject ${name}`)}>
				<h1>Subject</h1>
			</button>
			<Scrollbar style={{ width: width ? width : default_win_width, height: height? height : default_win_height}} className='Scrollbar'>
				<ReactMarkdown className="markdown" remarkPlugins={[remarkGfm]} children={markdown}/>
			</Scrollbar>
		</div>
	)
}

export default File;
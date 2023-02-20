import React, { memo, useEffect, useState } from "react";
import "styles/File.css"
import ReactMarkdown from 'react-markdown'
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import {oneDark} from 'react-syntax-highlighter/dist/esm/styles/prism'

import { Scrollbar } from "react-scrollbars-custom";
import { IFile } from "../../../../types";
import { default_win_height, default_win_width } from "../../../../consts";

const File = ({name, content_path, spawnWindow, size, forcedUpdate}: IFile) => {
	const [markdown, setMarkdown] = useState('');

	useEffect(() => {
		fetch(content_path)
			.then((response: any) => response.text())
			.then((text) => {
				setMarkdown(text);
			})
	}, [content_path]);

	useEffect(() => {
	}, [size, forcedUpdate])

	let width = document.getElementById(name)?.clientWidth;
	let height = document.getElementById(name)?.clientHeight;
	return (
		<div id="File" className="file">
			{ name !== "101_C" && 
				<button className="subject-button" onClick={() => spawnWindow(`Subject ${name}`)}>
					<h1>Subject</h1>
				</button>
			}
			<Scrollbar style={{ width: width ? width : default_win_width, height: height? height : default_win_height}} className='Scrollbar'>
      			<ReactMarkdown components={{
					code({node, inline, className, children, ...props}) {
						const match = /language-(\w+)/.exec(className || '')
						return !inline && match ? (
							<SyntaxHighlighter
							children={String(children).replace(/\n$/, '')}
							// @ts-ignore: next-line
							style={oneDark}
							language={match[1]}
							PreTag="div"
							{...props}
						/>
						) : (
						<code className={className} {...props}>
							{children}
						</code>
						)
					}
				}}
				className="markdown" rehypePlugins={[rehypeRaw]} remarkPlugins={[remarkGfm]} children={markdown}/>
			</Scrollbar>
		</div>
	)
}

export default memo(File);
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

	const downloadFile = (): void => {
		let pdf_path = `https://lpellier.github.io/portfoliOS/project_subjects/${name}.subject.pdf`
		
		fetch(pdf_path).then(response => {
            response.blob().then(blob => {
                // Creating new object of PDF file
                const fileURL = window.URL.createObjectURL(blob);
                // Setting various property values
                let alink = document.createElement('a');
                alink.href = fileURL;
                alink.download = `${name}.pdf`;
                alink.click();
            })
        })
	}

	let width = document.getElementById(name)?.clientWidth;
	let height = document.getElementById(name)?.clientHeight;
	return (
		<div id="File" className="file">
			<button className="button-pdf" id="button-pdf-download" onClick={downloadFile}>
				<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#F4615A" fill="none" strokeLinecap="round" strokeLinejoin="round">
					<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
					<path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" />
					<polyline points="7 11 12 16 17 11" />
					<line x1="12" y1="4" x2="12" y2="16" />
				</svg>
				<h1>{name === "About me" ? "CV" : "Subject"}</h1>
			</button>
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
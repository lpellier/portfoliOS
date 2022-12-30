import { useEffect, useState } from "react";
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack5';
import { Scrollbar } from "react-scrollbars-custom";
import "./PDFViewer.css"

// ? Takes pdf path as prop
export default function PDFViewer(props: {name: string, pdf_path: string}) {
	const [numPages, setNumPages] = useState(1);
	const [pageNumber, setPageNumber] = useState(1);
	const [scale, setScale] = useState(1);
  
	function onDocumentLoadSuccess({ numPages }: any) {
	  setNumPages(numPages);
	}

	const leftPage = (): void => {
		setPageNumber(() => {
			let newPageNumber = pageNumber - 1;
			if (newPageNumber <= 0)
				newPageNumber = numPages;
			return newPageNumber;
		})
	}
	const rightPage = (): void => {
		setPageNumber(() => {
			let newPageNumber = pageNumber + 1;
			if (newPageNumber >= numPages)
				newPageNumber = 1;
			return newPageNumber;
		})
	}

	const incrementScale = (): void => {
		setScale(() => {
			return scale + 0.5 > 5 ? 5 : scale + 0.5;
		})
	}
	const decrementScale = (): void => {
		setScale(() => {
			return scale - 0.5 < 1 ? 1 : scale - 0.5;
		})
	}

	useEffect(() => {
	}, []);
	
	let width = document.getElementById(props.name)?.clientWidth;
	let height = document.getElementById(props.name)?.clientHeight;

	return (
		<div id="PDFViewer">
			<Scrollbar style={{ width: width ? width : 600, height: height? height : 400}} className='Scrollbar'>
				<Document className="file-pdf" file={props.pdf_path} onLoadSuccess={onDocumentLoadSuccess}>
						<Page scale={scale} renderAnnotationLayer={false} renderTextLayer={false} pageNumber={pageNumber}/>
				</Document>
			</Scrollbar>
			<button className="button-pdf" id="button-pdf-left" onClick={leftPage}>
				<svg xmlns="http://www.w3.org/2000/svg" 
					viewBox="0 0 100 100" 
					strokeWidth="5" stroke="#F4615A" fill="none" 
					strokeLinecap="round" strokeLinejoin="round"
					>
					<polyline points="50 30 30 50 50 70" />
					<line x1="30" y1="50" x2="70" y2="50" />
				</svg>
			</button>
			<button className="button-pdf" id="button-pdf-right" onClick={rightPage}>
				<svg xmlns="http://www.w3.org/2000/svg" 
					viewBox="0 0 100 100" 
					strokeWidth="5" stroke="#F4615A" fill="none" 
					strokeLinecap="round" strokeLinejoin="round"
					>
					<polyline points="50 30 70 50 50 70" />
					<line x1="30" y1="50" x2="70" y2="50" />
				</svg>
			</button>
			<button className="button-pdf" id="button-pdf-plus" onClick={incrementScale}>
				<svg xmlns="http://www.w3.org/2000/svg" 
					viewBox="0 0 100 100" 
					strokeWidth="5" stroke="#F4615A" fill="none" 
					strokeLinecap="round" strokeLinejoin="round"
					>
					<line x1="20" y1="50" x2="80" y2="50" />
					<line x1="50" y1="20" x2="50" y2="80" />
				</svg>
			</button>
			<button className="button-pdf" id="button-pdf-minus" onClick={decrementScale}>
				<svg xmlns="http://www.w3.org/2000/svg" 
					viewBox="0 0 100 100" 
					strokeWidth="5" stroke="#F4615A" fill="none" 
					strokeLinecap="round" strokeLinejoin="round"
					>
					<line x1="20" y1="50" x2="80" y2="50" />
				</svg>
			</button>
		</div>
	)
}
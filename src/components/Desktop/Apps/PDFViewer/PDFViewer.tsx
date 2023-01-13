import { FunctionComponent, useEffect, useState } from "react";
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack5';
import { Scrollbar } from "react-scrollbars-custom";
import "styles/PDFViewer.css"
import { IPDFViewer } from "../../../../types";
import { default_win_width, default_win_height } from "../../../../consts";

const PDFViewer: FunctionComponent<IPDFViewer> = ({name, pdf_path}) => {
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
			if (newPageNumber >= numPages + 1)
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
			return scale - 0.5 < 0.5 ? 0.5 : scale - 0.5;
		})
	}

	useEffect(() => {
	}, []);
	
	let width = document.getElementById(name)?.clientWidth;
	let height = document.getElementById(name)?.clientHeight;

	return (
		<div id="PDFViewer">
			<Scrollbar style={{ width: width ? width : default_win_width, height: height? height : default_win_height}} className='Scrollbar'>
				<Document className="file-pdf" file={pdf_path} onLoadSuccess={onDocumentLoadSuccess}>
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
			<p id="page-number" style={{fontFamily: "Outfit"}}>{pageNumber} / {numPages}</p>
		</div>
	)
}

export default PDFViewer;
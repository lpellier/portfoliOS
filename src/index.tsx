import React from 'react';
import { CookiesProvider } from 'react-cookie';
import ReactDOM from 'react-dom/client';
import 'styles/index.css';
import Portfolio from './Portfolio';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
	// <React.StrictMode>
	<CookiesProvider>
		<Portfolio/>
	</CookiesProvider>
	// </React.StrictMode>
);

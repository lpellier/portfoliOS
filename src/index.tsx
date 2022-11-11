import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Desktop from './Desktop';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
//   <React.StrictMode>
    <Desktop />
//   </React.StrictMode>
);

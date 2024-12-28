import React from 'react';
import ReactDOM from 'react-dom/client';
import './globals.css';  // Import global styles (if any)
import App from './App';  // Import App component

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <App />  {/* Render the App component */}
  </React.StrictMode>
);

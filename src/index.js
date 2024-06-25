// Import necessary modules from React
import React from 'react';
import ReactDOM from 'react-dom/client';

// Import global styles
import './assets/styles/App.css';

// Import main App component
import App from './App';

// Create root element to render the application
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App component inside the root element with StrictMode enabled
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

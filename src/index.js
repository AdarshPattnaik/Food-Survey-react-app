// Main JS File: index.js
import React from 'react';
import ReactDOM from 'react-dom/client';

// Importing Bootstrap:
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";

// Importing CSS File:
import './index.css';

// Importing App Component:
import App from './Components/App.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
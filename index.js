// // src/index.js
// import React from 'react';
// //import ReactDOM from 'react-dom';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import ErrorBoundary from './ErrorBoundary';

// ReactDOM.createRoot(
//   <React.StrictMode>
//     <ErrorBoundary>
//       <App />
//     </ErrorBoundary>
//   </React.StrictMode>,
//   document.getElementById('root')
// );

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

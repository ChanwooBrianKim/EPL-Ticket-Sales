import React from 'react' // React is a default export from the react package
import ReactDOM from 'react-dom/client' // ReactDOM is a named export from the react-dom package
import App from './App.tsx' // Import the App component from the App.tsx file
import "bootstrap/dist/css/bootstrap.min.css" // Import the Bootstrap CSS file
import { BrowserRouter } from "react-router-dom" // Import the BrowserRouter component from the react-router-dom package

// Render the App component inside the BrowserRouter component inside the React.StrictMode component
ReactDOM.createRoot(document.getElementById('root')!).render( // ! = non-null assertion operator
  <React.StrictMode>
    <BrowserRouter>
      <App />  
    </BrowserRouter>
  </React.StrictMode>,
)

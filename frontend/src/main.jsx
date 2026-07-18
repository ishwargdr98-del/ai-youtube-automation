import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './app.jsx'
import ReactGA from "react-ga4";



ReactGA.initialize("G-BCZYYCFYH7");
ReactGA.send({
  hitType: "pageview",
  page: window.location.pathname,
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

import { StrictMode } from 'react'
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import ReactDOM from 'react-dom/client'
 import { BrowserRouter } from 'react-router-dom'
 import 'bootstrap/dist/css/bootstrap.min.css'
 import 'swiper/swiper-bundle.min.css';

 import './styles/reset.css'
 import './styles/fonts.css'
 import './styles/variables.css'
 import './styles/helpers.css'
 import './styles/defaults.css'

ReactDOM.createRoot(document.getElementById('root')).render(
<BrowserRouter>
{/* 
// <StrictMode> */}
    <App />
  {/* // </StrictMode>, */}
</BrowserRouter>

)

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faBars, faSearch, faTimes, faStar, faStarHalfAlt, faSpinner } from '@fortawesome/free-solid-svg-icons'

library.add(faBars, faSearch, faTimes, faStar, faStarHalfAlt, faSpinner)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

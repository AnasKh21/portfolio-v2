import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import SmoothScroll from './components/SmoothScroll.jsx'
import { LanguageProvider } from './context/LanguageContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <LanguageProvider>
        <SmoothScroll>
          <App />
        </SmoothScroll>
      </LanguageProvider>
    </BrowserRouter>
  </StrictMode>,
)

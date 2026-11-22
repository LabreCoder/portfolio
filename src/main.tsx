import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// Liga as animações de entrada; sem JS, o conteúdo aparece normalmente.
document.documentElement.classList.add('js')

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

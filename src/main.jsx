import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './api' // 初始化模拟API
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

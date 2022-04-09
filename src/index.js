import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { StatsProvider } from './components/context/StatsContext'
import App from './App'

const root = createRoot(document.getElementById('root'))

root.render(
  <React.StrictMode>
    <StatsProvider>
      <App />
    </StatsProvider>
  </React.StrictMode>
)

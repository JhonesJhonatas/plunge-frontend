import React from 'react'
import ReactDOM from 'react-dom/client'

import './../style/global.css'

import { App } from '@core'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
import React from 'react'

import { BrowserRouter } from 'react-router-dom'

import { Router } from '@core'

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  )
}


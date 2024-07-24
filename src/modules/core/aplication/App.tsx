import React from 'react'

import { BrowserRouter } from 'react-router-dom'

import { Router } from '@core'
import { AuthProvider } from '@user'
import { ToastProvider } from '@components'

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ToastProvider>
        <AuthProvider>
          <Router />
        </AuthProvider>
      </ToastProvider>
    </BrowserRouter>
  )
}

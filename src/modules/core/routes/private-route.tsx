import React from 'react'

import { Navigate } from 'react-router-dom'
import { useAuth } from '@user'

type PrivateRouteProps = {
  Component: React.ReactNode
}

function render(component: React.ReactNode) {
  return component
}

export const PrivateRoute = ({ Component }: PrivateRouteProps) => {
  const { tokenIsValid } = useAuth()

  if (!tokenIsValid) {
    return <Navigate to="/" />
  }

  return render(Component)
}

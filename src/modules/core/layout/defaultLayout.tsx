import React from 'react'

import { Outlet } from 'react-router-dom'

import { NavBar } from '@components'

export const DefaultLayout: React.FC = () => {
  return (
    <div className="w-screen h-screen flex flex-col gap-4">
      <NavBar />
      <Outlet />
    </div>
  )
}

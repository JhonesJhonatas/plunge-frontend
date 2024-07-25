import React from 'react'

import { Outlet } from 'react-router-dom'

import { NavBar } from '@components'

export const DefaultLayout: React.FC = () => {
  return (
    <div className="w-screen max-h-screen flex flex-col gap-4 items-center overflow-hidden">
      <NavBar />
      <div className="w-[1300px]">
        <Outlet />
      </div>
    </div>
  )
}

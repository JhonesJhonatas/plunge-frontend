import React from 'react'

import { Route, Routes } from 'react-router-dom'

import { Login } from '@pages'

export const Router: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
    </Routes>
  )
}

import React from 'react'

import { Route, Routes } from 'react-router-dom'

import { CreateUser, Feed, Login } from '@pages'

export const Router: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route path="/create-user" element={<CreateUser />} />

      <Route path="/" element={<Feed />} />
    </Routes>
  )
}

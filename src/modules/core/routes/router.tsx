import React from 'react'

import { Route, Routes } from 'react-router-dom'

import { CreateUser, Feed, Login, Profile } from '@pages'
import { PrivateRoute } from './private-route'
import { DefaultLayout } from '../layout/defaultLayout'

export const Router: React.FC = () => {
  return (
    <Routes>
      <Route path="/:email?" element={<Login />} />

      <Route path="/create-user" element={<CreateUser />} />

      <Route path="/" element={<DefaultLayout />}>
        <Route path="/feed" element={<PrivateRoute Component={<Feed />} />} />

        <Route
          path="/profile"
          element={<PrivateRoute Component={<Profile />} />}
        />
      </Route>
    </Routes>
  )
}

import React from 'react'

import { CreateUserMultistepProvider } from '@/modules/user'
import { CreateUserMultistep } from './components/create-user-multistep'

export const CreateUser: React.FC = () => {
  return (
    <CreateUserMultistepProvider>
      <CreateUserMultistep />
    </CreateUserMultistepProvider>
  )
}

import { User } from '@user'

export interface CreateUserProps {
  name: string
  email: string
  password: string
}

export interface CreateUserResponse extends User {}

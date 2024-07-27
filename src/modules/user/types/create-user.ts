import { User } from '@user'

export interface CreateUserProps {
  name: string
  email: string
  password: string
  nickName: string
  bio?: string
}

export interface CreateUserResponse extends User {}

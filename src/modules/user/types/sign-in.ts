import { User } from '@user'

export interface SignInUser extends Omit<User, 'createdAt'> {}

export interface SignInProps {
  email: string
  password: string
}

export interface SignInResponse {
  user: SignInUser
  accessToken: string
}

import { SignInUser } from '@user'

export interface CreateUserProps {
  name: string
  email: string
  password: string
}

export interface CreateUserResponse {
  user: SignInUser
  accessToken: string
}

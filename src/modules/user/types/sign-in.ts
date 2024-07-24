type User = {
  id: string
  name: string
  email: string
}

export interface SignInProps {
  email: string
  password: string
}

export interface SignInResponse {
  user: User
  accessToken: string
}

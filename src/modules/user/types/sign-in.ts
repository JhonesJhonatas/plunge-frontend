export interface SignInUser {
  id: string
  name: string
  email: string
  nickName: string
  avatarUrl: string
}

export interface SignInProps {
  email: string
  password: string
}

export interface SignInResponse {
  user: SignInUser
  accessToken: string
}

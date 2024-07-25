import { request } from '@core'

import {
  CreateUserProps,
  CreateUserResponse,
  SignInProps,
  SignInResponse,
} from '@user'

export async function signIn(params: SignInProps) {
  return request<SignInResponse>({
    url: '/auth/sign-in',
    method: 'post',
    body: params,
  })
}

export async function createUser(params: CreateUserProps) {
  return request<CreateUserResponse>({
    url: '/user',
    method: 'post',
    body: params,
  })
}

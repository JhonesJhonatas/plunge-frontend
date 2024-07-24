import { request } from '@core'

import { SignInProps, SignInResponse } from '@user'

export async function signIn(params: SignInProps) {
  return request<SignInResponse>({
    url: '/auth/sign-in',
    method: 'post',
    body: params,
  })
}

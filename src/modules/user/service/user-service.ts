import { request } from '@core'

import {
  CreateUserProps,
  CreateUserResponse,
  GetProfileDataProps,
  GetProfileDataResponse,
  SearchUserProps,
  SearchUserResponse,
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

export async function searchUser(params: SearchUserProps) {
  return request<SearchUserResponse>({
    url: '/user',
    method: 'get',
    params,
  })
}

export async function getProfileData(params: GetProfileDataProps) {
  return request<GetProfileDataResponse>({
    url: '/user/get-profile-data',
    method: 'get',
    params,
  })
}

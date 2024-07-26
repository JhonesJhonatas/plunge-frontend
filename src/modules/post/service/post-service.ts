import { request } from '@core'

import {
  CreatePostProps,
  CreatePostResponse,
  SearchPostProps,
  SearchPostResponse,
} from '@post'

export async function createPost(params: CreatePostProps) {
  return request<CreatePostResponse>({
    url: '/post',
    method: 'post',
    body: params,
  })
}

export async function searchPost(params: SearchPostProps) {
  return request<SearchPostResponse>({
    url: '/post',
    method: 'get',
    params,
  })
}

import { request } from '@core'

import {
  DeleteFollowerProps,
  DeleteFollowerResponse,
  EditFollowerProps,
  EditFollowerResponse,
  RequestFollowProps,
  RequestFollowResponse,
} from '@follower'

export async function requestFollow(params: RequestFollowProps) {
  return request<RequestFollowResponse>({
    url: '/follower',
    method: 'post',
    body: params,
  })
}

export async function editFollow(params: EditFollowerProps) {
  return request<EditFollowerResponse>({
    url: '/follower',
    method: 'put',
    body: params,
  })
}

export async function deleteFollow({ id }: DeleteFollowerProps) {
  return request<DeleteFollowerResponse>({
    url: `/follower/${id}`,
    method: 'delete',
  })
}

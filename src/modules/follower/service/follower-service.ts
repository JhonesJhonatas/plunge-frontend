import { request } from '@core'

import { RequestFollowProps, RequestFollowResponse } from '@follower'

export async function requestFollow(params: RequestFollowProps) {
  return request<RequestFollowResponse>({
    url: '/follower',
    method: 'post',
    body: params,
  })
}

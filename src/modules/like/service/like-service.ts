import { request } from '@core'

import { RatePostProps, RatePostResponse } from '@like'

export async function ratePost(params: RatePostProps) {
  return request<RatePostResponse>({
    url: '/like/rate-post',
    method: 'post',
    body: params,
  })
}

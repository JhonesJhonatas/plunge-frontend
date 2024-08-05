import { Like } from './like'

export interface RatePostProps {
  postId: string
  like: boolean
}

export interface RatePostResponse extends Like {}

import { User } from '@user'
import { Post } from '@post'

export interface GetProfileDataProps {
  nickName: string
}

export interface GetProfileDataResponse extends User {
  posts: Post[]
}

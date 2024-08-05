import { User } from '@user'
import { Post } from '@post'

export interface GetProfileDataProps {
  nickName: string
}

export interface GetProfileDataResponse {
  user: Omit<User, 'password'>
  posts: Post[]
  follows: {
    acceptedFollowers: []
    acceptedFollowing: []
    pendingFollowers: []
    pendingFollowing: []
    counts: {
      followers: number
      following: number
    }
  }
}

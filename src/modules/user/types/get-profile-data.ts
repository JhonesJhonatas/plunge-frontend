import { User } from '@user'
import { Post } from '@post'
import { FollowedBy, Following } from '@followers'

export interface GetProfileDataProps {
  nickName: string
}

export interface GetProfileDataResponse {
  user: Omit<User, 'password'>
  posts: Post[]
  follows: {
    acceptedFollowers: Following[]
    acceptedFollowing: FollowedBy[]
    pendingFollowers: Following[]
    pendingFollowing: FollowedBy[]
    counts: {
      followers: number
      following: number
    }
  }
}

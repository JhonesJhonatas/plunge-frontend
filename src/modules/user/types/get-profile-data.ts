import { User } from '@user'
import { Post } from '@post'

export interface GetProfileDataProps {
  nickName: string
}

type Follow = {
  id: string
  createdAt: Date
  user: {
    id: string
    name: string
    nickName: string
    avatarUrl: string
  }
}

export interface GetProfileDataResponse {
  user: Omit<User, 'password'>
  posts: Post[]
  follows: {
    acceptedFollowers: Follow[]
    acceptedFollowing: Follow[]
    pendingFollowers: Follow[]
    pendingFollowing: Follow[]
    counts: {
      followers: number
      following: number
    }
  }
}

import { User } from '@user'
import { Post } from '@post'

export interface GetProfileDataProps {
  nickName: string
}

type Like = {
  id: string
  userId: string
  postId: string
  createdAt: Date
  user: {
    id: string
    name: string
    nickName: string
    avatarUrl: string
  }
}

interface PostSchema extends Post {
  Like: Like[]
}

export interface GetProfileDataResponse {
  user: Omit<User, 'password'>
  posts: PostSchema[]
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

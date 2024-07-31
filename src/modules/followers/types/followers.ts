export type FollowStatus = 'PENDING' | 'ACCEPTED' | 'REJECTED'

export type FollowUser = {
  id: string
  name: string
  avatarUrl: string
  nickName: string
}

export interface Following {
  status: FollowStatus
  followedBy: FollowUser
}

export interface FollowedBy {
  status: FollowStatus
  following: FollowUser
}

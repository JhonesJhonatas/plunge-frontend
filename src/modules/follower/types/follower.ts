export interface Follower {
  id: string
  followerId: string
  followingId: string
  status: 'PENDING' | 'ACCEPTED' | 'DECLINED'
  createdAt: string
  updatedAt: string
}

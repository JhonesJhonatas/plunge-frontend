import { Follower } from '@follower'

export interface RequestFollowProps {
  followingId: string
}

export interface RequestFollowResponse extends Follower {}

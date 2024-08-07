import { Follower } from '@follower'

export interface EditFollowerProps {
  id: string
  status: 'PENDING' | 'ACCEPTED' | 'DECLINED'
}

export interface EditFollowerResponse extends Follower {}

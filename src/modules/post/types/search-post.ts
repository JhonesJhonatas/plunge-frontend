import { Post } from '@post'

export interface SearchPostProps {
  content?: string
  userId?: string
}

export type SearchPostResponse = Post[]

import { Post } from '@post'

export interface SearchPostProps {
  content?: string
}

export type SearchPostResponse = Post[]

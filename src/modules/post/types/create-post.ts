import { Post } from '@/modules/post/types/post'

export interface CreatePostProps {
  content: string
  mediaUrl?: string
}

export type CreatePostResponse = Post

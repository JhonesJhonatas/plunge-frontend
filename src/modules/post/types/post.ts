export type Author = {
  id: string
  name: string
  avatarUrl: string
}

export type Post = {
  id: string
  content: string
  mediaUrl?: string
  ups: number
  downs: number
  author: Author
  createdAt: string
  updatedAt: string
}

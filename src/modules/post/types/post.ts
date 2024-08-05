export type Author = {
  id: string
  name: string
  nickName: string
  avatarUrl?: string
}

export type PostLike = {
  id: string
  createdAt: Date
  user: {
    id: string
    name: string
    nickName: string
    avatarUrl: string
  }
}

export type Post = {
  id: string
  content: string
  mediaUrl?: string
  author: Author
  likes: PostLike[]
  likesCount: number
  userCanLike: boolean
  userAleradyLiked: boolean
  createdAt: Date
  updatedAt: Date
}

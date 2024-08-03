export type Author = {
  id: string
  name: string
  nickName: string
  avatarUrl?: string
}

type Like = {
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
  likes: Like[]
  likesCount: number
  userCanLike: boolean
  userAleradyLiked: boolean
  createdAt: Date
  updatedAt: Date
}

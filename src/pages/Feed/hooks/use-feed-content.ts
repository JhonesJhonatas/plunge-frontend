import { useCallback, useEffect, useState } from 'react'

import { v4 as uuidv4 } from 'uuid'

import { useAuth } from '@user'
import {
  createPost,
  CreatePostProps,
  deletePost,
  DeletePostProps,
  Post,
  searchPost,
} from '@post'
import { ratePost, RatePostProps } from '@like'
import { useToast } from '@components'

type Properties = {
  loading: boolean
  posts: Post[]
}

interface HandleRatePostProps extends RatePostProps {}

interface HandleCreatePostProps extends CreatePostProps {}

interface HandleDeletePostProps extends DeletePostProps {}

export function useFeedContent() {
  const { user } = useAuth()
  const { addToast } = useToast()

  const [properties, setProperties] = useState<Properties>({} as Properties)

  const handleSetProperties = useCallback((params: Partial<Properties>) => {
    setProperties((oldState) => ({ ...oldState, ...params }))
  }, [])

  const handleGetAllPosts = useCallback(async () => {
    const { data } = await searchPost({})

    handleSetProperties({ posts: data })
  }, [handleSetProperties])

  const handleRatePost = useCallback(
    async ({ postId, like }: HandleRatePostProps) => {
      handleSetProperties({ loading: true })
      try {
        await ratePost({ postId, like })
      } catch (error) {
        addToast({
          title: 'Erro ao curtir post',
          description: 'Ocorreu um erro ao curtir o post, tente novamente',
        })

        handleSetProperties({ loading: false })
        return
      }

      const posts = properties.posts.map((post) => {
        if (post.id === postId) {
          const newLike = {
            id: uuidv4(),
            createdAt: new Date(),
            user: {
              id: user.id,
              name: user.name,
              nickName: user.nickName,
              avatarUrl: user.avatarUrl,
            },
          }

          const updatedLikes = like
            ? { ...post.likes, newLike }
            : post.likes.filter((like) => {
                return like.user.id !== user.id
              })

          return {
            ...post,
            likes: updatedLikes,
            userAleradyLiked: like,
            likesCount: like ? post.likesCount + 1 : post.likesCount - 1,
          }
        }

        return post
      })

      handleSetProperties({ posts, loading: false })
    },
    [
      addToast,
      handleSetProperties,
      properties.posts,
      user.avatarUrl,
      user.id,
      user.name,
      user.nickName,
    ],
  )

  const handleCreatePost = useCallback(
    async ({ content, mediaUrl }: HandleCreatePostProps) => {
      handleSetProperties({ loading: true })
      try {
        const {
          data: {
            id,
            createdAt,
            content: postContent,
            updatedAt,
            mediaUrl: postMediaUrl,
          },
        } = await createPost({ content, mediaUrl })

        const formattedPost: Post = {
          id,
          createdAt,
          updatedAt,
          content: postContent,
          mediaUrl: postMediaUrl,
          author: {
            id: user.id,
            name: user.name,
            nickName: user.nickName,
            avatarUrl: user.avatarUrl,
          },
          likesCount: 0,
          likes: [],
          userCanLike: false,
          userAleradyLiked: false,
        }

        const posts = [formattedPost, ...properties.posts]

        handleSetProperties({ posts, loading: false })
      } catch (error) {
        addToast({
          title: 'Erro ao criar post',
          description: 'Ocorreu um erro ao criar o post, tente novamente',
        })

        handleSetProperties({ loading: false })
      }
    },
    [
      addToast,
      handleSetProperties,
      properties.posts,
      user.avatarUrl,
      user.id,
      user.name,
      user.nickName,
    ],
  )

  const handleDeletePost = useCallback(
    async ({ id }: HandleDeletePostProps) => {
      handleSetProperties({ loading: true })
      try {
        await deletePost({ id })
      } catch (error) {
        addToast({
          title: 'Erro ao deletar post',
          description: 'Ocorreu um erro ao deletar o post, tente novamente',
        })

        handleSetProperties({ loading: false })
        return
      }

      const posts = properties.posts.filter((post) => post.id !== id)

      handleSetProperties({ posts, loading: false })
    },
    [addToast, handleSetProperties, properties.posts],
  )

  useEffect(() => {
    handleGetAllPosts()
  }, [handleGetAllPosts])

  return {
    loading: properties.loading,
    posts: properties.posts,
    handlers: {
      handleGetAllPosts,
      handleCreatePost,
      handleRatePost,
      handleDeletePost,
    },
  }
}

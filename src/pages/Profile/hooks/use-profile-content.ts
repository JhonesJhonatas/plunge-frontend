import { useCallback, useEffect, useState } from 'react'

import { useParams } from 'react-router-dom'

import { v4 as uuidv4 } from 'uuid'

import { getProfileData, GetProfileDataResponse, useAuth } from '@user'
import {
  createPost,
  CreatePostProps,
  deletePost,
  DeletePostProps,
  Post,
} from '@post'
import { ratePost, RatePostProps } from '@like'
import { editFollow, requestFollow } from '@follower'

import { useToast } from '@components'

type Properties = {
  loading: boolean
  profileData: GetProfileDataResponse
}

interface HandleRequestFollowProps {
  followingId: string
}

interface HandleAcceptFollowProps {
  id: string
}

export function useProfileContent() {
  const { user } = useAuth()
  const { addToast } = useToast()

  const { nickName } = useParams()

  const [properties, setProperties] = useState<Properties>({} as Properties)

  const handleSetProperties = useCallback((params: Partial<Properties>) => {
    setProperties((oldState) => ({ ...oldState, ...params }))
  }, [])

  const handleGetProfileData = useCallback(
    async (userNickName: string) => {
      handleSetProperties({ loading: true })
      try {
        const { data } = await getProfileData({ nickName: userNickName })

        handleSetProperties({ profileData: data })
      } catch (error) {
        addToast({
          title: 'Error',
          description: 'Erro ao buscar dados do perfil',
        })
      }
      handleSetProperties({ loading: false })
    },
    [addToast, handleSetProperties],
  )

  const handleCreatePost = useCallback(
    async ({ content, mediaUrl }: CreatePostProps) => {
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

        const posts = [formattedPost, ...properties.profileData.posts]

        handleSetProperties({
          profileData: { ...properties.profileData, posts },
          loading: false,
        })
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
      properties.profileData,
      user.avatarUrl,
      user.id,
      user.name,
      user.nickName,
    ],
  )

  const handleDeletePost = useCallback(
    async ({ id }: DeletePostProps) => {
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

      const posts = properties.profileData.posts.filter(
        (post) => post.id !== id,
      )

      handleSetProperties({
        profileData: { ...properties.profileData, posts },
        loading: false,
      })
    },
    [addToast, handleSetProperties, properties.profileData],
  )

  const handleRatePost = useCallback(
    async ({ postId, like }: RatePostProps) => {
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

      const posts = properties.profileData.posts.map((post) => {
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

      handleSetProperties({
        profileData: { ...properties.profileData, posts },
        loading: false,
      })
    },
    [
      addToast,
      handleSetProperties,
      properties.profileData,
      user.avatarUrl,
      user.id,
      user.name,
      user.nickName,
    ],
  )

  const handleRequestFollow = useCallback(
    async ({ followingId }: HandleRequestFollowProps) => {
      try {
        await requestFollow({ followingId })
      } catch (err) {
        addToast({
          title: 'Erro ao seguir usuário',
          description: 'Ocorreu um erro ao seguir o usuário, tente novamente',
        })
      }
    },
    [addToast],
  )

  const handleAcceptFollow = useCallback(
    async ({ id }: HandleAcceptFollowProps) => {
      try {
        await editFollow({ id, status: 'ACCEPTED' })

        addToast({
          title: 'Seguidor aceito',
          description: 'Você aceitou um novo seguidor',
        })
      } catch (err) {
        addToast({
          title: 'Erro ao aceitar solicitação de seguidor',
          description: 'Tente novamente mais tarde',
        })
      }
    },
    [addToast],
  )

  useEffect(() => {
    if (nickName) {
      handleGetProfileData(nickName)
      return
    }

    handleGetProfileData(user.nickName)
  }, [handleGetProfileData, nickName, user.nickName])

  return {
    loading: properties.loading,
    profileData: properties.profileData,
    isProfileOwner: user.nickName === properties.profileData?.user?.nickName,
    handlers: {
      handleGetProfileData,
      handleCreatePost,
      handleDeletePost,
      handleRatePost,
      handleRequestFollow,
      handleAcceptFollow,
    },
  }
}

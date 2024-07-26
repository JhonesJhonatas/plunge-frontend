import { useCallback, useState } from 'react'

import { createPost, CreatePostProps } from '@post'
import { useToast } from '@/components'

type Properties = {
  loading: boolean
}

interface UseCreatePostResponse {
  loading: boolean
  handlers: {
    handleCreatePost: (params: CreatePostProps) => void
  }
}

export const useCreatePost = (): UseCreatePostResponse => {
  const { addToast } = useToast()

  const [properties, setProperties] = useState<Properties>({
    loading: false,
  } as Properties)

  const handleSetProperties = useCallback((params: Partial<Properties>) => {
    setProperties((oldState) => {
      return {
        ...oldState,
        ...params,
      }
    })
  }, [])

  const handleCreatePost = useCallback(
    async ({ content, mediaUrl }: CreatePostProps) => {
      handleSetProperties({ loading: true })
      try {
        await createPost({ content, mediaUrl })

        addToast({
          title: 'Post Criado com sucesso',
          description: 'Em breve as pessoas poderão interagir com você por ele',
        })
      } catch (err) {
        addToast({
          title: 'Erro ao criar o post',
          description: 'Tente novamente',
        })
      }
      handleSetProperties({ loading: false })
    },
    [addToast, handleSetProperties],
  )

  return {
    loading: properties.loading,
    handlers: {
      handleCreatePost,
    },
  }
}

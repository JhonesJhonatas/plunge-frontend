import { useCallback, useEffect, useState } from 'react'

import { Post, searchPost, SearchPostProps } from '@post'

import { useToast } from '@components'

type Properties = {
  loading: boolean
  posts: Post[]
}

interface UseSearchPostResponse {
  loading: boolean
  posts: Post[]
  handlers: {
    handleSearchPost: (params: SearchPostProps) => void
  }
}

export const useSearchPost = (): UseSearchPostResponse => {
  const { addToast } = useToast()

  const [properties, setProperties] = useState<Properties>({} as Properties)

  const handleSetProperties = useCallback((params: Partial<Properties>) => {
    setProperties((oldState) => {
      return {
        ...oldState,
        ...params,
      }
    })
  }, [])

  const handleSearchPost = useCallback(
    async ({ content }: SearchPostProps) => {
      handleSetProperties({ loading: true })
      try {
        const { data } = await searchPost({ content })

        handleSetProperties({ posts: data })
      } catch (err) {
        addToast({
          title: 'Erro ao buscar os posts',
          description: 'Tente novamente',
        })
      }
      handleSetProperties({ loading: false })
    },
    [addToast, handleSetProperties],
  )

  useEffect(() => {
    handleSearchPost({})
  }, [handleSearchPost])

  return {
    loading: properties.loading,
    posts: properties.posts,
    handlers: {
      handleSearchPost,
    },
  }
}

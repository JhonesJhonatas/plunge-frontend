import { useCallback, useState } from 'react'

import { deletePost } from '@post'

import { useToast } from '@components'

interface HandleDeletePostProps {
  id: string
}

export const useDeletePost = () => {
  const { addToast } = useToast()

  const [loading, setLoading] = useState(false)

  const handleDeletePost = useCallback(
    async ({ id }: HandleDeletePostProps) => {
      setLoading(true)
      try {
        await deletePost({ id })

        addToast({
          title: 'Post deletado com sucesso',
          description: 'O post foi excluído com sucesso',
        })
      } catch (err) {
        addToast({
          title: 'Erro ao excluir o post',
          description: 'Tente novamente',
        })
      }
      setLoading(false)
    },
    [addToast],
  )

  return {
    loading,
    handlers: {
      handleDeletePost,
    },
  }
}

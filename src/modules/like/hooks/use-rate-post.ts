import { useCallback, useState } from 'react'

import { useToast } from '@/components'

import { ratePost, RatePostProps } from '@like'

interface UseRatePostResponse {
  loading: boolean
  handlers: {
    handleRatePost: (params: RatePostProps) => void
  }
}

export const useRatePost = (): UseRatePostResponse => {
  const { addToast } = useToast()

  const [loading, setLoading] = useState(false)

  const handleRatePost = useCallback(
    async ({ postId, like }: RatePostProps) => {
      setLoading(true)

      try {
        await ratePost({ postId, like })
      } catch (err) {
        addToast({
          title: 'Erro ao curtir o post',
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
      handleRatePost,
    },
  }
}

import { useCallback, useState } from 'react'

import { searchUser, SearchUserProps, User } from '@user'

import { useToast } from '@components'

type Properties = {
  loading: boolean
  users: User[]
}

interface UseSearchPostResponse {
  loading: boolean
  users: User[]
  handlers: {
    handleSearchUser: (params: SearchUserProps) => void
  }
}

export const useSearchUser = (): UseSearchPostResponse => {
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

  const handleSearchUser = useCallback(
    async ({ email, name }: SearchUserProps) => {
      handleSetProperties({ loading: true })
      try {
        const { data } = await searchUser({ email, name })

        handleSetProperties({ users: data })
      } catch (err) {
        addToast({
          title: 'Erro ao buscar os usuários',
          description: 'Tente novamente',
        })
      }
      handleSetProperties({ loading: false })
    },
    [addToast, handleSetProperties],
  )

  return {
    loading: properties.loading,
    users: properties.users,
    handlers: {
      handleSearchUser,
    },
  }
}

import { useCallback, useState } from 'react'

import { createUser, CreateUserProps } from '@user'

import { useToast } from '@components'

interface UseCreateUserResponse {
  loading: boolean
  handlers: {
    handleCreateUser: (params: CreateUserProps) => void
  }
}

export const useCreateUser = (): UseCreateUserResponse => {
  const { addToast } = useToast()

  const [loading, setLoading] = useState(false)

  const handleCreateUser = useCallback(
    async ({ name, email, password }: CreateUserProps) => {
      setLoading(true)

      try {
        await createUser({ name, email, password })

        addToast({
          title: 'Usuário criado com sucesso',
          description: 'Agora você pode fazer login',
        })
      } catch (err) {
        addToast({
          title: 'Erro ao criar usuário',
          description: 'Verifique as informações e tente novamente',
        })
      }

      setLoading(false)
    },
    [addToast],
  )

  return { loading, handlers: { handleCreateUser } }
}

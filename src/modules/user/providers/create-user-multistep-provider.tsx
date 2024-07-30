import React, { createContext, ReactNode, useCallback, useContext } from 'react'
import { useCreateUser } from '../hooks/use-create-user'

type FormData = {
  name: string
  nickName: string
  email: string
  bio: string
  password: string
  confirmPassword: string
}

interface CreateUserMultistepContextProps {
  formData: FormData
  handlers: {
    handleSetFormData: (params: Partial<FormData>) => void
    handleFinish: (password: string) => void
  }
}

interface CreateUserMultistepProviderProps {
  children: ReactNode
}

export const CreateUserMultistepContext = createContext(
  {} as CreateUserMultistepContextProps,
)

export const CreateUserMultistepProvider: React.FC<
  CreateUserMultistepProviderProps
> = ({ children }) => {
  const {
    handlers: { handleCreateUser },
  } = useCreateUser()

  const [formData, setFormData] = React.useState<FormData>({} as FormData)

  const handleSetFormData = useCallback((params: Partial<FormData>) => {
    setFormData((oldState) => ({ ...oldState, ...params }))
  }, [])

  const handleFinish = useCallback(
    (password: string) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { nickName, confirmPassword, ...rest } = formData

      handleCreateUser({
        ...rest,
        nickName: nickName.toLowerCase(),
        password,
      })
    },
    [formData, handleCreateUser],
  )

  return (
    <CreateUserMultistepContext.Provider
      value={{ formData, handlers: { handleSetFormData, handleFinish } }}
    >
      {children}
    </CreateUserMultistepContext.Provider>
  )
}

export const useCreateUserMultistep = () => {
  const context = useContext(CreateUserMultistepContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}

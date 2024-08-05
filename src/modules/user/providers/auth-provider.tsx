import React, {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react'

import { jwtDecode } from 'jwt-decode'
import { getUnixTime } from 'date-fns'
import { useLocation, useNavigate } from 'react-router-dom'

import { useToast } from '@/components'
import { signIn } from '@user'
import { setBearerToken } from '@core'

type HandleSignInProps = {
  email: string
  password: string
}

type User = {
  id: string
  name: string
  email: string
  nickName: string
  avatarUrl: string
}

type AuthContextSchema = {
  handlers: {
    handleSignIn: (params: HandleSignInProps) => void
    handleSignOut: () => void
  }
  user: User
  tokenIsValid: boolean
  isSubmitting: boolean
}

interface Properties {
  user: User
  tokenIsValid: boolean
  isSubmitting: boolean
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextSchema)

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { addToast } = useToast()

  const [properties, setProperties] = useState({} as Properties)

  const handleSetProperties = useCallback((params: Partial<Properties>) => {
    setProperties((oldState) => {
      return {
        ...oldState,
        ...params,
      }
    })
  }, [])

  const handleSignIn = useCallback(
    async ({ email, password }: HandleSignInProps) => {
      handleSetProperties({ isSubmitting: true })

      try {
        const { data } = await signIn({ email, password })

        setBearerToken({ token: data.accessToken })

        localStorage.setItem('@Plunge:user', JSON.stringify(data.user))
        localStorage.setItem('@Plunge:token', data.accessToken)

        handleSetProperties({
          user: data.user,
          tokenIsValid: true,
        })

        navigate('/feed')

        addToast({
          title: 'Bem vindo!',
          description: 'Login Realizado com sucesso!',
        })
      } catch (err) {
        addToast({
          title: 'Falha ao realizar login',
          description: 'Email ou Senha inválidos.',
        })
      }

      handleSetProperties({ isSubmitting: false })
    },
    [addToast, handleSetProperties, navigate],
  )

  const handleSignOut = useCallback(() => {
    localStorage.removeItem('@Plunge:token')
    localStorage.removeItem('@Plunge:user')

    handleSetProperties({
      user: undefined,
      tokenIsValid: false,
    })

    navigate('/')
  }, [handleSetProperties, navigate])

  useEffect(() => {
    const currentToken = localStorage.getItem('@Plunge:token')

    if (!currentToken) return

    const decodedToken = jwtDecode(currentToken)

    if (!decodedToken) {
      handleSignOut()
      return
    }

    const tokenIsValid = getUnixTime(new Date()) < (decodedToken.exp as number)

    if (tokenIsValid) {
      handleSetProperties({
        tokenIsValid,
        user: JSON.parse(localStorage.getItem('@Plunge:user') ?? ''),
      })

      setBearerToken({ token: currentToken })

      if (pathname === '/') {
        navigate('/feed')
      }

      return
    }

    addToast({
      title: 'Sua sessão expirou',
      description: 'Faça login novamente para continuar.',
    })

    handleSignOut()
  }, [addToast, handleSetProperties, handleSignOut, navigate, pathname])

  return (
    <AuthContext.Provider
      value={{
        tokenIsValid: properties.tokenIsValid,
        user: properties.user,
        isSubmitting: properties.isSubmitting,
        handlers: {
          handleSignIn,
          handleSignOut,
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

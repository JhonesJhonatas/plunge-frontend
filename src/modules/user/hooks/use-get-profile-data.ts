import { useCallback, useState } from 'react'

import {
  GetProfileDataResponse,
  GetProfileDataProps,
  getProfileData,
} from '@user'

import { useToast } from '@components'

type Properties = {
  loading: boolean
  profileData: GetProfileDataResponse
}

interface UseGetProfileResponse {
  loading: boolean
  profileData: GetProfileDataResponse
  handlers: {
    handleGetProfileData: (params: GetProfileDataProps) => void
  }
}

export const useGetProfileData = (): UseGetProfileResponse => {
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

  const handleGetProfileData = useCallback(
    async ({ nickName }: GetProfileDataProps) => {
      handleSetProperties({ loading: true })
      try {
        const { data } = await getProfileData({ nickName })

        handleSetProperties({ profileData: data })
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
    profileData: properties.profileData,
    handlers: {
      handleGetProfileData,
    },
  }
}

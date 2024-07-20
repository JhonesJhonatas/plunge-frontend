import { api } from '@core'

interface SetBearerTokenProps {
  token: string
}

export function setBearerToken({ token }: SetBearerTokenProps) {
  api.defaults.headers.authorization = `Bearer ${token}`
}

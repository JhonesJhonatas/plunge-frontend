import { User } from '@user'

export interface SearchUserProps {
  name?: string
  email?: string
}

export type SearchUserResponse = User[]

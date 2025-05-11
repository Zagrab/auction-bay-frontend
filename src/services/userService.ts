import { api } from './api'

export interface User {
  id: number
  firstName: string
  lastName: string
  email: string
  picture: string
  createdAt: string
}

export const fetchCurrentUser = async (): Promise<User> => {
  const response = await api.get<User>('/users/me/')
  return response.data
}

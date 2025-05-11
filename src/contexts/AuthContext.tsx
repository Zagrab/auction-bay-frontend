import React, { createContext, useState, useContext, useEffect } from 'react'
import { api } from '../services/api'

interface AuthContextValue {
  token: string | null
  login: (token: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export const AuthProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const storedToken = localStorage.getItem('access_token')
  const [token, setToken] = useState<string | null>(storedToken)

  if (storedToken) {
    api.defaults.headers.common.Authorization = `Bearer ${storedToken}`
  }

  useEffect(() => {
    if (token) {
      api.defaults.headers.common.Authorization = `Bearer ${token}`
      localStorage.setItem('access_token', token)
    } else {
      delete api.defaults.headers.common.Authorization
      localStorage.removeItem('access_token')
    }
  }, [token])

  const login = (newToken: string) => setToken(newToken)
  const logout = () => setToken(null)

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be inside AuthProvider')
  return ctx
}

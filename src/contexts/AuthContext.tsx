import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { authService, User } from '../lib/auth'

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (email: string, username: string, password: string, fullName?: string) => Promise<void>
  logout: () => void
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    // Return default values instead of throwing error
    // This allows components to gracefully handle missing auth
    return {
      user: null,
      isAuthenticated: false,
      isLoading: false,
      login: async () => {},
      register: async () => {},
      logout: () => {},
      refreshUser: async () => {},
    }
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Load user on mount
  useEffect(() => {
    loadUser()
  }, [])

  const loadUser = async () => {
    try {
      if (authService.isAuthenticated()) {
        const userData = await authService.getCurrentUser()
        setUser(userData)
      }
    } catch (error) {
      console.error('Failed to load user:', error)
      authService.logout()
    } finally {
      setIsLoading(false)
    }
  }

  const login = async (email: string, password: string) => {
    await authService.login({ email, password })
    await loadUser()
  }

  const register = async (email: string, username: string, password: string, fullName?: string) => {
    await authService.register({ email, username, password, full_name: fullName })
    // Auto-login after registration
    await login(email, password)
  }

  const logout = () => {
    authService.logout()
    setUser(null)
  }

  const refreshUser = async () => {
    await loadUser()
  }

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
    refreshUser,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}


// Authentication service
import { config } from './config'

export interface User {
  id: number
  email: string
  username: string
  full_name: string | null
  is_active: boolean
  is_premium: boolean
  created_at: string
}

export interface LoginResponse {
  access_token: string
  refresh_token: string
  token_type: string
}

export interface RegisterData {
  email: string
  username: string
  password: string
  full_name?: string
}

export interface LoginData {
  email: string
  password: string
}

class AuthService {
  private baseURL: string

  constructor(baseURL: string = config.api.baseURL) {
    this.baseURL = baseURL
  }

  // Register new user
  async register(data: RegisterData): Promise<User> {
    const response = await fetch(`${this.baseURL}${config.api.endpoints.auth.register}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    const responseData = await response.json()

    if (!response.ok) {
      throw new Error(responseData.detail || 'Registration failed')
    }

    return responseData
  }

  // Login user
  async login(data: LoginData): Promise<LoginResponse> {
    const response = await fetch(`${this.baseURL}${config.api.endpoints.auth.login}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    const responseData = await response.json()

    if (!response.ok) {
      throw new Error(responseData.detail || 'Login failed')
    }

    // Store tokens
    this.setTokens(responseData.access_token, responseData.refresh_token)

    return responseData
  }

  // Refresh access token
  async refreshToken(): Promise<string> {
    const refreshToken = this.getRefreshToken()

    if (!refreshToken) {
      throw new Error('No refresh token available')
    }

    const response = await fetch(`${this.baseURL}${config.api.endpoints.auth.refresh}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refresh_token: refreshToken }),
    })

    const data = await response.json()

    if (!response.ok) {
      // Refresh token is invalid, logout user
      this.logout()
      throw new Error('Session expired. Please login again.')
    }

    // Update access token
    localStorage.setItem('access_token', data.access_token)

    return data.access_token
  }

  // Get current user info
  async getCurrentUser(): Promise<User> {
    const response = await this.authenticatedRequest('/auth/me')
    return response
  }

  // Logout user
  logout() {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!localStorage.getItem('access_token')
  }

  // Get access token
  getAccessToken(): string | null {
    return localStorage.getItem('access_token')
  }

  // Get refresh token
  getRefreshToken(): string | null {
    return localStorage.getItem('refresh_token')
  }

  // Set tokens
  private setTokens(accessToken: string, refreshToken: string) {
    localStorage.setItem('access_token', accessToken)
    localStorage.setItem('refresh_token', refreshToken)
  }

  // Make authenticated request with automatic token refresh
  async authenticatedRequest(endpoint: string, options: RequestInit = {}): Promise<any> {
    let accessToken = this.getAccessToken()

    if (!accessToken) {
      throw new Error('No access token available')
    }

    // First attempt
    let response = await fetch(`${this.baseURL}${endpoint}`, {
      ...options,
      headers: {
        ...options.headers,
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    })

    // If 401, try refreshing token
    if (response.status === 401) {
      try {
        accessToken = await this.refreshToken()

        // Retry request with new token
        response = await fetch(`${this.baseURL}${endpoint}`, {
          ...options,
          headers: {
            ...options.headers,
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        })
      } catch (error) {
        this.logout()
        throw new Error('Session expired. Please login again.')
      }
    }

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.detail || 'Request failed')
    }

    return data
  }
}

// Export singleton instance
export const authService = new AuthService()


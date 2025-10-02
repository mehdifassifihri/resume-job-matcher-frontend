// Service d'authentification
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  username: string;
  password: string;
  full_name: string;
}

export interface AuthTokens {
  access_token: string;
  refresh_token: string;
  token_type: string;
}

export interface User {
  id: number;
  email: string;
  username: string;
  full_name: string;
  is_active: boolean;
  is_premium: boolean;
  created_at: string;
}

class AuthService {
  private baseURL = 'http://localhost:8000';
  private accessTokenKey = 'access_token';
  private refreshTokenKey = 'refresh_token';

  // Stockage sécurisé des tokens
  private setTokens(tokens: AuthTokens): void {
    localStorage.setItem(this.accessTokenKey, tokens.access_token);
    localStorage.setItem(this.refreshTokenKey, tokens.refresh_token);
  }

  private getAccessToken(): string | null {
    return localStorage.getItem(this.accessTokenKey);
  }

  private getRefreshToken(): string | null {
    return localStorage.getItem(this.refreshTokenKey);
  }

  private clearTokens(): void {
    localStorage.removeItem(this.accessTokenKey);
    localStorage.removeItem(this.refreshTokenKey);
  }

  // Inscription
  async register(credentials: RegisterCredentials): Promise<User> {
    try {
      const response = await fetch(`${this.baseURL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erreur lors de l\'inscription');
      }

      const user: User = await response.json();
      return user;
    } catch (error) {
      console.error('Register error:', error);
      throw error;
    }
  }

  // Connexion
  async login(credentials: LoginCredentials): Promise<AuthTokens> {
    try {
      const response = await fetch(`${this.baseURL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erreur de connexion');
      }

      const tokens: AuthTokens = await response.json();
      this.setTokens(tokens);
      return tokens;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  // Déconnexion
  async logout(): Promise<void> {
    try {
      const refreshToken = this.getRefreshToken();
      if (refreshToken) {
        await fetch(`${this.baseURL}/auth/logout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${refreshToken}`,
            'Content-Type': 'application/json',
          },
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      this.clearTokens();
    }
  }

  // Rafraîchir le token
  async refreshAccessToken(): Promise<AuthTokens | null> {
    try {
      const refreshToken = this.getRefreshToken();
      if (!refreshToken) {
        return null;
      }

      const response = await fetch(`${this.baseURL}/auth/refresh`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${refreshToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        this.clearTokens();
        return null;
      }

      const tokens: AuthTokens = await response.json();
      this.setTokens(tokens);
      return tokens;
    } catch (error) {
      console.error('Token refresh error:', error);
      this.clearTokens();
      return null;
    }
  }

  // Obtenir les informations utilisateur
  async getCurrentUser(): Promise<User | null> {
    try {
      const accessToken = this.getAccessToken();
      if (!accessToken) {
        return null;
      }

      const response = await fetch(`${this.baseURL}/auth/me`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          // Token expiré, essayer de le rafraîchir
          const newTokens = await this.refreshAccessToken();
          if (newTokens) {
            // Réessayer avec le nouveau token
            return this.getCurrentUser();
          }
        }
        return null;
      }

      return await response.json();
    } catch (error) {
      console.error('Get current user error:', error);
      return null;
    }
  }

  // Vérifier si l'utilisateur est connecté
  isAuthenticated(): boolean {
    return !!this.getAccessToken();
  }

  // Obtenir le token d'accès pour les requêtes API
  getAuthHeaders(): Record<string, string> {
    const accessToken = this.getAccessToken();
    return accessToken ? { 'Authorization': `Bearer ${accessToken}` } : {};
  }

  // Intercepteur pour les requêtes API avec gestion automatique des tokens
  async authenticatedFetch(url: string, options: RequestInit = {}): Promise<Response> {
    const accessToken = this.getAccessToken();
    
    if (!accessToken) {
      throw new Error('No access token available');
    }

    const headers = {
      ...options.headers,
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    };

    let response = await fetch(url, {
      ...options,
      headers,
    });

    // Si le token a expiré, essayer de le rafraîchir
    if (response.status === 401) {
      const newTokens = await this.refreshAccessToken();
      if (newTokens) {
        // Réessayer la requête avec le nouveau token
        response = await fetch(url, {
          ...options,
          headers: {
            ...headers,
            'Authorization': `Bearer ${newTokens.access_token}`,
          },
        });
      } else {
        // Impossible de rafraîchir, rediriger vers la page de connexion
        this.clearTokens();
        window.location.href = '/login';
      }
    }

    return response;
  }
}

export const authService = new AuthService();

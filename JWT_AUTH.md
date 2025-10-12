# JWT Authentication - Documentation

## Overview

The frontend now uses JWT (JSON Web Token) authentication for secure requests to the backend.

## How It Works

### 1. **User Login**

When a user logs in:
```typescript
// User enters email and password
await authService.login({ email, password })

// Backend returns:
{
  access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  refresh_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  token_type: "Bearer"
}

// Tokens are stored in localStorage
localStorage.setItem('access_token', access_token)
localStorage.setItem('refresh_token', refresh_token)
```

### 2. **Authenticated Requests**

When a request requires authentication:
```typescript
// Frontend automatically adds JWT token
headers['Authorization'] = `Bearer ${accessToken}`
```

### 3. **Automatic Token Refresh**

If the token expires (401 error):
```typescript
// 1. Frontend detects 401 error
// 2. Automatically calls /auth/refresh with refresh_token
// 3. Gets a new access_token
// 4. Retries original request with new token
```

If the refresh_token is also expired:
```typescript
// 1. Automatically logs out user
// 2. Removes tokens from localStorage
// 3. Redirects to login page
```

### 4. **User Information**

To get current user information:
```typescript
// Call /auth/me with access token
const user = await authService.getCurrentUser()

// Returns user data:
{
  id: 1,
  email: "user@example.com",
  username: "johndoe",
  full_name: "John Doe",
  created_at: "2024-01-01T00:00:00",
  is_active: true
}
```

## Implementation

### Authentication Service

File: `src/lib/auth.ts`

```typescript
class AuthService {
  // Login
  async login(credentials: LoginRequest): Promise<AuthResponse>
  
  // Register
  async register(data: RegisterRequest): Promise<AuthResponse>
  
  // Get current user
  async getCurrentUser(): Promise<User>
  
  // Refresh token
  async refreshToken(): Promise<AuthResponse>
  
  // Logout
  logout(): void
  
  // Check authentication
  isAuthenticated(): boolean
  
  // Get access token
  getAccessToken(): string | null
}
```

### Auth Context

File: `src/contexts/AuthContext.tsx`

React Context providing authentication state and methods throughout the application.

```typescript
interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (email: string, username: string, password: string, fullName?: string) => Promise<void>
  logout: () => void
  refreshUser: () => Promise<void>
}
```

Usage:
```typescript
import { useAuth } from '../contexts/AuthContext'

function MyComponent() {
  const { user, isAuthenticated, login, logout } = useAuth()
  
  // Use authentication in component
}
```

## API Endpoints Required

Your backend must implement the following endpoints:

### 1. Register
```
POST /auth/register

Body:
{
  "email": "user@example.com",
  "username": "johndoe",
  "password": "securepassword",
  "full_name": "John Doe"  // optional
}

Response:
{
  "access_token": "...",
  "refresh_token": "...",
  "token_type": "Bearer"
}
```

### 2. Login
```
POST /auth/login

Body:
{
  "email": "user@example.com",
  "password": "securepassword"
}

Response:
{
  "access_token": "...",
  "refresh_token": "...",
  "token_type": "Bearer"
}
```

### 3. Refresh Token
```
POST /auth/refresh

Headers:
Authorization: Bearer {refresh_token}

Response:
{
  "access_token": "...",
  "token_type": "Bearer"
}
```

### 4. Get Current User
```
GET /auth/me

Headers:
Authorization: Bearer {access_token}

Response:
{
  "id": 1,
  "email": "user@example.com",
  "username": "johndoe",
  "full_name": "John Doe",
  "created_at": "2024-01-01T00:00:00",
  "is_active": true
}
```

## Token Storage

Tokens are stored in browser's localStorage:

- `access_token`: Short-lived token (15-60 minutes)
- `refresh_token`: Long-lived token (7-30 days)

**Security Note**: For production, consider using httpOnly cookies for better security against XSS attacks.

## Protected Routes

To protect routes that require authentication:

```typescript
import { useAuth } from '../contexts/AuthContext'
import { Navigate } from 'react-router-dom'

function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth()
  
  if (isLoading) return <div>Loading...</div>
  
  return isAuthenticated ? children : <Navigate to="/login" />
}
```

## Error Handling

The authentication system handles various error scenarios:

### Login/Register Errors
```typescript
try {
  await login(email, password)
} catch (error) {
  // Error messages:
  // - "Incorrect email or password"
  // - "Inactive user"
  // - "Email already registered"
  // - "Username already taken"
}
```

### Token Refresh Errors
```typescript
// If token refresh fails:
// 1. User is automatically logged out
// 2. Tokens are cleared from localStorage
// 3. No manual intervention needed
```

## Usage with Analysis History

When a user is authenticated, analysis results are automatically saved to their history:

```typescript
// In App.tsx
const handleAdaptCV = async (resumeFile: File, jobDescription: File | string) => {
  const userId = isAuthenticated && user?.id ? user.id : undefined
  const response = await apiService.uploadResumeAndJob(
    resumeFile,
    jobDescription,
    'gpt-4o-mini',
    userId  // Saves to history if provided
  )
}
```

## Security Best Practices

1. **HTTPS Only**: Always use HTTPS in production
2. **Token Expiration**: Keep access tokens short-lived
3. **Refresh Token Rotation**: Implement refresh token rotation
4. **CORS**: Configure CORS properly on backend
5. **Rate Limiting**: Implement rate limiting on authentication endpoints
6. **Password Requirements**: Enforce strong password policies
7. **Account Lockout**: Lock accounts after failed login attempts

## Testing

### Manual Testing

1. **Register a new account**
   - Navigate to `/register`
   - Fill in the form
   - Should redirect to home after success

2. **Login**
   - Navigate to `/login`
   - Enter credentials
   - Should redirect to home after success

3. **Authenticated Request**
   - Login first
   - Upload resume and job description
   - Check that analysis is saved to history

4. **Logout**
   - Click logout button
   - Should clear tokens and redirect to home

5. **Token Refresh**
   - Login and wait for token to expire
   - Make an authenticated request
   - Should automatically refresh and continue

### With Mock Data

For testing without a backend:

```env
REACT_APP_ENABLE_MOCK_DATA=true
```

This allows testing the UI without real authentication.

## Troubleshooting

### "Token expired" errors
- Check token expiration times on backend
- Verify refresh token logic is working
- Check clock synchronization

### Login always fails
- Verify backend API URL is correct
- Check CORS configuration
- Verify credentials are correct
- Check network console for errors

### User data not loading
- Verify `/auth/me` endpoint is working
- Check that access token is being sent
- Verify token is valid

### Automatic logout
- Check if refresh token is expired
- Verify refresh token endpoint is working
- Check localStorage for tokens

## Integration Checklist

- [ ] Backend authentication endpoints implemented
- [ ] JWT tokens properly configured on backend
- [ ] CORS enabled for frontend domain
- [ ] Token expiration times set appropriately
- [ ] Refresh token rotation implemented (recommended)
- [ ] Password hashing on backend
- [ ] Environment variables configured
- [ ] HTTPS enabled in production
- [ ] Error messages are user-friendly
- [ ] Rate limiting enabled

## Additional Resources

- [JWT.io](https://jwt.io/) - JWT debugger and documentation
- [OWASP Authentication Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html)
- [React Router Protected Routes](https://reactrouter.com/en/main/start/tutorial#protected-routes)

---

**Version**: 1.0.0  
**Last Updated**: October 2024  
**Status**: Production Ready

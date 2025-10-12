// Application configuration
export const config = {
  // API Configuration
  api: {
    baseURL: process.env.REACT_APP_API_BASE_URL || 'https://web-production-fb736.up.railway.app',
    timeout: parseInt(process.env.REACT_APP_API_TIMEOUT || '120000'), // 2 minutes
    endpoints: {
      upload: '/match/upload',
      health: '/health',
      auth: {
        register: '/auth/register',
        login: '/auth/login',
        refresh: '/auth/refresh',
        me: '/auth/me'
      }
    }
  },
  
  // Application Settings
  app: {
    name: process.env.REACT_APP_APP_NAME || 'Resume Job Matcher',
    environment: process.env.REACT_APP_ENVIRONMENT || 'development',
    enableMockData: process.env.REACT_APP_ENABLE_MOCK_DATA === 'true'
  },
  
  // File Upload Settings
  upload: {
    maxFileSize: 10 * 1024 * 1024, // 10MB
    allowedTypes: ['.pdf', '.docx', '.doc', '.txt'],
    allowedMimeTypes: [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/msword',
      'text/plain'
    ]
  },
  
  // UI Settings
  ui: {
    animationDuration: 300,
    toastDuration: 5000,
    debounceDelay: 500
  },
  
  // Stripe Configuration
  stripe: {
    publishableKey: process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY || '',
    priceId: process.env.REACT_APP_STRIPE_PRICE_ID || '',
    successUrl: process.env.REACT_APP_STRIPE_SUCCESS_URL || `${window.location.origin}/success`,
    cancelUrl: process.env.REACT_APP_STRIPE_CANCEL_URL || `${window.location.origin}/cancel`
  }
}

// Helper function to check if we should use mock data
export const shouldUseMockData = (): boolean => {
  return config.app.enableMockData || config.app.environment === 'development'
}

// Helper function to get API URL
export const getApiUrl = (endpoint: string): string => {
  return `${config.api.baseURL}${endpoint}`
}

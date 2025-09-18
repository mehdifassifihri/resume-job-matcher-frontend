// Application configuration
export const config = {
  // API Configuration
  api: {
    baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000',
    timeout: parseInt(process.env.REACT_APP_API_TIMEOUT || '120000'), // 2 minutes
    endpoints: {
      upload: '/match/upload',
      health: '/health'
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

// API service for resume matching
import { config } from './config'

export interface APIResponse {
  score: number
  coverage: {
    must_have: number
    responsibilities: number
    seniority_fit: number
  }
  gaps: {
    matched_skills: string[]
    missing_skills: string[]
    weak_evidence_for_responsibilities: string[]
  }
  rationale: string
  tailored_resume_text: string
  structured_resume: {
    contact_info: {
      name: string
      email: string
      phone: string
      location: string
      photo?: string // Base64 encoded photo
    }
    summary: string
    experience: Array<{
      company: string
      title: string
      start_date: string
      end_date: string
      achievements: string[]
    }>
    education: Array<{
      degree: string
      institution: string
      start_date: string
      end_date: string
    }>
    skills: {
      programming_languages?: string[]
      tools?: string[]
      libraries?: string[]
      databases?: string[]
      cloud_platforms?: string[]
      methodologies?: string[]
      other?: string[]
    }
    certifications: Array<{
      name: string
      issuer: string
      date: string
    }>
    projects: Array<{
      name: string
      description: string
      technologies_used: string[]
      achievements: string[]
    }>
    achievements: string[]
    tailored_resume_text: string
  }
  recommendations: string[]
  flags: string[]
  meta: {
    detected_language: string
  }
}

export interface APIError {
  message: string
  status?: number
  details?: any
}

class APIService {
  private baseURL: string
  private timeout: number

  constructor(baseURL: string = config.api.baseURL, timeout: number = config.api.timeout) {
    this.baseURL = baseURL
    this.timeout = timeout
  }

  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {},
    requireAuth: boolean = false
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`
    
    const controller = new AbortController()
    // Only set timeout if it's greater than 0
    const timeoutId = this.timeout > 0 ? setTimeout(() => controller.abort(), this.timeout) : null

    // Prepare headers
    const headers: Record<string, string> = {
      'Accept': 'application/json',
    }

    // Add existing headers from options
    if (options.headers) {
      Object.entries(options.headers).forEach(([key, value]) => {
        if (typeof value === 'string') {
          headers[key] = value
        }
      })
    }

    // Add authorization header if required
    if (requireAuth) {
      const { authService } = require('./auth')
      const accessToken = authService.getAccessToken()
      if (accessToken) {
        headers['Authorization'] = `Bearer ${accessToken}`
      }
    }

    try {
      let response = await fetch(url, {
        ...options,
        signal: controller.signal,
        headers,
      })

      if (timeoutId) clearTimeout(timeoutId)

      // Si 401 et authentification requise, essayer de rafraîchir le token
      if (response.status === 401 && requireAuth) {
        const { authService } = require('./auth')
        try {
          // Refresh the token
          const newAccessToken = await authService.refreshToken()
          
          // Retry the request with the new token
          headers['Authorization'] = `Bearer ${newAccessToken}`
          
          response = await fetch(url, {
            ...options,
            signal: controller.signal,
            headers,
          })
        } catch (refreshError) {
          // If refresh fails, logout the user
          authService.logout()
          throw new APIError({
            message: 'Session expired. Please login again.',
            status: 401,
          })
        }
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new APIError({
          message: errorData.detail || errorData.message || `HTTP ${response.status}: ${response.statusText}`,
          status: response.status,
          details: errorData,
        })
      }

      return await response.json()
    } catch (error) {
      if (timeoutId) clearTimeout(timeoutId)
      
      if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new APIError({
          message: `Request timeout after ${this.timeout/1000} seconds - The AI analysis is taking longer than expected. Please try again.`,
          status: 408,
        })
      }
        throw new APIError({
          message: error.message,
          details: error,
        })
      }
      
      throw error
    }
  }

  async uploadResumeAndJob(
    resumeFile: File,
    jobDescription: File | string,
    model: string = 'gpt-4o-mini',
    userId?: number
  ): Promise<APIResponse> {
    const formData = new FormData()
    formData.append('resume_file', resumeFile)
    
    // Handle job description as either file or string
    if (typeof jobDescription === 'string') {
      formData.append('job_description', jobDescription)
    } else {
      formData.append('job_file', jobDescription)
    }
    
    formData.append('model', model)

    // Add user_id if provided (saves analysis to history)
    if (userId) {
      formData.append('user_id', userId.toString())
    }

    const response = await this.makeRequest<APIResponse>(config.api.endpoints.upload, {
      method: 'POST',
      body: formData,
    }, false) // requireAuth = false (no auth system currently)

    // Transform skills structure if needed (handle old API format)
    if (response.structured_resume?.skills) {
      response.structured_resume.skills = this.transformSkillsStructure(response.structured_resume.skills)
    }

    return response
  }

  async getAnalysisHistory(userId: number): Promise<any[]> {
    return this.makeRequest<any[]>(`/history/analyses/${userId}`, {
      method: 'GET',
    }, true) // requireAuth = true pour inclure le token JWT
  }

  private transformSkillsStructure(skills: any): any {
    // If skills already has the new structure, return as is
    if (skills.languages || skills.tools || skills.libraries || skills.other) {
      return skills
    }

    // Transform from old structure to new structure
    const transformed = {
      languages: [] as string[],
      tools: [] as string[],
      libraries: [] as string[],
      other: [] as string[]
    }

    // Map old structure to new structure
    if (skills.technical && Array.isArray(skills.technical)) {
      transformed.languages = [...transformed.languages, ...skills.technical]
    }
    if (skills.soft && Array.isArray(skills.soft)) {
      transformed.other = [...transformed.other, ...skills.soft]
    }
    if (skills.languages && Array.isArray(skills.languages)) {
      transformed.languages = [...transformed.languages, ...skills.languages]
    }

    return transformed
  }

  async healthCheck(): Promise<{ status: string; timestamp: string }> {
    return this.makeRequest<{ status: string; timestamp: string }>(config.api.endpoints.health)
  }
}

// Export singleton instance
export const apiService = new APIService()

// Export error class
export class APIError extends Error {
  public status?: number
  public details?: any

  constructor({ message, status, details }: { message: string; status?: number; details?: any }) {
    super(message)
    this.name = 'APIError'
    this.status = status
    this.details = details
  }
}

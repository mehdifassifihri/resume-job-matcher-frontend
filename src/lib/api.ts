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
      technical: string[]
      soft: string[]
      languages: string[]
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
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`
    
    const controller = new AbortController()
    // Only set timeout if it's greater than 0
    const timeoutId = this.timeout > 0 ? setTimeout(() => controller.abort(), this.timeout) : null

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
        headers: {
          'Accept': 'application/json',
          ...options.headers,
        },
      })

      if (timeoutId) clearTimeout(timeoutId)

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new APIError({
          message: errorData.message || `HTTP ${response.status}: ${response.statusText}`,
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
    jobFile: File,
    model: string = 'gpt-4o-mini'
  ): Promise<APIResponse> {
    const formData = new FormData()
    formData.append('resume_file', resumeFile)
    formData.append('job_file', jobFile)
    formData.append('model', model)

    return this.makeRequest<APIResponse>(config.api.endpoints.upload, {
      method: 'POST',
      body: formData,
    })
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

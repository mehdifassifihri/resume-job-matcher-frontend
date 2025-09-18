// Test script for API integration
import { apiService } from './api'

export const testApiConnection = async () => {
  try {
    console.log('Testing API connection...')
    
    // Test health check
    const healthResponse = await apiService.healthCheck()
    console.log('Health check successful:', healthResponse)
    
    return true
  } catch (error) {
    console.error('API connection failed:', error)
    return false
  }
}

export const testFileUpload = async (resumeFile: File, jobFile: File) => {
  try {
    console.log('Testing file upload...')
    console.log('Resume file:', resumeFile.name, resumeFile.size, 'bytes')
    console.log('Job file:', jobFile.name, jobFile.size, 'bytes')
    
    const response = await apiService.uploadResumeAndJob(resumeFile, jobFile)
    console.log('Upload successful:', response)
    
    return response
  } catch (error) {
    console.error('File upload failed:', error)
    throw error
  }
}

// Helper function to create test files
export const createTestFiles = () => {
  const resumeContent = `John Doe
Software Engineer
john.doe@email.com
(555) 123-4567

Experience:
- 5 years of software development
- React, Node.js, TypeScript
- AWS, Docker, CI/CD`

  const jobContent = `Senior Full Stack Developer

Requirements:
- 5+ years experience
- React, Node.js, TypeScript
- AWS, Docker
- Team leadership`

  const resumeFile = new File([resumeContent], 'test-resume.txt', { type: 'text/plain' })
  const jobFile = new File([jobContent], 'test-job.txt', { type: 'text/plain' })

  return { resumeFile, jobFile }
}

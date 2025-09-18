// API Test Utilities
import { apiService } from './api'

// Test API connection and response time
export const testApiPerformance = async () => {
  const startTime = Date.now()
  
  try {
    console.log('🔍 Testing API connection...')
    
    // Test health check first
    const healthStart = Date.now()
    const healthResponse = await apiService.healthCheck()
    const healthTime = Date.now() - healthStart
    
    console.log('✅ Health check successful:', healthResponse)
    console.log(`⏱️ Health check took: ${healthTime}ms`)
    
    const totalTime = Date.now() - startTime
    console.log(`🎯 Total test time: ${totalTime}ms`)
    
    return {
      success: true,
      healthTime,
      totalTime,
      response: healthResponse
    }
    
  } catch (error) {
    const totalTime = Date.now() - startTime
    console.error('❌ API test failed:', error)
    console.log(`⏱️ Failed after: ${totalTime}ms`)
    
    return {
      success: false,
      totalTime,
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}

// Test with sample files
export const testWithSampleFiles = async () => {
  try {
    console.log('📁 Creating sample files...')
    
    const resumeContent = `John Doe
Software Engineer
john.doe@email.com
(555) 123-4567

Experience:
- 5 years of software development
- React, Node.js, TypeScript
- AWS, Docker, CI/CD
- Team leadership and mentoring`

    const jobContent = `Senior Full Stack Developer

Requirements:
- 5+ years experience in web development
- React, Node.js, TypeScript
- AWS, Docker, Kubernetes
- Team leadership experience
- Agile/Scrum methodology

Responsibilities:
- Lead development team
- Design scalable architectures
- Code reviews and mentoring
- Collaborate with product team`

    const resumeFile = new File([resumeContent], 'test-resume.txt', { type: 'text/plain' })
    const jobFile = new File([jobContent], 'test-job.txt', { type: 'text/plain' })

    console.log('🚀 Testing file upload...')
    const startTime = Date.now()
    
    const response = await apiService.uploadResumeAndJob(resumeFile, jobFile)
    const uploadTime = Date.now() - startTime
    
    console.log('✅ Upload successful!')
    console.log(`⏱️ Upload took: ${uploadTime}ms`)
    console.log('📊 Response:', {
      score: response.score,
      coverage: response.coverage,
      recommendations: response.recommendations.length,
      flags: response.flags.length
    })
    
    return {
      success: true,
      uploadTime,
      response
    }
    
  } catch (error) {
    console.error('❌ Upload test failed:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}

// Run all tests
export const runAllTests = async () => {
  console.log('🧪 Starting API tests...')
  console.log('=' .repeat(50))
  
  // Test 1: Health check
  const healthTest = await testApiPerformance()
  console.log('=' .repeat(50))
  
  // Test 2: File upload (only if health check passed)
  if (healthTest.success) {
    const uploadTest = await testWithSampleFiles()
    console.log('=' .repeat(50))
    
    console.log('📋 Test Summary:')
    console.log(`Health Check: ${healthTest.success ? '✅ PASS' : '❌ FAIL'}`)
    console.log(`File Upload: ${uploadTest.success ? '✅ PASS' : '❌ FAIL'}`)
    
    return {
      healthTest,
      uploadTest,
      allPassed: healthTest.success && uploadTest.success
    }
  } else {
    console.log('❌ Skipping upload test due to health check failure')
    return {
      healthTest,
      allPassed: false
    }
  }
}

// Make functions available in console for manual testing
if (typeof window !== 'undefined') {
  (window as any).testApi = {
    health: testApiPerformance,
    upload: testWithSampleFiles,
    all: runAllTests
  }
  
  console.log('🔧 API test functions available:')
  console.log('- testApi.health() - Test health check')
  console.log('- testApi.upload() - Test file upload')
  console.log('- testApi.all() - Run all tests')
}

import { useState } from "react"
import { Header } from "../components/Header"
import { HeroUpload } from "../components/HeroUpload"
import { HowItWorks } from "../components/HowItWorks"
import { AutoApplySection } from "../components/AutoApplySection"
import { ResultPanel } from "../components/ResultPanel"
import { PricingPlans } from "../components/PricingPlans"
import { Footer } from "../components/Footer"
import { BackgroundEffects } from "../components/BackgroundEffects"
import { InteractiveParticles } from "../components/InteractiveParticles"
import { ColorGradients } from "../components/ColorGradients"
import { LoginPage } from "../components/LoginPage"
import { Toaster } from "../components/ui/toaster"
import { ThemeProvider } from "../contexts/ThemeContext"
import { calculateMockScore, generateMockRecommendations } from "../lib/utils"
import { mockAdaptedCV, mockStructuredResume } from "../lib/mock"
import { apiService, APIResponse, APIError } from "../lib/api"

// Import API test utilities in development
if (process.env.NODE_ENV === 'development') {
  import('../lib/api-test')
}

export function App() {
  const [cvContent, setCvContent] = useState("")
  const [jobDescription, setJobDescription] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [score, setScore] = useState(0)
  const [coverage, setCoverage] = useState(0)
  const [recommendations, setRecommendations] = useState<string[]>([])
  const [isAuthenticated, setIsAuthenticated] = useState(true)
  const [apiResponse, setApiResponse] = useState<APIResponse | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleLogin = () => {
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
  }

  const handleCVUpload = (content: string) => {
    setCvContent(content)
  }

  const handleJobDescriptionUpload = (content: string) => {
    setJobDescription(content)
  }

  const handleAdaptCV = async (resumeFile: File, jobFile: File) => {
    if (!resumeFile || !jobFile) return

    setIsLoading(true)
    setError(null)
    setApiResponse(null)
    
    try {
      // Call the real API
      const response = await apiService.uploadResumeAndJob(resumeFile, jobFile)
      
      // Update state with API response
      setApiResponse(response)
      setScore(Math.round(response.score))
      setCoverage(Math.round(response.coverage.must_have))
      setRecommendations(response.recommendations)
      setShowResults(true)
      
      // Scroll to results
      setTimeout(() => {
        const resultsSection = document.querySelector('[data-results-section]')
        if (resultsSection) {
          resultsSection.scrollIntoView({ behavior: 'smooth' })
        }
      }, 100)
      
    } catch (error) {
      console.error('API Error:', error)
      
      if (error instanceof APIError) {
        setError(`API Error: ${error.message}`)
      } else {
        setError('An unexpected error occurred. Please try again.')
      }
      
      // Fallback to mock data in case of error
      const calculatedScore = calculateMockScore(cvContent, jobDescription)
      const calculatedCoverage = Math.round(calculatedScore * 0.9)
      const calculatedRecommendations = generateMockRecommendations(calculatedScore)
      
      setScore(calculatedScore)
      setCoverage(calculatedCoverage)
      setRecommendations(calculatedRecommendations)
      setShowResults(true)
      
    } finally {
      setIsLoading(false)
    }
  }

  // Show login page if not authenticated
  if (!isAuthenticated) {
    return (
      <ThemeProvider>
        <LoginPage onLogin={handleLogin} />
      </ThemeProvider>
    )
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-neutral-bg text-neutral-text-primary transition-all duration-300 relative">
        <BackgroundEffects />
        <InteractiveParticles />
        <ColorGradients />
        
        <div className="relative z-10">
          <Header 
            onLogout={handleLogout}
            isAuthenticated={isAuthenticated}
          />
          
          <main>
            <HeroUpload 
              onCVUpload={handleCVUpload}
              onJobDescriptionUpload={handleJobDescriptionUpload}
              onAdaptCV={handleAdaptCV}
              isLoading={isLoading}
            />
            
            <HowItWorks />
            
            <AutoApplySection />
            
            <div data-results-section>
              <ResultPanel 
                score={score}
                coverage={coverage}
                recommendations={recommendations}
                adaptedCV={apiResponse?.tailored_resume_text || mockAdaptedCV}
                isVisible={showResults}
                structuredResume={apiResponse?.structured_resume || mockStructuredResume}
                apiResponse={apiResponse}
                error={error}
              />
            </div>
            
            <PricingPlans />
          </main>
          
          <Footer />
        </div>
        
        <Toaster />
      </div>
    </ThemeProvider>
  )
}

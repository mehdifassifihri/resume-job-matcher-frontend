import { useState } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Header } from "../components/Header"
import { HeroUpload } from "../components/HeroUpload"
import { HowItWorks } from "../components/HowItWorks"
import { ResultPanel } from "../components/ResultPanel"
import { PricingPlans } from "../components/PricingPlans"
import { Footer } from "../components/Footer"
import { CompanyCarousel } from "../components/CompanyCarousel"
import { BackgroundEffects } from "../components/BackgroundEffects"
import { InteractiveParticles } from "../components/InteractiveParticles"
import { ColorGradients } from "../components/ColorGradients"
import { SaaSDashboard } from "../components/SaaSDashboard"
import { Toaster } from "../components/ui/toaster"
import { ThemeProvider } from "../contexts/ThemeContext"
import { AuthProvider } from "../contexts/AuthContext"
import { calculateMockScore, generateMockRecommendations } from "../lib/utils"
import { mockAdaptedCV, mockStructuredResume } from "../lib/mock"
import { apiService, APIResponse, APIError } from "../lib/api"
import { SuccessPage } from "./SuccessPage"
import { CancelPage } from "./CancelPage"
import { LoginPage } from "./LoginPage"
import { RegisterPage } from "./RegisterPage"
import { HistoryPage } from "./HistoryPage"

// Import API test utilities in development
if (process.env.NODE_ENV === 'development') {
  import('../lib/api-test')
}

// Component for the main landing page content
function LandingPageContent() {
  const { user, isAuthenticated } = require("../contexts/AuthContext").useAuth()
  const [cvContent, setCvContent] = useState("")
  const [, setJobDescription] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [score, setScore] = useState(0)
  const [coverage, setCoverage] = useState(0)
  const [recommendations, setRecommendations] = useState<string[]>([])
  const [apiResponse, setApiResponse] = useState<APIResponse | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [, setCurrentView] = useState<'home' | 'dashboard'>('home')

  const handleNavigation = (sectionId: string) => {
    if (sectionId === 'dashboard') {
      setCurrentView('dashboard')
    } else {
      setCurrentView('home')
      // Scroll to section logic for home view
      const element = document.querySelector(`[data-section="${sectionId}"]`)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }


  const handleCVUpload = (content: string) => {
    setCvContent(content)
  }

  const handleJobDescriptionUpload = (content: string) => {
    setJobDescription(content)
  }

  const handleAdaptCV = async (resumeFile: File, jobDescription: File | string) => {
    if (!resumeFile || !jobDescription) return

    setIsLoading(true)
    setError(null)
    setApiResponse(null)
    
    try {
      // Call the real API with userId if authenticated (saves to history)
      const userId = isAuthenticated && user?.id ? user.id : undefined
      const response = await apiService.uploadResumeAndJob(resumeFile, jobDescription, 'gpt-4o-mini', userId)
      
      // Update state with API response
      setApiResponse(response)
      setScore(Math.round(response.score))
      setCoverage(Math.round(response.coverage.must_have))
      setRecommendations(response.recommendations)
      setShowResults(true)
      
      // Notify user if analysis was saved to history
      if (userId) {
        console.log('Analysis saved to history for user:', userId)
        // Note: A toast notification could be added here if desired
      }
      
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
      const jobDescriptionText = typeof jobDescription === 'string' ? jobDescription : ''
      const calculatedScore = calculateMockScore(cvContent, jobDescriptionText)
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

  return (
    <div className="min-h-screen bg-neutral-bg text-neutral-text-primary transition-all duration-300 relative">
      <BackgroundEffects />
      <InteractiveParticles />
      <ColorGradients />
      
      <div className="relative z-10">
        <Header onNavigate={handleNavigation} />
        
        <main>
          <HeroUpload 
            onCVUpload={handleCVUpload}
            onJobDescriptionUpload={handleJobDescriptionUpload}
            onAdaptCV={handleAdaptCV}
            isLoading={isLoading}
          />
          
          {/* Marketing sections */}
          <HowItWorks />
          <CompanyCarousel />
          
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
          
          {/* Pricing section */}
          <PricingPlans />
        </main>
        
        {/* Footer */}
        <Footer />
      </div>
      
      <Toaster />
    </div>
  )
}

export function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Auth pages */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            
            {/* Success page */}
            <Route path="/success" element={<SuccessPage />} />
            
            {/* Cancel page */}
            <Route path="/cancel" element={<CancelPage />} />

            {/* SaaS Dashboard route */}
            <Route path="/saas-dashboard" element={<SaaSDashboard />} />
            
            {/* Analysis History route */}
            <Route path="/history" element={<HistoryPage />} />
            
            {/* Main app (public) */}
            <Route path="/*" element={<LandingPageContent />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  )
}

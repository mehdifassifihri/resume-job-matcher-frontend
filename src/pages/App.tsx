import { useState } from "react"
import { Header } from "../components/Header"
import { HeroUpload } from "../components/HeroUpload"
import { HowItWorks } from "../components/HowItWorks"
import { AutoApplySection } from "../components/AutoApplySection"
import { ResultPanel } from "../components/ResultPanel"
import { JobSuggestions } from "../components/JobSuggestions"
import { PricingPlans } from "../components/PricingPlans"
import { Footer } from "../components/Footer"
import { Dashboard } from "../components/Dashboard"
import { BackgroundEffects } from "../components/BackgroundEffects"
import { InteractiveParticles } from "../components/InteractiveParticles"
import { ColorGradients } from "../components/ColorGradients"
import { LoginPage } from "../components/LoginPage"
import { Toaster } from "../components/ui/toaster"
import { ThemeProvider } from "../contexts/ThemeContext"
import { calculateMockScore, generateMockRecommendations } from "../lib/utils"
import { mockAdaptedCV } from "../lib/mock"

export function App() {
  const [cvContent, setCvContent] = useState("")
  const [jobDescription, setJobDescription] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [score, setScore] = useState(0)
  const [coverage, setCoverage] = useState(0)
  const [recommendations, setRecommendations] = useState<string[]>([])
  const [currentView, setCurrentView] = useState<'login' | 'home' | 'dashboard'>('home')
  const [isAuthenticated, setIsAuthenticated] = useState(true)

  const handleLogin = () => {
    setIsAuthenticated(true)
    setCurrentView('home')
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setCurrentView('login')
  }

  const handleCVUpload = (content: string) => {
    setCvContent(content)
  }

  const handleJobDescriptionUpload = (content: string) => {
    setJobDescription(content)
  }

  const handleAdaptCV = async () => {
    if (!cvContent || !jobDescription) return

    setIsLoading(true)
    
    // Simulate AI processing
    setTimeout(() => {
      const calculatedScore = calculateMockScore(cvContent, jobDescription)
      const calculatedCoverage = Math.round(calculatedScore * 0.9) // Coverage slightly lower than score
      const calculatedRecommendations = generateMockRecommendations(calculatedScore)
      
      setScore(calculatedScore)
      setCoverage(calculatedCoverage)
      setRecommendations(calculatedRecommendations)
      setShowResults(true)
      setIsLoading(false)
      
      // Scroll to results
      setTimeout(() => {
        const resultsSection = document.querySelector('[data-results-section]')
        if (resultsSection) {
          resultsSection.scrollIntoView({ behavior: 'smooth' })
        }
      }, 100)
    }, 3000) // 3 seconds simulation
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
            onNavigateToDashboard={() => setCurrentView('dashboard')} 
            onLogout={handleLogout}
            isAuthenticated={isAuthenticated}
          />
          
          {currentView === 'home' ? (
            <>
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
                    adaptedCV={mockAdaptedCV}
                    isVisible={showResults}
                  />
                </div>
                
                {showResults && <JobSuggestions />}
                
                <PricingPlans />
              </main>
              
              <Footer />
            </>
          ) : (
            <Dashboard onBackToHome={() => setCurrentView('home')} />
          )}
        </div>
        
        <Toaster />
      </div>
    </ThemeProvider>
  )
}

import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { AnalysisHistory } from '../components/AnalysisHistory'
import { Header } from '../components/Header'
import { BackgroundEffects } from '../components/BackgroundEffects'
import { Toaster } from '../components/ui/toaster'
import { Button } from '../components/ui/button'

export function HistoryPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-neutral-bg text-neutral-text-primary transition-all duration-300 relative">
      <BackgroundEffects />
      
      <div className="relative z-10">
        <Header onNavigate={() => {}} />
        
        <main className="container mx-auto px-4 py-8">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-6"
          >
            <Button
              variant="outline"
              onClick={() => navigate('/')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
          </motion.div>

          {/* Analysis History Component */}
          <AnalysisHistory />
        </main>
      </div>
      
      <Toaster />
    </div>
  )
}


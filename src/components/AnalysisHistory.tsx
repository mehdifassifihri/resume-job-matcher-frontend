import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Clock, 
  FileText, 
  TrendingUp, 
  Eye, 
  Download, 
  AlertCircle,
  Loader2,
  Calendar,
  Award
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { useAuth } from '../contexts/AuthContext'
import { useToast } from './ui/use-toast'
import { apiService } from '../lib/api'

interface Analysis {
  id: number
  tailored_resume: string
  job_text: string
  score: number
  created_at: string
}

export function AnalysisHistory() {
  const { user, isAuthenticated } = useAuth()
  const { toast } = useToast()
  const [history, setHistory] = useState<Analysis[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedAnalysis, setSelectedAnalysis] = useState<Analysis | null>(null)
  const [showDetailModal, setShowDetailModal] = useState(false)

  useEffect(() => {
    if (isAuthenticated && user?.id) {
      fetchHistory()
    } else {
      setLoading(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, isAuthenticated])

  const fetchHistory = async () => {
    if (!user?.id) return
    
    setLoading(true)
    setError('')
    
    try {
      const data = await apiService.getAnalysisHistory(user.id)
      setHistory(data)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred'
      setError(errorMessage)
      
      // Si l'erreur est 401, rediriger vers la page de connexion
      if (errorMessage.includes('Session expired') || errorMessage.includes('401')) {
        toast({
          title: 'Session Expired',
          description: 'Please login again to view your history',
          variant: 'destructive'
        })
        // Optionnel: rediriger vers la page de connexion
        setTimeout(() => {
          window.location.href = '/login'
        }, 2000)
      } else {
        toast({
          title: 'Error',
          description: 'Failed to load analysis history',
          variant: 'destructive'
        })
      }
    } finally {
      setLoading(false)
    }
  }

  const handleViewDetails = (analysis: Analysis) => {
    setSelectedAnalysis(analysis)
    setShowDetailModal(true)
  }

  const handleCopyResume = (resume: string) => {
    navigator.clipboard.writeText(resume)
    toast({
      title: 'Copied!',
      description: 'Resume copied to clipboard',
      variant: 'default'
    })
  }

  const handleDownload = (analysis: Analysis) => {
    const blob = new Blob([analysis.tailored_resume], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `resume-analysis-${analysis.id}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    
    toast({
      title: 'Downloaded!',
      description: 'Resume analysis downloaded successfully',
      variant: 'default'
    })
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'from-green-500 to-emerald-600'
    if (score >= 60) return 'from-yellow-500 to-orange-500'
    return 'from-red-500 to-pink-600'
  }

  const getScoreBadgeColor = (score: number) => {
    if (score >= 80) return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
    if (score >= 60) return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
    return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
  }

  if (!isAuthenticated) {
    return (
      <div className="w-full max-w-6xl mx-auto p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12"
        >
          <AlertCircle className="w-16 h-16 mx-auto mb-4 text-yellow-500" />
          <h2 className="text-2xl font-bold text-neutral-text mb-2">
            Login Required
          </h2>
          <p className="text-neutral-text-secondary">
            Please log in to view your analysis history
          </p>
        </motion.div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="w-full max-w-6xl mx-auto p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center justify-center py-12"
        >
          <Loader2 className="w-12 h-12 animate-spin text-primary" />
        </motion.div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="w-full max-w-6xl mx-auto p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12"
        >
          <AlertCircle className="w-16 h-16 mx-auto mb-4 text-red-500" />
          <h2 className="text-2xl font-bold text-neutral-text mb-2">
            Error Loading History
          </h2>
          <p className="text-neutral-text-secondary mb-4">{error}</p>
          <Button onClick={fetchHistory}>Try Again</Button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center shadow-lg">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-neutral-text">
                Analysis History
              </h1>
              <p className="text-neutral-text-secondary">
                View all your past CV analyses
              </p>
            </div>
          </div>
          <Badge variant="outline" className="text-sm">
            {history.length} {history.length === 1 ? 'Analysis' : 'Analyses'}
          </Badge>
        </div>
      </motion.div>

      {/* Empty State */}
      {history.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12"
        >
          <FileText className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <h2 className="text-2xl font-bold text-neutral-text mb-2">
            No Analyses Yet
          </h2>
          <p className="text-neutral-text-secondary mb-6">
            Start by analyzing your first CV to see it appear here
          </p>
          <Button onClick={() => window.location.href = '/'}>
            Analyze Your CV
          </Button>
        </motion.div>
      ) : (
        <div className="grid gap-6">
          {history.map((analysis, index) => (
            <motion.div
              key={analysis.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    {/* Left Section */}
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center gap-3">
                        <Badge className={getScoreBadgeColor(analysis.score)}>
                          <Award className="w-3 h-3 mr-1" />
                          Score: {analysis.score}%
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          <Calendar className="w-3 h-3 mr-1" />
                          {new Date(analysis.created_at).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </Badge>
                      </div>

                      {/* Job Description Preview */}
                      <div>
                        <h3 className="text-sm font-semibold text-neutral-text mb-1">
                          Job Description:
                        </h3>
                        <p className="text-sm text-neutral-text-secondary line-clamp-2">
                          {analysis.job_text}
                        </p>
                      </div>

                      {/* Resume Preview */}
                      <div>
                        <h3 className="text-sm font-semibold text-neutral-text mb-1">
                          Tailored Resume Preview:
                        </h3>
                        <p className="text-sm text-neutral-text-secondary line-clamp-3 font-mono text-xs bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                          {analysis.tailored_resume.substring(0, 200)}...
                        </p>
                      </div>
                    </div>

                    {/* Right Section - Actions */}
                    <div className="flex flex-col gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewDetails(analysis)}
                        className="whitespace-nowrap"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDownload(analysis)}
                        className="whitespace-nowrap"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>

                  {/* Score Bar */}
                  <div className="mt-4">
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${analysis.score}%` }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                        className={`h-full bg-gradient-to-r ${getScoreColor(analysis.score)}`}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {/* Detail Modal */}
      <AnimatePresence>
        {showDetailModal && selectedAnalysis && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowDetailModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
            >
              <CardHeader className="border-b">
                <div className="flex items-center justify-between">
                  <CardTitle>Analysis Details #{selectedAnalysis.id}</CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowDetailModal(false)}
                  >
                    ✕
                  </Button>
                </div>
                <div className="flex items-center gap-3 mt-2">
                  <Badge className={getScoreBadgeColor(selectedAnalysis.score)}>
                    Score: {selectedAnalysis.score}%
                  </Badge>
                  <Badge variant="outline">
                    {new Date(selectedAnalysis.created_at).toLocaleString()}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
                <div className="space-y-6">
                  {/* Job Description */}
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-text mb-3 flex items-center gap-2">
                      <FileText className="w-5 h-5" />
                      Job Description
                    </h3>
                    <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                      <p className="text-sm text-neutral-text-secondary whitespace-pre-wrap">
                        {selectedAnalysis.job_text}
                      </p>
                    </div>
                  </div>

                  {/* Tailored Resume */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-semibold text-neutral-text flex items-center gap-2">
                        <TrendingUp className="w-5 h-5" />
                        Tailored Resume
                      </h3>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleCopyResume(selectedAnalysis.tailored_resume)}
                      >
                        Copy to Clipboard
                      </Button>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                      <pre className="text-sm text-neutral-text-secondary whitespace-pre-wrap font-mono">
                        {selectedAnalysis.tailored_resume}
                      </pre>
                    </div>
                  </div>
                </div>
              </CardContent>

              <div className="border-t p-4 flex justify-end gap-3">
                <Button
                  variant="outline"
                  onClick={() => setShowDetailModal(false)}
                >
                  Close
                </Button>
                <Button onClick={() => handleDownload(selectedAnalysis)}>
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}


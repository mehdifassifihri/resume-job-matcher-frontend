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
  Award,
  X,
  Copy,
  CheckCircle2,
  Sparkles,
  Briefcase
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
            className="fixed inset-0 bg-slate-900/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
            onClick={() => setShowDetailModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl rounded-3xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden border border-white/30 dark:border-slate-700/30 relative"
            >
              {/* Gradient Background Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 pointer-events-none"></div>
              
              {/* Header */}
              <div className="relative border-b border-slate-200 dark:border-slate-700 bg-gradient-to-r from-slate-50 to-white dark:from-slate-800 dark:to-slate-800">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <motion.div 
                        className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg"
                        animate={{ 
                          boxShadow: [
                            "0 10px 15px -3px rgba(59, 130, 246, 0.3)",
                            "0 10px 15px -3px rgba(168, 85, 247, 0.3)",
                            "0 10px 15px -3px rgba(59, 130, 246, 0.3)"
                          ]
                        }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <Sparkles className="w-7 h-7 text-white" />
                      </motion.div>
                      <div>
                        <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-purple-900 dark:from-white dark:via-blue-100 dark:to-purple-100 bg-clip-text text-transparent">
                          Analysis Details #{selectedAnalysis.id}
                        </h2>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                          Complete analysis overview and tailored resume
                        </p>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setShowDetailModal(false)}
                      className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 flex items-center justify-center text-slate-600 dark:text-slate-300 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </motion.button>
                  </div>
                  
                  {/* Metrics Row */}
                  <div className="flex flex-wrap items-center gap-3">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring" }}
                      className={`px-4 py-2 rounded-xl ${getScoreBadgeColor(selectedAnalysis.score)} font-semibold flex items-center gap-2 shadow-sm`}
                    >
                      <Award className="w-4 h-4" />
                      Match Score: {selectedAnalysis.score}%
                    </motion.div>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.3, type: "spring" }}
                      className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium flex items-center gap-2 shadow-sm"
                    >
                      <Calendar className="w-4 h-4" />
                      {new Date(selectedAnalysis.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </motion.div>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.4, type: "spring" }}
                      className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium flex items-center gap-2 shadow-sm"
                    >
                      <Clock className="w-4 h-4" />
                      {new Date(selectedAnalysis.created_at).toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </motion.div>
                  </div>

                  {/* Score Progress Bar */}
                  <div className="mt-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
                        Match Quality
                      </span>
                      <span className="text-xs font-bold text-slate-900 dark:text-white">
                        {selectedAnalysis.score >= 80 ? 'Excellent' : selectedAnalysis.score >= 60 ? 'Good' : 'Fair'}
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5 overflow-hidden shadow-inner">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${selectedAnalysis.score}%` }}
                        transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                        className={`h-full bg-gradient-to-r ${getScoreColor(selectedAnalysis.score)} shadow-lg`}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="relative p-6 overflow-y-auto max-h-[calc(90vh-300px)] custom-scrollbar">
                <div className="space-y-6">
                  {/* Job Description Section */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="group"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                        <Briefcase className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                          Job Description
                        </h3>
                        <p className="text-xs text-slate-600 dark:text-slate-400">
                          Original job posting requirements
                        </p>
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-slate-50 to-blue-50/30 dark:from-slate-900/50 dark:to-blue-900/10 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-300">
                      <p className="text-sm text-slate-700 dark:text-slate-300 whitespace-pre-wrap leading-relaxed">
                        {selectedAnalysis.job_text}
                      </p>
                    </div>
                  </motion.div>

                  {/* Tailored Resume Section */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="group"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                          <FileText className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                            Tailored Resume
                          </h3>
                          <p className="text-xs text-slate-600 dark:text-slate-400">
                            AI-optimized resume for this position
                          </p>
                        </div>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleCopyResume(selectedAnalysis.tailored_resume)}
                        className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 font-medium flex items-center gap-2 transition-all shadow-sm hover:shadow-md"
                      >
                        <Copy className="w-4 h-4" />
                        Copy
                      </motion.button>
                    </div>
                    <div className="bg-gradient-to-br from-slate-50 to-purple-50/30 dark:from-slate-900/50 dark:to-purple-900/10 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-300">
                      <pre className="text-sm text-slate-700 dark:text-slate-300 whitespace-pre-wrap font-mono leading-relaxed">
                        {selectedAnalysis.tailored_resume}
                      </pre>
                    </div>
                  </motion.div>

                  {/* Success Tips */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-gradient-to-br from-green-50 to-emerald-50/50 dark:from-green-900/10 dark:to-emerald-900/5 p-5 rounded-2xl border border-green-200 dark:border-green-800"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-green-500 flex items-center justify-center flex-shrink-0 shadow-md">
                        <CheckCircle2 className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-green-900 dark:text-green-300 mb-2">
                          Pro Tips for Your Application
                        </h4>
                        <ul className="text-sm text-green-800 dark:text-green-400 space-y-1.5">
                          <li className="flex items-start gap-2">
                            <span className="text-green-500 mt-0.5">•</span>
                            <span>Review and personalize the tailored resume before submission</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-green-500 mt-0.5">•</span>
                            <span>Ensure all information is accurate and up-to-date</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-green-500 mt-0.5">•</span>
                            <span>Include relevant achievements and metrics when possible</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="relative border-t border-slate-200 dark:border-slate-700 p-6 bg-gradient-to-r from-slate-50 to-white dark:from-slate-800 dark:to-slate-800">
                <div className="flex items-center justify-between gap-4">
                  <div className="text-xs text-slate-600 dark:text-slate-400">
                    Analysis ID: #{selectedAnalysis.id}
                  </div>
                  <div className="flex gap-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setShowDetailModal(false)}
                      className="px-6 py-2.5 rounded-xl bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 font-medium transition-colors"
                    >
                      Close
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleDownload(selectedAnalysis)}
                      className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold flex items-center gap-2 shadow-lg hover:shadow-xl transition-all"
                    >
                      <Download className="w-4 h-4" />
                      Download Resume
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}


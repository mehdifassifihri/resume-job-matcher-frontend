import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Search,
  ChevronLeft,
  ChevronRight,
  Heart,
  Play,
  MoreVertical,
  Star,
  Clock,
  Users,
  BookOpen,
  Code,
  Palette,
  Building,
  FileText, 
  Briefcase,
  TrendingUp, 
  Calendar,
  Download, 
  Eye, 
  Target,
  CheckCircle,
  AlertCircle,
  BarChart3,
  User,
  MapPin,
  DollarSign,
  LayoutDashboard
} from "lucide-react"

interface ResumeAnalysis {
  id: string
  fileName: string
  uploadDate: string
  matchScore: number
  status: 'completed' | 'processing' | 'failed'
  jobMatches: number
  skills: string[]
  color: string
  icon: React.ReactNode
}

interface JobSuggestion {
  id: string
  title: string
  company: string
  location: string
  salary: string
  matchScore: number
  skills: string[]
  postedDate: string
  logo: string
  color: string
  icon: React.ReactNode
}

interface AnalysisHistory {
  id: string
  fileName: string
  date: string
  matchScore: number
  jobsFound: number
  topMatch: string
  status: 'success' | 'partial' | 'failed'
  color: string
  icon: React.ReactNode
}

interface DashboardStats {
  totalAnalyses: number
  averageMatchScore: number
  jobsFound: number
  successRate: number
}

const resumeAnalysisData: ResumeAnalysis[] = [
  {
    id: "1",
    fileName: "CV_Developpeur_FullStack.pdf",
    uploadDate: "2024-01-15",
    matchScore: 87,
    status: 'completed',
    jobMatches: 24,
    skills: ["React", "Node.js", "TypeScript", "MongoDB"],
    color: "bg-blue-100 text-blue-600",
    icon: <FileText className="w-5 h-5" />
  },
  {
    id: "2",
    fileName: "CV_Designer_UX.pdf",
    uploadDate: "2024-01-14",
    matchScore: 92,
    status: 'completed',
    jobMatches: 18,
    skills: ["Figma", "Adobe XD", "Prototyping", "User Research"],
    color: "bg-purple-100 text-purple-600",
    icon: <Palette className="w-5 h-5" />
  },
  {
    id: "3",
    fileName: "CV_Data_Scientist.pdf",
    uploadDate: "2024-01-13",
    matchScore: 78,
    status: 'completed',
    jobMatches: 31,
    skills: ["Python", "Machine Learning", "SQL", "TensorFlow"],
    color: "bg-green-100 text-green-600",
    icon: <BarChart3 className="w-5 h-5" />
  }
]

const jobSuggestionsData: JobSuggestion[] = [
  {
    id: "1",
    title: "Senior Full Stack Developer",
    company: "TechCorp",
    location: "Paris, France",
    salary: "65k-85k €",
    matchScore: 94,
    skills: ["React", "Node.js", "TypeScript"],
    postedDate: "2024-01-10",
    logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=40&h=40&fit=crop",
    color: "bg-blue-100 text-blue-600",
    icon: <Code className="w-4 h-4" />
  },
  {
    id: "2",
    title: "UX/UI Designer",
    company: "DesignStudio",
    location: "Lyon, France",
    salary: "45k-60k €",
    matchScore: 89,
    skills: ["Figma", "Adobe XD", "Prototyping"],
    postedDate: "2024-01-08",
    logo: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=40&h=40&fit=crop",
    color: "bg-purple-100 text-purple-600",
    icon: <Palette className="w-4 h-4" />
  },
  {
    id: "3",
    title: "Data Scientist",
    company: "DataTech",
    location: "Marseille, France",
    salary: "55k-75k €",
    matchScore: 82,
    skills: ["Python", "Machine Learning", "SQL"],
    postedDate: "2024-01-05",
    logo: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=40&h=40&fit=crop",
    color: "bg-green-100 text-green-600",
    icon: <BarChart3 className="w-4 h-4" />
  }
]

const analysisHistoryData: AnalysisHistory[] = [
  {
    id: "1",
    fileName: "CV_Developpeur_FullStack.pdf",
    date: "2024-01-15",
    matchScore: 87,
    jobsFound: 24,
    topMatch: "Senior Full Stack Developer - TechCorp",
    status: 'success',
    color: "bg-green-100 text-green-600",
    icon: <CheckCircle className="w-4 h-4" />
      },
      {
        id: "2",
    fileName: "CV_Designer_UX.pdf",
    date: "2024-01-14",
    matchScore: 92,
    jobsFound: 18,
    topMatch: "UX/UI Designer - DesignStudio",
    status: 'success',
    color: "bg-green-100 text-green-600",
    icon: <CheckCircle className="w-4 h-4" />
      },
      {
        id: "3",
    fileName: "CV_Data_Scientist.pdf",
    date: "2024-01-13",
    matchScore: 78,
    jobsFound: 31,
    topMatch: "Data Scientist - DataTech",
    status: 'success',
    color: "bg-green-100 text-green-600",
    icon: <CheckCircle className="w-4 h-4" />
  },
  {
    id: "4",
    fileName: "CV_Marketing_Manager.pdf",
    date: "2024-01-12",
    matchScore: 65,
    jobsFound: 12,
    topMatch: "Marketing Manager - GrowthCorp",
    status: 'partial',
    color: "bg-yellow-100 text-yellow-600",
    icon: <AlertCircle className="w-4 h-4" />
  },
  {
    id: "5",
    fileName: "CV_Product_Manager.pdf",
    date: "2024-01-11",
    matchScore: 45,
    jobsFound: 8,
    topMatch: "Product Manager - StartupXYZ",
    status: 'failed',
    color: "bg-red-100 text-red-600",
    icon: <AlertCircle className="w-4 h-4" />
  }
]

const dashboardStats: DashboardStats = {
  totalAnalyses: 156,
  averageMatchScore: 78,
  jobsFound: 1247,
  successRate: 89
}

interface DashboardProps {
  onBackToHome?: () => void
}

export function Dashboard({ onBackToHome }: DashboardProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState<'overview' | 'history'>('overview')

  return (
    <div className="min-h-screen bg-neutral-surface font-poppins">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header with Logo and Back Button */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Logo */}
              <motion.div 
                className="flex items-center space-x-3 cursor-pointer group"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="relative">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                    <span className="text-white font-bold text-xl">AI</span>
                  </div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                </div>
                <div className="hidden sm:block">
                  <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Resume Matcher
              </h1>
                  <p className="text-xs text-neutral-text-secondary">AI-powered</p>
                </div>
              </motion.div>
              
              {/* Dashboard Title */}
              <div className="border-l border-neutral-border pl-4">
                <h2 className="text-2xl font-bold text-neutral-text-primary">Dashboard</h2>
                <p className="text-neutral-text-secondary text-sm">Analyze your CVs and find the best jobs</p>
              </div>
            </div>
            
            {onBackToHome && (
              <button 
                onClick={onBackToHome}
                className="flex items-center gap-2 px-4 py-2 bg-neutral-surface-alt text-neutral-text-primary rounded-lg hover:bg-neutral-surface transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                Back
              </button>
            )}
          </div>
        </motion.div>

        {/* Search Bar */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="relative max-w-2xl">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-text-secondary w-5 h-5" />
            <input
              type="text"
              placeholder="Search in your analyses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-neutral-surface rounded-xl border border-neutral-border focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent shadow-sm text-neutral-text-primary placeholder-neutral-text-secondary"
            />
          </div>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex space-x-1 bg-neutral-surface p-1 rounded-xl shadow-sm border border-neutral-border max-w-md">
            <button 
              onClick={() => setActiveTab('overview')}
              className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'overview'
                  ? 'bg-primary text-white'
                  : 'text-neutral-text-secondary hover:text-neutral-text-primary'
              }`}
            >
              Overview
            </button>
            <button 
              onClick={() => setActiveTab('history')}
              className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'history'
                  ? 'bg-primary text-white'
                  : 'text-neutral-text-secondary hover:text-neutral-text-primary'
              }`}
            >
              History
            </button>
          </div>
        </motion.div>

          <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
              <motion.div
              key="overview"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white bg-neutral-surface bg-neutral-surface rounded-xl p-6 shadow-sm border border-gray-100 border-neutral-border border-neutral-border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 text-neutral-text-secondary text-neutral-text-secondary">Total analyses</p>
                      <p className="text-2xl font-bold text-gray-900 text-neutral-text-primary text-neutral-text-primary">{dashboardStats.totalAnalyses}</p>
                    </div>
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <FileText className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                </div>

                <div className="bg-white bg-neutral-surface bg-neutral-surface rounded-xl p-6 shadow-sm border border-gray-100 border-neutral-border border-neutral-border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 text-neutral-text-secondary">Average score</p>
                      <p className="text-2xl font-bold text-gray-900 text-neutral-text-primary">{dashboardStats.averageMatchScore}%</p>
                    </div>
                    <div className="p-3 bg-green-100 rounded-lg">
                      <TrendingUp className="w-6 h-6 text-green-600" />
                    </div>
                        </div>
                      </div>

                <div className="bg-white bg-neutral-surface bg-neutral-surface rounded-xl p-6 shadow-sm border border-gray-100 border-neutral-border border-neutral-border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 text-neutral-text-secondary">Jobs found</p>
                      <p className="text-2xl font-bold text-gray-900 text-neutral-text-primary">{dashboardStats.jobsFound}</p>
                    </div>
                    <div className="p-3 bg-purple-100 rounded-lg">
                      <Briefcase className="w-6 h-6 text-purple-600" />
                    </div>
                    </div>
                  </div>

                <div className="bg-white bg-neutral-surface bg-neutral-surface rounded-xl p-6 shadow-sm border border-gray-100 border-neutral-border border-neutral-border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 text-neutral-text-secondary">Success rate</p>
                      <p className="text-2xl font-bold text-gray-900 text-neutral-text-primary">{dashboardStats.successRate}%</p>
                              </div>
                    <div className="p-3 bg-yellow-100 rounded-lg">
                      <Target className="w-6 h-6 text-yellow-600" />
                              </div>
                  </div>
                </div>
              </div>

              {/* Recent Analyses */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mb-8"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 text-neutral-text-primary">Recent analyses</h2>
                  <button className="text-blue-600 font-medium hover:text-blue-700 transition-colors">
                    View all
                  </button>
                  </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {resumeAnalysisData.map((analysis) => (
                    <div key={analysis.id} className="bg-white bg-neutral-surface rounded-xl p-6 shadow-sm border border-gray-100 border-neutral-border hover:shadow-md transition-shadow">
                          <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${analysis.color}`}>
                            {analysis.icon}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 text-neutral-text-primary">{analysis.fileName}</p>
                            <p className="text-sm text-gray-500 text-neutral-text-secondary">{analysis.uploadDate}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-gray-600 text-neutral-text-secondary">{analysis.matchScore}%</span>
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <p className="text-sm text-gray-600 text-neutral-text-secondary mb-2">Matching jobs: {analysis.jobMatches}</p>
                        <div className="flex flex-wrap gap-1">
                          {analysis.skills.slice(0, 3).map((skill, index) => (
                            <span key={index} className="px-2 py-1 bg-neutral-surface-alt text-neutral-text-primary text-xs rounded-full">
                              {skill}
                            </span>
                          ))}
                          {analysis.skills.length > 3 && (
                            <span className="px-2 py-1 bg-gray-100 bg-neutral-surface-alt text-gray-700 text-neutral-text-primary text-xs rounded-full">
                              +{analysis.skills.length - 3}
                            </span>
                          )}
                              </div>
                            </div>

                      <div className="flex items-center justify-between">
                        <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-medium">
                          <Eye className="w-4 h-4" />
                          View details
                        </button>
                        <button className="flex items-center gap-2 text-gray-600 text-neutral-text-secondary hover:text-gray-700 hover:text-neutral-text-primary text-neutral-text-primary text-sm font-medium">
                          <Download className="w-4 h-4" />
                                Download
                              </button>
                          </div>
                        </div>
                      ))}
                </div>
        </motion.div>

              {/* Top Job Suggestions */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 text-neutral-text-primary">Best job suggestions</h2>
                  <div className="flex gap-2">
                    <button className="w-10 h-10 bg-gray-200 bg-neutral-surface rounded-full flex items-center justify-center hover:bg-gray-300 hover:bg-neutral-surface-alt transition-colors">
                      <ChevronLeft className="w-5 h-5 text-gray-600 text-neutral-text-secondary" />
                    </button>
                    <button className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                      <ChevronRight className="w-5 h-5 text-white" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {jobSuggestionsData.map((job) => (
                    <div key={job.id} className="bg-white bg-neutral-surface rounded-xl overflow-hidden shadow-sm border border-gray-100 border-neutral-border hover:shadow-md transition-shadow">
                      <div className="p-6">
                        <div className="flex items-center gap-2 mb-3">
                          <div className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${job.color}`}>
                            {job.icon}
                            {job.matchScore}% match
                          </div>
                        </div>
                        <h3 className="font-bold text-gray-900 text-neutral-text-primary mb-2 line-clamp-2">
                          {job.title}
                        </h3>
                        <div className="flex items-center gap-3 mb-3">
                          <img 
                            src={job.logo} 
                            alt={job.company}
                            className="w-8 h-8 rounded-full"
                          />
                          <div>
                            <p className="text-sm font-medium text-gray-900 text-neutral-text-primary">{job.company}</p>
                            <div className="flex items-center gap-1 text-xs text-gray-500 text-neutral-text-secondary">
                              <MapPin className="w-3 h-3" />
                              {job.location}
                          </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-1 text-sm text-gray-600 text-neutral-text-secondary">
                            <DollarSign className="w-4 h-4" />
                            {job.salary}
                          </div>
                          <div className="text-xs text-gray-500 text-neutral-text-secondary">
                            {job.postedDate}
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-1 mb-4">
                          {job.skills.slice(0, 2).map((skill, index) => (
                            <span key={index} className="px-2 py-1 bg-neutral-surface-alt text-neutral-text-primary text-xs rounded-full">
                              {skill}
                            </span>
                          ))}
                        </div>
                        <button className="w-full bg-primary text-white py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors">
                          Apply
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}

          {activeTab === 'history' && (
            <motion.div
              key="history"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-neutral-surface rounded-xl shadow-sm border border-neutral-border overflow-hidden">
                <div className="p-6 border-b border-neutral-border">
                  <h2 className="text-2xl font-bold text-neutral-text-primary">Analysis history</h2>
                  <p className="text-neutral-text-secondary mt-1">View all your previous CV analyses</p>
                  </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-neutral-surface-alt">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-medium text-neutral-text-primary">FILE</th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-neutral-text-primary">DATE</th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-neutral-text-primary">SCORE</th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-neutral-text-primary">JOBS</th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-neutral-text-primary">BEST MATCH</th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-neutral-text-primary">STATUS</th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-neutral-text-primary">ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {analysisHistoryData.map((analysis) => (
                        <tr key={analysis.id} className="border-t border-neutral-border hover:bg-neutral-surface-alt bg-neutral-surface-alt">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className={`p-2 rounded-lg ${analysis.color}`}>
                                {analysis.icon}
                                </div>
                              <div>
                                <p className="font-medium text-neutral-text-primary">{analysis.fileName}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <p className="text-neutral-text-primary">{analysis.date}</p>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-neutral-text-primary">{analysis.matchScore}%</span>
                              <div className="w-16 bg-neutral-border rounded-full h-2">
                                <div 
                                  className="bg-primary h-2 rounded-full" 
                                  style={{ width: `${analysis.matchScore}%` }}
                                ></div>
                      </div>
                    </div>
                          </td>
                          <td className="px-6 py-4">
                            <p className="text-neutral-text-primary">{analysis.jobsFound}</p>
                          </td>
                          <td className="px-6 py-4">
                            <p className="text-neutral-text-primary text-sm line-clamp-1">{analysis.topMatch}</p>
                          </td>
                          <td className="px-6 py-4">
                            <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${analysis.color}`}>
                              {analysis.icon}
                              {analysis.status === 'success' ? 'Success' : 
                               analysis.status === 'partial' ? 'Partial' : 'Failed'}
                  </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <button className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center hover:bg-blue-200 transition-colors">
                                <Eye className="w-4 h-4 text-blue-600" />
                              </button>
                              <button className="w-8 h-8 bg-gray-100 bg-neutral-surface-alt rounded-full flex items-center justify-center hover:bg-gray-200 hover:bg-neutral-surface bg-neutral-surface transition-colors">
                                <Download className="w-4 h-4 text-gray-600 text-neutral-text-secondary" />
                              </button>
                              <button className="w-8 h-8 bg-gray-100 bg-neutral-surface-alt rounded-full flex items-center justify-center hover:bg-gray-200 hover:bg-neutral-surface bg-neutral-surface transition-colors">
                                <MoreVertical className="w-4 h-4 text-gray-600 text-neutral-text-secondary" />
                        </button>
                      </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <motion.footer 
          className="mt-16 pt-8 border-t border-gray-200 border-neutral-border"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="h-6 w-6 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                <span className="text-white font-bold text-xs">AI</span>
              </div>
              <span className="text-sm font-medium text-gray-600 text-neutral-text-secondary">Resume Matcher</span>
            </div>
            <p className="text-xs text-gray-500 text-neutral-text-secondary mb-2">
              © 2024 AI Resume & Job Matcher. All rights reserved.
            </p>
            <div className="flex justify-center space-x-4 text-xs text-gray-400 text-neutral-text-secondary">
              <a href="#" className="hover:text-gray-600 hover:text-neutral-text-secondary text-neutral-text-secondary transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-gray-600 hover:text-neutral-text-secondary text-neutral-text-secondary transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-gray-600 hover:text-neutral-text-secondary text-neutral-text-secondary transition-colors">Help Center</a>
            </div>
          </div>
        </motion.footer>
      </div>
    </div>
  )
}



